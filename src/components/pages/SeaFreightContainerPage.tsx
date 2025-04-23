import React, { useState } from 'react';
import { Layout, Tabs, Typography, Space } from 'antd';
import { ContainerList } from '../organisms/ContainerList';
import { ContainerDetail } from '../organisms/ContainerDetail';
import { ShipmentForm } from '../organisms/ShipmentForm';

const { Header, Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

type TabKey = '1' | '2' | '3';

const SeaFreightContainerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('1');
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);

  const handleSelectContainer = (id: string) => {
    setSelectedContainerId(id);
    setActiveTab('2');
  };

  const handleNewShipment = (containerId?: string) => {
    if (containerId) {
      setSelectedContainerId(containerId);
    }
    setActiveTab('3');
  };

  const handleBack = () => {
    setActiveTab('1');
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key as TabKey);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Title level={4} style={{ color: 'white', margin: 0 }}>u6d77u8fd0u6574u67dc</Title>
        </div>
      </Header>
      <Content style={{ padding: '20px', background: '#f0f2f5' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Tabs activeKey={activeTab} onChange={handleTabChange} destroyInactiveTabPane>
            <TabPane tab="Container List" key="1">
              <ContainerList onSelectContainer={handleSelectContainer} onNewShipment={handleNewShipment} />
            </TabPane>
            <TabPane tab="Container Details" key="2" disabled={!selectedContainerId}>
              {selectedContainerId && (
                <ContainerDetail containerId={selectedContainerId} onBack={handleBack} onNewShipment={() => handleNewShipment(selectedContainerId)} />
              )}
            </TabPane>
            <TabPane tab="New Shipment" key="3">
              <ShipmentForm onComplete={handleBack} />
            </TabPane>
          </Tabs>
        </Space>
      </Content>
    </Layout>
  );
};

export default SeaFreightContainerPage;
