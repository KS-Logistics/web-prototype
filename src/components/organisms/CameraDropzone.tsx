import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Upload, message } from 'antd';
import { CameraOutlined, UploadOutlined } from '@ant-design/icons';
import { colors, spacing, borderRadius } from '../../styles/theme';
import CameraPreview from '../atoms/CameraPreview';
import CameraControls from '../molecules/CameraControls';

const { Dragger } = Upload;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 300px;
  border-radius: ${borderRadius.medium};
  overflow: hidden;
`;

const StyledDropzone = styled(Dragger)`
  &.ant-upload-wrapper {
    .ant-upload {
      background: ${colors.background.light};
      border: 2px dashed ${colors.border.light};
      border-radius: ${borderRadius.medium};
      padding: ${spacing.xl};
      
      &:hover {
        border-color: #1890ff;
      }
    }
  }

  .upload-hint {
    margin-top: ${spacing.md};
    color: ${colors.text.secondary};
    font-size: 14px;
  }
`;

const CameraContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

interface CameraDropzoneProps {
  onFileSelect: (file: File) => void;
  onCapture: (blob: Blob) => void;
  accept?: string;
  maxSize?: number;
}

const CameraDropzone: React.FC<CameraDropzoneProps> = ({
  onFileSelect,
  onCapture,
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024, // 10MB
}) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(1);
  const [maxZoom, setMaxZoom] = useState(1);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        }
      });

      setStream(mediaStream);
      setIsCameraActive(true);

      // Get zoom capabilities
      const track = mediaStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      if ('zoom' in capabilities) {
        setMinZoom(capabilities.zoom?.min || 1);
        setMaxZoom(capabilities.zoom?.max || 1);
      }
    } catch (error) {
      message.error('无法访问相机，请检查权限设置');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  }, [stream]);

  const handleCapture = useCallback(() => {
    if (!stream) return;

    const video = document.querySelector('video');
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            onCapture(blob);
            stopCamera();
          }
        }, 'image/jpeg', 0.95);
      }
    }
  }, [stream, onCapture, stopCamera]);

  const handleZoomChange = useCallback((value: number) => {
    setZoom(value);
  }, []);

  const uploadProps = {
    accept,
    maxSize,
    multiple: false,
    showUploadList: false,
    beforeUpload: (file: File) => {
      if (file.size > maxSize) {
        message.error('文件大小不能超过10MB');
        return false;
      }
      onFileSelect(file);
      return false;
    },
  };

  return (
    <Container>
      {isCameraActive ? (
        <CameraContainer>
          <CameraPreview stream={stream} zoom={zoom} />
          <CameraControls
            zoom={zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            onZoomChange={handleZoomChange}
            onCapture={handleCapture}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </CameraContainer>
      ) : (
        <StyledDropzone {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
          <p className="upload-hint">支持jpg、png、pdf格式，单个文件不超过10MB</p>
          <div style={{ marginTop: spacing.md }}>
            <span 
              onClick={(e) => {
                e.stopPropagation();
                startCamera();
              }}
              style={{ 
                cursor: 'pointer',
                color: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: spacing.xs
              }}
            >
              <CameraOutlined />
              使用相机拍照
            </span>
          </div>
        </StyledDropzone>
      )}
    </Container>
  );
};

export default CameraDropzone; 