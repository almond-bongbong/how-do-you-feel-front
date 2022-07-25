import React, { useEffect } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './address-search-modal.module.scss';
import * as localApi from '@src/api/local';
import SearchAddress, {
  Props as SearchAddressProp,
} from '@src/components/common/address/search-address';

const cx = classNames.bind(styles);

export interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: SearchAddressProp['onSelect'];
}

function AddressSearchModal({ visible, onClose, onSelect }: Props) {
  useEffect(() => {
    localApi.getAddressByKeyword('포폴로피자').then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <Modal visible={visible} contentClassName={cx('address_modal')} onClose={onClose}>
      <SearchAddress onSelect={onSelect} />
    </Modal>
  );
}

export default AddressSearchModal;
