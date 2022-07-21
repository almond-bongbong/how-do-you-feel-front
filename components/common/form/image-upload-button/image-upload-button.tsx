import React, { ChangeEvent, ChangeEventHandler, ReactNode, useId, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './image-upload-button.module.scss';
import { validateImage } from '@src/libs/file';

const cx = classNames.bind(styles);
const DEFAULT_MAX_IMAGE_SIZE = 20 * 1024 * 1024;

interface Props {
  icon: ReactNode;
  id?: string;
  maxImageSize?: number;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function ImageUploadButton({
  icon,
  id,
  maxImageSize = DEFAULT_MAX_IMAGE_SIZE,
  className,
  onChange,
}: Props) {
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFile = files?.[0];

    if (!selectedFile) {
      resetInput();
      return;
    }

    const validFile = validateImage(selectedFile, { maxSize: maxImageSize });
    if (!validFile) return;
    onChange(e);
    resetInput();
  };

  return (
    <label className={cx('upload_button', className)} id={id || generatedId}>
      <input ref={inputRef} type="file" id={id || generatedId} onChange={handleChangeFile} />
      {icon}
    </label>
  );
}

export default ImageUploadButton;
