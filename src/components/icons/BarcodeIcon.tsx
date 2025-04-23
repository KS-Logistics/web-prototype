import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeIconProps {
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

const BarcodeIcon: React.FC<BarcodeIconProps> = ({ value, className, style }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10,
      });
    }
  }, [value]);

  return (
    <svg ref={svgRef} className={className} style={style}></svg>
  );
};

export default BarcodeIcon; 