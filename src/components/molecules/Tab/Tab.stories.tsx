import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';

const meta = {
  title: 'Molecules/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile Tab component that supports two distinct styles:
- Filled style with equal-width tabs and a purple border
- Underline style with optional badge support

The component is designed to be used in navigation and content organization scenarios.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Visual style of the tabs',
      control: 'radio',
      options: ['filled', 'underline'],
      table: {
        type: { summary: 'filled | underline' },
        defaultValue: { summary: 'filled' },
      },
    },
    items: {
      description: 'Array of tab items to display',
      control: 'object',
      table: {
        type: { summary: 'Array<{ key: string; label: string; badge?: number; }>' },
      },
    },
    activeKey: {
      description: 'Key of the currently active tab',
      control: 'text',
    },
    onChange: {
      description: 'Callback when tab is changed',
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

/**
 * The filled style variant features equal-width tabs with a purple border container.
 * This style is suitable for primary navigation or when tabs have equal importance.
 */
export const FilledStyle = {
  args: {
    variant: 'filled',
    items: [
      { key: '1', label: '名称' },
      { key: '2', label: '名称' },
    ],
    activeKey: '1',
  },
};

/**
 * The underline style variant features tabs with bottom border indicators and optional badges.
 * This style is suitable for secondary navigation or content categorization.
 */
export const UnderlineStyle = {
  args: {
    variant: 'underline',
    items: [
      { key: '1', label: '名称', badge: 9 },
      { key: '2', label: '名称' },
    ],
    activeKey: '1',
  },
};

/**
 * Example showing both tab styles in a typical usage scenario.
 */
export const TabExamples = {
  render: () => {
    const [activeKey1, setActiveKey1] = React.useState('1');
    const [activeKey2, setActiveKey2] = React.useState('1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '600px' }}>
        <div>
          <h3 style={{ 
            marginBottom: '16px', 
            color: '#722ED1', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontSize: '16px',
            fontWeight: 500,
          }}>
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              background: '#722ED1', 
              transform: 'rotate(45deg)' 
            }} />
            Tab 样式 1
          </h3>
          <Tab
            variant="filled"
            items={[
              { key: '1', label: '名称' },
              { key: '2', label: '名称' },
            ]}
            activeKey={activeKey1}
            onChange={setActiveKey1}
          />
        </div>

        <div>
          <h3 style={{ 
            marginBottom: '16px', 
            color: '#722ED1', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontSize: '16px',
            fontWeight: 500,
          }}>
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              background: '#722ED1', 
              transform: 'rotate(45deg)' 
            }} />
            Tab 样式 2
          </h3>
          <Tab
            variant="underline"
            items={[
              { key: '1', label: '名称', badge: 9 },
              { key: '2', label: '名称' },
            ]}
            activeKey={activeKey2}
            onChange={setActiveKey2}
          />
        </div>
      </div>
    );
  },
}; 