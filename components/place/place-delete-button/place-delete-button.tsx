import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './place-delete-button.module.scss';
import { useDeletePlaceMutation } from '@src/generated/graphql';
import LoadingScreen from '@src/components/common/loading/loading-screen';

const cx = classNames.bind(styles);

interface Props {
  placeId: number;
  className?: string;
  onDelete?: () => void;
}

function PlaceDeleteButton({ placeId, className, onDelete }: Props) {
  const [deletePlaceMutation, { loading }] = useDeletePlaceMutation();

  const handleClickDelete = async () => {
    const isOk = await Modal.confirm('정말 삭제하시겠습니까?');
    if (!isOk) return;

    await deletePlaceMutation({
      variables: {
        input: { id: placeId },
      },
    });
    await Modal.alert('삭제되었습니다.');
    onDelete?.();
  };

  return (
    <>
      <button type="button" className={cx('delete', className)} onClick={handleClickDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
      {loading && <LoadingScreen />}
    </>
  );
}

export default PlaceDeleteButton;
