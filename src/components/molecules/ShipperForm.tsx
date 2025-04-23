import React from 'react';
import styled from 'styled-components';
import { Form, Input, Radio, Select, DatePicker } from 'antd';
import { colors, spacing } from '../../styles/theme';
import type { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';

const StyledForm = styled(Form)`
  .ant-form-item-label {
    label {
      color: ${colors.text.secondary};
      &::before {
        color: #ff4d4f !important;
      }
    }
  }

  .ant-radio-wrapper {
    color: ${colors.text.primary};
  }

  .ant-input,
  .ant-select-selector,
  .ant-picker {
    border-radius: 4px;
    &:hover, &:focus {
      border-color: ${colors.primary};
    }
  }

  .phone-prefix {
    width: 80px;
  }

  .phone-number {
    width: calc(100% - 80px);
  }
`;

const PhoneGroup = styled.div`
  display: flex;
  gap: ${spacing.xs};
`;

interface ShipperFormProps {
  form: FormInstance;
  initialValues?: {
    shipperType: 'company' | 'individual';
    companyName?: string;
    country?: string;
    city?: string;
    abn?: string;
    contactName?: string;
    countryCode?: string;
    phone?: string;
    address?: string;
    email?: string;
    expectedShipDate?: string;
  };
}

const ShipperForm: React.FC<ShipperFormProps> = ({ form, initialValues }) => {
  React.useEffect(() => {
    if (initialValues) {
      // Convert date string to dayjs object for DatePicker
      const formattedValues = {
        ...initialValues,
        expectedShipDate: initialValues.expectedShipDate ? dayjs(initialValues.expectedShipDate) : undefined,
      };
      form.setFieldsValue(formattedValues);
    }
  }, [form, initialValues]);

  return (
    <StyledForm
      form={form}
      layout="vertical"
      initialValues={{
        shipperType: 'company',
        countryCode: '+61',
        ...initialValues,
      }}
    >
      <Form.Item
        name="shipperType"
        label="发货方类型"
        rules={[{ required: true, message: '请选择发货方类型' }]}
      >
        <Radio.Group>
          <Radio value="company">公司</Radio>
          <Radio value="individual">个人</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.shipperType !== currentValues.shipperType}
      >
        {({ getFieldValue }) => 
          getFieldValue('shipperType') === 'company' && (
            <>
              <Form.Item
                name="companyName"
                label="公司名"
                rules={[{ required: true, message: '请输入公司名' }]}
              >
                <Input placeholder="公司名" />
              </Form.Item>

              <Form.Item
                name="abn"
                label="公司ABN或税号"
                rules={[{ required: true, message: '请输入公司ABN或税号' }]}
              >
                <Input placeholder="公司ABN" />
              </Form.Item>
            </>
          )
        }
      </Form.Item>

      <Form.Item
        name="country"
        label="国家"
        rules={[{ required: true, message: '请选择国家' }]}
      >
        <Select placeholder="请选择">
          <Select.Option value="澳大利亚">澳大利亚</Select.Option>
          <Select.Option value="中国">中国</Select.Option>
          <Select.Option value="新西兰">新西兰</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="city"
        label="城市"
        rules={[{ required: true, message: '请选择城市' }]}
      >
        <Select placeholder="请选择">
          <Select.Option value="悉尼">悉尼</Select.Option>
          <Select.Option value="墨尔本">墨尔本</Select.Option>
          <Select.Option value="布里斯班">布里斯班</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="contactName"
        label="联系人姓名"
        rules={[{ required: true, message: '请输入联系人姓名' }]}
      >
        <Input placeholder="联系人姓名" />
      </Form.Item>

      <Form.Item
        label="联系人电话"
        required
      >
        <PhoneGroup>
          <Form.Item
            name="countryCode"
            noStyle
          >
            <Select className="phone-prefix">
              <Select.Option value="+61">+61</Select.Option>
              <Select.Option value="+86">+86</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="phone"
            noStyle
            rules={[{ required: true, message: '请输入联系人电话' }]}
          >
            <Input className="phone-number" placeholder="电话" />
          </Form.Item>
        </PhoneGroup>
      </Form.Item>

      <Form.Item
        name="address"
        label="联系人地址"
        rules={[{ required: true, message: '请输入联系人地址' }]}
      >
        <Input placeholder="发货人地址" />
      </Form.Item>

      <Form.Item
        name="email"
        label="联系人邮箱"
        rules={[
          { required: true, message: '请输入联系人邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input placeholder="发货人邮箱" />
      </Form.Item>

      <Form.Item
        name="expectedShipDate"
        label="期望出货日期"
        rules={[{ required: true, message: '请选择期望出货日期' }]}
      >
        <DatePicker style={{ width: '100%' }} placeholder="选择日期" />
      </Form.Item>
    </StyledForm>
  );
};

export default ShipperForm; 