import React, { useState } from 'react';
import { Layout, Radio, Select, Space, Button, Typography } from 'antd';
import styled from 'styled-components';
import { colors, spacing, borderRadius, shadows } from '../styles/theme';
import GlobalHeader from '../components/layout/GlobalHeader';
import { PageBreadcrumb } from '../components/layout';

const { Title } = Typography;

const StyledLayout = styled(Layout)`
  background: ${colors.background.default};
  min-height: 100vh;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin-top: 76px;
  padding: ${spacing.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};

  .label {
    font-size: 14px;
    color: ${colors.text.primary};
    margin-bottom: ${spacing.sm};
    display: flex;
    align-items: center;

    .required {
      color: ${colors.status.error};
      margin-right: 4px;
    }
  }
`;

const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  gap: ${spacing.sm};

  .ant-radio-wrapper {
    border: 1px solid ${colors.border.light};
    padding: ${spacing.sm} ${spacing.md};
    border-radius: ${borderRadius.medium};
    margin-right: 0;

    &-checked {
      border-color: ${colors.primary};
      background: ${colors.background.blue};
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;

  .ant-select-selector {
    height: 44px !important;
    padding: ${spacing.sm} ${spacing.md} !important;
    border-radius: ${borderRadius.medium} !important;

    .ant-select-selection-search-input {
      height: 42px !important;
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
      line-height: 28px !important;
    }
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

interface ShippingRouteProps {
  onBack?: () => void;
  onNext?: (values: any) => void;
}

const ShippingRoute: React.FC<ShippingRouteProps> = ({ onBack, onNext }) => {
  const [transportType, setTransportType] = useState<'sea' | 'air'>('sea');
  const [route, setRoute] = useState<string>('中国大陆→澳大利亚');
  const [departurePort, setDeparturePort] = useState<string>();
  const [destinationPort, setDestinationPort] = useState<string>();

  const handleNext = () => {
    onNext?.({
      transportType,
      route,
      departurePort,
      destinationPort,
    });
  };

  const handleNavigate = (path: string) => {
    // Navigation logic will be added later
    console.log('Navigate to:', path);
  };

  return (
    <StyledLayout>
      <GlobalHeader onBack={() => handleNavigate('/')} />
      <ContentContainer>
        <PageBreadcrumb
          items={[
            {
              title: '海运整柜',
              onClick: () => handleNavigate('/')
            },
            {
              title: '航线选择'
            }
          ]}
        />
        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>海运/空运</span>
          </div>
          <StyledRadioGroup 
            value={transportType}
            onChange={e => setTransportType(e.target.value)}
          >
            <Radio value="sea">海运</Radio>
            <Radio value="air">空运</Radio>
          </StyledRadioGroup>
        </FormGroup>

        <FormGroup>
          <div className="label">物流线路</div>
          <StyledSelect
            value={route}
            onChange={(value) => setRoute(value as string)}
          >
            <Select.Option value="中国大陆→澳大利亚">中国大陆→澳大利亚</Select.Option>
          </StyledSelect>
        </FormGroup>

        <FormGroup>
          <div className="label">起运港</div>
          <StyledSelect
            value={departurePort}
            onChange={(value) => setDeparturePort(value as string)}
            placeholder="请选择"
          >
            <Select.Option value="port1">青岛港</Select.Option>
            <Select.Option value="port2">上海港</Select.Option>
            <Select.Option value="port3">深圳港</Select.Option>
          </StyledSelect>
        </FormGroup>

        <FormGroup>
          <div className="label">目的地港</div>
          <StyledSelect
            value={destinationPort}
            onChange={(value) => setDestinationPort(value as string)}
            placeholder="请选择"
          >
            <Select.Option value="port1">悉尼港</Select.Option>
            <Select.Option value="port2">墨尔本港</Select.Option>
            <Select.Option value="port3">布里斯班港</Select.Option>
          </StyledSelect>
        </FormGroup>
      </ContentContainer>

      <BottomButtons>
        <Button onClick={onBack}>上一步</Button>
        <Button type="primary" onClick={handleNext}>下一步</Button>
      </BottomButtons>
    </StyledLayout>
  );
};

export default ShippingRoute; 