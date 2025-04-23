import { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: '标签',
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: '标签',
  },
};

export const Success = {
  args: {
    variant: 'success',
    children: '标签',
  },
};

export const Warning = {
  args: {
    variant: 'warning',
    children: '标签',
  },
};

export const Error = {
  args: {
    variant: 'error',
    children: '标签',
  },
};

export const AllVariants = {
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