import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '标签',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '标签',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: '标签',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: '标签',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: '标签',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Tag>标签</Tag>
      <Tag variant="primary">标签</Tag>
      <Tag variant="success">标签</Tag>
      <Tag variant="warning">标签</Tag>
      <Tag variant="error">标签</Tag>
    </div>
  ),
}; 