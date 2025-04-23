import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDigit: Story = {
  args: {
    count: 9,
  },
};

export const DoubleDigits: Story = {
  args: {
    count: 99,
  },
};

export const WithOverflow: Story = {
  args: {
    count: 999,
    overflowCount: 99,
  },
};

export const Dot: Story = {
  args: {
    dot: true,
  },
};

export const WithContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Badge count={9}>
        <div style={{ width: '40px', height: '40px', background: '#f0f0f0' }} />
      </Badge>
      <Badge count={99}>
        <div style={{ width: '40px', height: '40px', background: '#f0f0f0' }} />
      </Badge>
      <Badge dot>
        <div style={{ width: '40px', height: '40px', background: '#f0f0f0' }} />
      </Badge>
    </div>
  ),
}; 