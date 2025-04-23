import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeIconProps {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

const QRCodeIcon: React.FC<QRCodeIconProps> = ({ value, className, style }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: 128,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
    }
  }, [value]);

  return (
    <canvas ref={canvasRef} className={className} style={style}></canvas>
  );
};

export default QRCodeIcon; 