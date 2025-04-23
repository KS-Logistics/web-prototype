import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Space, Divider } from 'antd';
import { theme } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';
import type { Address } from '../AddressBook/AddressBook';
import { translations } from './locales';
import { AddressAutoComplete, AddressDetails } from './AddressAutoComplete';

const StyledForm = styled(Form)<{ $token: GlobalToken }>`
  .ant-form-item {
    margin-bottom: ${({ $token }) => $token.marginLG}px;
  }

  .ant-input,
  .ant-select-selector {
    border-radius: ${({ $token }) => $token.borderRadiusLG}px;
    padding: ${({ $token }) => $token.paddingContentVertical}px ${({ $token }) => $token.paddingContentHorizontal}px;
    height: auto;
    min-height: 44px; // Touch-friendly height
  }

  .ant-select-selector {
    .ant-select-selection-search-input {
      height: auto;
    }
  }

  .ant-input-group-addon {
    border-radius: ${({ $token }) => $token.borderRadiusLG}px;
  }

  .ant-form-item-label {
    padding-bottom: ${({ $token }) => $token.padding / 2}px;
    
    > label {
      font-size: ${({ $token }) => $token.fontSize}px;
      height: auto;
    }
  }

  @media (hover: none) {
    .ant-input,
    .ant-select-selector {
      font-size: 16px; // Prevent iOS zoom on focus
    }
  }
`;

const ButtonGroup = styled(Space)<{ $token: GlobalToken }>`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ $token }) => $token.marginXL}px;
  gap: ${({ $token }) => $token.marginSM}px;

  .ant-btn {
    min-height: 44px;
    padding: ${({ $token }) => $token.paddingContentVertical}px ${({ $token }) => $token.paddingContentHorizontal * 1.5}px;
    font-size: ${({ $token }) => $token.fontSize}px;
    border-radius: ${({ $token }) => $token.borderRadiusLG}px;
  }
`;

export interface AddressFormProps {
  /**
   * Initial address data for editing, omit for new address
   */
  initialValues?: Partial<Address>;
  /**
   * Callback when form is submitted with valid data
   */
  onSubmit: (values: Address) => void;
  /**
   * Callback when cancel button is clicked
   */
  onCancel: () => void;
  /**
   * Whether the form is in submitting state
   */
  isSubmitting?: boolean;
  /**
   * Optional CSS class name
   */
  className?: string;
  /**
   * Language code for the form ('en' or 'zh')
   */
  lang?: 'en' | 'zh';
  /**
   * API keys for map services
   */
  apiKeys?: {
    amap?: string;
    google?: string;
  };
}

const StyledFormWithGeneric = styled(Form<Address>)<{ $token: GlobalToken }>`
  ${StyledForm}
`;

/**
 * AddressForm component for creating or editing addresses.
 * Follows Universal Postal Union (UPU) standards for address fields.
 * Supports English and Chinese languages.
 * Includes address autocompletion using AMap or Google Places.
 *
 * @example
 * ```tsx
 * <AddressForm
 *   initialValues={{
 *     name: 'Li Hua',
 *     phone: '0411234567',
 *     addressLine2: '100 Pitt St',
 *     locality: 'Sydney',
 *     administrativeArea: 'NSW',
 *     postalCode: '2000',
 *     countryName: 'Australia',
 *     countryNameLocalized: '澳大利亚',
 *     countryCode: 'AU',
 *   }}
 *   onSubmit={(values) => console.log('Submit:', values)}
 *   onCancel={() => console.log('Cancel')}
 *   lang="en"
 *   apiKeys={{
 *     amap: 'your_amap_key',
 *     google: 'your_google_key',
 *   }}
 * />
 * ```
 */
