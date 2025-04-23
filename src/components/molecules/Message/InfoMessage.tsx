import React from 'react';
import { Alert, theme } from 'antd';
import styled from 'styled-components';
import { SoundOutlined } from '@ant-design/icons';
import { Action } from '../../atoms/Action';

const StyledAlert = styled(Alert)`
  &.ant-alert {
    background: rgba(230, 244, 255, 0.8);
    border: none;
    padding: 24px 16px;
    border-radius: 8px;

    .ant-alert-icon {
      color: #1677FF;
      font-size: 20px;
      margin-inline-end: 12px;
      margin-top: -2px;
    }

    .ant-alert-content {
      flex: 1;
    }

    .ant-alert-message {
      color: #1677FF;
      font-size: ${props => props.theme.antd?.token?.fontSize || '14px'};
      line-height: 1.5;
      margin-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-weight: normal;
    }
  }
`;

export interface InfoMessageProps {
  /**
   * The content of the message
   */
  children: React.ReactNode;
  /**
   * The action text
   */
  actionText?: string;
  /**
   * Callback when action is clicked
   */
  onActionClick?: () => void;
  /**
   * Custom class name
   */
  className?: string;
}

export const InfoMessage: React.FC<InfoMessageProps> = ({
  children,
  actionText,
  onActionClick,
  className,
}) => {
  const { token } = theme.useToken();

  const message = (
    <>
      {children}
      {actionText && (
        <Action variant="primary" withArrow onClick={onActionClick}>
          {actionText}
        </Action>
      )}
    </>
  );

  return (
    <StyledAlert
      className={className}
      theme={{ antd: { token } }}
      icon={<SoundOutlined />}
      message={message}
      type="info"
      showIcon
    />
  );
};

InfoMessage.displayName = 'InfoMessage';

export default InfoMessage; 