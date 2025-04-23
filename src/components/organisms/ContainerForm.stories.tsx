import { Meta, StoryObj } from '@storybook/react';
import ContainerForm from './ContainerForm';
import LanguageSwitcher from '../atoms/LanguageSwitcher';
import '../../../src/i18n';

const meta: Meta<typeof ContainerForm> = {
  title: 'Organisms/ContainerForm',
  component: ContainerForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <>
        <LanguageSwitcher />
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContainerForm>;

export const AddNew = {
  args: {
    isEdit: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Edit = {
  args: {
    isEdit: true,
    initialValues: {
      containerNumber: 'ABCD1234567',
      type: '40GP',
      weight: '25',
      destination: '上海港',
      loadingPort: '深圳港',
      dischargePort: '上海港',
      vessel: 'COSCO SHIPPING PISCES',
      voyage: '023W',
      eta: '2024-03-25 14:30',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}; 