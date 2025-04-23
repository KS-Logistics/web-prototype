import { Meta, StoryObj } from '@storybook/react';
import { ShipmentForm } from './ShipmentForm';

const meta: Meta<typeof ShipmentForm> = {
  title: 'Organisms/ShipmentForm',
  component: ShipmentForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onComplete: { action: 'completed' },
  },
};

export default meta;
type Story = StoryObj<typeof ShipmentForm>;

export const Default = {};
