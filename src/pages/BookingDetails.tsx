import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, Collapse, Modal, message, Space, Card, Typography, Divider, Row, Col, Alert, Flex, Form, Input, Select, DatePicker, Radio, List, Descriptions, Badge, Timeline, Statistic, Avatar, Tag, Breadcrumb } from 'antd';
import styled from 'styled-components';
import { colors, spacing, borderRadius } from '../styles/theme';
import GlobalHeader from '../components/layout/GlobalHeader';
import { RightOutlined, EditOutlined, WarningOutlined, FileTextOutlined, DownOutlined, DownloadOutlined, PrinterOutlined, InboxOutlined } from '@ant-design/icons';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import FileUploadItem from '../components/molecules/FileUploadItem';
import ShipperModal from '../components/organisms/ShipperModal';
import LogoIcon from '../components/icons/LogoIcon';
import BarcodeIcon from '../components/icons/BarcodeIcon';
import QRCodeIcon from '../components/icons/QRCodeIcon';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const StyledLayout = styled(Layout)`
  background: ${colors.background.default};
  min-height: 100vh;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin-top: 76px;
  padding-bottom: 120px;
  background: ${colors.background.default};
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  display: flex;
  align-items: center;
  margin: ${spacing.sm} 0 ${spacing.lg};
  padding: 0 ${spacing.md};
  
  .ant-breadcrumb-link {
    font-size: 14px;
    color: ${colors.text.secondary};
    cursor: pointer;
    
    &:hover {
      color: ${colors.primary};
    }
    
    &.current {
      color: ${colors.text.primary};
      cursor: default;
    }
  }

  .ant-breadcrumb-separator {
    margin: 0 ${spacing.xs};
    color: ${colors.text.secondary};
  }
`;

const Section = styled.div`
  background: white;
  border-radius: ${borderRadius.medium};
  margin-bottom: ${spacing.md};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.md};
  border-bottom: 1px solid ${colors.border.light};

  .title {
    font-size: 16px;
    font-weight: 500;
    color: ${colors.text.primary};
  }

  .action {
    color: ${colors.text.secondary};
    font-size: 14px;
  }
`;

const InfoGrid = styled.div`
  padding: ${spacing.md};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.md};
`;

const InfoItem = styled.div`
  .label {
    font-size: 14px;
    color: ${colors.text.secondary};
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    color: ${colors.text.primary};
  }
`;

const StyledDivider = styled.div`
  height: 1px;
  background: ${colors.border.light};
  margin: 0 ${spacing.md};
`;

const FileSection = styled.div`
  padding: ${spacing.md};

  .hint {
    font-size: 12px;
    color: #ff4d4f;
    margin-bottom: ${spacing.sm};
  }
`;

const FileList = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

const FileLink = styled.a`
  color: #1890ff;
  font-size: 14px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ExpandableSection = styled(Section)`
  background: #F5F5F5;
  margin-bottom: ${spacing.md};
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${spacing.md} ${spacing.lg};
    cursor: pointer;
    background: white;
    border-radius: ${borderRadius.medium};

    .left-content {
      display: flex;
      align-items: center;
      gap: ${spacing.md};

      .chevron {
        color: ${colors.text.secondary};
        transition: transform 0.3s ease;
        
        &.expanded {
          transform: rotate(180deg);
        }
      }
    }

    .title {
      font-size: 16px;
      font-weight: 500;
      color: ${colors.text.primary};
    }

    .subtitle {
      font-size: 12px;
      color: ${colors.text.secondary};
      margin-left: ${spacing.xs};
    }
  }
`;

const ExpandedContent = styled.div`
  padding: ${spacing.lg};
  font-size: 14px;
  background: #F5F5F5;
  margin-top: ${spacing.xs};
  border-radius: ${borderRadius.medium};
`;

const ShipperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  position: relative;
  width: 100%;
  max-width: 500px;

  .form-label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    
    .required {
      color: #ff4d4f;
    }
  }

  .ant-form-item {
    margin-bottom: ${spacing.md};
  }

  .ant-input, .ant-select-selector, .ant-picker {
    height: 40px;
    border-radius: 2px;
    
    &::placeholder {
      color: #bfbfbf;
    }
  }

  .ant-select-selector {
    padding: 4px 11px;
    
    .ant-select-selection-placeholder {
      line-height: 30px;
    }
  }

  .ant-radio-group {
    display: flex;
    gap: ${spacing.lg};
  }

  .phone-group {
    display: flex;
    gap: ${spacing.sm};

    .country-code {
      width: 120px;
    }

    .phone-input {
      flex: 1;
    }
  }

  .upload-section {
    border: 1px dashed ${colors.border.default};
    border-radius: 2px;
    padding: ${spacing.lg};
    text-align: center;
    background: #fafafa;
    cursor: pointer;

    .upload-icon {
      color: #1890ff;
      font-size: 24px;
      margin-bottom: ${spacing.xs};
    }

    .upload-text {
      color: ${colors.text.secondary};
      font-size: 14px;
    }

    .upload-hint {
      color: ${colors.text.secondary};
      font-size: 12px;
    }
  }
`;

const ContainerInfo = styled.div`
  .container-header {
    background: white;
    border-radius: ${borderRadius.medium};
    padding: ${spacing.lg};
    margin-bottom: ${spacing.md};
    position: relative;

    .info-group {
      margin-bottom: ${spacing.md};

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        color: ${colors.text.secondary};
        margin-bottom: 4px;
        font-size: 14px;
      }

      .value {
        color: ${colors.text.primary};
        font-size: 14px;
      }
    }
  }

  .label {
    color: ${colors.text.primary};
    font-size: 14px;
    margin: ${spacing.md} 0;
  }

  .product-list {
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
  }

  .product-item {
    background: white;
    padding: ${spacing.lg};
    border-radius: ${borderRadius.medium};
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.md} ${spacing.xl};

    .item-detail {
      font-size: 14px;
      
      .label {
        color: ${colors.text.secondary};
        margin-bottom: 4px;
        margin: 0 0 4px 0;
      }
      
      .value {
        color: ${colors.text.primary};
      }
    }
  }
`;

const ContentEditButton = styled(Button)`
  padding: 4px 8px;
  height: auto;
  color: ${colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  position: relative;
  z-index: 1;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: ${colors.text.secondary};
  }

  .anticon {
    font-size: 16px;
  }
`;

const OverviewCard = styled.div`
  background: #F5F5F5;
  border-radius: ${borderRadius.medium};
  padding: ${spacing.md};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${spacing.md};
    padding-bottom: ${spacing.sm};
    border-bottom: 1px solid ${colors.border.light};

    .title {
      font-size: 16px;
      font-weight: 500;
      color: ${colors.text.primary};
    }
  }

  .content {
    background: white;
    border-radius: ${borderRadius.small};
    padding: ${spacing.lg};

    .info-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: ${spacing.lg};
      margin-bottom: ${spacing.md};

      &:last-child {
        margin-bottom: 0;
      }

      .info-item {
        display: flex;
        flex-direction: column;
        gap: ${spacing.xs};
        
        .label {
          color: ${colors.text.secondary};
          font-size: 14px;
        }

        .value {
          color: ${colors.text.primary};
          font-size: 14px;
          word-break: break-word;

          &.highlight {
            color: #1890ff;
            font-weight: 500;
          }

          &.warning {
            color: #ff4d4f;
          }

          &.success {
            color: #52c41a;
          }

          .status-tag {
            display: inline-flex;
            align-items: center;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            line-height: 1.5;
            margin-left: ${spacing.sm};
            background: #fff7e6;
            color: #fa8c16;
            border: 1px solid #ffd591;
          }
        }
      }
    }
  }

  .footer {
    padding: ${spacing.lg};
    background: white;
    display: flex;
    flex-direction: column;
    gap: ${spacing.md};
  }

  .footer-title {
    display: flex;
    align-items: center;
    gap: ${spacing.sm};
    font-size: 14px;
    color: ${colors.text.warning};

    .anticon {
      color: ${colors.status.warning};
    }
  }

  .file-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${spacing.md};
  }
`;

