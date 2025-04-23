import React, { ReactNode } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { ContainerOutlined, HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}>
        <Title level={4} style={{ color: 'white', margin: 0 }}>u6d77u8fd0u6574u67dc</Title>
      </Header>
      <Layout>
        <Sider width={200} theme="light" breakpoint="lg" collapsedWidth="0">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: 'Dashboard',
              },
              {
                key: '2',
                icon: <ContainerOutlined />,
                label: 'Sea Freight',
              },
              {
                key: '3',
                icon: <UserOutlined />,
                label: 'Customers',
              },
              {
                key: '4',
                icon: <SettingOutlined />,
                label: 'Settings',
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
