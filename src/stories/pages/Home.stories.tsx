import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import HomePage from '../../pages/Home';
import { Layout } from 'antd';

const meta = {
  title: 'Pages/Home',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  argTypes: {
    onMenuClick: { action: 'menu clicked' },
    onUserClick: { action: 'user clicked' },
    onSearch: { action: 'search submitted' },
    onServiceCardClick: { action: 'service card clicked' },
  },
  decorators: [
    (Story) => (
      <Layout style={{ 
        maxWidth: '375px', 
        margin: '0 auto',
        minHeight: '100vh',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '24px',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          fontSize: '12px',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <span>12:09</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span>􀙇</span>
            <span>􀙈</span>
            <span>24%</span>
          </div>
        </div>
        <Story />
      </Layout>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HomePage>;

// Set mobile as the only story
export const Mobile = {
  args: {
    onMenuClick: () => console.log('Menu clicked'),
    onUserClick: () => console.log('User clicked'),
    onSearch: (value: string) => console.log('Search:', value),
    onServiceCardClick: (type: string) => console.log('Service clicked:', type),
  },
}; 