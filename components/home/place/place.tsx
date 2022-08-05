import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './place.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart, faLocationArrow } from '@fortawesome/pro-solid-svg-icons';
import Modal from '@src/components/modal/modal/modal';
import StaticMap from '@src/components/common/map/static-map';
import { useModal } from '@src/hooks/modal/use-modal';
import ImageViewModal from '@src/components/modal/image-view-modal';
import { faHeart as emptyHeart } from '@fortawesome/pro-light-svg-icons';
import { GetPlaceListQuery, useTogglePlaceLikeMutation } from '@src/generated/graphql';
import { UnWrapArray } from '@src/types/util';

const cx = classNames.bind(styles);

interface Props {
  place: UnWrapArray<GetPlaceListQuery['getPlaceList']['items']>;
}

function Place({ place }: Props) {
  const [visibleMap, openMap, closeMap, mapPosition] = useModal<{ x: number; y: number } | null>(
    false,
  );
  const [visibleImage, openImage, closeImage, initialImageIndex] = useModal<number>();
  const [togglePlaceLikeMutation] = useTogglePlaceLikeMutation();
  const [animateButton, setAnimateButton] = useState(false);

  const handleClickLike = async () => {
    await togglePlaceLikeMutation({
      variables: {
        input: {
          placeId: place.id,
        },
      },
      optimisticResponse: {
        togglePlaceLike: {
          isLiked: !place.isLiked,
        },
      },
      update: (cache, result) => {
        if (!result.data?.togglePlaceLike) return;
        const newIsLiked = result.data?.togglePlaceLike.isLiked;

        setAnimateButton(newIsLiked);
        cache.modify({
          id: cache.identify(place),
          fields: {
            isLiked: () => newIsLiked,
            likeCount: (prev) => (newIsLiked ? prev + 1 : prev - 1),
          },
        });
      },
    });
  };

  const address = place.address && [place.address, place.buildingName].join(' ');
  const imageUrls = place.images?.map((image) => image.url) || [];

  return (
    <>
      <div className={cx('container')}>
        <ProfileImage
          size={48}
          src={place.account.profileImage?.url}
          className={cx('profile_image')}
        />
        <div className={cx('content_area')}>
          <div className={cx('username')}>{place.account.username}</div>
          <div className={cx('content')}>{place.content}</div>
          {address && (
            <button
              type="button"
              disabled={!place.longitude || !place.latitude}
              className={cx('location')}
              onClick={() =>
                place.longitude &&
                place.latitude &&
                openMap({ x: place.longitude, y: place.latitude })
              }
            >
              <FontAwesomeIcon icon={faLocationArrow} />
              {address}
            </button>
          )}
          {imageUrls.length > 0 && (
            <div className={cx('image_list')}>
              {imageUrls.map((image, i) => (
                <button key={image} className={cx('image')} onClick={() => openImage(i)}>
                  <Image src={image} layout="fill" objectFit="cover" alt="image" />
                </button>
              ))}
            </div>
          )}
          <div className={cx('button_area')}>
            <button
              className={cx('like', { active: place.isLiked, animate: animateButton })}
              onClick={handleClickLike}
            >
              <FontAwesomeIcon icon={place.isLiked ? fullHeart : emptyHeart} />
              <span className={cx('count')}>{place.likeCount}</span>
            </button>
          </div>
        </div>
      </div>

      <Modal visible={visibleMap} hasCloseButton isEscClosable isMaskClosable onClose={closeMap}>
        <StaticMap x={mapPosition?.x} y={mapPosition?.y} className={cx('location_map')} />
      </Modal>

      <ImageViewModal
        visible={visibleImage}
        images={imageUrls}
        initialIndex={initialImageIndex}
        onClose={closeImage}
      />
    </>
  );
}

export default Place;
