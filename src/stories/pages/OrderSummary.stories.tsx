import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import OrderSummary from '../../pages/OrderSummary';
import { Layout } from 'antd';
import styled from 'styled-components';

const StoryLayout = styled(Layout)`
  max-width: 375px;
  margin: 0 auto;
  overflow: hidden;
`;

const meta = {
  title: 'Pages/OrderSummary',
  component: OrderSummary,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <StoryLayout>
        <Story />
      </StoryLayout>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack clicked' },
    onNext: { 
      action: 'onNext clicked',
      description: 'Called after confirming in the modal dialog'
    },
  },
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = {
  basicInfo: {
    transportType: '海运',
    route: '中国大陆→澳大利亚',
    departurePort: '连云港',
    destinationPort: '悉尼',
  },
  cargoInfo: [
    {
      containerType: '整柜',
      cargoType: '普通货物',
      weight: '1000',
      dimensions: '20',
      hasWarehouse: true,
      warehouseAddress: '上海市浦东新区XX路XX号',
      contact: '张三',
      phone: '+86 13800138000',
    },
    {
      containerType: '拼柜',
      cargoType: '冷藏货物',
      weight: '500',
      dimensions: '10',
      hasWarehouse: false,
    },
  ],
};

export const Mobile: Story = {
  args: {
    data: sampleData,
  },
  parameters: {
    docs: {
      description: {
        story: 'The order summary page shows a confirmation modal when clicking the next button. The modal asks for confirmation before creating a booking number.',
      },
    },
  },
}; 