import React, { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './location-select-button.module.scss';
import AddressSearchModal from '@src/components/modal/address-search-modal';

const cx = classNames.bind(styles);

interface Props {
  icon: ReactNode;
  className?: string;
  onSelect: (data: { postcode: string; address: string; extraAddress: string }) => void;
}

function LocationSelectButton({ icon, className, onSelect }: Props) {
  const [visibleAddressModal, setVisibleAddressModal] = useState(false);

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
        onSelect={(data) => {
          setVisibleAddressModal(false);
          onSelect(data);
        }}
      />
    </>
  );
}

export default LocationSelectButton;
