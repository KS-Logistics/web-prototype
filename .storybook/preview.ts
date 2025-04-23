import type { Preview } from '@storybook/react';
import '../src/i18n';
import 'antd/dist/reset.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        mobile1: {
          name: 'Mobile (375px)',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        mobile2: {
          name: 'Mobile (414px)',
          styles: {
            width: '414px',
            height: '736px',
          },
        },
      },
    },
    options: {
      storySort: {
        order: [
          // Documentation
          'Introduction',
          
          // Design tokens and guidelines
          'Design System', [
            'Colors',
            'Typography',
            'Spacing',
            'Icons'
          ],
          
          // 1. Atoms - Basic UI elements (smallest)
          'Atoms', [
            'Action',
            'Badge',
            'Button',
            'Input',
            'Radio',
            'Tag',
            'StatusTag',
            '*'
          ],
          
          // 2. Molecules - Combinations of atoms
          'Molecules', [
            'Message',
            'AddressCard',
            'StatusDisplay',
            'Tab',
            '*'
          ],
          
          // 3. Organisms - Complex components
          'Organisms', [
            'ContainerList',
            'ContainerForm',
            'ContainerDetail',
            'ShipmentForm',
            'ShippingList',
            '*'
          ],
          
          // 4. Templates - Page layouts
          'Templates', [
            'AppLayout',
            '*'
          ],
          
          // 5. Pages - Complete screens (largest)
          'Pages', [
            'Home',
            'BookingSuccess',
            'CargoDetails',
            'OrderSummary',
            'ShippingRoute',
            '*'
          ],
          '*'
        ],
      },
    },
  },
};

export default preview;
