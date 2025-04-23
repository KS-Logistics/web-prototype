import React from 'react';
import { Badge as AntBadge, theme } from 'antd';
import type { BadgeProps as AntBadgeProps } from 'antd';
import styled from 'styled-components';

const StyledBadge = styled(AntBadge)`
  .ant-badge-count {
    background: ${props => props.theme.antd?.token?.colorError || '#ff4d4f'};
    box-shadow: none;
    font-size: ${props => props.theme.antd?.token?.fontSizeSM || '12px'};
    height: 20px;
    min-width: 20px;
    padding: 0 6px;
    line-height: 20px;
    border-radius: 10px;
    color: ${props => props.theme.antd?.token?.colorWhite || '#fff'};
  }

  &.ant-badge-dot {
    .ant-badge-dot {
      background: ${props => props.theme.antd?.token?.colorError || '#ff4d4f'};
      box-shadow: none;
      width: 8px;
      height: 8px;
    }
  }
`;

export interface BadgeProps extends Omit<AntBadgeProps, 'color' | 'status'> {
  /**
   * Custom class name
   */
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  className,
  children,
  ...props 
}) => {
  const { token } = theme.useToken();

  return (
    <StyledBadge
      {...props}
      className={className}
      theme={{ antd: { token } }}
    >
      {children}
    </StyledBadge>
  );
};

Badge.displayName = 'Badge';

export default Badge; 