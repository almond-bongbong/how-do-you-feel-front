import React, { useEffect, useState } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './address-search-modal.module.scss';
import SearchAddress from '@src/components/common/address/search-address';
import Tab from '@src/components/common/form/tab';
import SearchAddressByKeyword from '@src/components/common/address/search-address-by-keyword';
import { SelectedAddress } from '@src/types/address';

const cx = classNames.bind(styles);

export interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (data: SelectedAddress) => void;
}

const TABS = [
  { key: 'keyword', label: '키워드로 검색' },
  { key: 'address', label: '주소로 검색' },
];

function AddressSearchModal({ visible, onClose, onSelect }: Props) {
  const [selectedTab, setSelectedTab] = useState(TABS[0].key);

  useEffect(() => {
    setSelectedTab(TABS[0].key);
  }, [visible]);

  return (
    <Modal visible={visible} contentClassName={cx('address_modal')} onClose={onClose}>
      <Tab
        tabs={TABS}
        selectedTab={selectedTab}
        className={cx('address_tab')}
        onChange={setSelectedTab}
      />
      <div className={cx('tab_panel', { active: selectedTab === 'keyword' })}>
        <SearchAddressByKeyword onSelect={onSelect} />
      </div>
      <div className={cx('tab_panel', { active: selectedTab === 'address' })}>
        <SearchAddress onSelect={onSelect} />
      </div>
    </Modal>
  );
}

export default AddressSearchModal;
