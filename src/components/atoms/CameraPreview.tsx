import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { borderRadius } from '../../styles/theme';

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
  border-radius: ${borderRadius.medium};
  overflow: hidden;
  background: #000;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface CameraPreviewProps {
  stream: MediaStream | null;
  zoom: number;
}

const CameraPreview: React.FC<CameraPreviewProps> = ({ stream, zoom }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (videoRef.current && stream) {
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      if ('zoom' in capabilities) {
        track.applyConstraints({
          advanced: [{ zoom }]
        });
      }
    }
  }, [zoom, stream]);

  return (
    <PreviewContainer>
      <Video
        ref={videoRef}
        autoPlay
        playsInline
        muted
      />
    </PreviewContainer>
  );
};

export default CameraPreview; 