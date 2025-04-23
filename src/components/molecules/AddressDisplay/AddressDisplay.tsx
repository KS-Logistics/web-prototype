import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { theme } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

const StyledCard = styled(Card)<{ $token: GlobalToken }>`
  border-radius: ${({ $token }) => $token.borderRadiusLG}px;
  border: none;
  margin-bottom: ${({ $token }) => $token.marginXS}px;
  background: white;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  .ant-card-body {
    padding: ${({ $token }) => $token.padding}px ${({ $token }) => $token.paddingLG}px;
  }
`;

const NameAndPhone = styled.div<{ $token: GlobalToken }>`
  font-size: 20px;
  color: ${({ $token }) => $token.colorText};
  margin-bottom: ${({ $token }) => $token.marginXS}px;
  font-weight: 500;
  line-height: 1.4;
`;

const AddressLine = styled.div<{ $token: GlobalToken }>`
  font-size: ${({ $token }) => $token.fontSize}px;
  color: #999;
  line-height: 1.6;
  margin-top: 4px;

  &.truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const MapButton = styled.div<{ $token: GlobalToken }>`
  position: absolute;
  right: ${({ $token }) => $token.paddingLG}px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 12px;

  .fa-address-book {
    font-size: 20px;
    margin-bottom: 2px;
  }
`;

export interface AddressDisplayProps {
  /**
   * The name of the contact person
   */
  name: string;
  /**
   * The phone number (will be partially masked)
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
  /**
   * Callback function when address book icon is clicked
   */
  onAddressBook?: () => void;
  /**
   * Optional CSS class name
   */
  className?: string;
}

/**
 * AddressDisplay component shows a contact's address in a card format
 * with an address book icon. Following Universal Postal Union (UPU) standards.
 *
 * @example
 * ```tsx
 * <AddressDisplay
 *   name="Ashley"
 *   phone="0411234121"
 *   addressLine2="100 Pitt St"
 *   locality="Sydney"
 *   administrativeArea="NSW"
 *   postalCode="2000"
 *   countryName="AUSTRALIA"
 *   countryNameLocalized="澳大利亚"
 *   countryCode="AU"
 *   onAddressBook={() => console.log('Address book clicked')}
 * />
 * ```
 */
export const AddressDisplay: React.FC<AddressDisplayProps> = ({
  name,
  phone,
  organization,
  addressLine1,
  addressLine2,
  addressLine3,
  locality,
  administrativeArea,
  postalCode,
  countryName,
  countryNameLocalized,
  countryCode,
  onAddressBook,
  className,
}) => {
  const { token } = theme.useToken();

  // Mask the middle digits of the phone number
  const maskedPhone = phone.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');

  // Format the first address line: country + location info
  const firstLine = `${countryNameLocalized || countryName}${locality} ${postalCode}`;

  // Format the second address line: full address
  const addressParts = [
    addressLine1,
    addressLine2,
    addressLine3,
    locality,
    administrativeArea,
    postalCode,
    countryName.toUpperCase()
  ].filter(Boolean);
  const secondLine = addressParts.join(', ');

  return (
    <StyledCard className={className} $token={token}>
      <NameAndPhone $token={token}>
        {name} {maskedPhone}
      </NameAndPhone>
      {organization && (
        <AddressLine $token={token}>
          {organization}
        </AddressLine>
      )}
      <AddressLine $token={token}>
        {firstLine}
      </AddressLine>
      <AddressLine $token={token} className="truncate">
        {secondLine}
      </AddressLine>
      <MapButton $token={token} onClick={onAddressBook}>
        <FontAwesomeIcon icon={faAddressBook} />
        地址簿
      </MapButton>
    </StyledCard>
  );
}; 