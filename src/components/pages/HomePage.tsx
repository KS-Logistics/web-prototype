import React from 'react';
import { Layout, Typography, Row, Col, Space, Card } from 'antd';
import { ShippingList } from '../organisms/ShippingList';

const { Header, Content } = Layout;
const { Title } = Typography;

const HomePage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>海运整柜</Title>
        </div>
      </Header>
      <Content style={{ padding: '24px', background: '#f0f2f5' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={4}>Container Shipping Management</Title>
                <ShippingList />
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default HomePage;
