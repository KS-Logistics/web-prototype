import type { Meta, StoryObj } from '@storybook/react';
import ContainerDetail from './ContainerDetail';

const meta: Meta<typeof ContainerDetail> = {
  title: 'Organisms/ContainerDetail',
  component: ContainerDetail,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ContainerDetail>;

export const Default: Story = {
  args: {
    containerNumber: 'ABCD1234567',
    status: '进行中',
    type: '40GP',
    weight: '25',
    destination: '上海港',
    loadingPort: '深圳港',
    dischargePort: '上海港',
    vessel: 'COSCO SHIPPING PISCES',
    voyage: '023W',
    eta: '2024-03-25 14:30',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Completed: Story = {
  args: {
    containerNumber: 'WXYZ9876543',
    status: '已完成',
    type: '20GP',
    weight: '18',
    destination: '宁波港',
    loadingPort: '广州港',
    dischargePort: '宁波港',
    vessel: 'OOCL TOKYO',
    voyage: '108E',
    eta: '2024-03-20 09:00',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
