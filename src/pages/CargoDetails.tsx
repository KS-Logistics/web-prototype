import React, { useState } from 'react';
import { Layout, Radio, Select, Input, Checkbox, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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

const FormGroup = styled.div<{ noMargin?: boolean }>`
  margin-bottom: ${props => props.noMargin ? '0' : spacing.lg};

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

const StyledInput = styled(Input)`
  height: 44px;
  border-radius: ${borderRadius.medium};
  padding: ${spacing.sm} ${spacing.md};

  &::placeholder {
    color: ${colors.text.light};
  }
`;

const CurrencyInput = styled.div`
  display: flex;
  gap: ${spacing.sm};

  .currency-select {
    width: 100px;
  }

  .value-input {
    flex: 1;
  }
`;

const AddressSection = styled.div`
  margin-top: ${spacing.xl};
  padding-top: ${spacing.lg};
  border-top: 1px solid ${colors.border.light};
`;

const AddButton = styled(Button)`
  width: 100%;
  height: 44px;
  margin-top: ${spacing.md};
  border-radius: ${borderRadius.medium};
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

interface CargoDetailsProps {
  onBack?: () => void;
  onNext?: (values: any) => void;
}

const CargoDetails: React.FC<CargoDetailsProps> = ({ onBack, onNext }) => {
  const [containerType, setContainerType] = useState<'whole' | 'part'>('whole');
  const [cargoType, setCargoType] = useState<string>();
  const [cargoWeight, setCargoWeight] = useState<string>();
  const [cargoDimensions, setCargoDimensions] = useState<string>();
  const [totalQuantity, setTotalQuantity] = useState<string>();
  const [totalValue, setTotalValue] = useState<string>();
  const [currency, setCurrency] = useState<string>('AUD');
  const [needsWarehouse, setNeedsWarehouse] = useState<boolean>(false);
  const [warehouseAddress, setWarehouseAddress] = useState<string>();
  const [contactName, setContactName] = useState<string>();
  const [contactPhone, setContactPhone] = useState<string>();
  const [phonePrefix, setPhonePrefix] = useState<string>('+86');

  const handleNext = () => {
    onNext?.({
      containerType,
      cargoType,
      cargoWeight,
      cargoDimensions,
      totalQuantity,
      totalValue,
      currency,
      needsWarehouse,
      warehouseAddress,
      contactName,
      contactPhone,
      phonePrefix,
    });
  };

  const handleNavigate = (path: string) => {
    // Navigation logic will be added later
    console.log('Navigate to:', path);
  };

  return (
    <StyledLayout>
      <GlobalHeader onBack={() => handleNavigate('/shipping-route')} />
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
              title: '货物信息'
            }
          ]}
        />
        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>整柜/拼柜</span>
          </div>
          <StyledRadioGroup 
            value={containerType}
            onChange={e => setContainerType(e.target.value)}
          >
            <Radio value="whole">整柜</Radio>
            <Radio value="part">拼柜</Radio>
          </StyledRadioGroup>
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>柜型选择</span>
          </div>
          <StyledSelect
            value={cargoType}
            onChange={(value) => setCargoType(value as string)}
            placeholder="请选择"
          >
            <Select.Option value="type1">20尺标准柜</Select.Option>
            <Select.Option value="type2">40尺标准柜</Select.Option>
            <Select.Option value="type3">40尺高柜</Select.Option>
          </StyledSelect>
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>货物类型</span>
          </div>
          <StyledSelect
            value={cargoType}
            onChange={(value) => setCargoType(value as string)}
            placeholder="请选择"
          >
            <Select.Option value="type1">普通货物</Select.Option>
            <Select.Option value="type2">危险品</Select.Option>
            <Select.Option value="type3">冷藏货物</Select.Option>
          </StyledSelect>
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>货物总重量(kg)</span>
          </div>
          <StyledInput
            value={cargoWeight}
            onChange={e => setCargoWeight(e.target.value)}
            placeholder="货物总重量"
          />
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>货物总尺寸(cbm)</span>
          </div>
          <StyledInput
            value={cargoDimensions}
            onChange={e => setCargoDimensions(e.target.value)}
            placeholder="货物总尺寸"
          />
        </FormGroup>

        <FormGroup>
          <div className="label">总箱数</div>
          <StyledInput
            value={totalQuantity}
            onChange={e => setTotalQuantity(e.target.value)}
            placeholder="总箱数"
          />
        </FormGroup>

        <FormGroup>
          <div className="label">总货值</div>
          <CurrencyInput>
            <StyledSelect
              className="currency-select"
              value={currency}
              onChange={(value) => setCurrency(value as string)}
            >
              <Select.Option value="AUD">AUD</Select.Option>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="CNY">CNY</Select.Option>
            </StyledSelect>
            <StyledInput
              className="value-input"
              value={totalValue}
              onChange={e => setTotalValue(e.target.value)}
              placeholder="总货值"
            />
          </CurrencyInput>
        </FormGroup>

        <FormGroup noMargin>
          <Checkbox
            checked={needsWarehouse}
            onChange={e => setNeedsWarehouse(e.target.checked)}
          >
            上门装柜(可选填)
          </Checkbox>
        </FormGroup>

        {needsWarehouse && (
          <AddressSection>
            <FormGroup>
              <div className="label">
                <span className="required">*</span>
                <span>装柜地址</span>
              </div>
              <StyledInput
                value={warehouseAddress}
                onChange={e => setWarehouseAddress(e.target.value)}
                placeholder="装柜地址"
              />
            </FormGroup>

            <FormGroup>
              <div className="label">
                <span className="required">*</span>
                <span>联系人</span>
              </div>
              <StyledInput
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder="联系人姓名"
              />
            </FormGroup>

            <FormGroup>
              <div className="label">
                <span className="required">*</span>
                <span>联系人电话</span>
              </div>
              <CurrencyInput>
                <StyledSelect
                  className="currency-select"
                  value={phonePrefix}
                  onChange={(value) => setPhonePrefix(value as string)}
                >
                  <Select.Option value="+86">+86</Select.Option>
                  <Select.Option value="+61">+61</Select.Option>
                </StyledSelect>
                <StyledInput
                  className="value-input"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  placeholder="电话"
                />
              </CurrencyInput>
            </FormGroup>

            <AddButton icon={<PlusOutlined />}>
              添加装柜
            </AddButton>
          </AddressSection>
        )}
      </ContentContainer>

      <BottomButtons>
        <Button onClick={onBack}>上一步</Button>
        <Button type="primary" onClick={handleNext}>下一步</Button>
      </BottomButtons>
    </StyledLayout>
  );
};

export default CargoDetails; 