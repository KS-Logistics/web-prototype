import React, { useState } from 'react';
import { Form, Input, Button, Space, Card, Row, Col, Select, DatePicker, Divider, Typography, Steps, Upload, message } from 'antd';
import { UploadOutlined, SendOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;
const { Step } = Steps;

interface ShipmentFormProps {
  onComplete: () => void;
}

export const ShipmentForm: React.FC<ShipmentFormProps> = ({ onComplete }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    }).catch((errorInfo) => {
      console.log('Failed:', errorInfo);
    });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      console.log('Success:', values);
      message.success('Shipment created successfully!');
      onComplete();
    }).catch((errorInfo) => {
      console.log('Failed:', errorInfo);
    });
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const steps = [
    { title: 'Basic Info', content: 'basic-info' },
    { title: 'Cargo Details', content: 'cargo-details' },
    { title: 'Documents', content: 'documents' },
    { title: 'Confirmation', content: 'confirmation' },
  ];

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button icon={<ArrowLeftOutlined />} onClick={onComplete}>Back</Button>
              <Title level={4}>New Sea Freight Shipment</Title>
            </Space>
          </Col>
        </Row>

        <Steps current={currentStep} size="small">
          {steps.map(item => (
            <Step key={item.content} title={item.title} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          initialValues={{ containerType: '40HQ' }}
        >
          {currentStep === 0 && (
            <div>
              <Card title="Shipment Information" className="formSection">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="bookingNumber"
                      label="Booking Number"
                      rules={[{ required: true, message: 'Please enter booking number' }]}
                    >
                      <Input placeholder="Enter booking number" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="containerNumber"
                      label="Container Number"
                      rules={[{ required: true, message: 'Please enter container number' }]}
                    >
                      <Input placeholder="Enter container number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="containerType"
                      label="Container Type"
                      rules={[{ required: true, message: 'Please select container type' }]}
                    >
                      <Select>
                        <Select.Option value="20GP">20' General Purpose</Select.Option>
                        <Select.Option value="40GP">40' General Purpose</Select.Option>
                        <Select.Option value="40HQ">40' High Cube</Select.Option>
                        <Select.Option value="45HQ">45' High Cube</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="sealNumber"
                      label="Seal Number"
                    >
                      <Input placeholder="Enter seal number" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              
              <Card title="Route Information" className="formSection" style={{ marginTop: '16px' }}>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="origin"
                      label="Origin"
                      rules={[{ required: true, message: 'Please enter origin' }]}
                    >
                      <Input placeholder="Enter origin city/country" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="portOfLoading"
                      label="Port of Loading"
                      rules={[{ required: true, message: 'Please enter port of loading' }]}
                    >
                      <Input placeholder="Enter port of loading" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="destination"
                      label="Destination"
                      rules={[{ required: true, message: 'Please enter destination' }]}
                    >
                      <Input placeholder="Enter destination city/country" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="portOfDischarge"
                      label="Port of Discharge"
                      rules={[{ required: true, message: 'Please enter port of discharge' }]}
                    >
                      <Input placeholder="Enter port of discharge" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="vessel"
                      label="Vessel"
                      rules={[{ required: true, message: 'Please enter vessel name' }]}
                    >
                      <Input placeholder="Enter vessel name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="voyage"
                      label="Voyage"
                      rules={[{ required: true, message: 'Please enter voyage number' }]}
                    >
                      <Input placeholder="Enter voyage number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="departureDate"
                      label="Departure Date"
                      rules={[{ required: true, message: 'Please select departure date' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="arrivalDate"
                      label="Arrival Date"
                      rules={[{ required: true, message: 'Please select arrival date' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <Card title="Shipper & Consignee" className="formSection">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="shipper"
                      label="Shipper"
                      rules={[{ required: true, message: 'Please enter shipper' }]}
                    >
                      <Input placeholder="Enter shipper name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="shipperContact"
                      label="Shipper Contact"
                    >
                      <Input placeholder="Enter shipper contact" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="shipperAddress"
                      label="Shipper Address"
                    >
                      <TextArea rows={2} placeholder="Enter shipper address" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider style={{ margin: '12px 0' }} />
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="consignee"
                      label="Consignee"
                      rules={[{ required: true, message: 'Please enter consignee' }]}
                    >
                      <Input placeholder="Enter consignee name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="consigneeContact"
                      label="Consignee Contact"
                    >
                      <Input placeholder="Enter consignee contact" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="consigneeAddress"
                      label="Consignee Address"
                    >
                      <TextArea rows={2} placeholder="Enter consignee address" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider style={{ margin: '12px 0' }} />
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="notifyParty"
                      label="Notify Party"
                    >
                      <Input placeholder="Enter notify party name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="notifyPartyContact"
                      label="Notify Party Contact"
                    >
                      <Input placeholder="Enter notify party contact" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              
              <Card title="Cargo Details" className="formSection" style={{ marginTop: '16px' }}>
                <Row gutter={16}>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="grossWeight"
                      label="Gross Weight (KG)"
                      rules={[{ required: true, message: 'Please enter gross weight' }]}
                    >
                      <Input placeholder="Enter gross weight" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="measurement"
                      label="Measurement (CBM)"
                      rules={[{ required: true, message: 'Please enter measurement' }]}
                    >
                      <Input placeholder="Enter measurement" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Form.Item
                      name="packageCount"
                      label="Package Count"
                      rules={[{ required: true, message: 'Please enter package count' }]}
                    >
                      <Input placeholder="Enter package count" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="goodsDescription"
                      label="Goods Description"
                      rules={[{ required: true, message: 'Please enter goods description' }]}
                    >
                      <TextArea rows={3} placeholder="Enter goods description" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="remarks"
                      label="Remarks"
                    >
                      <TextArea rows={2} placeholder="Enter remarks" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <Card title="Required Documents" className="formSection">
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="billOfLading"
                      label="Bill of Lading"
                      rules={[{ required: true, message: 'Please upload Bill of Lading' }]}
                    >
                      <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="commercialInvoice"
                      label="Commercial Invoice"
                    >
                      <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="packingList"
                      label="Packing List"
                    >
                      <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="certificateOfOrigin"
                      label="Certificate of Origin"
                    >
                      <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
              
              <Card title="Additional Documents" className="formSection" style={{ marginTop: '16px' }}>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="additionalDocuments"
                      label="Upload any additional documents"
                    >
                      <Upload {...uploadProps} multiple>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <Card title="Shipment Summary" className="formSection">
                <p>Please review all the information below before submitting:</p>
                
                <Divider orientation="left">Basic Information</Divider>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <p><strong>Booking Number:</strong> {form.getFieldValue('bookingNumber') || 'N/A'}</p>
                    <p><strong>Container Number:</strong> {form.getFieldValue('containerNumber') || 'N/A'}</p>
                    <p><strong>Container Type:</strong> {form.getFieldValue('containerType') || 'N/A'}</p>
                    <p><strong>Seal Number:</strong> {form.getFieldValue('sealNumber') || 'N/A'}</p>
                  </Col>
                  <Col xs={24} md={12}>
                    <p><strong>Origin:</strong> {form.getFieldValue('origin') || 'N/A'}</p>
                    <p><strong>Destination:</strong> {form.getFieldValue('destination') || 'N/A'}</p>
                    <p><strong>Vessel/Voyage:</strong> {`${form.getFieldValue('vessel') || 'N/A'} / ${form.getFieldValue('voyage') || 'N/A'}`}</p>
                    <p><strong>Departure Date:</strong> {form.getFieldValue('departureDate')?.format('YYYY-MM-DD') || 'N/A'}</p>
                    <p><strong>Arrival Date:</strong> {form.getFieldValue('arrivalDate')?.format('YYYY-MM-DD') || 'N/A'}</p>
                  </Col>
                </Row>
                
                <Divider orientation="left">Shipper & Consignee</Divider>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <p><strong>Shipper:</strong> {form.getFieldValue('shipper') || 'N/A'}</p>
                    <p><strong>Shipper Contact:</strong> {form.getFieldValue('shipperContact') || 'N/A'}</p>
                  </Col>
                  <Col xs={24} md={12}>
                    <p><strong>Consignee:</strong> {form.getFieldValue('consignee') || 'N/A'}</p>
                    <p><strong>Consignee Contact:</strong> {form.getFieldValue('consigneeContact') || 'N/A'}</p>
                  </Col>
                </Row>
                
                <Divider orientation="left">Cargo Details</Divider>
                <Row gutter={16}>
                  <Col xs={24}>
                    <p><strong>Gross Weight:</strong> {form.getFieldValue('grossWeight') || 'N/A'} KG</p>
                    <p><strong>Measurement:</strong> {form.getFieldValue('measurement') || 'N/A'} CBM</p>
                    <p><strong>Package Count:</strong> {form.getFieldValue('packageCount') || 'N/A'}</p>
                    <p><strong>Goods Description:</strong> {form.getFieldValue('goodsDescription') || 'N/A'}</p>
                  </Col>
                </Row>
              </Card>
              
              <Card className="formSection" style={{ marginTop: '16px' }}>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      name="termsAgreed"
                      valuePropName="checked"
                      rules={[{ required: true, message: 'Please agree to the terms and conditions' }]}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <p>By clicking "Submit", you agree to our <a href="#">Terms and Conditions</a>.</p>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </div>
          )}
          
          <div style={{ marginTop: '24px', textAlign: 'right' }}>
            {currentStep > 0 && (
              <Button style={{ marginRight: 8 }} onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Space>
    </Card>
  );
};
