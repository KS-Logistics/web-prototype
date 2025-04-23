import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { colors } from '../../styles/theme';

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.background.light};
  border: none;
  padding: 0;
  
  &:hover {
    background: ${colors.background.hover};
  }

  .anticon {
    font-size: 20px;
    color: ${colors.text.primary};
  }
`;

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, title }) => {
  return (
    <StyledButton
      type="text"
      icon={icon}
      onClick={onClick}
      title={title}
    />
  );
};

export default IconButton; 