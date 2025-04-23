import type { Meta, StoryObj } from '@storybook/react';
import { Action } from './Action';

const meta = {
  title: 'Atoms/Action',
  component: Action,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Action>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ViewDetails: Story = {
  args: {
    children: '查看详情',
    withArrow: true,
  },
};

export const View: Story = {
  args: {
    variant: 'secondary',
    children: '查看',
    withArrow: true,
  },
};

export const Edit: Story = {
  args: {
    children: '编辑',
  },
};

export const Disabled: Story = {
  args: {
    children: '查看详情',
    withArrow: true,
    disabled: true,
  },
};

export const AllActions: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      alignItems: 'flex-start' 
    }}>
      <div style={{ display: 'flex', gap: '24px' }}>
        <Action withArrow>查看详情</Action>
        <Action variant="secondary" withArrow>查看</Action>
        <Action>编辑</Action>
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        <Action disabled withArrow>查看详情</Action>
        <Action variant="secondary" disabled withArrow>查看</Action>
        <Action disabled>编辑</Action>
      </div>
    </div>
  ),
}; 