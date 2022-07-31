import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './search-address.module.scss';
import { loadScript } from '@src/libs/element';
import { SelectedAddress } from '@src/types/address';

const cx = classNames.bind(styles);

export interface Props {
  onSelect: (data: SelectedAddress) => void;
}

interface Address {
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: 'R' | 'J';
  bname: string;
  buildingName: string;
  apartment: 'Y' | 'N';
  zonecode: string;
}

function SearchAddress({ onSelect }: Props) {
  const addressSearchRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const onSelectRef = useRef<(data: SelectedAddress) => void>(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  const loadAddressSearch = useCallback(async () => {
    console.log('loadAddressSearch');
    await loadScript('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
    new window.daum.Postcode({
      oncomplete: function (data: Address) {
        onSelectRef.current?.({
          address: data.jibunAddress,
          roadAddress: data.roadAddress,
          buildingName: data.buildingName,
        });
      },
      width: '100%',
      height: '100%',
    }).embed(addressSearchRef.current);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadAddressSearch();

    return () => {
      setIsLoaded(false);
    };
  }, [loadAddressSearch]);

  return (
    <div className={cx('address_area', { active: isLoaded })}>
      <div ref={addressSearchRef} className={cx('address_wrap')} />
    </div>
  );
}

export default SearchAddress;
