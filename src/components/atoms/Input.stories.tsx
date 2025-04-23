import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['large', 'middle', 'small'],
    },
    helperText: { control: 'text' },
    fullWidthMobile: { control: 'boolean' },
  },
  parameters: {
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    helperText: 'Password should contain at least 8 characters',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'You cannot edit this',
    disabled: true,
  },
};

// Mobile-specific examples
export const MobileFullWidth: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    fullWidthMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const MobileForm: Story = {
  render: () => (
    <div style={{ width: '100%' }}>
      <Input 
        label="集装箱号" 
        placeholder="请输入集装箱号" 
        required 
        fullWidthMobile 
      />
      <Input 
        label="箱型" 
        placeholder="请选择箱型" 
        fullWidthMobile 
      />
      <Input 
        label="货重" 
        placeholder="请输入货重" 
        fullWidthMobile
        suffix="吨"
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const MobileSearch: Story = {
  args: {
    placeholder: '搜索集装箱',
    prefix: <span>🔍</span>,
    fullWidthMobile: true,
    size: 'large',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
