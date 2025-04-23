import React, { useState } from 'react';
import { Layout, Input, Button, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { colors, spacing, borderRadius } from '../styles/theme';
import GlobalHeader from '../components/layout/GlobalHeader';

const { Search } = Input;

const StyledLayout = styled(Layout)`
  background: ${colors.background.default};
  min-height: 100vh;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin-top: 76px;
  padding: ${spacing.md};
  padding-bottom: 120px;
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  margin-bottom: ${spacing.lg};
  font-size: 14px;
  color: ${colors.text.secondary};

  .current {
    color: ${colors.text.primary};
  }
`;

const SearchContainer = styled.div`
  margin-bottom: ${spacing.md};

  .ant-input-affix-wrapper {
    background: #F5F5F5;
    border: none;
    border-radius: ${borderRadius.medium};
    padding: ${spacing.sm} ${spacing.md};

    &:hover, &:focus, &-focused {
      background: #F5F5F5;
    }

    .anticon {
      color: ${colors.text.secondary};
      margin-right: ${spacing.sm};
    }

    input.ant-input {
      background: transparent;
      font-size: 14px;

      &::placeholder {
        color: ${colors.text.secondary};
      }
    }
  }
`;

const FilterTags = styled.div`
  display: flex;
  gap: ${spacing.xs};
  margin-bottom: ${spacing.md};
  overflow-x: auto;
  padding-bottom: ${spacing.xs};
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterTag = styled(Button)<{ $active?: boolean }>`
  flex-shrink: 0;
  border-radius: 16px;
  height: 32px;
  padding: 0 ${spacing.md};
  background: ${props => props.$active ? colors.primary : 'white'};
  color: ${props => props.$active ? 'white' : colors.text.secondary};
  border: 1px solid ${props => props.$active ? colors.primary : colors.border.light};

  &:hover {
    color: ${props => props.$active ? 'white' : colors.primary} !important;
    border-color: ${colors.primary} !important;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

const ListItem = styled.div<{ $selected?: boolean }>`
  background: ${props => props.$selected ? 'white' : '#F5F5F5'};
  border-radius: ${borderRadius.medium};
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  border: 1px solid ${props => props.$selected ? colors.primary : 'transparent'};
  transition: all 0.2s ease;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemInfo = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

  .booking-number {
    font-size: 14px;
    color: ${props => props.$selected ? colors.primary : colors.text.primary};
  }
`;

const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .description {
    font-size: 14px;
    color: ${colors.text.secondary};
  }
`;

const ViewDetailsButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: ${colors.text.secondary};
  padding: ${spacing.xs} ${spacing.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: ${borderRadius.small};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const StatusBadge = styled.div<{ $status: 'success' | 'warning' | 'error' }>`
  padding: 4px 8px;
  border-radius: ${borderRadius.small};
  font-size: 12px;
  background: ${props => {
    switch (props.$status) {
      case 'success':
        return '#E6F7FF';
      case 'warning':
        return '#FFF7E6';
      case 'error':
        return '#FFF1F0';
      default:
        return '#E6F7FF';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'success':
        return '#1890FF';
      case 'warning':
        return '#FA8C16';
      case 'error':
        return '#F5222D';
      default:
        return '#1890FF';
    }
  }};
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.md};
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  border-top: 1px solid ${colors.border.light};

  .select-all {
    flex: 1;
    display: flex;
    align-items: center;
    gap: ${spacing.xs};
  }

  .total {
    flex: 1;
    font-size: 14px;
    color: ${colors.text.secondary};
  }

  .ant-btn {
    height: 44px;
    border-radius: ${borderRadius.medium};
    padding: 0 ${spacing.xl};
  }
`;

interface SpecialHandlingProps {
  onBack?: () => void;
}

const SpecialHandling: React.FC<SpecialHandlingProps> = ({ onBack }) => {
  const [selectedFilter, setSelectedFilter] = useState('待处理');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filters = ['待处理', '打印中', '待支付', '待发货', '运输中', '待提取'];

  const mockData = [
    {
      bookingNumber: 'AU4363',
      description: '普货 | 40尺标准柜 | 深圳仓 A12-B05',
      status: 'success' as const,
      statusText: '信息完全',
    },
    {
      bookingNumber: 'AU4363',
      description: '危险品 | 20尺高柜 | 等待危险品证书',
      status: 'warning' as const,
      statusText: '信息缺失',
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedItems(checked ? mockData.map((_, index) => index) : []);
  };

  const handleSelectItem = (index: number) => {
    setSelectedItems(prev => {
      const newSelected = prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index];
      setSelectAll(newSelected.length === mockData.length);
      return newSelected;
    });
  };

  return (
    <StyledLayout>
      <GlobalHeader />
      <ContentContainer>
        <Breadcrumb>
          <span>首页</span>
          <span>{'>'}</span>
          <span className="current">特处理</span>
        </Breadcrumb>

        <SearchContainer>
          <Input
            placeholder="集运单查询"
            prefix={<SearchOutlined style={{ fontSize: 16 }} />}
            allowClear
          />
        </SearchContainer>

        <FilterTags>
          {filters.map(filter => (
            <FilterTag
              key={filter}
              $active={selectedFilter === filter}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </FilterTag>
          ))}
        </FilterTags>

        <ListContainer>
          {mockData.map((item, index) => (
            <ListItem 
              key={index} 
              $selected={selectedItems.includes(index)}
              onClick={() => handleSelectItem(index)}
            >
              <ItemHeader>
                <ItemInfo $selected={selectedItems.includes(index)}>
                  <Checkbox
                    checked={selectedItems.includes(index)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectItem(index);
                    }}
                  />
                  <div className="booking-number">哨头号：{item.bookingNumber}</div>
                </ItemInfo>
                <StatusBadge $status={item.status}>
                  {item.statusText}
                </StatusBadge>
              </ItemHeader>
              <ItemFooter>
                <div className="description">{item.description}</div>
                <ViewDetailsButton onClick={(e) => e.stopPropagation()}>
                  查看详情
                </ViewDetailsButton>
              </ItemFooter>
            </ListItem>
          ))}
        </ListContainer>

        <BottomBar>
          <div className="select-all">
            <Checkbox
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <span>全选</span>
          </div>
          <div className="total">已选 {selectedItems.length}</div>
          <Button type="primary">结算</Button>
        </BottomBar>
      </ContentContainer>
    </StyledLayout>
  );
};

export default SpecialHandling; 