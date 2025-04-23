import React, { useState } from 'react';
import { Layout, Button, Typography, Modal } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import GlobalHeader from '../components/layout/GlobalHeader';
import { PageBreadcrumb } from '../components/layout';

const { Text } = Typography;

const StyledLayout = styled(Layout)`
  background: ${colors.background.default};
  min-height: 100vh;
  width: 100%;
`;

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

  .back-button {
    font-size: 20px;
    color: ${colors.text.primary};
    cursor: pointer;
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    color: ${colors.text.primary};
    margin: 0;
  }

  .right-space {
    width: 20px;
  }
`;

const ContentContainer = styled.div`
  margin-top: 76px;
  padding: ${spacing.md};
  padding-bottom: 120px;
`;

const SummarySection = styled.div`
  background: ${colors.background.light};
  border-radius: ${borderRadius.medium};
  padding: ${spacing.md};
  margin-bottom: ${spacing.lg};

  .section-title {
    font-size: 16px;
    font-weight: 500;
    color: ${colors.text.primary};
    margin-bottom: ${spacing.md};
  }
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${spacing.sm};
  font-size: 14px;

  .label {
    color: ${colors.text.secondary};
  }

  .value {
    color: ${colors.text.primary};
    text-align: right;
  }
`;

const CargoCard = styled.div`
  background: white;
  border-radius: ${borderRadius.medium};
  padding: ${spacing.md};
  margin-bottom: ${spacing.md};

  .card-title {
    font-size: 14px;
    font-weight: 500;
    color: ${colors.text.primary};
    margin-bottom: ${spacing.md};
  }
`;

const BottomButtons = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.md};
  background: white;
  box-shadow: ${shadows.medium};
  display: flex;
  gap: ${spacing.md};

  .ant-btn {
    flex: 1;
    height: 44px;
    font-size: 16px;
    border-radius: ${borderRadius.medium};
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: ${borderRadius.medium};
    padding: 0;
  }

  .ant-modal-body {
    padding: ${spacing.xl} ${spacing.lg};
    text-align: center;
  }

  .ant-modal-footer {
    padding: ${spacing.md};
    display: flex;
    gap: ${spacing.md};
    border-top: none;

    .ant-btn {
      flex: 1;
      height: 44px;
      font-size: 16px;
      border-radius: ${borderRadius.medium};
      margin: 0;
    }
  }

  .modal-icon {
    color: ${colors.primary};
    font-size: 24px;
    margin-bottom: ${spacing.md};
  }

  .modal-text {
    font-size: 16px;
    color: ${colors.text.primary};
    margin: 0;
  }
`;

interface OrderSummaryProps {
  onBack?: () => void;
  onNext?: () => void;
  data?: {
    basicInfo: {
      transportType: string;
      route: string;
      departurePort: string;
      destinationPort: string;
    };
    cargoInfo: {
      containerType: string;
      cargoType: string;
      weight: string;
      dimensions: string;
      hasWarehouse: boolean;
      warehouseAddress?: string;
      contact?: string;
      phone?: string;
    }[];
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onBack, onNext, data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const defaultData = {
    basicInfo: {
      transportType: '海运',
      route: '中国大陆→澳大利亚',
      departurePort: '连云港',
      destinationPort: '悉尼',
    },
    cargoInfo: [
      {
        containerType: '整柜',
        cargoType: '普通货物',
        weight: '1000',
        dimensions: '20',
        hasWarehouse: true,
        warehouseAddress: '上海市浦东新区XX路XX号',
        contact: '张三',
        phone: '+86 13800138000',
      },
    ],
  };

  const summaryData = data || defaultData;

  const handleNextClick = () => {
    setIsModalVisible(true);
  };

  const handleModalConfirm = () => {
    setIsModalVisible(false);
    onNext?.();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleNavigate = (path: string) => {
    // Navigation logic will be added later
    console.log('Navigate to:', path);
  };

  return (
    <StyledLayout>
      <GlobalHeader onBack={() => handleNavigate('/cargo-details')} />
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
              title: '订单确认'
            }
          ]}
        />
        <SummarySection>
          <div className="section-title">基本委托信息</div>
          <DetailItem>
            <span className="label">运输方式：</span>
            <span className="value">{summaryData.basicInfo.transportType}</span>
          </DetailItem>
          <DetailItem>
            <span className="label">物流线路：</span>
            <span className="value">{summaryData.basicInfo.route}</span>
          </DetailItem>
          <DetailItem>
            <span className="label">起运港：</span>
            <span className="value">{summaryData.basicInfo.departurePort}</span>
          </DetailItem>
          <DetailItem>
            <span className="label">目的地港：</span>
            <span className="value">{summaryData.basicInfo.destinationPort}</span>
          </DetailItem>
        </SummarySection>

        <SummarySection>
          <div className="section-title">商品信息</div>
          {summaryData.cargoInfo.map((cargo, index) => (
            <CargoCard key={index}>
              <div className="card-title">货柜 {index + 1}</div>
              <DetailItem>
                <span className="label">柜型选择</span>
                <span className="value">{cargo.containerType}</span>
              </DetailItem>
              <DetailItem>
                <span className="label">货物类型</span>
                <span className="value">{cargo.cargoType}</span>
              </DetailItem>
              <DetailItem>
                <span className="label">货物总重量(kg)</span>
                <span className="value">{cargo.weight}</span>
              </DetailItem>
              <DetailItem>
                <span className="label">货物总尺寸(cbm)</span>
                <span className="value">{cargo.dimensions}</span>
              </DetailItem>
              {cargo.hasWarehouse && (
                <>
                  <DetailItem>
                    <span className="label">上门装柜：</span>
                    <span className="value">是</span>
                  </DetailItem>
                  <DetailItem>
                    <span className="label">装柜地址：</span>
                    <span className="value">{cargo.warehouseAddress}</span>
                  </DetailItem>
                  <DetailItem>
                    <span className="label">联系人</span>
                    <span className="value">{cargo.contact}</span>
                  </DetailItem>
                  <DetailItem>
                    <span className="label">联系人电话</span>
                    <span className="value">{cargo.phone}</span>
                  </DetailItem>
                </>
              )}
            </CargoCard>
          ))}
        </SummarySection>
      </ContentContainer>

      <BottomButtons>
        <Button onClick={onBack}>上一步</Button>
        <Button type="primary" onClick={handleNextClick}>下一步</Button>
      </BottomButtons>

      <StyledModal
        visible={isModalVisible}
        onOk={handleModalConfirm}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>否</Button>,
          <Button key="confirm" type="primary" onClick={handleModalConfirm}>是</Button>,
        ]}
        centered
        closable={false}
        width={320}
      >
        <InfoCircleOutlined className="modal-icon" />
        <p className="modal-text">即将创建订舱头号，是否确认？</p>
      </StyledModal>
    </StyledLayout>
  );
};

export default OrderSummary; 