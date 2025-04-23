import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AutoComplete, Input, Spin } from 'antd';
import { theme } from 'antd';
import type { GlobalToken } from 'antd/es/theme/interface';
import type { SelectProps } from 'antd/es/select';
import type { AutoCompleteProps } from 'antd/es/auto-complete';
import debounce from 'lodash/debounce';

declare global {
  interface Window {
    AMap: any;
    google: any;
  }
}

export interface AddressDetails {
  streetNumber?: string;
  street?: string;
  district?: string;
  city?: string;
  province?: string;
  country?: string;
  postalCode?: string;
  formattedAddress: string;
}

interface Option {
  value: string;
  label: string;
  address: AddressDetails;
}

const StyledAutoComplete = styled(AutoComplete)<{ $token: GlobalToken }>`
  .ant-select-selector {
    border-radius: ${({ $token }) => $token.borderRadiusLG}px !important;
    padding: ${({ $token }) => $token.paddingContentVertical}px ${({ $token }) => $token.paddingContentHorizontal}px !important;
    height: auto !important;
    min-height: 44px !important;
  }

  .ant-select-selection-search-input {
    height: auto !important;
  }
`;

export interface AddressAutoCompleteProps {
  /**
   * Value of the input
   */
  value?: string;
  /**
   * Callback when value changes
   */
  onChange?: (value: string, address?: AddressDetails) => void;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Language for autocomplete results
   */
  lang?: 'en' | 'zh';
  /**
   * Map service to use ('amap' or 'google')
   */
  service?: 'amap' | 'google';
  /**
   * API keys for map services
   */
  apiKeys?: {
    amap?: string;
    google?: string;
  };
}

/**
 * AddressAutoComplete component that provides address suggestions using AMap or Google Places
 */
export const AddressAutoComplete: React.FC<AddressAutoCompleteProps> = ({
  value = '',
  onChange,
  placeholder,
  lang = 'zh',
  service = 'amap',
  apiKeys,
}) => {
  const { token } = theme.useToken();
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [amapReady, setAmapReady] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Load AMap SDK
  useEffect(() => {
    if (service === 'amap' && apiKeys?.amap && !window.AMap) {
      const script = document.createElement('script');
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${apiKeys.amap}&plugin=AMap.PlaceSearch,AMap.Geocoder`;
      script.async = true;
      script.onload = () => setAmapReady(true);
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [service, apiKeys?.amap]);

  // Load Google Places SDK
  useEffect(() => {
    if (service === 'google' && apiKeys?.google && !window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKeys.google}&libraries=places&language=${lang}`;
      script.async = true;
      script.onload = () => setGoogleReady(true);
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [service, apiKeys?.google, lang]);

  // AMap search handler
  const searchAMap = async (keyword: string) => {
    if (!window.AMap) return [];

    const placeSearch = new window.AMap.PlaceSearch({
      city: '*',
      citylimit: false,
      pageSize: 10,
      lang: lang === 'zh' ? 'zh_cn' : 'en',
    });

    return new Promise<any[]>((resolve) => {
      placeSearch.search(keyword, (status: string, result: any) => {
        if (status === 'complete') {
          resolve(result.poiList.pois);
        } else {
          resolve([]);
        }
      });
    });
  };

  // Google Places search handler
  const searchGooglePlaces = async (keyword: string) => {
    if (!window.google?.maps) return [];

    const service = new window.google.maps.places.AutocompleteService();
    const request = {
      input: keyword,
      language: lang,
    };

    return new Promise<any[]>((resolve) => {
      service.getPlacePredictions(request, (predictions: any[], status: string) => {
        if (status === 'OK') {
          resolve(predictions);
        } else {
          resolve([]);
        }
      });
    });
  };

  // Debounced search handler
  const handleSearch = debounce(async (searchText: string) => {
    if (!searchText || searchText.length < 2) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      let suggestions: any[] = [];
      
      if (service === 'amap' && amapReady) {
        suggestions = await searchAMap(searchText);
        setOptions(suggestions.map((poi: any) => ({
          value: poi.id,
          label: poi.name + ' - ' + poi.address,
          address: {
            streetNumber: poi.address,
            street: poi.address,
            district: poi.district,
            city: poi.cityname,
            province: poi.pname,
            country: '中国',
            postalCode: '',
            formattedAddress: poi.address,
          },
        })));
      } else if (service === 'google' && googleReady) {
        suggestions = await searchGooglePlaces(searchText);
        setOptions(suggestions.map((prediction: any) => ({
          value: prediction.place_id,
          label: prediction.description,
          address: {
            formattedAddress: prediction.description,
          },
        })));
      }
    } catch (error) {
      console.error('Address search failed:', error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleSelect: SelectProps['onSelect'] = (value, option) => {
    if (onChange && option && typeof option === 'object' && 'address' in option) {
      const selectedOption = option as Option;
      onChange(selectedOption.label, selectedOption.address);
      setInputValue(selectedOption.label);
    }
  };

  const handleChange: AutoCompleteProps['onChange'] = (value) => {
    const newValue = typeof value === 'string' ? value : '';
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <StyledAutoComplete
      value={inputValue}
      options={options}
      onSearch={handleSearch}
      onSelect={handleSelect}
      onChange={handleChange}
      placeholder={placeholder}
      $token={token}
      notFoundContent={loading ? <Spin size="small" /> : null}
    />
  );
}; 