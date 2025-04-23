import React from 'react';
import { colors } from '../../styles/theme';

export const ContainerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="10" width="32" height="20" rx="2" stroke={colors.primary} strokeWidth="1.5"/>
    <path d="M4 15H36" stroke={colors.primary} strokeWidth="1.5"/>
    <path d="M20 15V30" stroke={colors.primary} strokeWidth="1.5"/>
    <rect x="8" y="19" width="8" height="6" rx="1" stroke={colors.primary} strokeWidth="1.5"/>
    <rect x="24" y="19" width="8" height="6" rx="1" stroke={colors.primary} strokeWidth="1.5"/>
  </svg>
);

export const PackageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke={colors.primary} strokeWidth="1.5"/>
    <path d="M20 4V36" stroke={colors.primary} strokeWidth="1.5"/>
    <path d="M4 12L36 28" stroke={colors.primary} strokeWidth="1.5"/>
    <path d="M36 12L4 28" stroke={colors.primary} strokeWidth="1.5"/>
  </svg>
);

export const StepIcon: React.FC<{ number: number; className?: string }> = ({ number, className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="9" stroke={colors.primary} strokeWidth="1.5"/>
    <text
      x="10"
      y="14"
      textAnchor="middle"
      fill={colors.primary}
      fontSize="12"
      fontFamily="Arial"
      fontWeight="500"
    >
      {number}
    </text>
  </svg>
); 