import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CargoDetails from '../../pages/CargoDetails';
import { Layout } from 'antd';
import styled from 'styled-components';

const StoryLayout = styled(Layout)`
  max-width: 375px;
  margin: 0 auto;
  overflow: hidden;
`;

const meta = {
  title: 'Pages/CargoDetails',
  component: CargoDetails,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <StoryLayout>
        <Story />
      </StoryLayout>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
    onNext: { action: 'onNext' },
  },
} satisfies Meta<typeof CargoDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  args: {},
}; 