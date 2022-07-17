import React, { ReactElement, useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Modal from '@src/components/modal/modal/modal';
import Button from '@src/components/common/form/button';
import classNames from 'classnames/bind';
import styles from './edit-profile-image-modal.module.scss';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  profilePhotoFile?: File | null;
  onClose: () => void;
  onConfirm: (file: File, dataUrl: string) => void;
}

const DEFAULT_SCALE = 1.1;

function EditProfilePhotoModal({
  visible,
  profilePhotoFile,
  onConfirm,
  onClose,
}: Props): ReactElement {
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const editorRef = useRef<AvatarEditor>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) setScale(DEFAULT_SCALE);
  }, [visible]);

  const handleScale = (value: number | number[]) => {
    console.log(value);
    if (Array.isArray(value)) return;
    setScale(1 + value / 100);
  };

  const handleConfirm = () => {
    const resultCanvas = editorRef.current?.getImageScaledToCanvas();

    if (!resultCanvas) return console.log('Not found edit canvas');
    if (!profilePhotoFile) return console.log('Not found origin photo file');

    setLoading(true);
    const editedDataUrl = resultCanvas.toDataURL();

    resultCanvas.toBlob((blob) => {
      if (!blob) {
        setLoading(false);
        return;
      }
      const editedFile = new File([blob], profilePhotoFile.name);
      onConfirm(editedFile, editedDataUrl);
      setLoading(false);
    });
  };

  return (
    <Modal
      visible={visible}
      width={500}
      contentClassName={cx('edit_image_modal')}
      onClose={onClose}
    >
      <div className={cx('image_wrap')}>
        {profilePhotoFile ? (
          <AvatarEditor
            ref={editorRef}
            image={profilePhotoFile}
            width={320}
            height={320}
            border={90}
            color={[50, 50, 50, 0.6]}
            scale={scale}
          />
        ) : (
          <div>파일을 찾을 수 없습니다.</div>
        )}
      </div>

      <div className={cx('slider_wrap')}>
        <Slider
          value={(scale - 1) * 100}
          onChange={handleScale}
          trackStyle={{ height: 8, backgroundColor: '#eee' }}
          railStyle={{ height: 8, backgroundColor: '#eee' }}
          handleStyle={{
            height: 18,
            width: 18,
            borderColor: '#00a8ff',
          }}
        />
      </div>

      <Button theme="primary-line" className={cx('submit_button')} onClick={handleConfirm}>
        확인
      </Button>
    </Modal>
  );
}

export default EditProfilePhotoModal;
