import React, { FormEvent, useState } from 'react';
import Input from '@src/components/common/form/input';
import * as localApi from '@src/api/local';
import Modal from '@src/components/modal/modal';
import { AddressByKeyword } from '@src/types/api';
import classNames from 'classnames/bind';
import styles from './search-address-by-keyword.module.scss';
import { SelectedAddress } from '@src/types/address';

const cx = classNames.bind(styles);

interface Props {
  onSelect: (data: SelectedAddress) => void;
}

function SearchAddressByKeyword({ onSelect }: Props) {
  const [keyword, setKeyword] = useState('');
  const [addressList, setAddressList] = useState<AddressByKeyword[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!keyword) return;

    try {
      const { data } = await localApi.getAddressByKeyword(keyword);
      setAddressList(data.documents.filter((address) => address.road_address_name));
    } catch (error) {
      console.error(error);
      await Modal.alert('오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input search name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </form>
      <ul className={cx('address_list')}>
        {addressList.map((address) => (
          <li key={address.id}>
            <button
              type="button"
              onClick={() =>
                onSelect({
                  address: address.address_name,
                  roadAddress: address.road_address_name,
                  buildingName: address.place_name,
                })
              }
            >
              <span className={cx('address')}>{address.road_address_name}</span>
              {address.place_name && (
                <span className={cx('place_name')}>({address.place_name})</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchAddressByKeyword;
