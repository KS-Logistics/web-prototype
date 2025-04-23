import React from 'react';
import { Layout, Input, Select, Button, Typography } from 'antd';
import styled from 'styled-components';
import { colors, spacing, borderRadius } from '../styles/theme';
import GlobalHeader from '../components/layout/GlobalHeader';
import { PageBreadcrumb } from '../components/layout';

const { TextArea } = Input;

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

const FormGroup = styled.div`
  margin-bottom: ${spacing.lg};

  .label {
    display: flex;
    align-items: center;
    margin-bottom: ${spacing.xs};
    
    .required {
      color: ${colors.status.error};
      margin-right: 4px;
    }

    .translate {
      margin-left: auto;
      color: ${colors.primary};
      font-size: 12px;
    }
  }

  .hint {
    font-size: 12px;
    color: ${colors.text.secondary};
    margin-top: ${spacing.xs};
  }
`;

const StyledInput = styled(Input)`
  height: 44px;
  border-radius: ${borderRadius.medium};
`;

const StyledSelect = styled(Select)`
  width: 100%;
  
  .ant-select-selector {
    height: 44px !important;
    padding: 6px 12px !important;
    border-radius: ${borderRadius.medium} !important;
  }
`;

const CurrencyInput = styled.div`
  display: flex;
  gap: ${spacing.sm};

  .currency-select {
    width: 80px;
  }

  .value-input {
    flex: 1;
  }
`;

const BottomButtons = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${spacing.md};
  background: white;
  display: flex;
  gap: ${spacing.md};
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);

  .ant-btn {
    flex: 1;
    height: 44px;
    border-radius: ${borderRadius.medium};
  }
`;

interface CargoInputProps {
  bookingNumber?: string;
  onCancel?: () => void;
  onSave?: (values: any) => void;
}

const CargoInput: React.FC<CargoInputProps> = ({
  bookingNumber = 'AU4383',
  onCancel,
  onSave,
}) => {
  const handleNavigate = (path: string) => {
    // Navigation logic will be added later
    console.log('Navigate to:', path);
  };

  return (
    <StyledLayout>
      <GlobalHeader onBack={() => handleNavigate('/booking-success')} />
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
              title: '哨头号创建成功',
              onClick: () => handleNavigate('/booking-success')
            },
            {
              title: '录入商品信息'
            }
          ]}
        />

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>中文品名</span>
            <span className="translate">英译中</span>
          </div>
          <StyledInput placeholder="中文品名" />
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>英文品名</span>
            <span className="translate">中译英</span>
          </div>
          <StyledInput placeholder="英文品名" />
          <div className="hint">中英文译转仅一次建议，仅供参考，最终翻译人工审核。</div>
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>商品材质</span>
          </div>
          <StyledSelect placeholder="商品材质" />
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>商品套数</span>
          </div>
          <StyledInput placeholder="商品套数" />
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>箱数</span>
          </div>
          <StyledInput placeholder="箱数" />
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>重量(kg)</span>
          </div>
          <StyledInput placeholder="重量" />
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>体积(cbm)</span>
          </div>
          <StyledSelect placeholder="体积" />
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>单价</span>
          </div>
          <CurrencyInput>
            <Select defaultValue="AUD" className="currency-select" />
            <StyledInput placeholder="单价" className="value-input" />
          </CurrencyInput>
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span className="required">*</span>
            <span>货值</span>
          </div>
          <CurrencyInput>
            <Select defaultValue="AUD" className="currency-select" />
            <StyledInput placeholder="货值" className="value-input" />
          </CurrencyInput>
        </FormGroup>

        <FormGroup>
          <div className="label">
            <span>备注</span>
          </div>
          <TextArea rows={4} placeholder="备注" />
        </FormGroup>

        <BottomButtons>
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" onClick={onSave}>保存</Button>
        </BottomButtons>
      </ContentContainer>
    </StyledLayout>
  );
};

export default CargoInput; 