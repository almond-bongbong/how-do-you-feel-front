import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './write-place-form.module.scss';
import Textarea from '@src/components/common/form/textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherPointed } from '@fortawesome/pro-solid-svg-icons';
import ImageUploadButton from '@src/components/common/form/image-upload-button';
import { faImage, faLocationPlus, faXmark } from '@fortawesome/pro-light-svg-icons';
import Button from '@src/components/common/form/button';
import LocationSelectButton from '@src/components/common/form/location-select-button';
import { convertImageFile, validateImage } from '@src/libs/file';

const cx = classNames.bind(styles);

function WritePlaceForm() {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [location, setLocation] = useState<string>();

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;

    const isValid = validateImage(imageFile);
    if (!isValid) return;

    const convertedImage = await convertImageFile(imageFile, { maxWidth: 1200, maxHeight: 1200 });
    if (!convertedImage) return;

    setImages((prev) => prev.concat(convertedImage));
  };

  const handleClickRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const hasImage = images?.length > 0;

  return (
    <div className={cx('write_form')}>
      <FontAwesomeIcon icon={faFeatherPointed} className={cx('icon_write')} />
      <Textarea
        value={content}
        id="content"
        row={18}
        placeholder="좋은건 함께 나눠요!"
        max={1000}
        onChange={(e) => setContent(e.target.value)}
      />

      {hasImage && (
        <div className={cx('image_area')}>
          {images.map((image, i) => (
            <div className={cx('image_item')} key={image.url}>
              <img src={image.url} alt="이미지" />
              <button
                type="button"
                className={cx('remove_button')}
                onClick={() => handleClickRemoveImage(i)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))}
        </div>
      )}

      {location && <div className={cx('location_area')}>{location}</div>}

      <div className={cx('util_area')}>
        <div className={cx('attachment')}>
          <ImageUploadButton
            icon={<FontAwesomeIcon icon={faImage} />}
            className={cx('image_button')}
            onChange={handleChangeImage}
          />
          <LocationSelectButton
            icon={<FontAwesomeIcon icon={faLocationPlus} />}
            className={cx('location_button')}
            onSelect={(data) =>
              setLocation([data.postcode, data.address, data.extraAddress].join(' '))
            }
          />
        </div>
        <Button theme="primary" className={cx('submit_button')}>
          확인
        </Button>
      </div>
    </div>
  );
}

export default WritePlaceForm;
