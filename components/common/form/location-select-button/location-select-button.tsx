import React, { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './location-select-button.module.scss';
import AddressSearchModal from '@src/components/modal/address-search-modal';

const cx = classNames.bind(styles);

interface Props {
  icon: ReactNode;
  className?: string;
}

function LocationSelectButton({ icon, className }: Props) {
  const [visibleAddressModal, setVisibleAddressModal] = useState(true);

  return (
    <>
      <button
        type="button"
        className={cx('location_button', className)}
        onClick={() => setVisibleAddressModal(true)}
      >
        {icon}
      </button>
      <AddressSearchModal
        visible={visibleAddressModal}
        onClose={() => setVisibleAddressModal(false)}
      />
    </>
  );
}

export default LocationSelectButton;
