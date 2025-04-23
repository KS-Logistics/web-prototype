import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { colors, spacing } from '../../styles/theme';
import CameraDropzone from '../organisms/CameraDropzone';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

const FileLink = styled.a`
  color: #1890ff;
  font-size: 14px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }

  .anticon {
    font-size: 14px;
  }
`;

const Label = styled.span`
  color: ${colors.text.secondary};
  font-size: 14px;
`;

interface FileUploadItemProps {
  label: string;
  onFileSelect: (file: File | Blob) => void;
}

const FileUploadItem: React.FC<FileUploadItemProps> = ({
  label,
  onFileSelect,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFileSelect = (file: File) => {
    onFileSelect(file);
    setIsModalVisible(false);
  };

  const handleCapture = (blob: Blob) => {
    onFileSelect(blob);
    setIsModalVisible(false);
  };

  return (
    <Container>
      <Label>{label}</Label>
      <FileLink onClick={() => setIsModalVisible(true)}>
        <FileTextOutlined />
        点击上传
      </FileLink>

      <Modal
        title={`上传${label}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
        centered
      >
        <CameraDropzone
          onFileSelect={handleFileSelect}
          onCapture={handleCapture}
          accept="image/*,.pdf"
          maxSize={10 * 1024 * 1024}
        />
      </Modal>
    </Container>
  );
};

export default FileUploadItem; 