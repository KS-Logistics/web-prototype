import React from 'react';
import { Tag as AntTag, theme } from 'antd';
import type { TagProps as AntTagProps } from 'antd';
import styled from 'styled-components';

const variantToToken = {
  default: {
    color: (token: any) => token.colorText,
    bg: (token: any) => token.colorBgContainer,
    border: (token: any) => token.colorBorder,
  },
  primary: {
    color: (token: any) => token.colorPrimary,
    bg: (token: any) => token.colorPrimaryBg,
    border: (token: any) => token.colorPrimary,
  },
  success: {
    color: (token: any) => token.colorSuccess,
    bg: (token: any) => token.colorSuccessBg,
    border: (token: any) => token.colorSuccess,
  },
  warning: {
    color: (token: any) => token.colorWarning,
    bg: (token: any) => token.colorWarningBg,
    border: (token: any) => token.colorWarning,
  },
  error: {
    color: (token: any) => token.colorError,
    bg: (token: any) => token.colorErrorBg,
    border: (token: any) => token.colorError,
  },
};

interface StyledTagProps {
  $variant: keyof typeof variantToToken;
}

const StyledTag = styled(AntTag)<StyledTagProps>`
  &.ant-tag {
    display: inline-flex;
    align-items: center;
    margin: 0;
    padding: 4px 8px;
    font-size: ${props => props.theme.antd?.token?.fontSize || '14px'};
    line-height: ${props => props.theme.antd?.token?.lineHeight || '22px'};
    border-radius: ${props => props.theme.antd?.token?.borderRadius || '6px'};
    border: 1px solid ${props => variantToToken[props.$variant].border(props.theme.antd?.token)};
    background: ${props => variantToToken[props.$variant].bg(props.theme.antd?.token)};
    color: ${props => variantToToken[props.$variant].color(props.theme.antd?.token)};
    transition: all ${props => props.theme.antd?.token?.motionDurationMid || '0.2s'};

    &:hover {
      opacity: 0.85;
    }
  }
`;

export interface TagProps extends Omit<AntTagProps, 'color'> {
  /**
   * Predefined color variants
   */
  variant?: keyof typeof variantToToken;
  /**
   * Custom class name
   */
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ 
  variant = 'default',
  className,
  children,
  ...props 
}) => {
  const { token } = theme.useToken();

  return (
    <StyledTag
      {...props}
      className={className}
      $variant={variant}
      theme={{ antd: { token } }}
    >
      {children}
    </StyledTag>
  );
};

Tag.displayName = 'Tag';

export default Tag; 