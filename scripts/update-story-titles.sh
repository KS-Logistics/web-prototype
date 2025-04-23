#!/bin/bash

# Update Foundation (Atoms) stories
find src/components/atoms -name "*.stories.tsx" -exec sed -i '' 's/title: '\''Atoms\//title: '\''Foundation\//g' {} +

# Update Components (Molecules) stories
find src/components/molecules -name "*.stories.tsx" -exec sed -i '' 's/title: '\''Molecules\//title: '\''Components\//g' {} +

# Update Sections (Organisms) stories
find src/components/organisms -name "*.stories.tsx" -exec sed -i '' 's/title: '\''Organisms\//title: '\''Sections\//g' {} +

# Update Layout (Templates) stories
find src/components/templates -name "*.stories.tsx" -exec sed -i '' 's/title: '\''Templates\//title: '\''Layout\//g' {} +

# Update Pages stories
find src/stories/pages -name "*.stories.tsx" -exec sed -i '' 's/title: '\''Pages\//title: '\''Pages\//g' {} + 