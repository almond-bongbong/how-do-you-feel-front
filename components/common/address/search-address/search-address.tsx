import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './search-address.module.scss';
import { loadScript } from '@src/libs/element';

const cx = classNames.bind(styles);

export interface Props {
  onSelect: (data: { address: string; roadAddress: string; buildingName: string }) => void;
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

  const loadAddressSearch = useCallback(async () => {
    await loadScript('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
    new window.daum.Postcode({
      oncomplete: function (data: Address) {
        onSelect({
          address: data.jibunAddress,
          roadAddress: data.roadAddress,
          buildingName: data.buildingName,
        });
      },
      width: '100%',
      height: '100%',
    }).embed(addressSearchRef.current);
    setIsLoaded(true);
  }, [onSelect]);

  useEffect(() => {
    setTimeout(() => loadAddressSearch(), 16);

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