const Footer = styled.div`
  padding: ${spacing.lg};
  background: white;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const FooterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-size: 14px;
  color: ${colors.text.warning};

  .anticon {
    color: ${colors.status.warning};
  }
`;

const FileLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
`;

const WarehouseInfo = styled.div`
  .status-section {
    background: white;
    border-radius: ${borderRadius.medium};
    padding: ${spacing.lg};
    margin-bottom: ${spacing.md};

    .section-title {
      font-size: 14px;
      font-weight: 500;
      color: ${colors.text.primary};
      margin-bottom: ${spacing.md};
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: ${spacing.md};

      .status-item {
        display: flex;
        flex-direction: column;
        gap: ${spacing.xs};

        .label {
          color: ${colors.text.secondary};
          font-size: 14px;
        }

        .value {
          color: ${colors.text.primary};
          font-size: 14px;

          &.success {
            color: #52c41a;
          }

          &.warning {
            color: #fa8c16;
          }

          &.error {
            color: #ff4d4f;
          }
        }
      }
    }
  }

  .timeline {
    background: white;
    border-radius: ${borderRadius.medium};
    padding: ${spacing.lg};

    .timeline-title {
      font-size: 14px;
      font-weight: 500;
      color: ${colors.text.primary};
      margin-bottom: ${spacing.md};
    }

    .timeline-item {
      display: flex;
      gap: ${spacing.md};
      padding-bottom: ${spacing.md};
      position: relative;

      &:not(:last-child):before {
        content: '';
        position: absolute;
        left: 6px;
        top: 24px;
        bottom: 0;
        width: 1px;
        background: ${colors.border.light};
      }

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #1890ff;
        margin-top: 6px;
        flex-shrink: 0;

        &.success {
          background: #52c41a;
        }

        &.warning {
          background: #fa8c16;
        }

        &.error {
          background: #ff4d4f;
        }
      }

      .content {
        flex: 1;

        .time {
          font-size: 12px;
          color: ${colors.text.secondary};
          margin-bottom: 4px;
        }

        .text {
          font-size: 14px;
          color: ${colors.text.primary};
        }
      }
    }
  }
`;

const TaxInfo = styled.div`
  .tax-section {
    background: white;
    border-radius: ${borderRadius.medium};
    padding: ${spacing.lg};
    margin-bottom: ${spacing.md};

    .section-title {
      font-size: 14px;
      font-weight: 500;
      color: ${colors.text.primary};
      margin-bottom: ${spacing.md};
    }

    .tax-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: ${spacing.md};

      .tax-item {
        display: flex;
        flex-direction: column;
        gap: ${spacing.xs};

        .label {
          color: ${colors.text.secondary};
          font-size: 14px;
        }

        .value {
          color: ${colors.text.primary};
          font-size: 14px;

          &.highlight {
            color: #1890ff;
            font-weight: 500;
          }
        }
      }
    }
  }
`;

const ShippingLabelModal = styled(Modal)`
  @media print {
    .ant-modal-header,
    .ant-modal-footer,
    .ant-alert,
    .ant-typography.ant-typography-secondary,
    .action-buttons,
    .ant-btn {
      display: none !important;
    }

    .ant-modal-content {
      box-shadow: none;
    }

    .ant-modal-body {
      padding: 0;
    }

    .shipping-label {
      width: 150mm;
      height: 100mm;
      padding: 5mm !important;
      margin: 0 !important;
      box-shadow: none !important;
      border: none !important;
      
      .ant-card-head {
        display: none !important;
      }
      
      .ant-card-body {
        padding: 0 !important;
      }

      .ant-space {
        gap: 4mm !important;
      }

      .ant-typography {
        margin-bottom: 0 !important;
        font-size: 8pt !important;
        line-height: 1.2 !important;
      }

      .ant-typography.ant-typography-secondary {
        font-size: 7pt !important;
      }

      .logo {
        width: 15mm !important;
        height: auto !important;
      }

      .barcode-section {
        height: 15mm !important;
      }

      .qr-code {
        width: 20mm !important;
        height: 20mm !important;
      }

      .priority-badge {
        padding: 1mm 2mm !important;
        font-size: 8pt !important;
      }

      .section-header {
        padding: 1mm 2mm !important;
        margin-bottom: 1mm !important;
        font-size: 8pt !important;
      }

      .info-grid {
        font-size: 8pt !important;
        line-height: 1.2 !important;
      }

      .signature-section {
        height: 10mm !important;
      }
    }
  }
`;

const StyledCollapse = styled(Collapse)`
  background: transparent !important;
  border: none !important;
  
  .ant-collapse-item {
    margin-bottom: ${spacing.md};
    border: none !important;
  }
`;

const StyledPanel = styled(Panel)`
  background: #F5F5F5 !important;
  border-radius: ${borderRadius.medium} !important;
  overflow: hidden !important;

  .ant-collapse-header {
    background: white !important;
    border-radius: ${borderRadius.medium} !important;
    padding: ${spacing.md} ${spacing.lg} !important;
    align-items: center !important;
    
    .ant-collapse-expand-icon {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: ${colors.text.secondary} !important;
    }
    
    .ant-collapse-header-text {
      display: flex !important;
      align-items: center !important;
      gap: ${spacing.md} !important;
      
      .title {
        font-size: 16px !important;
        font-weight: 500 !important;
        color: ${colors.text.primary} !important;
      }
      
      .subtitle {
        font-size: 12px !important;
        color: ${colors.text.secondary} !important;
      }
    }
  }

  .ant-collapse-content {
    background: #F5F5F5 !important;
    border-top: none !important;
    
    .ant-collapse-content-box {
      padding: ${spacing.lg} !important;
    }
  }
`;

const StyledDescriptions = styled(Descriptions)`
  .ant-descriptions-item-label {
    color: ${colors.text.secondary};
    font-size: 14px;
  }
  
  .ant-descriptions-item-content {
    color: ${colors.text.primary};
    font-size: 14px;
  }
`;

const StyledCard = styled(Card)`
  background: white;
  border-radius: ${borderRadius.medium};
  margin-bottom: ${spacing.md};
  
  .ant-card-head {
    border-bottom: 1px solid ${colors.border.light};
    padding: ${spacing.md} ${spacing.lg};
    min-height: auto;
    
    .ant-card-head-title {
      font-size: 14px;
      font-weight: 500;
      padding: ${spacing.xs} 0;
    }
  }
  
  .ant-card-body {
    padding: ${spacing.lg};
  }
`;

const SectionTitle = styled(Title)`
  font-size: 14px !important;
  font-weight: 500 !important;
  margin-bottom: ${spacing.md} !important;
