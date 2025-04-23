import React from 'react';
import { Radio as AntRadio } from 'antd';
import type { RadioGroupProps as AntRadioGroupProps } from 'antd';
import styled from 'styled-components';

const StyledRadioGroup = styled(AntRadio.Group)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  &.ant-radio-group-vertical {
    .ant-radio-wrapper {
      margin-bottom: 0;
    }
  }

  .ant-radio-wrapper {
    margin-right: 0;
  }

  &.ant-radio-group-horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 32px;
  }
`;

export interface RadioGroupProps extends AntRadioGroupProps {
  /**
   * Custom class name
   */
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  className,
  children,
  ...props 
}) => {
  return (
    <StyledRadioGroup
      {...props}
      className={className}
    >
      {children}
    </StyledRadioGroup>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup; 