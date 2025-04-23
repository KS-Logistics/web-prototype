import React from 'react';
import { theme } from 'antd';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';

const variantToToken = {
  primary: {
    color: (token: any) => `rgba(22, 119, 255, 0.85)`, // Lighter blue color
    hoverColor: (token: any) => token.colorPrimary,
  },
  secondary: {
    color: (token: any) => token.colorTextSecondary,
    hoverColor: (token: any) => token.colorPrimary,
  },
};

interface StyledActionProps {
  $variant: keyof typeof variantToToken;
  $withArrow?: boolean;
}

const StyledAction = styled.button<StyledActionProps>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.$withArrow ? '4px' : '0'}; // Match design spacing
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${props => props.theme.antd?.token?.fontSize || '14px'};
  line-height: ${props => props.theme.antd?.token?.lineHeight || '22px'};
  color: ${props => variantToToken[props.$variant].color(props.theme.antd?.token)};
  transition: all ${props => props.theme.antd?.token?.motionDurationMid || '0.2s'};
  user-select: none;

  .anticon {
    font-size: 12px; // Match design size
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    color: currentColor;
    opacity: 0.85;
    transition: all ${props => props.theme.antd?.token?.motionDurationMid || '0.2s'};
    transform: translateY(-1px); // Slight upward adjustment
  }

  &:hover {
    color: ${props => variantToToken[props.$variant].hoverColor(props.theme.antd?.token)};

    .anticon {
      opacity: 1;
      transform: translateY(-1px) translateX(1px); // Maintain vertical position while moving horizontally
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.antd?.token?.colorPrimaryBorder || '#91caff'};
    outline-offset: 1px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  &:active {
    opacity: 0.9;
  }
`;

export interface ActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the action
   */
  variant?: keyof typeof variantToToken;
  /**
   * Whether to show the arrow icon
   */
  withArrow?: boolean;
  /**
   * Custom class name
   */
  className?: string;
}

export const Action: React.FC<ActionProps> = ({
  variant = 'primary',
  withArrow = false,
  className,
  children,
  ...props
}) => {
  const { token } = theme.useToken();

  return (
    <StyledAction
      {...props}
      className={className}
      $variant={variant}
      $withArrow={withArrow}
      theme={{ antd: { token } }}
    >
      {children}
      {withArrow && <RightOutlined />}
    </StyledAction>
  );
};

Action.displayName = 'Action';

export default Action; 