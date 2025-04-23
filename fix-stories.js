const fs = require('fs');
const path = require('path');

// Function to find all story files recursively
function findStoryFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findStoryFiles(filePath, fileList);
    } else if (file.endsWith('.stories.tsx') || file.endsWith('.stories.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix story files
function fixStoryFile(filePath) {
  console.log(`Fixing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace type imports with regular imports
  content = content.replace(/import\s+type\s*{([^}]+)}\s+from\s+(['"])([^'"]+)(['"])/g, 'import {$1} from $2$3$4');
  
  // Replace satisfies with simple assignment
  content = content.replace(/}\s*satisfies\s+Meta<[^>]+>;/g, '};');
  
  // Remove type annotations from Story variables
  content = content.replace(/export\s+const\s+([^:]+):\s*Story\s*=/g, 'export const $1 =');
  
  // Remove type annotations from function parameters
  content = content.replace(/\(([^)]*): any([^)]*)\)/g, '($1$2)');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed: ${filePath}`);
}

// Main function
function main() {
  const storyFiles = findStoryFiles(path.join(__dirname, 'src'));
  
  storyFiles.forEach(file => {
    fixStoryFile(file);
  });
  
  // Also fix preview.ts if it exists
  const previewPath = path.join(__dirname, '.storybook', 'preview.ts');
  if (fs.existsSync(previewPath)) {
    let content = fs.readFileSync(previewPath, 'utf8');
    content = content.replace(/import\s+type\s*{([^}]+)}\s+from\s+(['"])([^'"]+)(['"])/g, 'import {$1} from $2$3$4');
    fs.writeFileSync(previewPath, content);
    console.log(`Fixed: ${previewPath}`);
  }
  
  console.log('All story files have been fixed!');
}

main(); 