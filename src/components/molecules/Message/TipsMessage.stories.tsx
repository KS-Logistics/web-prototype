import { Meta, StoryObj } from '@storybook/react';
import { TipsMessage } from './TipsMessage';

const meta = {
  title: 'Molecules/Message/TipsMessage',
  component: TipsMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tips message component for displaying important notices:

### Features
- Used for important tips and notices
- Includes close button
- Orange theme
- Automatically prefixes content with "Tips:"

### Theme Tokens Used
- Colors: colorWarning, colorWarningBg
- Typography: fontSize, lineHeight
- Spacing: padding, margin
- Layout: borderRadius
- Animation: motionDurationMid
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TipsMessage>;

export const Default = {
  args: {
    children: '截单日期为北京时间每周周日 24 点前，请在截单日期前支付，逾期的结果货物将滞留~',
    onClose: () => console.log('Close clicked'),
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the message',
    },
    onClose: {
      action: 'closed',
      description: 'Callback when close button is clicked',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
}; 