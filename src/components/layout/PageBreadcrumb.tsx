import React from 'react';
import { Breadcrumb } from 'antd';
import styled from 'styled-components';
import { colors, spacing } from '../../styles/theme';

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-bottom: ${spacing.lg};
  
  .ant-breadcrumb-link {
    font-size: 14px;
    color: ${colors.text.secondary};
    
    &.current {
      color: ${colors.text.primary};
    }
  }
`;

interface PageBreadcrumbProps {
  items: {
    title: string;
    onClick?: () => void;
  }[];
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ items }) => {
  return (
    <StyledBreadcrumb>
      {items.map((item, index) => (
        <Breadcrumb.Item 
          key={index}
          onClick={item.onClick}
          className={index === items.length - 1 ? 'current' : ''}
        >
          {item.title}
        </Breadcrumb.Item>
      ))}
    </StyledBreadcrumb>
  );
};

export default PageBreadcrumb; 