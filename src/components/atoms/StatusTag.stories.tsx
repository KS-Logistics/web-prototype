import type { Meta, StoryObj } from '@storybook/react';
import StatusTag from './StatusTag';

const meta: Meta<typeof StatusTag> = {
  title: 'Atoms/StatusTag',
  component: StatusTag,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['Processing', 'In Transit', 'Delayed', 'Delivered', 'Customs Clearance', 'Loading', 'Unloading', 'Departed'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusTag>;

export const Processing: Story = {
  args: {
    status: 'Processing',
  },
};

export const InTransit: Story = {
  args: {
    status: 'In Transit',
  },
};

export const Delayed: Story = {
  args: {
    status: 'Delayed',
  },
};

export const Delivered: Story = {
  args: {
    status: 'Delivered',
  },
};

export const Small: Story = {
  args: {
    status: 'In Transit',
    size: 'small',
  },
};
