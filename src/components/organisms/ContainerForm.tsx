import React from 'react';
import styled from 'styled-components';
import { Form, Select } from 'antd';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useTranslation } from 'react-i18next';

const FormContainer = styled.div`
  background: #fff;
  min-height: 100vh;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin: 0 0 24px 0;
`;

const ButtonGroup = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  gap: 12px;
`;

const { Option } = Select;

export interface ContainerFormData {
  containerNumber: string;
  type: string;
  weight: string;
  destination: string;
  loadingPort: string;
  dischargePort: string;
  vessel: string;
  voyage: string;
  eta: string;
}

export interface ContainerFormProps {
  initialValues?: ContainerFormData;
  onSubmit: (values: ContainerFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const ContainerForm: React.FC<ContainerFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const [form] = Form.useForm<ContainerFormData>();
  const { t } = useTranslation();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onSubmit(values);
    });
  };

  return (
    <FormContainer>
      <Title>
        {isEdit ? t('container.form.editContainer') : t('container.form.addContainer')}
      </Title>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        style={{ marginBottom: '80px' }}
      >
        <Form.Item
          name="containerNumber"
          label={t('container.details.containerNumber')}
          rules={[{ required: true, message: t('container.validation.pleaseEnterContainerNumber') }]}
        >
          <Input placeholder={t('container.form.enterContainerNumber')} fullWidthMobile />
        </Form.Item>

        <Form.Item
          name="type"
          label={t('container.details.containerType')}
          rules={[{ required: true, message: t('container.validation.pleaseSelectContainerType') }]}
        >
          <Select placeholder={t('container.form.selectContainerType')}>
            <Option value="20GP">20GP</Option>
            <Option value="40GP">40GP</Option>
            <Option value="40HC">40HC</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="weight"
          label={t('container.details.weight')}
          rules={[{ required: true, message: t('container.validation.pleaseEnterWeight') }]}
        >
          <Input 
            placeholder={t('container.form.enterWeight')} 
            suffix={t('container.form.ton')} 
            fullWidthMobile 
          />
        </Form.Item>

        <Form.Item
          name="destination"
          label={t('container.details.destination')}
          rules={[{ required: true, message: t('container.validation.pleaseEnterDestination') }]}
        >
          <Input placeholder={t('container.form.enterDestination')} fullWidthMobile />
        </Form.Item>

        <Form.Item
          name="loadingPort"
          label={t('container.details.loadingPort')}
          rules={[{ required: true, message: t('container.validation.pleaseEnterLoadingPort') }]}
        >
          <Input placeholder={t('container.form.enterLoadingPort')} fullWidthMobile />
        </Form.Item>

        <Form.Item
          name="dischargePort"
          label={t('container.details.dischargePort')}
          rules={[{ required: true, message: t('container.validation.pleaseEnterDischargePort') }]}
        >
          <Input placeholder={t('container.form.enterDischargePort')} fullWidthMobile />
        </Form.Item>

        <Form.Item
          name="vessel"
          label={t('container.details.vessel')}
          rules={[{ required: true, message: t('container.validation.pleaseEnterVessel') }]}
        >
          <Input placeholder={t('container.form.enterVessel')} fullWidthMobile />
        </Form.Item>

        <Form.Item
          name="voyage"
          label={t('container.details.voyage')}
          rules={[{ required: true, message: t('container.validation.pleaseEnterVoyage') }]}
        >
          <Input placeholder={t('container.form.enterVoyage')} fullWidthMobile />
        </Form.Item>

        <Form.Item
          name="eta"
          label={t('container.details.eta')}
          rules={[{ required: true, message: t('container.validation.pleaseEnterETA') }]}
        >
          <Input placeholder="YYYY-MM-DD HH:mm" fullWidthMobile />
        </Form.Item>
      </Form>

      <ButtonGroup>
        <Button
          buttonVariant="secondary"
          fullWidthMobile
          onClick={onCancel}
        >
          {t('common.cancel')}
        </Button>
        <Button
          buttonVariant="primary"
          fullWidthMobile
          onClick={handleSubmit}
        >
          {t('common.confirm')}
        </Button>
      </ButtonGroup>
    </FormContainer>
  );
};

export default ContainerForm; 