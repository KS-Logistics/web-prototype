import { Meta, StoryObj } from '@storybook/react';
import { ContainerList } from './ContainerList';

const meta: Meta<typeof ContainerList> = {
  title: 'Organisms/ContainerList',
  component: ContainerList,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onSelectContainer: { action: 'selected' },
    onNewShipment: { action: 'new shipment clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ContainerList>;

export const Default = {};
