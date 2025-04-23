import React from 'react';
import { Tag } from 'antd';

export type StatusType = 'Processing' | 'In Transit' | 'Delayed' | 'Delivered' | 'Customs Clearance' | 'Loading' | 'Unloading' | 'Departed';

export interface StatusTagProps {
  status: StatusType | string;
  size?: 'default' | 'small';
}

// Status colors mapping
const statusColors: Record<string, string> = {
  'Processing': 'blue',
  'In Transit': 'green',
  'Delayed': 'red',
  'Delivered': 'gray',
  'Customs Clearance': 'orange',
  'Loading': 'cyan',
  'Unloading': 'geekblue',
  'Departed': 'purple',
};

const StatusTag: React.FC<StatusTagProps> = ({ status, size = 'default' }) => {
  const color = statusColors[status] || 'default';
  
  return (
    <Tag color={color} style={size === 'small' ? { fontSize: '12px', padding: '0 5px' } : undefined}>
      {status}
    </Tag>
  );
};

export default StatusTag;
