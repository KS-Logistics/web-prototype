import React from 'react';
import { Radio as AntRadio, theme } from 'antd';
import type { RadioProps as AntRadioProps } from 'antd';
import styled from 'styled-components';

const StyledRadio = styled(AntRadio)`
  &.ant-radio-wrapper {
    align-items: center;
    margin-right: 0;
    font-size: ${props => props.theme.antd?.token?.fontSize || '16px'};
    
    .ant-radio {
      top: 0;
      
      .ant-radio-inner {
        width: 24px;
        height: 24px;
        border-color: ${props => props.theme.antd?.token?.colorBorder || '#E5E5E5'};
        border-width: 2px;
        background: ${props => props.theme.antd?.token?.colorBgContainer || '#fff'};
        
        &::after {
          all: unset;
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 14px;
          height: 14px;
          background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.6666 3.5L5.24992 9.91667L2.33325 7' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          transform: translate(-50%, -50%) scale(0.6);
          opacity: 0;
          transition: all ${props => props.theme.antd?.token?.motionDurationMid || '0.2s'} ${props => props.theme.antd?.token?.motionEaseInOut || 'cubic-bezier(0.78, 0.14, 0.15, 0.86)'};
        }
      }
      
      &.ant-radio-checked {
        .ant-radio-inner {
          border-color: ${props => props.theme.antd?.token?.colorPrimary || '#1677FF'};
          background: ${props => props.theme.antd?.token?.colorPrimary || '#1677FF'};
          
          &::after {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      }

      &:hover {
        .ant-radio-inner {
          border-color: ${props => props.theme.antd?.token?.colorPrimaryHover || '#1677FF'};
        }
      }
    }
    
    .ant-radio-disabled {
      .ant-radio-inner {
        background-color: ${props => props.theme.antd?.token?.colorBgContainerDisabled || '#F5F5F5'};
        border-color: ${props => props.theme.antd?.token?.colorBorder || '#D9D9D9'} !important;
        
        &::after {
          opacity: 0.25;
        }
      }

      &.ant-radio-checked .ant-radio-inner {
        background-color: ${props => props.theme.antd?.token?.colorBgContainerDisabled || '#D9D9D9'};
      }
    }
    
    .ant-radio + span {
      padding-inline-start: 12px;
      padding-inline-end: 8px;
      color: ${props => props.theme.antd?.token?.colorText || 'rgba(0, 0, 0, 0.85)'};
      line-height: 24px;
    }

    &:hover {
      .ant-radio:not(.ant-radio-disabled) {
        .ant-radio-inner {
          border-color: ${props => props.theme.antd?.token?.colorPrimaryHover || '#1677FF'};
        }
      }
    }
  }
`;

export interface RadioProps extends AntRadioProps {
  /**
   * Custom class name
   */
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({ 
  className,
  children,
  ...props 
}) => {
  const { token } = theme.useToken();

  return (
    <StyledRadio
      {...props}
      className={className}
      theme={{ antd: { token } }}
    >
      {children}
    </StyledRadio>
  );
};

Radio.displayName = 'Radio';

export default Radio; 