import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AddressDisplay } from './AddressDisplay';

const meta: Meta<typeof AddressDisplay> = {
  title: 'Molecules/AddressDisplay',
  component: AddressDisplay,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '16px', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddressDisplay>;

export const Default: Story = {
  args: {
    name: 'Ashley',
    phone: '0411234121',
    addressLine2: '100 Pitt St',
    locality: 'Sydney',
    administrativeArea: 'NSW',
    postalCode: '2000',
    countryName: 'Australia',
    countryNameLocalized: '澳大利亚',
    countryCode: 'AU',
    onAddressBook: () => console.log('Address book clicked'),
  },
};

export const WithUnit: Story = {
  args: {
    ...Default.args,
    addressLine1: 'Unit 51/88',
    addressLine2: 'James Ruse Drive',
    locality: 'Rosehill',
    postalCode: '2150',
  },
};

export const WithOrganization: Story = {
  args: {
    ...Default.args,
    organization: 'Example Company Pty Ltd',
    addressLine2: '1 Martin Place',
  },
};

export const InternationalAddress: Story = {
  args: {
    name: 'John Smith',
    phone: '0411234121',
    organization: 'Global Corp Ltd',
    addressLine1: 'Floor 23',
    addressLine2: '1 Queen Victoria Street',
    locality: 'London',
    administrativeArea: 'Greater London',
    postalCode: 'EC4V 4EE',
    countryName: 'United Kingdom',
    countryNameLocalized: '英国',
    countryCode: 'GB',
  },
};

export const LongAddress: Story = {
  args: {
    ...Default.args,
    organization: 'Very Long Company Name Corporation International Pty Ltd',
    addressLine1: 'Suite 1234, Level 45',
    addressLine2: '123 Very Long Street Name Boulevard',
    addressLine3: 'Business District Centre',
    locality: 'VERY LONG SUBURB NAME',
  },
}; 