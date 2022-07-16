import React, { useId } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/pro-light-svg-icons';
import classNames from 'classnames/bind';
import styles from './upload-image-button.module.scss';

const cx = classNames.bind(styles);

interface Props {
  id?: string;
  className?: string;
}

function UploadImageButton({ id, className }: Props) {
  const generatedId = useId();

  return (
    <label className={cx('upload_button', className)} id="profile-image">
      <input type="file" id={id || generatedId} />
      <FontAwesomeIcon icon={faCamera} />
    </label>
  );
}

export default UploadImageButton;
