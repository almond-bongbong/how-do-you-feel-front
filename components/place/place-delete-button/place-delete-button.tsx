import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-delete-button.module.scss';

const cx = classNames.bind(styles);

interface Props {
  placeId: number;
  className?: string;
  onDelete?: () => void;
}

function PlaceDeleteButton({ placeId, className, onDelete }: Props) {
  const handleClickDelete = async () => {
    const isOk = await Modal.confirm('정말 삭제하시나요?');
    if (!isOk) return;

    console.log(placeId);
    onDelete?.();
  };

  return (
    <button type="button" className={cx('delete', className)} onClick={handleClickDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default PlaceDeleteButton;
