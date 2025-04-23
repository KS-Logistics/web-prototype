import React from 'react';
import styled, { css } from 'styled-components';
import { Tabs, Badge, theme } from 'antd';
import type { TabsProps } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';

interface StyledTabsProps {
  $variant?: 'filled' | 'underline';
  $token: GlobalToken;
}

const StyledTabs = styled(Tabs)<StyledTabsProps>`
  .ant-tabs-nav {
    margin-bottom: 0;
    padding: 0 ${({ $token }) => $token.paddingXS}px;

    .ant-tabs-nav-list {
      gap: ${({ $token }) => $token.marginXS}px;
    }

    .ant-tabs-tab {
      margin: 0;
      padding: ${({ $token }) => $token.paddingXS}px ${({ $token }) => $token.paddingSM}px;
      font-size: ${({ $token }) => $token.fontSize}px;
      line-height: ${({ $token }) => $token.lineHeight};
      transition: all ${({ $token }) => $token.motionDurationMid};

      &:hover {
        color: ${({ $token }) => $token.colorPrimary};
      }

      &.ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          color: ${({ $token }) => $token.colorPrimary};
        }
      }
    }

    ${({ $variant, $token }) =>
      $variant === 'filled' &&
      css`
        .ant-tabs-nav-list {
          background: ${$token.colorBgContainer};
          border-radius: ${$token.borderRadiusLG}px;
          padding: ${$token.paddingXXS}px;
        }

        .ant-tabs-tab {
          border-radius: ${$token.borderRadius}px;
          background: transparent;

          &.ant-tabs-tab-active {
            background: ${$token.colorPrimaryBg};

            .ant-tabs-tab-btn {
              color: ${$token.colorPrimary};
            }
          }
        }

        .ant-tabs-ink-bar {
          display: none;
        }
      `}

    ${({ $variant, $token }) =>
      $variant === 'underline' &&
      css`
        .ant-tabs-ink-bar {
          height: 2px;
          background: ${$token.colorPrimary};
        }
      `}
  }
`;

const StyledBadge = styled(Badge)<{ $token: GlobalToken }>`
  .ant-badge-count {
    background: ${({ $token }) => $token.colorError};
    box-shadow: none;
    padding: 0 ${({ $token }) => $token.paddingXXS}px;
    height: ${({ $token }) => $token.controlHeightSM / 2}px;
    line-height: ${({ $token }) => $token.controlHeightSM / 2}px;
    border-radius: ${({ $token }) => $token.borderRadiusSM}px;
    font-size: ${({ $token }) => $token.fontSizeSM}px;
    font-weight: normal;
    min-width: ${({ $token }) => $token.controlHeightSM / 2}px;
  }
`;

export interface TabProps {
  /**
   * Array of tab items to display
   */
  items: {
    /** Unique identifier for the tab */
    key: string;
    /** Text label to display */
    label: string;
    /** Optional badge number to show */
    badge?: number;
  }[];
  /** Key of the currently active tab */
  activeKey: string;
  /** Callback when tab is changed */
  onChange: (key: string) => void;
  /** Visual style variant of the tabs */
  variant?: 'filled' | 'underline';
  /** Optional CSS class name */
  className?: string;
}

/**
 * Tab component for switching between different views
 * 
 * Uses Ant Design theme tokens for consistent styling:
 * - Colors: colorPrimary, colorPrimaryBg, colorBgContainer, colorError
 * - Typography: fontSize, fontSizeSM, lineHeight
 * - Spacing: paddingXS, paddingSM, paddingXXS, marginXS
 * - Layout: borderRadius, borderRadiusLG, borderRadiusSM, controlHeightSM
 * - Animation: motionDurationMid
 * 
 * @example
 * ```tsx
 * <Tab
 *   items={[
 *     { key: '1', label: 'Tab 1' },
 *     { key: '2', label: 'Tab 2', badge: 5 }
 *   ]}
 *   activeKey="1"
 *   onChange={(key) => console.log(key)}
 * />
 * ```
 */
export const Tab: React.FC<TabProps> = ({
  items,
  activeKey,
  onChange,
  variant = 'filled',
  className,
}) => {
  const { token } = theme.useToken();

  const tabItems: TabsProps['items'] = items.map(item => ({
    key: item.key,
    label: item.badge ? (
      <StyledBadge count={item.badge} size="small" $token={token}>
        {item.label}
      </StyledBadge>
    ) : (
      item.label
    ),
  }));

  return (
    <StyledTabs
      $variant={variant}
      className={className}
      activeKey={activeKey}
      onChange={onChange}
      items={tabItems}
      $token={token}
    />
  );
}; 