import React from 'react';
import styled from 'styled-components';
import { Card, Radio, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';

const StyledCard = styled(Card)<{ $token: GlobalToken; $isSelected?: boolean }>`
  border-radius: ${({ $token }) => $token.borderRadiusLG}px;
  border: 2px solid ${({ $token, $isSelected }) => 
    $isSelected ? $token.colorPrimary : $token.colorBorder};
  margin-bottom: ${({ $token }) => $token.marginXS}px;
  background: ${({ $isSelected, $token }) => 
    $isSelected ? $token.colorBgTextHover : 'white'};
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: scale(0.995);
    background: ${({ $token }) => $token.colorBgTextActive};
  }

  &:hover {
    border-color: ${({ $token }) => $token.colorPrimary};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }

  .ant-card-body {
    padding: ${({ $token }) => $token.padding * 1.5}px;
    padding-right: ${({ $token }) => $token.padding * 3}px;
    min-height: 88px;
  }

  @media (hover: none) {
    &:hover {
      box-shadow: none;
    }
  }
`;

const ContentWrapper = styled.div<{ $token: GlobalToken }>`
  padding-right: ${({ $token }) => $token.padding}px;
  user-select: none;
`;

const NameAndPhone = styled.div<{ $token: GlobalToken; $isSelected?: boolean }>`
  font-size: ${({ $token }) => $token.fontSizeLG + 2}px;
  color: ${({ $token }) => $token.colorText};
  margin-bottom: ${({ $token }) => $token.marginXS}px;
  font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '500')};
  transition: font-weight 0.3s ease;
`;

const Organization = styled.div<{ $token: GlobalToken }>`
  font-size: ${({ $token }) => $token.fontSize}px;
  color: ${({ $token }) => $token.colorTextSecondary};
  margin-bottom: ${({ $token }) => $token.marginXS}px;
`;

const AddressLine = styled.div<{ $token: GlobalToken }>`
  font-size: ${({ $token }) => $token.fontSize}px;
  color: ${({ $token }) => $token.colorTextSecondary};
  line-height: ${({ $token }) => $token.lineHeight};
  margin-top: 4px;

  &.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ActionGroup = styled(Space)<{ $token: GlobalToken }>`
  position: absolute;
  right: ${({ $token }) => $token.padding}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: ${({ $token }) => $token.marginSM}px;
  transition: opacity 0.2s ease;

  .anticon {
    font-size: ${({ $token }) => $token.fontSizeLG + 4}px;
    color: ${({ $token }) => $token.colorTextSecondary};
    cursor: pointer;
    padding: ${({ $token }) => $token.padding}px;
    transition: all 0.2s ease;
    border-radius: 50%;
    background: ${({ $token }) => $token.colorBgContainer};

    &:active {
      transform: scale(0.95);
      background: ${({ $token }) => $token.colorBgTextActive};
    }

    &:hover {
      color: ${({ $token }) => $token.colorPrimary};
    }
  }

  @media (hover: hover) {
    opacity: 0;
    ${StyledCard}:hover & {
      opacity: 1;
    }
  }

  @media (hover: none) {
    opacity: 1;
    right: ${({ $token }) => $token.padding * 1.5}px;
  }
`;

const HiddenRadio = styled(Radio)`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

export interface Address {
  id: string;
  /**
   * The name of the contact person
   */
  name: string;
  /**
   * The phone number
   */
  phone: string;
  /**
   * The organization or company name (optional)
   */
  organization?: string;
  /**
   * The apartment, suite, or unit number
   */
  addressLine1?: string;
  /**
   * The street address
   */
  addressLine2: string;
  /**
   * Additional address information (optional)
   */
  addressLine3?: string;
  /**
   * The city/town/suburb
   */
  locality: string;
  /**
   * The state/province/region
   */
  administrativeArea: string;
  /**
   * The postal/zip code
   */
  postalCode: string;
  /**
   * The country name in the local language of the destination
   */
  countryName: string;
  /**
   * The country name in the preferred display language (e.g., Chinese for this interface)
   */
  countryNameLocalized?: string;
  /**
   * The country code (ISO 3166-1 alpha-2)
   */
  countryCode: string;
}

export interface AddressBookProps {
  /**
   * List of addresses
   */
  addresses: Address[];
  /**
   * Currently selected address ID
   */
  selectedId?: string;
  /**
   * Callback when an address is selected
   */
  onSelect?: (id: string) => void;
  /**
   * Callback when edit button is clicked
   */
  onEdit?: (id: string) => void;
  /**
   * Callback when delete button is clicked
   */
  onDelete?: (id: string) => void;
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * AddressBook component displays a list of addresses with selection and CRUD capabilities.
 * Follows Universal Postal Union (UPU) standards for address formatting.
 *
 * @example
 * ```tsx
 * <AddressBook
 *   addresses={[
 *     {
 *       id: '1',
 *       name: 'Li Hua',
 *       phone: '0411234567',
 *       addressLine2: '100 Pitt St',
 *       locality: 'Sydney',
 *       administrativeArea: 'NSW',
 *       postalCode: '2000',
 *       countryName: 'Australia',
 *       countryNameLocalized: '澳大利亚',
 *       countryCode: 'AU',
 *     }
 *   ]}
 *   selectedId="1"
 *   onSelect={(id) => console.log('Selected:', id)}
 *   onEdit={(id) => console.log('Edit:', id)}
 *   onDelete={(id) => console.log('Delete:', id)}
 * />
 * ```
 */
export const AddressBook: React.FC<AddressBookProps> = ({
  addresses,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  className,
}) => {
  const { token } = theme.useToken();
  const [touchStartTime, setTouchStartTime] = React.useState(0);
  const [touchStartX, setTouchStartX] = React.useState(0);

  const formatAddress = (address: Address) => {
    const addressParts = [
      address.addressLine1,
      address.addressLine2,
      address.addressLine3,
      address.locality,
      address.administrativeArea,
      address.postalCode,
      address.countryName.toUpperCase()
    ].filter(Boolean);
    return addressParts.join(', ');
  };

  const handleCardClick = (address: Address, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.anticon')) {
      return;
    }
    onSelect?.(address.id);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStartTime(Date.now());
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (address: Address, event: React.TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTime;
    const touchDistance = Math.abs(touchEndX - touchStartX);

    if (touchDuration < 500 && touchDistance < 10) {
      if (!(event.target as HTMLElement).closest('.anticon')) {
        onSelect?.(address.id);
      }
    }
  };

  return (
    <div className={className}>
      {addresses.map((address) => {
        const isSelected = selectedId === address.id;
        return (
          <StyledCard 
            key={address.id} 
            $token={token}
            $isSelected={isSelected}
            onClick={(e) => handleCardClick(address, e)}
            onTouchStart={handleTouchStart}
            onTouchEnd={(e) => handleTouchEnd(address, e)}
          >
            <ContentWrapper $token={token}>
              <NameAndPhone $token={token} $isSelected={isSelected}>
                {address.name} {address.phone}
              </NameAndPhone>
              {address.organization && (
                <Organization $token={token}>
                  {address.organization}
                </Organization>
              )}
              <AddressLine $token={token}>
                {`${address.countryNameLocalized || address.countryName}${address.locality} ${address.postalCode}`}
              </AddressLine>
              <AddressLine $token={token} className="truncate">
                {formatAddress(address)}
              </AddressLine>
            </ContentWrapper>
            <HiddenRadio
              checked={isSelected}
              onChange={() => onSelect?.(address.id)}
            />
            <ActionGroup $token={token}>
              <EditOutlined onClick={() => onEdit?.(address.id)} />
              <DeleteOutlined onClick={() => onDelete?.(address.id)} />
            </ActionGroup>
          </StyledCard>
        );
      })}
    </div>
  );
}; 