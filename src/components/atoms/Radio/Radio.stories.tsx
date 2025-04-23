import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '文字',
  },
};

export const Checked: Story = {
  args: {
    children: '文字',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    children: '文字',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: '文字',
    disabled: true,
    checked: true,
  },
};

export const VerticalGroup: Story = {
  render: () => (
    <RadioGroup>
      <Radio value="1">文字</Radio>
      <Radio value="2">文字</Radio>
      <Radio value="3">文字</Radio>
    </RadioGroup>
  ),
};

export const HorizontalGroup: Story = {
  render: () => (
    <RadioGroup>
      <Radio value="1">文字</Radio>
      <Radio value="2">文字</Radio>
      <Radio value="3">文字</Radio>
    </RadioGroup>
  ),
};

export const GroupWithDefaultValue: Story = {
  render: () => (
    <RadioGroup defaultValue="2">
      <Radio value="1">文字</Radio>
      <Radio value="2">文字</Radio>
      <Radio value="3">文字</Radio>
    </RadioGroup>
  ),
};

export const GroupWithLongText: Story = {
  render: () => (
    <RadioGroup defaultValue="1">
      <Radio value="1">这是一段很长的文字，用来测试换行效果</Radio>
      <Radio value="2">这是另一段很长的文字，确保在移动设备上也能正常显示</Radio>
      <Radio value="3">这是第三段很长的文字，验证间距是否正确</Radio>
    </RadioGroup>
  ),
}; 