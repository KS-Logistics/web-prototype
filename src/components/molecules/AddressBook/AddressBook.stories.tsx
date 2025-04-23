import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AddressBook } from './AddressBook';

const meta: Meta<typeof AddressBook> = {
  title: 'Molecules/AddressBook',
  component: AddressBook,
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
      <div style={{ width: '375px', padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddressBook>;

const sampleAddresses = [
  {
    id: '1',
    name: 'Li Hua',
    phone: '0411234567',
    addressLine1: 'Apt 5',
    addressLine2: '18 Harbour Road',
    locality: 'Darling Harbour',
    administrativeArea: 'NSW',
    postalCode: '2000',
    countryName: 'Australia',
    countryNameLocalized: '澳大利亚',
    countryCode: 'AU',
  },
  {
    id: '2',
    name: 'John Smith',
    phone: '0422345678',
    organization: 'Global Corp Ltd',
    addressLine2: '123 Collins Street',
    locality: 'Melbourne',
    administrativeArea: 'VIC',
    postalCode: '3000',
    countryName: 'Australia',
    countryNameLocalized: '澳大利亚',
    countryCode: 'AU',
  },
  {
    id: '3',
    name: 'Jane Doe',
    phone: '0433456789',
    addressLine1: 'Level 12',
    addressLine2: '45 Queen Street',
    addressLine3: 'Brisbane CBD',
    locality: 'Brisbane',
    administrativeArea: 'QLD',
    postalCode: '4000',
    countryName: 'Australia',
    countryNameLocalized: '澳大利亚',
    countryCode: 'AU',
  },
];

export const Default: Story = {
  args: {
    addresses: sampleAddresses,
  },
};

export const WithSelection: Story = {
  args: {
    addresses: sampleAddresses,
    selectedId: '1',
    onSelect: (id) => console.log('Selected:', id),
  },
};

export const WithInteractions: Story = {
  args: {
    addresses: sampleAddresses,
    selectedId: '1',
    onSelect: (id) => console.log('Selected:', id),
    onEdit: (id) => console.log('Edit:', id),
    onDelete: (id) => console.log('Delete:', id),
  },
};

export const InternationalAddresses: Story = {
  args: {
    addresses: [
      ...sampleAddresses,
      {
        id: '4',
        name: 'Zhang Wei',
        phone: '13812345678',
        organization: 'Tech Solutions Co., Ltd.',
        addressLine1: 'Room 1508, Building A',
        addressLine2: '123 Nanjing Road',
        locality: 'Shanghai',
        administrativeArea: 'Shanghai',
        postalCode: '200001',
        countryName: '中国',
        countryNameLocalized: '中国',
        countryCode: 'CN',
      },
      {
        id: '5',
        name: 'Mary Johnson',
        phone: '442071234567',
        organization: 'London Consulting Ltd',
        addressLine1: 'Suite 45',
        addressLine2: '1 Canada Square',
        locality: 'London',
        administrativeArea: 'Greater London',
        postalCode: 'E14 5AB',
        countryName: 'United Kingdom',
        countryNameLocalized: '英国',
        countryCode: 'GB',
      },
    ],
    selectedId: '4',
  },
}; 