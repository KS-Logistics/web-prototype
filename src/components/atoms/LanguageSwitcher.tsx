import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SwitcherContainer = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  display: flex;
  gap: 8px;
`;

const LanguageButton = styled(Button)<{ $isActive: boolean }>`
  min-width: 40px;
  opacity: ${props => props.$isActive ? 1 : 0.6};
`;

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer>
      <LanguageButton
        type={i18n.language === 'en' ? 'primary' : 'default'}
        $isActive={i18n.language === 'en'}
        onClick={() => changeLanguage('en')}
      >
        EN
      </LanguageButton>
      <LanguageButton
        type={i18n.language === 'zh' ? 'primary' : 'default'}
        $isActive={i18n.language === 'zh'}
        onClick={() => changeLanguage('zh')}
      >
        中
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher; 