`;

const ProductItem = styled(Card)`
  border-radius: ${borderRadius.medium};
  margin-bottom: ${spacing.md};
  overflow: hidden;
  box-shadow: none;
  transition: all 0.3s ease;
  border: 1px solid ${colors.border.light};
  background: #FFFFFF;
  
  .ant-card-body {
    padding: ${spacing.lg};
  }
  
  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${spacing.lg};
    
    .left-section {
      display: flex;
      flex-direction: column;
      gap: ${spacing.xs};
    }
  }
  
  .product-title {
    display: flex;
    gap: ${spacing.sm};
    align-items: center;
    margin-bottom: ${spacing.xs};
    
    .product-id {
      font-size: 16px;
      color: ${colors.text.primary};
      font-weight: 500;
    }
  }
  
  .name-group {
    display: flex;
    gap: ${spacing.lg};
    align-items: center;
    
    .name-item {
      display: flex;
      gap: ${spacing.xs};
      align-items: center;
      
      .label {
        color: ${colors.text.secondary};
        font-size: 14px;
      }
      
      .value {
        color: ${colors.text.primary};
        font-size: 14px;
      }
    }
  }
  
  .product-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.lg} ${spacing.xl};
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .label {
      font-size: 14px;
      color: ${colors.text.secondary};
    }
    
    .value {
      font-size: 14px;
      color: ${colors.text.primary};
      font-weight: 400;
      
      &.highlight {
        color: #1890ff;
      }
    }
  }
  
  .edit-button {
    border: none;
    padding: 4px;
    height: auto;
    color: ${colors.text.secondary};
    
    &:hover {
      color: #1890ff;
      background: transparent;
    }
  }
`;

const LabelContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
  padding: ${spacing.lg};
  background: white;

  .logo {
    width: 120px;
    height: auto;
  }

  .barcode {
    width: 100%;
    height: auto;
  }

  .qr-code {
    width: 128px;
    height: 128px;
  }
`;

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
  idDocument: string;
}

interface ConsigneeInfo {
  consigneeType: 'company' | 'individual';
  companyName: string;
  country: string;
  city: string;
  abn: string;
  contactName: string;
  countryCode: string;
  phone: string;
  address: string;
  email: string;
  notes: string;
  idDocument: string;
}

