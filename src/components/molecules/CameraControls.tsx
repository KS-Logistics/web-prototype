import React from 'react';
import styled from 'styled-components';
import { Slider } from 'antd';
import { ZoomInOutlined, ZoomOutOutlined, CameraOutlined } from '@ant-design/icons';
import { colors, spacing, borderRadius } from '../../styles/theme';
import IconButton from '../atoms/IconButton';

const ControlsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.lg};
  padding-bottom: ${spacing.xl};
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.sm} ${spacing.md};
  background: rgba(0, 0, 0, 0.6);
  border-radius: 100px;
  backdrop-filter: blur(8px);
  min-width: 240px;
`;

const ZoomButton = styled(IconButton)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  color: ${colors.text.primary};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${colors.background.light};
  }

  .anticon {
    font-size: 20px;
  }
`;

const ZoomSlider = styled(Slider)`
  flex: 1;
  margin: 0 ${spacing.xs};

  .ant-slider-rail {
    background-color: rgba(255, 255, 255, 0.3);
    height: 2px;
  }

  .ant-slider-track {
    background-color: white;
    height: 2px;
  }

  .ant-slider-handle {
    width: 12px;
    height: 12px;
    border-color: white;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: -5px;

    &:hover, &:active {
      border-color: white;
    }
  }
`;

const CaptureButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${colors.primary};
  border: 4px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  .anticon {
    color: white;
    font-size: 32px;
  }
`;

interface CameraControlsProps {
  onZoomChange: (value: number) => void;
  onCapture: () => void;
  minZoom?: number;
  maxZoom?: number;
  currentZoom?: number;
}

const CameraControls: React.FC<CameraControlsProps> = ({
  onZoomChange,
  onCapture,
  minZoom = 1,
  maxZoom = 5,
  currentZoom = 1,
}) => {
  return (
    <ControlsWrapper>
      <ControlsContainer>
        <ZoomButton
          icon={<ZoomOutOutlined />}
          onClick={() => onZoomChange(Math.max(minZoom, currentZoom - 0.5))}
        />
        <ZoomSlider
          min={minZoom}
          max={maxZoom}
          step={0.1}
          value={currentZoom}
          onChange={onZoomChange}
        />
        <ZoomButton
          icon={<ZoomInOutlined />}
          onClick={() => onZoomChange(Math.min(maxZoom, currentZoom + 0.5))}
        />
      </ControlsContainer>
      <CaptureButton onClick={onCapture}>
        <CameraOutlined />
      </CaptureButton>
    </ControlsWrapper>
  );
};

export default CameraControls; 