import React from 'react';

interface LogoIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className, style }) => {
  return (
    <svg 
      width="80" 
      height="24" 
      viewBox="0 0 80 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g>
        {/* Circle base */}
        <circle cx="12" cy="12" r="11" stroke="#1890FF" strokeWidth="2" fill="white"/>
        {/* Letter L */}
        <path d="M7 6V18H11" stroke="#1890FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Letter G */}
        <path d="M30 12C30 16.4183 26.4183 20 22 20C17.5817 20 14 16.4183 14 12C14 7.58172 17.5817 4 22 4C24.7614 4 27.2277 5.33579 28.6066 7.39347" stroke="#1890FF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 12H22V16" stroke="#1890FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Text */}
        <text x="40" y="16" fontFamily="Arial" fontSize="14" fill="#333333">Logistics</text>
      </g>
    </svg>
  );
};

export default LogoIcon; 