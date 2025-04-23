import React from 'react';
import styled from 'styled-components';
import { Button, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { GlobalToken } from 'antd/es/theme/interface';

const StyledButton = styled(Button)<{ $token: GlobalToken }>`
  &.ant-btn {
    display: inline-flex;
    align-items: center;
    gap: ${({ $token }) => $token.paddingXS}px;
    height: auto;
    padding: 0;
    border: none;
    background: transparent;
    box-shadow: none;
    transition: all ${({ $token }) => $token.motionDurationMid};
    cursor: pointer;

    &:hover {
      background: transparent;
      opacity: 0.85;
    }

    &:active {
      background: transparent;
    }

    &:focus-visible {
      outline: ${({ $token }) => $token.lineWidth}px solid ${({ $token }) => $token.colorPrimaryBorder};
      outline-offset: ${({ $token }) => $token.marginXXS}px;
    }

    .anticon {
      font-size: ${({ $token }) => $token.controlHeight / 2}px;
      color: ${({ $token }) => $token.colorPrimary};
      transition: color ${({ $token }) => $token.motionDurationMid};
    }
  }
`;

const Text = styled.span<{ $token: GlobalToken }>`
  color: ${({ $token }) => $token.colorPrimary};
  font-size: ${({ $token }) => $token.fontSizeSM}px;
  line-height: ${({ $token }) => $token.lineHeightSM};
  font-weight: normal;
  font-family: ${({ $token }) => $token.fontFamily};
  transition: color ${({ $token }) => $token.motionDurationMid};
`;

export interface AddAddressButtonProps {
  /**
   * Text to display next to the plus icon
   */
  text: string;
  /**
   * Optional CSS class name for custom styling
   */
  className?: string;
  /**
   * Callback function when the button is clicked
   */
  onClick?: () => void;
}

/**
 * AddAddressButton component for adding new addresses
 * 
 * Uses Ant Design theme tokens for consistent styling:
 * - Colors: colorPrimary for icon and text
 * - Typography: fontSizeSM (14px), lineHeightSM (1.5715)
 * - Spacing: paddingXS (8px) for gap between icon and text
 * - Animation: motionDurationMid (0.2s) for transitions
 * - Focus: colorPrimaryBorder for focus outline
 * - Hover: Reduced opacity (0.85) for subtle interaction
 * 
 * @example
 * ```tsx
 * <AddAddressButton 
 *   text="添加新地址"
 *   onClick={() => console.log('Add new address')}
 * />
 * ```
 */
export const AddAddressButton: React.FC<AddAddressButtonProps> = ({
  text,
  className,
  onClick,
}) => {
  const { token } = theme.useToken();

  return (
    <StyledButton 
      className={className} 
      onClick={onClick}
      icon={<PlusOutlined />}
      $token={token}
    >
      <Text $token={token}>{text}</Text>
    </StyledButton>
  );
}; 