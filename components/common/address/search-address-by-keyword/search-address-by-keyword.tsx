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
  const [addressList, setAddressList] = useState<AddressByKeyword[]>();

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
    <div className={cx('container')}>
      <form onSubmit={handleSubmit}>
        <Input search name="keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </form>
      <div className={cx('address_list_wrap')}>
        <ul className={cx('address_list')}>
          {addressList == null && (
            <li className={cx('info_text')}>가게 또는 건물명으로 검색해보세요</li>
          )}
          {addressList?.length === 0 && <li className={cx('info_text')}>검색된 결과가 없습니다</li>}
          {addressList?.map((address) => (
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
    </div>
  );
}

export default SearchAddressByKeyword;
