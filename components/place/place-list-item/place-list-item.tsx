import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-list-item.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/pro-solid-svg-icons';
import { useModal } from '@src/hooks/modal/use-modal';
import ImageViewModal from '@src/components/modal/image-view-modal';
import { GetPlaceListQuery } from '@src/generated/graphql';
import { UnWrapArray } from '@src/types/util';
import Link from 'next/link';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import MapViewModal from '@src/components/modal/map-view-modal';
import PlaceDetailModal from '@src/components/modal/place-detail-modal';
import { useRouter } from 'next/router';
import { omit } from '@src/libs/util';
import PlaceLikeButton from '@src/components/place/place-like-button';
import PlaceBookmarkButton from '@src/components/place/place-bookmark-button';
import PlaceDeleteButton from '@src/components/place/place-delete-button';
import PlaceCommentButton from '@src/components/place/place-comment-button';

const cx = classNames.bind(styles);

interface Props {
  place: UnWrapArray<GetPlaceListQuery['getPlaceList']['items']>;
  onDelete?: () => void;
}

function PlaceListItem({ place, onDelete }: Props) {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [visibleMap, openMap, closeMap, mapPosition] = useModal<{ x: number; y: number } | null>(
    false,
  );
  const [visibleImage, openImage, closeImage, initialImageIndex] = useModal<number>();
  const address = place.address && [place.address, place.buildingName].join(' ');
  const imageUrls = place.images?.map((image) => image.url) || [];
  const visibleDetailModal = Number(router.query.placeId) === place.id;

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('profile_image')}>
          <Link href={`/profile/${place.account.id}`}>
            <a>
              <ProfileImage
                size={48}
                src={place.account.profileImage?.url}
                className={cx('photo')}
              />
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
                    ...router.query,
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
              <PlaceLikeButton
                placeId={place.id}
                isLiked={place.isLiked}
                likeCount={place.likeCount}
              />
              <PlaceBookmarkButton
                placeId={place.id}
                isBookmarked={place.isBookmarked}
                bookmarkCount={place.bookmarkCount}
              />
              <PlaceCommentButton
                commentCount={place.commentCount}
                onClick={() => {
                  router.push(
                    {
                      query: {
                        ...router.query,
                        placeId: place.id,
                      },
                    },
                    `/place/${place.id}`,
                    { shallow: true, scroll: false },
                  );
                }}
              />
            </div>

            {place.account.id === currentUser?.id && (
              <div className={cx('owner_button_area')}>
                <PlaceDeleteButton placeId={place.id} onDelete={onDelete} />
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
        visible={visibleDetailModal}
        placeId={visibleDetailModal ? Number(router.query.placeId) : undefined}
        onClose={() =>
          router.push(
            {
              query: omit(router.query, ['placeId']),
              pathname: router.pathname,
            },
            undefined,
            { scroll: false },
          )
        }
      />
    </>
  );
}

export default PlaceListItem;
