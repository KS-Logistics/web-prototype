import { Meta, StoryObj } from '@storybook/react';
import { ShippingList } from './ShippingList';

const meta: Meta<typeof ShippingList> = {
  title: 'Organisms/ShippingList',
  component: ShippingList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ShippingList>;

export const Default = {};
