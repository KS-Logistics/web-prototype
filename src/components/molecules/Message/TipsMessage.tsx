import React from 'react';
import { Alert, theme } from 'antd';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const StyledAlert = styled(Alert)`
  &.ant-alert {
    background: #FFF9F0; // Cream/yellow background
    border: none;
    padding: 24px 16px;
    border-radius: 8px;

    .ant-alert-content {
      flex: 1;
    }

    .ant-alert-message {
      color: #FA541C; // Orange text for Tips message
      font-size: ${props => props.theme.antd?.token?.fontSize || '14px'};
      line-height: 1.5;
      margin-bottom: 0;
      font-weight: normal;
    }

    .ant-alert-close-icon {
      color: #FA541C; // Orange color for close icon
      margin: 0;
      font-size: 16px;
      
      &:hover {
        opacity: 0.8;
      }

      .anticon-close {
        font-size: 16px;
      }
    }
  }
`;

export interface TipsMessageProps {
  /**
   * The content of the message
   */
  children: React.ReactNode;
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
  /**
   * Custom class name
   */
  className?: string;
}

export const TipsMessage: React.FC<TipsMessageProps> = ({
  children,
  onClose,
  className,
}) => {
  const { token } = theme.useToken();

  // Check if "Tips:" is already included in the children. If not, add it
  const messageContent = typeof children === 'string' && !children.startsWith('Tips:') 
    ? `Tips: ${children}` 
    : children;

  return (
    <StyledAlert
      className={className}
      theme={{ antd: { token } }}
      message={messageContent}
      type="warning"
      closeIcon={<CloseOutlined />}
      closable
      onClose={onClose}
    />
  );
};

TipsMessage.displayName = 'TipsMessage';

export default TipsMessage; 