import React, { ChangeEvent, ReactNode, useId, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './image-upload-button.module.scss';
import { validateImage } from '@src/libs/file';

const cx = classNames.bind(styles);
const DEFAULT_MAX_IMAGE_SIZE = 20 * 1024 * 1024;

interface Props {
  icon: ReactNode;
  id?: string;
  maxImageSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (files: File[]) => void;
}

function ImageUploadButton({
  icon,
  id,
  maxImageSize = DEFAULT_MAX_IMAGE_SIZE,
  multiple = false,
  disabled = false,
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

    if (!files?.length) {
      resetInput();
      return;
    }

    const validFiles = Array.from(files).filter((file) =>
      validateImage(file, { maxSize: maxImageSize }),
    );
    onChange(validFiles);
    resetInput();
  };

  return (
    <label className={cx('upload_button', className, { disabled })} id={id || generatedId}>
      <input
        ref={inputRef}
        type="file"
        id={id || generatedId}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChangeFile}
      />
      {icon}
    </label>
  );
}

export default ImageUploadButton;
