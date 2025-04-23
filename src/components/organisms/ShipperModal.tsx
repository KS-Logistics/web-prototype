import React from 'react';
import { Modal, Form, message } from 'antd';
import ShipperForm from '../molecules/ShipperForm';

interface ShipperInfo {
  shipperType: 'company' | 'individual';
  companyName: string;
  country: string;
  city: string;
  abn: string;
  contactName: string;
  countryCode: string;
  phone: string;
  address: string;
  email: string;
  expectedShipDate: string;
}

interface FormError {
  errorFields?: { errors: string[] }[];
  message?: string;
}

interface ShipperModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ShipperInfo) => Promise<void>;
  initialValues?: ShipperInfo;
  title?: string;
}

const ShipperModal: React.FC<ShipperModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  title = '发货方资料',
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await onSubmit(values);
      message.success('保存成功');
      onCancel();
    } catch (error: unknown) {
      const err = error as FormError;
      if (err.errorFields) {
        message.error('请填写必填项');
      } else {
        message.error('保存失败，请重试');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="确认"
      cancelText="取消"
      width={600}
      confirmLoading={loading}
      destroyOnClose
    >
      <ShipperForm
        form={form}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default ShipperModal; 