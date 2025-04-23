import React from 'react';
import { Typography, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { colors, spacing } from '../../styles/theme';
import LogoIcon from '../icons/LogoIcon';

const { Title } = Typography;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: ${colors.background.default};
`;

const StatusBar = styled.div`
  height: 24px;
  background: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${spacing.md};
  font-size: 12px;
  color: white;
`;

const Header = styled.div`
  height: 52px;
  padding: ${spacing.sm} ${spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.border.light};
  background: white;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

  .back-button {
    font-size: 20px;
    color: ${colors.text.primary};
    cursor: pointer;
  }
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

  .language-select {
    font-size: 14px;
    color: ${colors.text.primary};
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }
`;

interface GlobalHeaderProps {
  title?: string;
  onBack?: () => void;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ title, onBack }) => {
  return (
    <HeaderContainer>
      <StatusBar>
        <span>12:09</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>􀙇</span>
          <span>􀙈</span>
          <span>24%</span>
        </div>
      </StatusBar>
      <Header>
        <LeftSection>
          {onBack && <LeftOutlined className="back-button" onClick={onBack} />}
        </LeftSection>
        <CenterSection>
          <LogoIcon className="logo" />
        </CenterSection>
        <RightSection>
          <button className="language-select">中 (簡)</button>
        </RightSection>
      </Header>
    </HeaderContainer>
  );
};

export default GlobalHeader; 