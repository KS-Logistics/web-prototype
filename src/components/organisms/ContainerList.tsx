import React, { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag, DatePicker, Form, Row, Col, Select, Divider, Typography } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, SortAscendingOutlined, QrcodeOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface ContainerData {
  id: string;
  containerNumber: string;
  bookingNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  status: string;
  shipper: string;
  consignee: string;
  containerType: string;
  weight: string;
  goods: string;
}

// Dummy data based on the design
const dummyData: ContainerData[] = [
  {
    id: '1',
    containerNumber: 'ABCD1234567',
    bookingNumber: 'BOOK12345',
    origin: 'Shanghai, China',
    destination: 'Los Angeles, USA',
    departureDate: '2025-03-15',
    arrivalDate: '2025-04-10',
    status: 'In Transit',
    shipper: 'China Exports Ltd',
    consignee: 'USA Imports Inc',
    containerType: '40HQ',
    weight: '25000 kg',
    goods: 'Electronics'
  },
  {
    id: '2',
    containerNumber: 'EFGH2345678',
    bookingNumber: 'BOOK23456',
    origin: 'Guangzhou, China',
    destination: 'Rotterdam, Netherlands',
    departureDate: '2025-03-18',
    arrivalDate: '2025-04-15',
    status: 'Processing',
    shipper: 'Guangzhou Trading Co',
    consignee: 'Dutch Imports BV',
    containerType: '20GP',
    weight: '15000 kg',
    goods: 'Textiles'
  },
  {
    id: '3',
    containerNumber: 'IJKL3456789',
    bookingNumber: 'BOOK34567',
    origin: 'Shenzhen, China',
    destination: 'Hamburg, Germany',
    departureDate: '2025-03-20',
    arrivalDate: '2025-04-20',
    status: 'Customs Clearance',
    shipper: 'Shenzhen Export Group',
    consignee: 'German Import GmbH',
    containerType: '40GP',
    weight: '22000 kg',
    goods: 'Furniture'
  },
  {
    id: '4',
    containerNumber: 'MNOP4567890',
    bookingNumber: 'BOOK45678',
    origin: 'Ningbo, China',
    destination: 'Sydney, Australia',
    departureDate: '2025-03-25',
    arrivalDate: '2025-04-25',
    status: 'Delivered',
    shipper: 'Ningbo Traders',
    consignee: 'Australian Distributors',
    containerType: '45HQ',
    weight: '28000 kg',
    goods: 'Machinery'
  },
  {
    id: '5',
    containerNumber: 'QRST5678901',
    bookingNumber: 'BOOK56789',
    origin: 'Qingdao, China',
    destination: 'Tokyo, Japan',
    departureDate: '2025-03-30',
    arrivalDate: '2025-04-08',
    status: 'Delayed',
    shipper: 'Qingdao Exporters',
    consignee: 'Tokyo Importers',
    containerType: '20GP',
    weight: '18000 kg',
    goods: 'Auto Parts'
  },
];

// Status colors mapping
const statusColors: Record<string, string> = {
  'Processing': 'blue',
  'In Transit': 'green',
  'Delayed': 'red',
  'Delivered': 'gray',
  'Customs Clearance': 'orange',
};

interface ContainerListProps {
  onSelectContainer: (containerId: string) => void;
  onNewShipment: () => void;
}

export const ContainerList: React.FC<ContainerListProps> = ({ onSelectContainer, onNewShipment }) => {
  const [searchText, setSearchText] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const columns: ColumnsType<ContainerData> = [
    {
      title: 'Container No.',
      dataIndex: 'containerNumber',
      key: 'containerNumber',
      sorter: (a, b) => a.containerNumber.localeCompare(b.containerNumber),
    },
    {
      title: 'Booking No.',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
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
      sorter: (a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime(),
    },
    {
      title: 'Arrival',
      dataIndex: 'arrivalDate',
      key: 'arrivalDate',
      sorter: (a, b) => new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={statusColors[status] || 'default'}>{status}</Tag>
      ),
      filters: Object.keys(statusColors).map(status => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => onSelectContainer(record.id)}>
          View Details
        </Button>
      ),
    },
  ];

  const filteredData = dummyData.filter(item => {
    return (
      item.containerNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      item.bookingNumber.toLowerCase().includes(searchText.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchText.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>Sea Freight Container Management</Title>
          </Col>
          <Col>
            <Space>
              <Button 
                icon={<QrcodeOutlined />} 
                onClick={() => console.log('Scan QR Code')}
              >
                Scan
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={onNewShipment}
              >
                New Shipment
              </Button>
            </Space>
          </Col>
        </Row>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Input 
                placeholder="Search by container no., booking no., origin, destination" 
                prefix={<SearchOutlined />} 
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col>
              <Button 
                icon={<FilterOutlined />} 
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                {showAdvancedSearch ? 'Hide' : 'Advanced'} Search
              </Button>
            </Col>
          </Row>
          
          {showAdvancedSearch && (
            <Card size="small">
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item label="Container Type">
                      <Select placeholder="Select type">
                        <Select.Option value="20GP">20GP</Select.Option>
                        <Select.Option value="40GP">40GP</Select.Option>
                        <Select.Option value="40HQ">40HQ</Select.Option>
                        <Select.Option value="45HQ">45HQ</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item label="Status">
                      <Select placeholder="Select status">
                        {Object.keys(statusColors).map(status => (
                          <Select.Option key={status} value={status}>{status}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item label="Date Range">
                      <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="end">
                  <Space>
                    <Button onClick={() => setShowAdvancedSearch(false)}>Cancel</Button>
                    <Button type="primary">Search</Button>
                  </Space>
                </Row>
              </Form>
            </Card>
          )}
        </Space>
        
        <Divider style={{ margin: '12px 0' }} />
        
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
          onRow={(record) => {
            return {
              onClick: () => onSelectContainer(record.id),
            };
          }}
        />
      </Space>
    </Card>
  );
};
