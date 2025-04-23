import { Meta, StoryObj } from '@storybook/react';
import { InfoMessage } from './InfoMessage';
import { TipsMessage } from './TipsMessage';

const meta = {
  title: 'Molecules/Message',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Message components for displaying various types of notifications:

### Types
- InfoMessage: For general information with optional action
- TipsMessage: For important tips and notices with close button

### Features
- Customizable content
- Interactive controls
- Consistent styling with theme
- Action buttons and close functionality
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const Info: StoryObj<typeof InfoMessage> = {
  args: {
    children: '您有国际运单已到达目的地城市，正在配送中，请耐心等待，我们会第一时间通知您。',
    actionText: '查看',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the message',
    },
    actionText: {
      control: 'text',
      description: 'Text for the action button',
    },
    onActionClick: {
      action: 'clicked',
      description: 'Callback when action button is clicked',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <InfoMessage {...args} />
    </div>
  ),
};

export const Tips: StoryObj<typeof TipsMessage> = {
  args: {
    children: '截单日期为北京时间每周周日 24 点前，请在截单日期前支付，逾期的结果货物将滞留~',
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
  render: (args) => (
    <div style={{ width: '600px' }}>
      <TipsMessage {...args} />
    </div>
  ),
};

export const AllVariants: StoryObj = {
  render: () => (
    <section style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px', 
      width: '600px',
      background: '#f5f5f5', 
      padding: '16px',
      borderRadius: '8px'
    }}>
      <div style={{ 
        fontSize: '16px', 
        fontWeight: 'bold', 
        color: '#722ED1', 
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span style={{ 
          display: 'inline-block', 
          width: '8px', 
          height: '8px', 
          background: '#722ED1', 
          borderRadius: '2px',
          transform: 'rotate(45deg)'
        }} />
        消息提示
      </div>
      <InfoMessage
        actionText="查看"
        onActionClick={() => console.log('Action clicked')}
      >
        您有国际运单已到达目的地城市，正在配送中，请耐心等待，我们会第一时间通知您。
      </InfoMessage>
      <TipsMessage onClose={() => console.log('Close clicked')}>
        截单日期为北京时间每周周日 24 点前，请在截单日期前支付，逾期的结果货物将滞留~
      </TipsMessage>
    </section>
  ),
}; 