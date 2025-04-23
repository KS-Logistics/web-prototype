import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

interface ShippingItem {
  id: string;
  containerNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  status: 'In Transit' | 'Delivered' | 'Delayed' | 'Processing';
  contents: string;
}

const dummyData: ShippingItem[] = [
  {
    id: '1',
    containerNumber: 'CNT12345678',
    origin: 'Shanghai, China',
    destination: 'Los Angeles, USA',
    departureDate: '2025-03-15',
    arrivalDate: '2025-04-10',
    status: 'In Transit',
    contents: 'Electronics',
  },
  {
    id: '2',
    containerNumber: 'CNT23456789',
    origin: 'Hong Kong, China',
    destination: 'Rotterdam, Netherlands',
    departureDate: '2025-03-10',
    arrivalDate: '2025-04-20',
    status: 'In Transit',
    contents: 'Furniture',
  },
  {
    id: '3',
    containerNumber: 'CNT34567890',
    origin: 'Busan, South Korea',
    destination: 'Sydney, Australia',
    departureDate: '2025-03-05',
    arrivalDate: '2025-03-25',
    status: 'Delivered',
    contents: 'Automobiles',
  },
  {
    id: '4',
    containerNumber: 'CNT45678901',
    origin: 'Tokyo, Japan',
    destination: 'Hamburg, Germany',
    departureDate: '2025-03-20',
    arrivalDate: '2025-04-25',
    status: 'Processing',
    contents: 'Textiles',
  },
  {
    id: '5',
    containerNumber: 'CNT56789012',
    origin: 'Singapore',
    destination: 'Dubai, UAE',
    departureDate: '2025-03-18',
    arrivalDate: '2025-04-05',
    status: 'Delayed',
    contents: 'Food Products',
  },
];

const statusColors = {
  'In Transit': 'blue',
  'Delivered': 'green',
  'Delayed': 'red',
  'Processing': 'orange',
};

export const ShippingList: React.FC = () => {
  const [data, setData] = useState<ShippingItem[]>(dummyData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<ShippingItem | null>(null);
  const [form] = Form.useForm();

  const showModal = (item?: ShippingItem) => {
    setCurrentItem(item || null);
    setIsModalVisible(true);
    if (item) {
      form.setFieldsValue({
        ...item,
        departureDate: item.departureDate ? new Date(item.departureDate) : null,
        arrivalDate: item.arrivalDate ? new Date(item.arrivalDate) : null,
      });
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const newData = [...data];
      const formattedValues = {
        ...values,
        departureDate: values.departureDate?.format('YYYY-MM-DD'),
        arrivalDate: values.arrivalDate?.format('YYYY-MM-DD'),
      };

      if (currentItem) {
        // Edit existing item
        const index = newData.findIndex(item => item.id === currentItem.id);
        newData[index] = { ...newData[index], ...formattedValues };
      } else {
        // Add new item
        const newItem: ShippingItem = {
          id: `${Date.now()}`,
          ...formattedValues,
        };
        newData.push(newItem);
      }

      setData(newData);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this shipping item?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setData(data.filter(item => item.id !== id));
      },
    });
  };

  const columns = [
    {
      title: 'Container Number',
      dataIndex: 'containerNumber',
      key: 'containerNumber',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Departure',
      dataIndex: 'departureDate',
      key: 'departureDate',
    },
    {
      title: 'Arrival',
      dataIndex: 'arrivalDate',
      key: 'arrivalDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status] || 'default'}>{status}</Tag>
      ),
    },
    {
      title: 'Contents',
      dataIndex: 'contents',
      key: 'contents',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: ShippingItem) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            size="small" 
            onClick={() => console.log('View details', record)}
          />
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            onClick={() => showModal(record)} 
          />
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger 
            onClick={() => handleDelete(record.id)} 
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Add Shipping
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={currentItem ? 'Edit Shipping Item' : 'Add Shipping Item'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="containerNumber"
            label="Container Number"
            rules={[{ required: true, message: 'Please enter container number' }]}
          >
            <Input placeholder="e.g., CNT12345678" />
          </Form.Item>
          
          <Form.Item
            name="origin"
            label="Origin"
            rules={[{ required: true, message: 'Please enter origin' }]}
          >
            <Input placeholder="e.g., Shanghai, China" />
          </Form.Item>
          
          <Form.Item
            name="destination"
            label="Destination"
            rules={[{ required: true, message: 'Please enter destination' }]}
          >
            <Input placeholder="e.g., Los Angeles, USA" />
          </Form.Item>
          
          <Form.Item
            name="departureDate"
            label="Departure Date"
            rules={[{ required: true, message: 'Please select departure date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="arrivalDate"
            label="Arrival Date"
            rules={[{ required: true, message: 'Please select arrival date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="Processing">Processing</Select.Option>
              <Select.Option value="In Transit">In Transit</Select.Option>
              <Select.Option value="Delayed">Delayed</Select.Option>
              <Select.Option value="Delivered">Delivered</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="contents"
            label="Contents"
            rules={[{ required: true, message: 'Please enter contents' }]}
          >
            <Input placeholder="e.g., Electronics" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
