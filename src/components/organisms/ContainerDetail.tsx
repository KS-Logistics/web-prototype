import React, { useEffect, useState } from 'react';
import { Card, Typography, Descriptions, Button, Space, Steps, Divider, Row, Col, Tag, Timeline, Tabs, Table, Image } from 'antd';
import { ArrowLeftOutlined, PrinterOutlined, EditOutlined, FileTextOutlined, QrcodeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface ContainerDetailProps {
  containerId: string;
  onBack: () => void;
}

interface ContainerDetailData {
  id: string;
  containerNumber: string;
  bookingNumber: string;
  sealNumber: string;
  containerType: string;
  origin: string;
  portOfLoading: string;
  destination: string;
  portOfDischarge: string;
  vessel: string;
  voyage: string;
  shipper: string;
  consignee: string;
  notifyParty: string;
  departureDate: string;
  arrivalDate: string;
  status: string;
  weight: string;
  measurement: string;
  packageCount: number;
  goodsDescription: string;
  remarks: string;
  trackingHistory: TrackingEvent[];
  documents: Document[];
}

interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
}

// Dummy data based on the design
const getDummyContainerDetail = (id: string): ContainerDetailData => ({
  id,
  containerNumber: 'ABCD1234567',
  bookingNumber: 'BOOK12345',
  sealNumber: 'SEAL9876543',
  containerType: '40HQ',
  origin: 'Shanghai, China',
  portOfLoading: 'Shanghai Port',
  destination: 'Los Angeles, USA',
  portOfDischarge: 'Port of Los Angeles',
  vessel: 'COSCO SHIPPING PISCES',
  voyage: 'VY2503',
  shipper: 'Shanghai Exports Co., Ltd.',
  consignee: 'West Coast Imports Inc.',
  notifyParty: 'West Coast Logistics',
  departureDate: '2025-03-15',
  arrivalDate: '2025-04-10',
  status: 'In Transit',
  weight: '24,500 KG',
  measurement: '67.2 CBM',
  packageCount: 450,
  goodsDescription: 'Consumer Electronics, Home Appliances',
  remarks: 'Handle with care. Keep dry.',
  trackingHistory: [
    {
      date: '2025-03-15',
      time: '14:30',
      location: 'Shanghai Port',
      status: 'Departed',
      description: 'Vessel departed from port of loading',
    },
    {
      date: '2025-03-10',
      time: '09:15',
      location: 'Shanghai Port',
      status: 'Loaded',
      description: 'Container loaded onto vessel',
    },
    {
      date: '2025-03-08',
      time: '11:45',
      location: 'Shanghai Terminal',
      status: 'Received',
      description: 'Container received at terminal',
    },
    {
      date: '2025-03-05',
      time: '16:20',
      location: 'Shipper Warehouse',
      status: 'Stuffing',
      description: 'Container stuffing completed',
    },
    {
      date: '2025-03-01',
      time: '10:00',
      location: 'Booking Office',
      status: 'Booked',
      description: 'Shipping space confirmed',
    },
  ],
  documents: [
    {
      id: 'doc1',
      name: 'Bill of Lading',
      type: 'PDF',
      uploadDate: '2025-03-05',
      size: '1.2 MB',
    },
    {
      id: 'doc2',
      name: 'Commercial Invoice',
      type: 'PDF',
      uploadDate: '2025-03-04',
      size: '0.8 MB',
    },
    {
      id: 'doc3',
      name: 'Packing List',
      type: 'PDF',
      uploadDate: '2025-03-04',
      size: '0.5 MB',
    },
    {
      id: 'doc4',
      name: 'Certificate of Origin',
      type: 'PDF',
      uploadDate: '2025-03-03',
      size: '0.7 MB',
    },
  ],
});

const Container = styled.div`
  background: #fff;
  min-height: 100vh;
`;

const Header = styled.div`
  padding: 16px;
  background: #f5f5f5;
`;

const ContainerNumber = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin: 0;
  margin-bottom: 8px;
`;

const Section = styled.div`
  padding: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0;
  margin-bottom: 16px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  color: #666;
  font-size: 14px;
`;

const Value = styled.span`
  color: #333;
  font-size: 14px;
  font-weight: 500;
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

export interface ContainerDetailProps {
  containerNumber: string;
  status: string;
  type: string;
  weight: string;
  destination: string;
  loadingPort: string;
  dischargePort: string;
  vessel: string;
  voyage: string;
  eta: string;
  onShowQRCode?: () => void;
  onEdit?: () => void;
}

const ContainerDetail: React.FC<ContainerDetailProps> = ({
  containerNumber,
  status,
  type,
  weight,
  destination,
  loadingPort,
  dischargePort,
  vessel,
  voyage,
  eta,
  onShowQRCode,
  onEdit,
}) => {
  return (
    <Container>
      <Header>
        <ContainerNumber>{containerNumber}</ContainerNumber>
        <Value>{status}</Value>
      </Header>
      
      <Section>
        <SectionTitle>基本信息</SectionTitle>
        <DetailRow>
          <Label>箱型</Label>
          <Value>{type}</Value>
        </DetailRow>
        <DetailRow>
          <Label>货重</Label>
          <Value>{weight}吨</Value>
        </DetailRow>
        <DetailRow>
          <Label>目的地</Label>
          <Value>{destination}</Value>
        </DetailRow>
      </Section>
      
      <Divider style={{ margin: 0 }} />
      
      <Section>
        <SectionTitle>航运信息</SectionTitle>
        <DetailRow>
          <Label>装货港</Label>
          <Value>{loadingPort}</Value>
        </DetailRow>
        <DetailRow>
          <Label>卸货港</Label>
          <Value>{dischargePort}</Value>
        </DetailRow>
        <DetailRow>
          <Label>船名</Label>
          <Value>{vessel}</Value>
        </DetailRow>
        <DetailRow>
          <Label>航次</Label>
          <Value>{voyage}</Value>
        </DetailRow>
        <DetailRow>
          <Label>预计到达时间</Label>
          <Value>{eta}</Value>
        </DetailRow>
      </Section>
      
      <div style={{ height: '80px' }} /> {/* Space for fixed buttons */}
      
      <ButtonGroup>
        <Button
          buttonVariant="secondary"
          fullWidthMobile
          icon={<QrcodeOutlined />}
          onClick={onShowQRCode}
        >
          查看二维码
        </Button>
        <Button
          buttonVariant="primary"
          fullWidthMobile
          onClick={onEdit}
        >
          编辑
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default ContainerDetail;
