import React from 'react';
import { Input as AntInput } from 'antd';
import { InputProps as AntInputProps } from 'antd/lib/input';
import styled from 'styled-components';

export interface InputProps extends AntInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidthMobile?: boolean;
}

// Styled container for the input component
const InputContainer = styled.div<{ fullWidthMobile?: boolean }>`
  margin-bottom: 16px;
  width: ${props => props.fullWidthMobile ? '100%' : 'auto'};
`;

const LabelContainer = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled(AntInput)`
  // Default styling
  border-radius: 4px;
  
  // Size adjustments for mobile
  &.ant-input-lg {
    font-size: 16px;
    padding: 10px 12px;
    height: 44px;
  }
  
  &.ant-input {
    font-size: 14px;
    padding: 8px 12px;
    height: 36px;
  }
  
  &.ant-input-sm {
    font-size: 12px;
    padding: 4px 8px;
    height: 28px;
  }
  
  // Focus state
  &:focus, &:hover {
    border-color: #1890ff;
  }
  
  // Error state
  &.ant-input-status-error {
    border-color: #ff4d4f;
  }
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
`;

const HelperText = styled.div`
  color: #999;
  font-size: 12px;
  margin-top: 4px;
`;

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  helperText,
  fullWidthMobile = false,
  ...props 
}) => {
  return (
    <InputContainer fullWidthMobile={fullWidthMobile}>
      {label && (
        <LabelContainer>
          <label>{label}{props.required && <span style={{ color: '#ff4d4f' }}> *</span>}</label>
        </LabelContainer>
      )}
      <StyledInput {...props} status={error ? 'error' : ''} />
      {error && <ErrorText>{error}</ErrorText>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </InputContainer>
  );
};

export default Input;
