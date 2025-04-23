import React from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import styled from 'styled-components';

// Custom styled button to match mobile-first design
const StyledButton = styled(AntButton)`
  // Primary button - blue background, white text
  &.ant-btn-primary {
    background-color: #1890ff;
    border-color: #1890ff;
    color: white;
    font-weight: 500;
    
    &:hover, &:focus {
      background-color: #40a9ff;
      border-color: #40a9ff;
    }
  }
  
  // Secondary button - white background with blue border
  &.ant-btn-default {
    background-color: white;
    border-color: #1890ff;
    color: #1890ff;
    
    &:hover, &:focus {
      border-color: #40a9ff;
      color: #40a9ff;
    }
  }
  
  // Text button - no background or border
  &.ant-btn-text {
    color: #1890ff;
    
    &:hover, &:focus {
      color: #40a9ff;
      background-color: rgba(24, 144, 255, 0.1);
    }
  }
  
  // Danger button - red styling
  &.ant-btn-dangerous {
    background-color: #ff4d4f;
    border-color: #ff4d4f;
    color: white;
    
    &:hover, &:focus {
      background-color: #ff7875;
      border-color: #ff7875;
    }
  }
  
  // For disabled state
  &.ant-btn-disabled,
  &.ant-btn-disabled:hover,
  &.ant-btn-disabled:focus,
  &.ant-btn-disabled:active {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    color: rgba(0, 0, 0, 0.25);
  }
  
  // Shared styles for all buttons - updated for mobile-first design
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  // Updated size variants for mobile
  &.ant-btn-lg {
    font-size: 16px;
    height: 44px;
    padding: 8px 16px;
    border-radius: 6px;
  }
  
  &.ant-btn-sm {
    font-size: 12px;
    height: 28px;
    padding: 4px 12px;
  }
  
  // Default size adjusted for mobile
  &.ant-btn {
    font-size: 14px;
    height: 36px;
    padding: 6px 16px;
  }
  
  // Full-width button for mobile interfaces
  &.mobile-full-width {
    width: 100%;
    border-radius: 4px;
  }
  
  // Bottom fixed button often used in mobile apps
  &.bottom-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-radius: 0;
    z-index: 100;
    height: 48px;
  }
`;

// Extend the Ant Design ButtonProps but omit the variant property to avoid conflicts
export interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
  label?: React.ReactNode;
  buttonVariant?: 'primary' | 'secondary' | 'text' | 'danger';
  fullWidthMobile?: boolean;
  bottomFixed?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  children, 
  buttonVariant = 'default',
  type,
  danger,
  fullWidthMobile = false,
  bottomFixed = false,
  className = '',
  ...props 
}) => {
  // Map buttonVariant to ant design type
  let buttonType = type;
  let buttonDanger = danger;
  
  if (!buttonType) {
    switch(buttonVariant) {
      case 'primary':
        buttonType = 'primary';
        break;
      case 'secondary':
        buttonType = 'default';
        break;
      case 'text':
        buttonType = 'text';
        break;
      case 'danger':
        buttonType = 'primary';
        buttonDanger = true;
        break;
      default:
        buttonType = 'default';
    }
  }

  // Build className string with conditional mobile classes
  const combinedClassName = [
    className,
    fullWidthMobile ? 'mobile-full-width' : '',
    bottomFixed ? 'bottom-fixed' : ''
  ].filter(Boolean).join(' ');

  return (
    <StyledButton 
      type={buttonType} 
      danger={buttonDanger}
      className={combinedClassName}
      {...props}
    >
      {label || children}
    </StyledButton>
  );
};

export default Button;
