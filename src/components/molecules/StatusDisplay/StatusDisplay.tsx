import React from 'react';
import styled from 'styled-components';
import { Result, theme } from 'antd';
import { ClockCircleFilled } from '@ant-design/icons';
import type { GlobalToken } from 'antd/es/theme/interface';

const StyledResult = styled(Result)<{ $token: GlobalToken }>`
  &.ant-result {
    padding: ${({ $token }) => $token.paddingLG}px ${({ $token }) => $token.padding}px;
    background: ${({ $token }) => $token.colorBgContainer};
    border-radius: ${({ $token }) => $token.borderRadiusLG}px;

    .ant-result-icon {
      margin-bottom: ${({ $token }) => $token.marginLG}px;

      .anticon {
        font-size: ${({ $token }) => $token.controlHeightLG * 2}px;
        color: ${({ $token }) => $token.colorSuccess};
      }
    }

    .ant-result-title {
      font-size: ${({ $token }) => $token.fontSizeLG}px;
      line-height: ${({ $token }) => $token.lineHeightLG};
      font-weight: ${({ $token }) => $token.fontWeightStrong};
      color: ${({ $token }) => $token.colorText};
    }

    .ant-result-subtitle {
      margin-top: ${({ $token }) => $token.marginXS}px;
      font-size: ${({ $token }) => $token.fontSizeLG}px;
      line-height: ${({ $token }) => $token.lineHeightLG};
      font-weight: 400;
      color: ${({ $token }) => $token.colorText};
    }

    .ant-result-extra {
      margin-top: ${({ $token }) => $token.marginMD}px;
      color: ${({ $token }) => $token.colorTextSecondary};
      font-size: ${({ $token }) => $token.fontSize}px;
      line-height: ${({ $token }) => $token.lineHeight};
    }
  }
`;

export interface StatusDisplayProps {
  /**
   * The main title text
   */
  title: string;
  /**
   * The tracking number label (e.g., "国际单号")
   */
  trackingLabel: string;
  /**
   * The tracking number value
   */
  trackingNumber: string;
  /**
   * The message to display at the bottom
   */
  message: string;
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * StatusDisplay component for showing package processing status
 * 
 * Uses Ant Design theme tokens for consistent styling:
 * - Colors: colorBgContainer, colorSuccess, colorText, colorTextSecondary
 * - Typography: fontSizeLG, lineHeightLG, fontWeightStrong
 * - Spacing: paddingLG, marginLG, marginXS, marginMD
 * - Layout: borderRadiusLG, controlHeightLG
 * 
 * @example
 * ```tsx
 * <StatusDisplay 
 *   title="您的包裹已进入打包流程"
 *   trackingLabel="国际单号"
 *   trackingNumber="AU4363"
 *   message="我们会在截单日期前通知您查看并付款"
 * />
 * ```
 */
export const StatusDisplay: React.FC<StatusDisplayProps> = ({
  title,
  trackingLabel,
  trackingNumber,
  message,
  className,
}) => {
  const { token } = theme.useToken();

  return (
    <StyledResult
      className={className}
      icon={<ClockCircleFilled />}
      title={title}
      subTitle={`${trackingLabel} ${trackingNumber}`}
      extra={message}
      $token={token}
    />
  );
}; 