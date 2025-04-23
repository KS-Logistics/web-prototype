import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    buttonVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'text', 'danger'],
      description: 'Button style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'middle', 'small'],
      description: 'Size of the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner',
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'circle', 'round'],
      description: 'Shape of button',
    },
    block: {
      control: { type: 'boolean' },
      description: 'Makes button full width',
    },
    fullWidthMobile: {
      control: { type: 'boolean' },
      description: 'Makes button full width on mobile',
    },
    bottomFixed: {
      control: { type: 'boolean' },
      description: 'Fixed button at the bottom of the screen',
    },
  },
  parameters: {
    // Optional parameter to center the component in the Canvas
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '350px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    buttonVariant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    buttonVariant: 'secondary',
  },
};

export const TextButton: Story = {
  args: {
    label: 'Text Button',
    buttonVariant: 'text',
  },
};

export const DangerButton: Story = {
  args: {
    label: 'Danger Button',
    buttonVariant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    buttonVariant: 'primary',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Button',
    buttonVariant: 'primary',
    loading: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    buttonVariant: 'primary',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    buttonVariant: 'primary',
    size: 'small',
  },
};

export const Block: Story = {
  args: {
    label: 'Block Button',
    buttonVariant: 'primary',
    block: true,
  },
};

// Mobile-specific examples
export const MobileFullWidth: Story = {
  args: {
    label: 'Full Width Mobile Button',
    buttonVariant: 'primary',
    fullWidthMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const MobileBottomFixed: Story = {
  args: {
    label: 'Submit',
    buttonVariant: 'primary',
    bottomFixed: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '400px', position: 'relative', width: '100%' }}>
        <div style={{ padding: '20px' }}>
          <p>Content above the fixed button</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const MobilePrimarySecondary: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Button 
        label="确认" 
        buttonVariant="primary" 
        fullWidthMobile={true} 
      />
      <Button 
        label="取消" 
        buttonVariant="secondary" 
        fullWidthMobile={true} 
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
