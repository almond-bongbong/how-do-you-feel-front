import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './write-place-form.module.scss';
import Textarea from '@src/components/common/form/textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherPointed } from '@fortawesome/pro-solid-svg-icons';
import ImageUploadButton from '@src/components/common/form/image-upload-button';
import { faImage, faLocationPlus, faXmark } from '@fortawesome/pro-light-svg-icons';
import Button from '@src/components/common/form/button';
import LocationSelectButton from '@src/components/common/form/location-select-button';
import { ConvertedImageFile, convertImageFile } from '@src/libs/file';
import { SelectedAddress } from '@src/types/address';
import { getAddressData } from '@src/libs/map';
import { useCreatePlaceMutation } from '@src/generated/graphql';
import * as fileApi from '@src/api/file';
import Modal from '@src/components/modal/modal';
import { useRouter } from 'next/router';
import StaticMap from '@src/components/common/map/static-map';

const cx = classNames.bind(styles);
const MAX_IMAGES_COUNT = 5;

function WritePlaceForm() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [location, setLocation] = useState<SelectedAddress>();
  const [locationPosition, setLocationPosition] = useState<{ x: number; y: number }>();
  const [createPlaceMutation] = useCreatePlaceMutation();
  const [loading, setLoading] = useState(false);

  const handleChangeImage = async (files: File[]) => {
    if (!files?.length) return;

    const convertImagesPromises = files.map((file) =>
      convertImageFile(file, { maxWidth: 1200, maxHeight: 1200 }),
    );
    const convertedImages = (await Promise.all(convertImagesPromises)).filter(
      (image): image is ConvertedImageFile => image != null,
    );
    if (!convertedImages) return;

    setImages((prev) => prev.concat(...convertedImages).slice(0, MAX_IMAGES_COUNT));
  };

  const handleClickRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectLocation = async (address: SelectedAddress) => {
    setLocation(address);
    const addressName = address?.roadAddress || address?.address;
    if (!addressName) return;

    const [addressData] = (address ? await getAddressData(addressName) : null) ?? [];
    if (!addressData?.x || !addressData?.y) return;
    setLocationPosition({ x: Number(addressData.x), y: Number(addressData.y) });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const address = location?.roadAddress || location?.address;
      const uploadedImages = await Promise.all(
        images.map((image) => fileApi.uploadFile(image.file).then(({ data }) => data)),
      );
      await createPlaceMutation({
        variables: {
          input: {
            content,
            images: uploadedImages.map((image) => ({
              key: image.key,
              url: `${image.bucketUrl}/${image.key}`,
            })),
            ...(address && {
              address,
              buildingName: location?.buildingName,
              longitude: locationPosition?.x,
              latitude: locationPosition?.y,
            }),
          },
        },
      });
      await Modal.alert('작성이 완료되었습니다');
      await router.push('/');
    } catch (error) {
      console.error(error);
      await Modal.alert('저장에 실패했습니다');
      setLoading(false);
    }
  };

  const hasImage = images?.length > 0;

  return (
    <div className={cx('write_form')}>
      <FontAwesomeIcon icon={faFeatherPointed} className={cx('icon_write')} />
      <Textarea
        value={content}
        id="content"
        row={18}
        placeholder="좋은곳은 함께!"
        max={1000}
        onChange={(e) => setContent(e.target.value)}
      />

      {hasImage && (
        <div className={cx('image_area')}>
          {images.map((image, i) => (
            <div className={cx('image_item')} key={image.url}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {location && (
        <div className={cx('location_area')}>
          <div className={cx('address_name')}>
            {`${location.roadAddress} ${location.buildingName}`}
          </div>
          {locationPosition && (
            <StaticMap x={locationPosition.x} y={locationPosition.y} className={cx('map_wrap')} />
          )}
        </div>
      )}

      <div className={cx('util_area')}>
        <div className={cx('attachment')}>
          <ImageUploadButton
            icon={<FontAwesomeIcon icon={faImage} />}
            multiple
            disabled={images.length >= MAX_IMAGES_COUNT}
            className={cx('image_button')}
            onChange={handleChangeImage}
          />
          <LocationSelectButton
            icon={<FontAwesomeIcon icon={faLocationPlus} />}
            className={cx('location_button')}
            onSelect={handleSelectLocation}
          />
        </div>
        <Button
          theme="primary"
          className={cx('submit_button')}
          loading={loading}
          onClick={handleSubmit}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

export default WritePlaceForm;
