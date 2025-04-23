import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { Layout } from 'antd';
import Home from '../../pages/Home';
import CargoDetails from '../../pages/CargoDetails';
import OrderSummary from '../../pages/OrderSummary';
import ShippingRoute from '../../pages/ShippingRoute';
import BookingSuccess from '../../pages/BookingSuccess';
import CargoInput from '../../pages/CargoInput';
import SpecialHandling from '../../pages/SpecialHandling';
import BookingDetails from '../../pages/BookingDetails';

const StoryLayout = styled.div`
  max-width: 375px;
  margin: 0 auto;
  border: 1px solid #eee;
  min-height: 100vh;
  background: white;
`;

const meta = {
  title: '页面/海运整柜',
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
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const HomePage = {
  name: '首页',
  render: () => <Home />,
};

export const ShippingRoutePage = {
  name: '航线选择',
  render: () => (
    <ShippingRoute
      onBack={() => console.log('Back clicked')}
      onNext={(values) => console.log('Next clicked with values:', values)}
    />
  ),
};

export const CargoDetailsPage = {
  name: '货物信息',
  render: () => (
    <CargoDetails
      onBack={() => console.log('Back clicked')}
      onNext={(values) => console.log('Next clicked with values:', values)}
    />
  ),
};

export const OrderSummaryPage = {
  name: '订单确认',
  render: () => (
    <OrderSummary
      onBack={() => console.log('Back clicked')}
      onNext={() => console.log('Next clicked')}
    />
  ),
};

export const BookingSuccessPage = {
  name: '哨头号创建成功',
  render: () => (
    <BookingSuccess
      onEdit={() => console.log('Edit clicked')}
      onNext={() => console.log('Next clicked')}
      bookingData={{
        bookingNumber: 'UE-006-2024',
        origin: '中国-郑州',
        departure: '中国-广州',
        destination: '澳大利亚-悉尼',
        warehouseAddress: '澳大利亚-悉尼',
      }}
    />
  ),
};

export const CargoInputPage = {
  name: '录入商品信息',
  render: () => (
    <CargoInput
      bookingNumber="AU4383"
      onCancel={() => console.log('Cancel clicked')}
      onSave={(values) => console.log('Save clicked with values:', values)}
    />
  ),
};

export const SpecialHandlingPage = {
  name: '特处理',
  render: () => (
    <SpecialHandling
      onBack={() => console.log('Back clicked')}
    />
  ),
};

export const BookingDetailsPage = {
  name: '查看详情',
  render: () => (
    <BookingDetails
      bookingNumber="AU4363"
      onBack={() => console.log('Back clicked')}
    />
  ),
}; 