export const AddressForm: React.FC<AddressFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
  className,
  lang = 'zh',
  apiKeys,
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm<Address>();
  const t = translations[lang];
  const [searchAddress, setSearchAddress] = useState('');

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      // Form validation error, no need to handle
    }
  };

  const handleAddressSelect = (value: string, address?: AddressDetails) => {
    if (address) {
      form.setFieldsValue({
        addressLine1: address.streetNumber,
        addressLine2: address.street,
        locality: address.city || address.district,
        administrativeArea: address.province,
        postalCode: address.postalCode,
        countryName: address.country,
        countryNameLocalized: lang === 'zh' ? address.country : '',
      });
      setSearchAddress(value);
    }
  };

  return (
    <StyledFormWithGeneric
      form={form}
      layout="vertical"
      initialValues={initialValues}
      className={className}
      $token={token}
    >
      {/* Recipient Information Section */}
      <Form.Item
        label={t.labels.recipientName}
        name="name"
        rules={[{ required: true, message: t.validation.required.recipientName }]}
      >
        <Input placeholder={t.placeholders.recipientName} />
      </Form.Item>

      <Form.Item
        label={t.labels.phone}
        name="phone"
        rules={[
          { required: true, message: t.validation.required.phone },
          { pattern: /^\d+$/, message: t.validation.format.phone }
        ]}
      >
        <Input placeholder={t.placeholders.phone} />
      </Form.Item>

      <Form.Item
        label={t.labels.organization}
        name="organization"
      >
        <Input placeholder={t.placeholders.organization} />
      </Form.Item>

      <Divider />

      {/* Address Search Section */}
      <Form.Item label={lang === 'zh' ? '地址搜索' : 'Address Search'}>
        <AddressAutoComplete
          value={searchAddress}
          onChange={handleAddressSelect}
          placeholder={lang === 'zh' ? '输入地址关键词搜索' : 'Search address'}
          lang={lang}
          service={lang === 'zh' ? 'amap' : 'google'}
          apiKeys={apiKeys}
        />
      </Form.Item>

      <Divider />

      {/* Country Information Section */}
      <Form.Item
        label={t.labels.country}
        required
        style={{ marginBottom: token.marginSM }}
      >
        <Space.Compact style={{ width: '100%' }}>
          <Form.Item
            name="countryName"
            rules={[{ required: true, message: t.validation.required.countryNameEn }]}
            noStyle
          >
            <Input placeholder={t.placeholders.countryNameEn} style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item
            name="countryNameLocalized"
            rules={[{ required: true, message: t.validation.required.countryNameLocal }]}
            noStyle
          >
            <Input placeholder={t.placeholders.countryNameLocal} style={{ width: '50%' }} />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label={t.labels.countryCode}
        name="countryCode"
        rules={[
          { required: true, message: t.validation.required.countryCode },
          { pattern: /^[A-Z]{2}$/, message: t.validation.format.countryCode }
        ]}
        tooltip={t.tooltips.countryCode}
      >
        <Input placeholder={t.placeholders.countryCode} style={{ width: '100px' }} />
      </Form.Item>

      {/* Postal Address Section - Following UPU bottom-to-top order */}
      <Form.Item
        label={t.labels.postalCode}
        name="postalCode"
        rules={[{ required: true, message: t.validation.required.postalCode }]}
      >
        <Input placeholder={t.placeholders.postalCode} />
      </Form.Item>

      <Form.Item
        label={t.labels.city}
        name="locality"
        rules={[{ required: true, message: t.validation.required.city }]}
      >
        <Input placeholder={t.placeholders.city} />
      </Form.Item>

      <Form.Item
        label={t.labels.state}
        name="administrativeArea"
        rules={[{ required: true, message: t.validation.required.state }]}
      >
        <Input placeholder={t.placeholders.state} />
      </Form.Item>

      <Form.Item
        label={t.labels.streetAddress}
        name="addressLine2"
        rules={[{ required: true, message: t.validation.required.streetAddress }]}
        tooltip={t.tooltips.streetAddress}
      >
        <Input placeholder={t.placeholders.streetAddress} />
      </Form.Item>

      <Form.Item
        label={t.labels.unit}
        name="addressLine1"
        tooltip={t.tooltips.unit}
      >
        <Input placeholder={t.placeholders.unit} />
      </Form.Item>

      <Form.Item
        label={t.labels.additionalInfo}
        name="addressLine3"
        tooltip={t.tooltips.additionalInfo}
      >
        <Input placeholder={t.placeholders.additionalInfo} />
      </Form.Item>

      <ButtonGroup $token={token}>
        <Button onClick={onCancel}>{t.buttons.cancel}</Button>
        <Button type="primary" onClick={handleSubmit} loading={isSubmitting}>
          {t.buttons.save}
        </Button>
      </ButtonGroup>
    </StyledFormWithGeneric>
  );
}; 