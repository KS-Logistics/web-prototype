import React from 'react';
import { Layout, Button, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { colors, spacing, borderRadius } from '../styles/theme';
import GlobalHeader from '../components/layout/GlobalHeader';
import { PageBreadcrumb } from '../components/layout';

const { Text } = Typography;

const StyledLayout = styled(Layout)`
  background: ${colors.background.default};
  min-height: 100vh;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin-top: 76px;
  padding: ${spacing.md};
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.text.primary};
  margin-bottom: ${spacing.lg};
  text-align: center;
`;

const InfoCard = styled.div`
  background: white;
  border-radius: ${borderRadius.medium};
  padding: ${spacing.md};
  margin-bottom: ${spacing.lg};
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.sm} 0;
  border-bottom: 1px solid ${colors.border.light};

  &:last-child {
    border-bottom: none;
  }

  .label {
    color: ${colors.text.secondary};
    font-size: 14px;
  }

  .value {
    color: ${colors.text.primary};
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: ${spacing.xs};
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: ${colors.text.secondary};
  text-align: center;
  margin: ${spacing.lg} 0;
  line-height: 1.5;
`;

const DownloadButton = styled(Button)`
  width: 100%;
  height: 44px;
  margin-bottom: ${spacing.lg};
  border-radius: ${borderRadius.medium};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing.md};
  margin-top: ${spacing.xl};

  .ant-btn {
    flex: 1;
    height: 44px;
    border-radius: ${borderRadius.medium};
  }
`;

interface BookingSuccessProps {
  bookingData?: {
    bookingNumber: string;
    origin: string;
    departure: string;
    destination: string;
    warehouseAddress: string;
  };
  onEdit?: () => void;
  onNext?: () => void;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({
  bookingData = {
    bookingNumber: 'UE-006-2024',
    origin: '中国-郑州',
    departure: '中国-广州',
    destination: '澳大利亚-悉尼',
    warehouseAddress: '澳大利亚-悉尼',
  },
  onEdit,
  onNext,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(bookingData.bookingNumber);
  };

  const handleNavigate = (path: string) => {
    // Navigation logic will be added later
    console.log('Navigate to:', path);
  };

  return (
    <StyledLayout>
      <GlobalHeader />
      <ContentContainer>
        <PageBreadcrumb
          items={[
            {
              title: '海运整柜',
              onClick: () => handleNavigate('/')
            },
            {
              title: '航线选择',
              onClick: () => handleNavigate('/shipping-route')
            },
            {
              title: '货物信息',
              onClick: () => handleNavigate('/cargo-details')
            },
            {
              title: '订单确认',
              onClick: () => handleNavigate('/order-summary')
            },
            {
              title: '哨头号创建成功'
            }
          ]}
        />
        <Title>哨头号创建成功</Title>

        <InfoCard>
          <InfoRow>
            <span className="label">哨头号</span>
            <div className="value">
              {bookingData.bookingNumber}
              <CopyOutlined onClick={handleCopy} style={{ cursor: 'pointer' }} />
            </div>
          </InfoRow>
          <InfoRow>
            <span className="label">出货地</span>
            <span className="value">{bookingData.origin}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">起运港</span>
            <span className="value">{bookingData.departure}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">目的地</span>
            <span className="value">{bookingData.destination}</span>
          </InfoRow>
          <InfoRow>
            <span className="label">集运仓地址</span>
            <span className="value">{bookingData.warehouseAddress}</span>
          </InfoRow>
        </InfoCard>

        <Message>
          请务必下载哨头面单，打印并贴贴于每件货物外箱。如缺失面单，将无法送进入库。
        </Message>

        <DownloadButton type="primary">下载哨头面单</DownloadButton>

        <ButtonGroup>
          <Button onClick={onEdit}>稍后录入</Button>
          <Button type="primary" onClick={onNext}>立即录入</Button>
        </ButtonGroup>
      </ContentContainer>
    </StyledLayout>
  );
};

export default BookingSuccess; 