interface BookingDetailsProps {
  bookingNumber: string;
  onBack?: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  bookingNumber = 'AU4363',
  onBack,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);
  const barcodeRef = useRef<HTMLImageElement>(null);
  const qrCodeRef = useRef<HTMLImageElement>(null);
  const labelContentRef = useRef<HTMLDivElement>(null);
  const [shipperModalVisible, setShipperModalVisible] = useState(false);
  const [shipperInfo, setShipperInfo] = useState<ShipperInfo>({
    shipperType: 'company',
    companyName: '',
    country: '澳大利亚',
    city: '悉尼',
    abn: '',
    contactName: 'Mike Zhou',
    countryCode: '+61',
    phone: '0416222333',
    address: '11 Archer St, Chatswood NSW 2067',
    email: 'mikezhou@gmail.com',
    expectedShipDate: '2024-11-12',
    idDocument: '',
  });
  const [isShipperEditing, setIsShipperEditing] = useState(false);
  const [consigneeInfo, setConsigneeInfo] = useState<ConsigneeInfo>({
    consigneeType: 'individual',
    companyName: '',
    country: '澳大利亚',
    city: '悉尼',
    abn: '',
    contactName: 'Mike Zhou',
    countryCode: '+61',
    phone: '0416222333',
    address: '11 Archer St, Chatswood NSW 2067',
    email: 'mikezhou@gmail.com',
    notes: '日上午 查看',
    idDocument: '',
  });
  const [isConsigneeEditing, setIsConsigneeEditing] = useState(false);
  const [form] = Form.useForm();
  const [consigneeForm] = Form.useForm();

  useEffect(() => {
    if (isLabelModalVisible) {
      // Generate barcode
      const barcodeElement = document.createElement('canvas');
      JsBarcode(barcodeElement, 'AU1000888', {
        format: 'CODE128',
        width: 2,
        height: 40,
        displayValue: false,
      });
      if (barcodeRef.current) {
        barcodeRef.current.src = barcodeElement.toDataURL();
      }

      // Generate QR code
      const qrData = JSON.stringify({
        bookingNumber: 'AU1000888',
        consignee: 'HePinyu',
        address: '25 Lombard St, FAIRFIELD NSW 2165',
        phone: '0406222886',
      });
      QRCode.toDataURL(qrData, {
        width: 120,
        margin: 0,
      }).then(url => {
        if (qrCodeRef.current) {
          qrCodeRef.current.src = url;
        }
      });
    }
  }, [isLabelModalVisible]);

  // Initialize form when editing starts
  useEffect(() => {
    if (isShipperEditing) {
      // Small timeout to ensure the form is mounted before setting values
      setTimeout(() => {
        form.setFieldsValue({
          ...shipperInfo,
          expectedShipDate: dayjs(shipperInfo.expectedShipDate)
        });
        console.log('Form initialized with shipperType:', shipperInfo.shipperType);
      }, 10);
    }
  }, [isShipperEditing, shipperInfo, form]);

  // Initialize consignee form when editing starts
  useEffect(() => {
    if (isConsigneeEditing) {
      // Small timeout to ensure the form is mounted before setting values
      setTimeout(() => {
        consigneeForm.setFieldsValue({
          ...consigneeInfo,
        });
        console.log('Consignee form initialized with consigneeType:', consigneeInfo.consigneeType);
      }, 10);
    }
  }, [isConsigneeEditing, consigneeInfo, consigneeForm]);

  const handleDownload = async () => {
    if (!labelContentRef.current) return;

    try {
      // Hide header and buttons before capturing
      const modalHeader = document.querySelector('.ant-modal-header');
      const actionButtons = labelContentRef.current.querySelector('.action-buttons');
      
      if (modalHeader) {
        modalHeader.classList.add('hidden');
      }
      if (actionButtons) {
        actionButtons.classList.add('hidden');
      }

      const canvas = await html2canvas(labelContentRef.current, {
        scale: 2, // Increase quality
        backgroundColor: '#ffffff'
      });
      
      // Show header and buttons after capturing
      if (modalHeader) {
        modalHeader.classList.remove('hidden');
      }
      if (actionButtons) {
        actionButtons.classList.remove('hidden');
      }

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `shipping-label-${bookingNumber}.png`;
      link.href = dataUrl;
      link.click();
      message.success('标签下载成功');
    } catch (error) {
      message.error('下载失败，请重试');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSectionClick = (sectionKey: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionKey) 
        ? prev.filter(key => key !== sectionKey)
        : [...prev, sectionKey]
    );
  };

  const showLabelModal = () => {
    setIsLabelModalVisible(true);
  };

  const handleLabelModalClose = () => {
    setIsLabelModalVisible(false);
  };

  const handleFileSelect = (file: File | Blob) => {
    // Handle file upload logic here
    console.log('File selected:', file);
  };

  const handleEditShipper = () => {
    setIsShipperEditing(true);
  };

  const handleCancelEdit = () => {
    setIsShipperEditing(false);
    form.resetFields();
  };

  const handleSaveShipper = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        expectedShipDate: values.expectedShipDate.format('YYYY-MM-DD')
      };
      setShipperInfo(formattedValues);
      setIsShipperEditing(false);
      message.success('发货方资料更新成功');
    } catch (error) {
      message.error('请检查表单填写是否正确');
    }
  };

  // Add form field change handler
  const handleFormValuesChange = (changedValues: any) => {
    if ('shipperType' in changedValues) {
      console.log('Shipper type changed to:', changedValues.shipperType);
      
      // Reset form fields when switching between company and individual
      const commonFields = ['country', 'countryCode', 'phone', 'address', 'email', 'expectedShipDate'];
      const currentValues = form.getFieldsValue();
      
      // Force re-render of form by setting shipperType first
      form.setFieldsValue({
        shipperType: changedValues.shipperType,
      });
      
      // Then set common fields with a slight delay to ensure shipperType is applied first
      setTimeout(() => {
        form.setFieldsValue({
          ...commonFields.reduce((acc, field) => ({ ...acc, [field]: currentValues[field] }), {}),
        });
      }, 10);
    }
  };

  // Force re-render the form when shipperType changes
  useEffect(() => {
    if (isShipperEditing) {
      const currentType = form.getFieldValue('shipperType');
      form.setFieldsValue({ shipperType: currentType });
    }
  }, [form.getFieldValue('shipperType'), isShipperEditing]);

  // Consignee handlers
  const handleEditConsignee = () => {
    setIsConsigneeEditing(true);
  };

  const handleCancelConsigneeEdit = () => {
    setIsConsigneeEditing(false);
    consigneeForm.resetFields();
  };

  const handleSaveConsignee = async () => {
    try {
      const values = await consigneeForm.validateFields();
      setConsigneeInfo(values);
      setIsConsigneeEditing(false);
      message.success('收货方资料更新成功');
    } catch (error) {
      message.error('请检查表单填写是否正确');
    }
  };

  // Add form field change handler for consignee form
  const handleConsigneeFormValuesChange = (changedValues: any) => {
    if ('consigneeType' in changedValues) {
      console.log('Consignee type changed to:', changedValues.consigneeType);
      
      // Reset form fields when switching between company and individual
      const commonFields = ['country', 'countryCode', 'phone', 'address', 'email', 'notes'];
      const currentValues = consigneeForm.getFieldsValue();
      
      // Force re-render of form by setting consigneeType first
      consigneeForm.setFieldsValue({
        consigneeType: changedValues.consigneeType,
      });
      
      // Then set common fields with a slight delay to ensure consigneeType is applied first
      setTimeout(() => {
        consigneeForm.setFieldsValue({
          ...commonFields.reduce((acc, field) => ({ ...acc, [field]: currentValues[field] }), {}),
        });
      }, 10);
    }
  };

  // Function to generate panel extra content (Edit button)
  const renderPanelExtra = (onClick: () => void) => (
    <Button
      type="text"
      icon={<EditOutlined />}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{ marginRight: spacing.md }}
    />
  );

  // Add this function to handle navigation
  const handleNavigate = (path: string) => {
    // Navigation placeholder, will be replaced with actual routing later
    console.log('Navigate to:', path);
    if (path === '/' && onBack) {
      onBack();
    }
  };

  return (
    <StyledLayout>
      <GlobalHeader onBack={() => handleNavigate('/')} />
      <ContentContainer>
        <StyledBreadcrumb>
          <Breadcrumb.Item onClick={() => handleNavigate('/')}>
            海运整柜
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleNavigate('/shipping-route')}>
            航线选择
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleNavigate('/cargo-details')}>
            货物信息
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => handleNavigate('/order-summary')}>
            订单确认
          </Breadcrumb.Item>
          <Breadcrumb.Item className="current">
            哨头号创建成功
          </Breadcrumb.Item>
        </StyledBreadcrumb>

        <OverviewCard>
          <div className="header">
            <span className="title">委托信息总览</span>
            <Button 
              type="primary" 
              ghost 
              icon={<FileTextOutlined />}
              onClick={showLabelModal}
            >
              查看哨头面单
            </Button>
          </div>
          <div className="content">
            <div className="info-row">
              <div className="info-item">
                <span className="label">货柜数</span>
                <span className="value">1</span>
              </div>
              <div className="info-item">
                <span className="label">总货值</span>
                <span className="value">35435{'\n'}AUD</span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="label">总箱数</span>
                <span className="value">32</span>
              </div>
              <div className="info-item">
                <span className="label">发货地</span>
                <span className="value">中国-郑州</span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="label">已入库箱数</span>
                <span className="value">
                  1
                  <span className="status-tag">待入库: 31</span>
                </span>
              </div>
              <div className="info-item">
                <span className="label">目的地港</span>
                <span className="value">澳大利亚-悉尼</span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="label">总重量</span>
                <span className="value">31000 kg</span>
              </div>
              <div className="info-item">
                <span className="label">提交时间</span>
                <span className="value">2024/11/10 15:20</span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="label">总体积</span>
                <span className="value">45 cbm</span>
              </div>
              <div className="info-item">
                <span className="label">预计发运日期</span>
                <span className="value">2024/11/12</span>
              </div>
            </div>
          </div>
          <Footer>
            <FooterTitle>
              <WarningOutlined />
              请上传以下文件
            </FooterTitle>
            <FileLinks>
              <FileUploadItem
                label="装箱单"
                onFileSelect={handleFileSelect}
              />
              <FileUploadItem
                label="发票"
                onFileSelect={handleFileSelect}
              />
              <FileUploadItem
                label="报关单"
                onFileSelect={handleFileSelect}
              />
              <FileUploadItem
                label="其他文件"
                onFileSelect={handleFileSelect}
              />
            </FileLinks>
          </Footer>
        </OverviewCard>

        <StyledCollapse
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          activeKey={expandedSections}
          onChange={(key) => setExpandedSections(key as string[])}
        >
          <StyledPanel 
            key="shipper" 
            header={
              <Space>
                <span className="title">发货方资料</span>
                <Text type="secondary" style={{ fontSize: 12 }}>（提交申请前必须添加发货方）</Text>
              </Space>
            }
          >
            {!isShipperEditing ? (
              <>
                <div style={{ position: 'relative' }}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={handleEditShipper}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                  <StyledDescriptions 
                    column={1} 
                    bordered={false}
                    colon={true}
                    labelStyle={{ width: '150px' }}
                  >
                    <Descriptions.Item label="发货方类型">
                      {shipperInfo.shipperType === 'company' ? '公司' : '个人'}
                    </Descriptions.Item>
                    
                    {shipperInfo.shipperType === 'company' && shipperInfo.companyName && (
                      <>
                        <Descriptions.Item label="公司名">
                          {shipperInfo.companyName}
                        </Descriptions.Item>
                        {shipperInfo.abn && (
                          <Descriptions.Item label="公司ABN或税号">
                            {shipperInfo.abn}
                          </Descriptions.Item>
                        )}
                      </>
                    )}
                    
                    <Descriptions.Item label="国家">{shipperInfo.country}</Descriptions.Item>
                    <Descriptions.Item label="城市">{shipperInfo.city}</Descriptions.Item>
                    <Descriptions.Item label="联系人姓名">{shipperInfo.contactName}</Descriptions.Item>
                    <Descriptions.Item label="联系人电话">
                      {`${shipperInfo.countryCode} ${shipperInfo.phone}`}
                    </Descriptions.Item>
                    <Descriptions.Item label="联系人地址">{shipperInfo.address}</Descriptions.Item>
                    <Descriptions.Item label="联系人邮箱">{shipperInfo.email}</Descriptions.Item>
                    <Descriptions.Item label="期望出货日期">{shipperInfo.expectedShipDate}</Descriptions.Item>
                  </StyledDescriptions>
                </div>
              </>
            ) : (
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  ...shipperInfo,
                  expectedShipDate: dayjs(shipperInfo.expectedShipDate)
                }}
                onValuesChange={handleFormValuesChange}
              >
                <Form.Item
                  name="shipperType"
                  label={<span className="form-label">
                    <span className="required">*</span>发货方类型
                  </span>}
                  rules={[{ required: true, message: '请选择发货方类型' }]}
                >
                  <Radio.Group onChange={(e) => {
                    const value = e.target.value;
                    form.setFieldsValue({ shipperType: value });
                    console.log('Radio value changed to:', value);
                  }}>
                    <Radio value="company">公司</Radio>
                    <Radio value="individual">个人</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item noStyle dependencies={['shipperType']}>
                  {({ getFieldValue }) => {
                    const type = getFieldValue('shipperType');
                    return type === 'company' ? (
                      // Company Form Fields
                      <>
                        <Form.Item
                          name="companyName"
                          label={<span className="form-label">
                            <span className="required">*</span>公司名
                          </span>}
                          rules={[{ required: true, message: '请输入公司名' }]}
                        >
                          <Input placeholder="公司名" />
                        </Form.Item>
        
                        <Form.Item
                          name="country"
                          label={<span className="form-label">
                            <span className="required">*</span>国家
                          </span>}
                          rules={[{ required: true, message: '请选择国家' }]}
                        >
                          <Select placeholder="请选择">
                            <Option value="澳大利亚">澳大利亚</Option>
                            <Option value="中国">中国</Option>
                          </Select>
                        </Form.Item>
        
                        <Form.Item
                          name="city"
                          label={<span className="form-label">
                            <span className="required">*</span>城市
                          </span>}
                          rules={[{ required: true, message: '请选择城市' }]}
                        >
                          <Select placeholder="请选择">
                            <Option value="悉尼">悉尼</Option>
                            <Option value="墨尔本">墨尔本</Option>
                          </Select>
                        </Form.Item>
        
                        <Form.Item
                          name="abn"
                          label={<span className="form-label">
                            <span className="required">*</span>公司ABN或税号
                          </span>}
                          rules={[{ required: true, message: '请输入公司ABN或税号' }]}
                        >
                          <Input placeholder="公司ABN" />
                        </Form.Item>
        
                        <Form.Item
                          name="contactName"
                          label={<span className="form-label">
                            <span className="required">*</span>联系人姓名
                          </span>}
                          rules={[{ required: true, message: '请输入联系人姓名' }]}
                        >
                          <Input placeholder="联系人姓名" />
                        </Form.Item>
        
                        <Form.Item
                          label={<span className="form-label">
                            <span className="required">*</span>联系人电话
                          </span>}
                          required
                        >
                          <Input.Group compact className="phone-group">
                            <Form.Item
                              name="countryCode"
                              noStyle
                              rules={[{ required: true, message: '请选择国际区号' }]}
                            >
                              <Select placeholder="+61" className="country-code">
                                <Option value="+61">+61</Option>
                                <Option value="+86">+86</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name="phone"
                              noStyle
                              rules={[{ required: true, message: '请输入电话号码' }]}
                            >
                              <Input placeholder="电话" className="phone-input" />
                            </Form.Item>
                          </Input.Group>
                        </Form.Item>
        
                        <Form.Item
                          name="address"
                          label={<span className="form-label">
                            <span className="required">*</span>联系人地址
                          </span>}
                          rules={[{ required: true, message: '请输入联系人地址' }]}
                        >
                          <Input placeholder="发货人地址" />
                        </Form.Item>
        
                        <Form.Item
                          name="email"
                          label={<span className="form-label">
                            <span className="required">*</span>联系人邮箱
                          </span>}
                          rules={[
                            { required: true, message: '请输入联系人邮箱' },
                            { type: 'email', message: '请输入有效的邮箱地址' }
                          ]}
                        >
                          <Input placeholder="发货人邮箱" />
                        </Form.Item>
                      </>
                    ) : (
                      // Individual Form Fields
                      <>
                        <Form.Item
                          name="contactName"
                          label={<span className="form-label">
                            <span className="required">*</span>收货人姓名
                          </span>}
                          rules={[{ required: true, message: '请输入收货人姓名' }]}
                        >
                          <Input placeholder="收货人姓名" />
                        </Form.Item>
        
                        <Form.Item
                          name="country"
                          label={<span className="form-label">
                            <span className="required">*</span>国家
                          </span>}
                          rules={[{ required: true, message: '请选择国家' }]}
                        >
                          <Select placeholder="请选择">
                            <Option value="澳大利亚">澳大利亚</Option>
                            <Option value="中国">中国</Option>
                          </Select>
                        </Form.Item>
        
                        <Form.Item
                          name="idDocument"
                          label={<span className="form-label">
                            <span className="required">*</span>收货人驾照或护照扫描件
                          </span>}
                          rules={[{ required: true, message: '请上传驾照或护照扫描件' }]}
                        >
                          <div className="upload-section">
                            <div className="upload-icon">
                              <InboxOutlined />
                            </div>
                            <div className="upload-text">点击或者拖动文件到这区域来上传。</div>
                            <div className="upload-hint">支持.jpg .png .pdf等文件格式</div>
                          </div>
                        </Form.Item>
        
                        <Form.Item
                          label={<span className="form-label">
                            <span className="required">*</span>收货人电话
                          </span>}
                          required
                        >
                          <Input.Group compact className="phone-group">
                            <Form.Item
                              name="countryCode"
                              noStyle
                              rules={[{ required: true, message: '请选择国际区号' }]}
                            >
                              <Select placeholder="+61" className="country-code">
                                <Option value="+61">+61</Option>
                                <Option value="+86">+86</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name="phone"
                              noStyle
                              rules={[{ required: true, message: '请输入电话号码' }]}
                            >
                              <Input placeholder="电话" className="phone-input" />
                            </Form.Item>
                          </Input.Group>
                        </Form.Item>
        
                        <Form.Item
                          name="address"
                          label={<span className="form-label">
                            <span className="required">*</span>收货人地址
                          </span>}
                          rules={[{ required: true, message: '请输入收货人地址' }]}
                        >
                          <Input placeholder="收货人地址" />
                        </Form.Item>
        
                        <Form.Item
                          name="email"
                          label={<span className="form-label">
                            <span className="required">*</span>收货人邮箱
                          </span>}
                          rules={[
                            { required: true, message: '请输入收货人邮箱' },
                            { type: 'email', message: '请输入有效的邮箱地址' }
                          ]}
                        >
                          <Input placeholder="收货人邮箱" />
                        </Form.Item>
                      </>
                    );
                  }}
                </Form.Item>

                <Form.Item
                  name="expectedShipDate"
                  label={<span className="form-label">
                    <span className="required">*</span>期望出货日期
                  </span>}
                  rules={[{ required: true, message: '请选择期望出货日期' }]}
                >
                  <DatePicker placeholder="选择日期" style={{ width: '100%' }} />
                </Form.Item>

                <Flex justify="flex-end" gap={spacing.sm}>
                  <Button onClick={handleCancelEdit}>取消</Button>
                  <Button type="primary" onClick={handleSaveShipper}>
                    确认
                  </Button>
                </Flex>
              </Form>
            )}
          </StyledPanel>

          <StyledPanel 
            key="consignee" 
            header={
              <Space>
                <span className="title">收货方资料</span>
                <Text type="secondary" style={{ fontSize: 12 }}>（提交申请前必须添加收货方）</Text>
              </Space>
            }
          >
            {!isConsigneeEditing ? (
              <>
                <div style={{ position: 'relative' }}>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={handleEditConsignee}
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                  <StyledDescriptions
                    column={1} 
                    bordered={false}
                    colon={true}
                    labelStyle={{ width: '150px' }}
                  >
                    <Descriptions.Item label="收货方类型">
                      {consigneeInfo.consigneeType === 'company' ? '公司' : '个人'}
                    </Descriptions.Item>
                    
                    {consigneeInfo.consigneeType === 'company' && consigneeInfo.companyName && (
                      <>
                        <Descriptions.Item label="公司名">
                          {consigneeInfo.companyName}
                        </Descriptions.Item>
                        {consigneeInfo.abn && (
                          <Descriptions.Item label="公司ABN或税号">
                            {consigneeInfo.abn}
                          </Descriptions.Item>
                        )}
                      </>
                    )}
                    
                    <Descriptions.Item label="国家">{consigneeInfo.country}</Descriptions.Item>
                    {consigneeInfo.consigneeType === 'company' && (
                      <Descriptions.Item label="城市">{consigneeInfo.city}</Descriptions.Item>
                    )}
                    <Descriptions.Item label={consigneeInfo.consigneeType === 'company' ? '联系人姓名' : '收货人姓名'}>
                      {consigneeInfo.contactName}
                    </Descriptions.Item>
                    <Descriptions.Item label={consigneeInfo.consigneeType === 'company' ? '联系人电话' : '收货人电话'}>
                      {`${consigneeInfo.countryCode} ${consigneeInfo.phone}`}
                    </Descriptions.Item>
                    <Descriptions.Item label={consigneeInfo.consigneeType === 'company' ? '联系人地址' : '收货人地址'}>
                      {consigneeInfo.address}
                    </Descriptions.Item>
                    <Descriptions.Item label={consigneeInfo.consigneeType === 'company' ? '联系人邮箱' : '收货人邮箱'}>
                      {consigneeInfo.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="收货人注释">{consigneeInfo.notes}</Descriptions.Item>
                  </StyledDescriptions>
                </div>
              </>
            ) : (
              <Form
                form={consigneeForm}
                layout="vertical"
                initialValues={consigneeInfo}
                onValuesChange={handleConsigneeFormValuesChange}
              >
                <Form.Item
                  name="consigneeType"
                  label={<span className="form-label">
                    <span className="required">*</span>收货方类型
                  </span>}
                  rules={[{ required: true, message: '请选择收货方类型' }]}
                >
                  <Radio.Group onChange={(e) => {
                    const value = e.target.value;
                    consigneeForm.setFieldsValue({ consigneeType: value });
                    console.log('Radio value changed to:', value);
                  }}>
                    <Radio value="company">公司</Radio>
                    <Radio value="individual">个人</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item noStyle dependencies={['consigneeType']}>
                  {({ getFieldValue }) => {
                    const type = getFieldValue('consigneeType');
                    return type === 'company' ? (
                      // Company Form Fields
                      <>
                        <Form.Item
                          name="companyName"
                          label={<span className="form-label">
                            <span className="required">*</span>公司名
                          </span>}
                          rules={[{ required: true, message: '请输入公司名' }]}
                        >
                          <Input placeholder="公司名" />
                        </Form.Item>
            
                        <Form.Item
                          name="country"
                          label={<span className="form-label">
                            <span className="required">*</span>国家
                          </span>}
                          rules={[{ required: true, message: '请选择国家' }]}
                        >
                          <Select placeholder="请选择">
                            <Option value="澳大利亚">澳大利亚</Option>
                            <Option value="中国">中国</Option>
                          </Select>
                        </Form.Item>
            
                        <Form.Item
                          name="city"
                          label={<span className="form-label">
                            <span className="required">*</span>城市
                          </span>}
                          rules={[{ required: true, message: '请选择城市' }]}
                        >
                          <Select placeholder="请选择">
                            <Option value="悉尼">悉尼</Option>
                            <Option value="墨尔本">墨尔本</Option>
                          </Select>
                        </Form.Item>
            
                        <Form.Item
                          name="abn"
                          label={<span className="form-label">
                            <span className="required">*</span>公司ABN或税号
                          </span>}
                          rules={[{ required: true, message: '请输入公司ABN或税号' }]}
                        >
                          <Input placeholder="公司ABN" />
                        </Form.Item>
            
                        <Form.Item
                          name="contactName"
                          label={<span className="form-label">
                            <span className="required">*</span>联系人姓名
                          </span>}
                          rules={[{ required: true, message: '请输入联系人姓名' }]}
                        >
                          <Input placeholder="联系人姓名" />
                        </Form.Item>
            
                        <Form.Item
                          label={<span className="form-label">
                            <span className="required">*</span>联系人电话
                          </span>}
                          required
                        >
                          <Input.Group compact className="phone-group">
                            <Form.Item
                              name="countryCode"
                              noStyle
                              rules={[{ required: true, message: '请选择国际区号' }]}
                            >
                              <Select placeholder="+61" className="country-code">
                                <Option value="+61">+61</Option>
                                <Option value="+86">+86</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name="phone"
                              noStyle
                              rules={[{ required: true, message: '请输入电话号码' }]}
                            >
                              <Input placeholder="电话" className="phone-input" />
                            </Form.Item>
                          </Input.Group>
                        </Form.Item>
            
                        <Form.Item
                          name="address"
                          label={<span className="form-label">
                            <span className="required">*</span>联系人地址
                          </span>}
                          rules={[{ required: true, message: '请输入联系人地址' }]}
                        >
                          <Input placeholder="收货人地址" />
                        </Form.Item>
            
                        <Form.Item
                          name="email"
                          label={<span className="form-label">
                            <span className="required">*</span>联系人邮箱
                          </span>}
                          rules={[
                            { required: true, message: '请输入联系人邮箱' },
                            { type: 'email', message: '请输入有效的邮箱地址' }
                          ]}
                        >
                          <Input placeholder="收货人邮箱" />
                        </Form.Item>
                      </>
                    ) : (
                      // Individual Form Fields
                      <>
                        <Form.Item
                          name="contactName"
                          label={<span className="form-label">
                            <span className="required">*</span>收货人姓名
                          </span>}
                          rules={[{ required: true, message: '请输入收货人姓名' }]}
                        >
                          <Input placeholder="收货人姓名" />
                        </Form.Item>
            
                        <Form.Item
                          name="country"
                          label={<span className="form-label">
                            <span className="required">*</span>国家
                          </span>}
                          rules={[{ required: true, message: '请选择国家' }]}
                        >
                          <Select placeholder="请选择">
                            <Option value="澳大利亚">澳大利亚</Option>
                            <Option value="中国">中国</Option>
                          </Select>
                        </Form.Item>
            
                        <Form.Item
                          name="idDocument"
                          label={<span className="form-label">
                            <span className="required">*</span>收货人驾照或护照扫描件
                          </span>}
                          rules={[{ required: true, message: '请上传驾照或护照扫描件' }]}
                        >
                          <div className="upload-section">
                            <div className="upload-icon">
                              <InboxOutlined />
                            </div>
                            <div className="upload-text">点击或者拖动文件到这区域来上传。</div>
                            <div className="upload-hint">支持.jpg .png .pdf等文件格式</div>
                          </div>
                        </Form.Item>
            
                        <Form.Item
                          label={<span className="form-label">
                            <span className="required">*</span>收货人电话
                          </span>}
                          required
                        >
                          <Input.Group compact className="phone-group">
                            <Form.Item
                              name="countryCode"
                              noStyle
                              rules={[{ required: true, message: '请选择国际区号' }]}
                            >
                              <Select placeholder="+61" className="country-code">
                                <Option value="+61">+61</Option>
                                <Option value="+86">+86</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name="phone"
                              noStyle
                              rules={[{ required: true, message: '请输入电话号码' }]}
                            >
                              <Input placeholder="电话" className="phone-input" />
                            </Form.Item>
                          </Input.Group>
                        </Form.Item>
            
                        <Form.Item
                          name="address"
                          label={<span className="form-label">
                            <span className="required">*</span>收货人地址
                          </span>}
                          rules={[{ required: true, message: '请输入收货人地址' }]}
                        >
                          <Input placeholder="收货人地址" />
                        </Form.Item>
            
                        <Form.Item
                          name="email"
                          label={<span className="form-label">
                            <span className="required">*</span>收货人邮箱
                          </span>}
                          rules={[
                            { required: true, message: '请输入收货人邮箱' },
                            { type: 'email', message: '请输入有效的邮箱地址' }
                          ]}
                        >
                          <Input placeholder="收货人邮箱" />
                        </Form.Item>
                      </>
                    );
                  }}
                </Form.Item>

                <Form.Item
                  name="notes"
                  label={<span className="form-label">
                    收货人注释
                  </span>}
                >
                  <Input.TextArea placeholder="收货人注释" rows={2} />
                </Form.Item>

                <Flex justify="flex-end" gap={spacing.sm}>
                  <Button onClick={handleCancelConsigneeEdit}>取消</Button>
                  <Button type="primary" onClick={handleSaveConsignee}>
                    确认
                  </Button>
                </Flex>
              </Form>
            )}
          </StyledPanel>

          <StyledPanel 
            key="container1" 
            header={<span className="title">货柜 1 信息</span>}
          >
            <StyledCard bordered={false}>
              <Flex justify="space-between" align="start">
                <StyledDescriptions column={1} bordered={false}>
                  <Descriptions.Item label="柜型">20 GP</Descriptions.Item>
                  <Descriptions.Item label="货物总重(kg)">16000</Descriptions.Item>
                  <Descriptions.Item label="装柜地址">河南省 郑州市 郑东新区空港区富航路7号</Descriptions.Item>
                  <Descriptions.Item label="联系人">张三</Descriptions.Item>
                  <Descriptions.Item label="联系电话">+86 13611112222</Descriptions.Item>
                </StyledDescriptions>
                <Button type="text" icon={<EditOutlined />} />
              </Flex>
            </StyledCard>

            <Divider style={{ margin: `${spacing.md} 0` }} />
            
            <SectionTitle level={5}>货柜1内商品信息（共 2 套商品）</SectionTitle>
            
            <List
              itemLayout="vertical"
              dataSource={[
                {
                  name: '桌子',
                  englishName: 'table',
                  quantity: 10,
                  packageCount: 2,
                  material: '木质',
                  volume: '32 立方米',
                  price: '34 AUD',
                  value: '340 AUD'
                },
                {
                  name: '椅子',
                  englishName: 'chair',
                  quantity: 10,
                  packageCount: 2,
                  material: '木质',
                  volume: '32 立方米',
                  price: '34 AUD',
                  value: '340 AUD'
                }
              ]}
              renderItem={item => (
                <ProductItem>
                  <div className="product-header">
                    <div className="left-section">
                      <div className="product-title">
                        <span className="product-id">商品 1</span>
                      </div>
                      <div className="name-group">
                        <div className="name-item">
                          <span className="label">中文品名：</span>
                          <span className="value">{item.name}</span>
                        </div>
                        <div className="name-item">
                          <span className="label">英文品名：</span>
                          <span className="value">{item.englishName}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="edit-button" 
                      type="text" 
                      icon={<EditOutlined />} 
                      size="small"
                    />
                  </div>
                  <div className="product-content">
                    <div className="info-item">
                      <span className="label">箱号</span>
                      <span className="value">12312ASA</span>
                    </div>
                    <div className="info-item">
                      <span className="label">箱数</span>
                      <span className="value">2</span>
                    </div>
                    <div className="info-item">
                      <span className="label">商品材质</span>
                      <span className="value">木质</span>
                    </div>
                    <div className="info-item">
                      <span className="label">货币</span>
                      <span className="value">AUD</span>
                    </div>
                    <div className="info-item">
                      <span className="label">商品套数</span>
                      <span className="value">10</span>
                    </div>
                    <div className="info-item">
                      <span className="label">重量(kg)</span>
                      <span className="value">1000</span>
                    </div>
                    <div className="info-item">
                      <span className="label">体积(cbm)</span>
                      <span className="value">32 立方米</span>
                    </div>
                    <div className="info-item">
                      <span className="label">单价</span>
                      <span className="value highlight">34 AUD</span>
                    </div>
                    <div className="info-item">
                      <span className="label">货值</span>
                      <span className="value highlight">340 AUD</span>
                    </div>
                  </div>
                </ProductItem>
              )}
            />
          </StyledPanel>

          <StyledPanel 
            key="container2" 
            header={<span className="title">货柜 2 信息</span>}
          >
            <StyledCard bordered={false}>
              <Flex justify="space-between" align="start">
                <StyledDescriptions column={1} bordered={false}>
                  <Descriptions.Item label="柜型">20 GP</Descriptions.Item>
                  <Descriptions.Item label="货物总重(kg)">16000</Descriptions.Item>
                  <Descriptions.Item label="装柜地址">河南省 郑州市 郑东新区空港区富航路7号</Descriptions.Item>
                  <Descriptions.Item label="联系人">张三</Descriptions.Item>
                  <Descriptions.Item label="联系电话">+86 13611112222</Descriptions.Item>
                </StyledDescriptions>
                <Button type="text" icon={<EditOutlined />} />
              </Flex>
            </StyledCard>

            <Divider style={{ margin: `${spacing.md} 0` }} />
            
            <SectionTitle level={5}>货柜2内商品信息（共 2 套商品）</SectionTitle>
            
            <List
              itemLayout="vertical"
              dataSource={[
                {
                  name: '桌子',
                  englishName: 'table',
                  quantity: 10,
                  packageCount: 2,
                  material: '木质',
                  volume: '32 立方米',
                  price: '34 AUD',
                  value: '340 AUD'
                },
                {
                  name: '椅子',
                  englishName: 'chair',
                  quantity: 10,
                  packageCount: 2,
                  material: '木质',
                  volume: '32 立方米',
                  price: '34 AUD',
                  value: '340 AUD'
                }
              ]}
              renderItem={item => (
                <ProductItem>
                  <div className="product-header">
                    <div className="left-section">
                      <div className="product-title">
                        <span className="product-id">商品 1</span>
                      </div>
                      <div className="name-group">
                        <div className="name-item">
                          <span className="label">中文品名：</span>
                          <span className="value">{item.name}</span>
                        </div>
                        <div className="name-item">
                          <span className="label">英文品名：</span>
                          <span className="value">{item.englishName}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="edit-button" 
                      type="text" 
                      icon={<EditOutlined />} 
                      size="small"
                    />
                  </div>
                  <div className="product-content">
                    <div className="info-item">
                      <span className="label">箱号</span>
                      <span className="value">12312ASA</span>
                    </div>
                    <div className="info-item">
                      <span className="label">箱数</span>
                      <span className="value">2</span>
                    </div>
                    <div className="info-item">
                      <span className="label">商品材质</span>
                      <span className="value">木质</span>
                    </div>
                    <div className="info-item">
                      <span className="label">货币</span>
                      <span className="value">AUD</span>
                    </div>
                    <div className="info-item">
                      <span className="label">商品套数</span>
                      <span className="value">10</span>
                    </div>
                    <div className="info-item">
                      <span className="label">重量(kg)</span>
                      <span className="value">1000</span>
                    </div>
                    <div className="info-item">
                      <span className="label">体积(cbm)</span>
                      <span className="value">32 立方米</span>
                    </div>
                    <div className="info-item">
                      <span className="label">单价</span>
                      <span className="value highlight">34 AUD</span>
                    </div>
                    <div className="info-item">
                      <span className="label">货值</span>
                      <span className="value highlight">340 AUD</span>
                    </div>
                  </div>
                </ProductItem>
              )}
            />
          </StyledPanel>

          <StyledPanel 
            key="warehouse" 
            header={<span className="title">货物入库状态</span>}
          >
            <StyledCard 
              title="入库状态" 
              bordered={false}
            >
              <Row gutter={[24, 16]}>
                <Col span={12}>
                  <Statistic 
                    title="总箱数" 
                    value={32} 
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="已入库箱数" 
                    value={1} 
                    valueStyle={{ color: '#52c41a', fontSize: '16px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="待入库箱数" 
                    value={31} 
                    valueStyle={{ color: '#fa8c16', fontSize: '16px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="入库异常箱数" 
                    value={0} 
                    valueStyle={{ color: '#ff4d4f', fontSize: '16px' }}
                  />
                </Col>
              </Row>
            </StyledCard>
            
            <StyledCard 
              title="入库记录" 
              bordered={false} 
              style={{ marginTop: spacing.md }}
            >
              <Timeline
                items={[
                  {
                    dot: <Badge status="success" />,
                    children: (
                      <>
                        <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                          2024-01-15 14:30:00
                        </Text>
                        <Text>货物已入库 - 箱数：1</Text>
                      </>
                    ),
                  },
                  {
                    children: (
                      <>
                        <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                          2024-01-15 10:20:00
                        </Text>
                        <Text>货物已到达仓库，等待入库</Text>
                      </>
                    ),
                  },
                  {
                    children: (
                      <>
                        <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                          2024-01-14 16:45:00
                        </Text>
                        <Text>货物运输中</Text>
                      </>
                    ),
                  },
                ]}
              />
            </StyledCard>
          </StyledPanel>

          <StyledPanel 
            key="tax" 
            header={<span className="title">税单</span>}
          >
            <StyledCard 
              title="税费信息" 
              bordered={false}
            >
              <Row gutter={[24, 16]}>
                <Col span={12}>
                  <Statistic 
                    title="商品总价值" 
                    value={35435} 
                    suffix="AUD"
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="GST税率" 
                    value={10} 
                    suffix="%"
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="应缴GST税费" 
                    value={3543.50} 
                    suffix="AUD"
                    valueStyle={{ color: '#1890ff', fontWeight: 500, fontSize: '16px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="关税税率" 
                    value={5} 
                    suffix="%"
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="应缴关税" 
                    value={1771.75} 
                    suffix="AUD"
                    valueStyle={{ color: '#1890ff', fontWeight: 500, fontSize: '16px' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="总税费" 
                    value={5315.25} 
                    suffix="AUD"
                    valueStyle={{ color: '#1890ff', fontWeight: 500, fontSize: '16px' }}
                  />
                </Col>
              </Row>
            </StyledCard>
          </StyledPanel>
        </StyledCollapse>

      </ContentContainer>

      <Modal
        title={null}
        open={isLabelModalVisible}
        onCancel={handleLabelModalClose}
        footer={null}
        width={450}
        centered
        className="shipping-label-modal"
      >
        <Card 
          ref={labelContentRef} 
          bodyStyle={{ padding: 16 }}
          className="shipping-label"
        >
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            {/* Header with Logo and Barcode */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Company Logo and Name - More Compact */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <LogoIcon className="logo" style={{ width: 60 }} />
                <div style={{ flex: 1 }}>
                  <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 0 }}>LogistiEXPRESS</Text>
                  <Text type="secondary" style={{ fontSize: 10 }}>International Logistics</Text>
                </div>
                <Text style={{ 
                  backgroundColor: '#1890ff', 
                  color: 'white', 
                  padding: '0 8px', 
                  borderRadius: 4,
                  fontSize: 12 
                }}>SYD</Text>
              </div>

              {/* Full Width Barcode */}
              <div className="barcode-section" style={{ width: '100%' }}>
                <BarcodeIcon value={bookingNumber || 'AU1000888'} style={{ width: '100%', height: 40 }} />
                <Text style={{ fontSize: 12 }}>{bookingNumber || 'AU1000888'}</Text>
              </div>
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {/* Left Column */}
              <div>
                {/* Consignee Information */}
                <div style={{ marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 12, display: 'block', backgroundColor: '#f5f5f5', padding: '2px 4px' }}>
                    CONSIGNEE
                  </Text>
                  <div style={{ fontSize: 12, lineHeight: '16px' }}>
                    <Text strong>HePinyu</Text><br />
                    <Text>25 Lombard St</Text><br />
                    <Text>FAIRFIELD NSW 2165</Text><br />
                    <Text>Ph: 0406222886</Text>
                  </div>
                </div>

                {/* Shipping Details */}
                <div>
                  <Text strong style={{ fontSize: 12, display: 'block', backgroundColor: '#f5f5f5', padding: '2px 4px' }}>
                    SHIPMENT
                  </Text>
                  <div style={{ fontSize: 12, lineHeight: '16px' }}>
                    <Text>Pieces: 1/32</Text><br />
                    <Text>Weight: 14.25 kg</Text><br />
                    <Text>Container: 20GP</Text><br />
                    <Text>Ship Date: 12/11/24</Text>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Distribution Center */}
                <div style={{ marginBottom: 8 }}>
                  <Text strong style={{ fontSize: 12, display: 'block', backgroundColor: '#f5f5f5', padding: '2px 4px' }}>
                    DISTRIBUTION CENTER
                  </Text>
                  <div style={{ fontSize: 12, lineHeight: '16px' }}>
                    <Text>LogistiEXPRESS Sydney</Text><br />
                    <Text>56a ANZAC ST</Text><br />
                    <Text>CHULLORA NSW 2190</Text><br />
                    <Text>Tel: +61 2 9738 0000</Text>
                  </div>
                </div>

                {/* QR Code */}
                <div style={{ textAlign: 'center' }}>
                  <QRCodeIcon value={bookingNumber || 'AU1000888'} style={{ width: 80, height: 80 }} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 8, marginTop: 'auto' }}>
              <Row gutter={8}>
                <Col span={12}>
                  <div style={{ 
                    border: '1px solid #d9d9d9', 
                    padding: 4, 
                    borderRadius: 2,
                    height: 24
                  }}>
                    <Text type="secondary" style={{ fontSize: 10 }}>Signature</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ 
                    border: '1px solid #d9d9d9', 
                    padding: 4, 
                    borderRadius: 2,
                    height: 24
                  }}>
                    <Text type="secondary" style={{ fontSize: 10 }}>Date</Text>
                  </div>
                </Col>
              </Row>
            </div>
          </Space>
        </Card>

        {/* These elements will be hidden during printing */}
        <Alert
          message="请务必下载哨头面单，打印并贴于每件货物外箱；如缺哨头面单，将无法正常入仓。"
          type="warning"
          showIcon
          style={{ margin: '16px 0' }}
        />

        <Text type="secondary" style={{ display: 'block', margin: '16px 0' }}>
          Note: For delivery confirmation, ensure signature capture and take 2 photos of delivered items
        </Text>

        <Space style={{ display: 'flex', justifyContent: 'space-between' }} className="action-buttons">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            下载面单
          </Button>
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            onClick={handlePrint}
          >
            打印面单
          </Button>
        </Space>
      </Modal>
    </StyledLayout>
  );
};

export default BookingDetails;