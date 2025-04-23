import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const StyledSvg = styled.svg`
  width: 100%;
  height: 200px;
  display: block;
`;

const BannerBackground: React.FC = () => {
  return (
    <StyledSvg viewBox="0 0 375 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="bannerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: colors.primary, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: colors.primaryLight, stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="overlayGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFFFFF', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
        </linearGradient>
      </defs>

      {/* Background */}
      <path 
        d="M0 0H375V180C375 191.046 366.046 200 355 200H20C8.95431 200 0 191.046 0 180V0Z" 
        fill="url(#bannerGradient)"
      />

      {/* Abstract shapes */}
      <path
        d="M-50 120C0 100 100 160 200 120C300 80 400 120 450 100"
        stroke="url(#overlayGradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M-50 140C0 120 100 180 200 140C300 100 400 140 450 120"
        stroke="url(#overlayGradient)"
        strokeWidth="2"
        fill="none"
      />

      {/* Decorative circles */}
      <circle cx="50" cy="50" r="30" fill="white" fillOpacity="0.1" />
      <circle cx="320" cy="80" r="40" fill="white" fillOpacity="0.1" />
      <circle cx="180" cy="20" r="15" fill="white" fillOpacity="0.1" />

      {/* Container icon */}
      <g transform="translate(285, 40)" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="0" y="0" width="40" height="30" rx="2" fill="none" />
        <line x1="0" y1="10" x2="40" y2="10" />
        <line x1="10" y1="0" x2="10" y2="30" />
        <line x1="20" y1="0" x2="20" y2="30" />
        <line x1="30" y1="0" x2="30" y2="30" />
      </g>

      {/* Ship icon */}
      <g transform="translate(40, 80)" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0,15 L40,15 L35,25 L5,25 Z" fill="none" />
        <path d="M15,5 L25,5 L25,15 L15,15 Z" fill="none" />
        <line x1="20" y1="0" x2="20" y2="5" />
        <path d="M0,15 C10,13 30,13 40,15" fill="none" />
      </g>
    </StyledSvg>
  );
};

export default BannerBackground; 