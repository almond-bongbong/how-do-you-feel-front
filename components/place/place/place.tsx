import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './place.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark as fullBookmark,
  faHeart as fullHeart,
  faLocationArrow,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faBookmark as emptyBookmark,
  faHeart as emptyHeart,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import Modal from '@src/components/modal/modal';
import { useModal } from '@src/hooks/modal/use-modal';
import ImageViewModal from '@src/components/modal/image-view-modal';
import {
  GetPlaceListQuery,
  useTogglePlaceBookmarkMutation,
  useTogglePlaceLikeMutation,
} from '@src/generated/graphql';
import { UnWrapArray } from '@src/types/util';
import Link from 'next/link';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import MapViewModal from '@src/components/modal/map-view-modal';
import PlaceDetailModal from '@src/components/modal/place-detail-modal';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

interface Props {
  place: UnWrapArray<GetPlaceListQuery['getPlaceList']['items']>;
}

function Place({ place }: Props) {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [visibleMap, openMap, closeMap, mapPosition] = useModal<{ x: number; y: number } | null>(
    false,
  );
  const [visibleImage, openImage, closeImage, initialImageIndex] = useModal<number>();
  const [togglePlaceLikeMutation] = useTogglePlaceLikeMutation();
  const [togglePlaceBookmarkMutation] = useTogglePlaceBookmarkMutation();
  const [animateLikeButton, setAnimateLikeButton] = useState(false);
  const [animateBookmarkButton, setAnimateBookmarkButton] = useState(false);

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

        setAnimateLikeButton(newIsLiked);
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

  const handleClickBookmark = async () => {
    await togglePlaceBookmarkMutation({
      variables: {
        input: {
          placeId: place.id,
        },
      },
      optimisticResponse: {
        togglePlaceBookmark: {
          isBookmarked: !place.isBookmarked,
        },
      },
      update: (cache, result) => {
        if (!result.data?.togglePlaceBookmark) return;
        const newIsBookmarked = result.data?.togglePlaceBookmark.isBookmarked;

        setAnimateBookmarkButton(newIsBookmarked);
        cache.modify({
          id: cache.identify(place),
          fields: {
            isBookmarked: () => newIsBookmarked,
            bookmarkCount: (prev) => (newIsBookmarked ? prev + 1 : prev - 1),
          },
        });
      },
    });
  };

  const handleClickDelete = async () => {
    const isOk = await Modal.confirm('정말 삭제하시나요?');
    if (!isOk) return;
  };

  const address = place.address && [place.address, place.buildingName].join(' ');
  const imageUrls = place.images?.map((image) => image.url) || [];

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('profile_image')}>
          <Link href={`/profile/${place.account.id}`}>
            <a>
              <ProfileImage size={48} src={place.account.profileImage?.url} />
            </a>
          </Link>
        </div>
        <div className={cx('content_area')}>
          <div className={cx('username')}>
            <Link href={`/profile/${place.account.id}`}>
              <a>{place.account.username}</a>
            </Link>
          </div>
          <div className={cx('content')}>
            <p>
              <Link
                href={{
                  query: {
                    id: router.query.id,
                    placeId: place.id,
                  },
                }}
                as={`/place/${place.id}`}
                shallow
                scroll={false}
              >
                <a>{place.content}</a>
              </Link>
            </p>
          </div>
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
            <div className={cx('util_button_area')}>
              <button
                className={cx('like', { active: place.isLiked, animate: animateLikeButton })}
                onClick={handleClickLike}
              >
                <FontAwesomeIcon icon={place.isLiked ? fullHeart : emptyHeart} />
                <span className={cx('count')}>{place.likeCount}</span>
              </button>
              <button
                className={cx('bookmark', {
                  active: place.isBookmarked,
                  animate: animateBookmarkButton,
                })}
                onClick={handleClickBookmark}
              >
                <FontAwesomeIcon icon={place.isBookmarked ? fullBookmark : emptyBookmark} />
                <span className={cx('count')}>{place.bookmarkCount}</span>
              </button>
            </div>

            {place.account.id === currentUser?.id && (
              <div className={cx('owner_button_area')}>
                <button type="button" onClick={handleClickDelete}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <MapViewModal
        visible={visibleMap}
        x={mapPosition?.x}
        y={mapPosition?.y}
        address={address}
        onClose={closeMap}
      />

      <ImageViewModal
        visible={visibleImage}
        images={imageUrls}
        initialIndex={initialImageIndex}
        onClose={closeImage}
      />

      <PlaceDetailModal
        visible={Number(router.query.placeId) === place.id}
        placeId={Number(router.query.placeId)}
        onClose={() => {
          router.push(
            {
              pathname: router.pathname,
            },
            undefined,
            { scroll: false },
          );
        }}
      />
    </>
  );
}

export default Place;
