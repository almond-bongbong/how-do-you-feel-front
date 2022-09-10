import React from 'react';
import classNames from 'classnames/bind';
import styles from './place-card.module.scss';
import ProfileImage from '@src/components/common/user/profile-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import dayjs from 'dayjs';
import { useModal } from '@src/hooks/modal/use-modal';
import MapViewModal from '@src/components/modal/map-view-modal';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { faLocationArrow } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlaceLikeButton from '@src/components/place/place-like-button';
import PlaceBookmarkButton from '@src/components/place/place-bookmark-button';
import { GetPlaceQuery } from '@src/generated/graphql';
import PlaceDeleteButton from '@src/components/place/place-delete-button';
import PlaceCommentButton from '@src/components/place/place-comment-button';
import ImageViewModal from '@src/components/modal/image-view-modal';
import { faClock } from '@fortawesome/pro-light-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  place: GetPlaceQuery['getPlace'];
  onDelete?: () => void;
  onClickComment?: () => void;
}

function PlaceCard({ place, onDelete, onClickComment }: Props) {
  const [visibleMapModal, openMapModal, closeMapModal] = useModal();
  const [visibleImageViewModal, openImageViewModal, closeImageViewModal, initialImageIndex] =
    useModal<number>();
  const isThisYear = dayjs().year() === dayjs(place.createdAt).year();
  const dateText = isThisYear
    ? dayjs(place.createdAt).format('M월 D일 HH:mm')
    : dayjs(place.createdAt).format('YYYY년 M월 D일 HH:mm');
  const hasPosition = place.longitude && place.latitude;

  return (
    <div className={cx('container')}>
      <div className={cx('info')}>
        <div className={cx('main')}>
          <div className={cx('user')}>
            <ProfileImage size={44} src={place.account.profileImage?.url} className={cx('photo')} />
            <span className={cx('username')}>{place.account.username}</span>
          </div>
        </div>
        <div className={cx('extra')}>
          {place.address && (
            <button
              type="button"
              className={cx('address')}
              disabled={!hasPosition}
              onClick={openMapModal}
            >
              <FontAwesomeIcon icon={faLocationArrow} />
              {place.address}
            </button>
          )}
          <div className={cx('date')}>
            <FontAwesomeIcon icon={faClock} />
            {dateText}
          </div>
        </div>
      </div>

      <div className={cx('image_list')}>
        <Swiper pagination modules={[Pagination]}>
          {place.images?.map(({ url }, i) => (
            <SwiperSlide key={url}>
              <button type="button" onClick={() => openImageViewModal(i)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="image" />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={cx('content')}>{place.content}</div>

      <div className={cx('button_area')}>
        <div className={cx('interaction_area')}>
          <PlaceLikeButton placeId={place.id} isLiked={place.isLiked} likeCount={place.likeCount} />
          <PlaceBookmarkButton
            placeId={place.id}
            isBookmarked={place.isBookmarked}
            bookmarkCount={place.bookmarkCount}
          />
          <PlaceCommentButton commentCount={place.commentCount} onClick={onClickComment} />
        </div>
        <div className={cx('owner_area')}>
          <PlaceDeleteButton placeId={place.id} onDelete={onDelete} />
        </div>
      </div>

      <MapViewModal
        visible={visibleMapModal}
        x={place.longitude}
        y={place.latitude}
        address={place.address}
        onClose={closeMapModal}
      />

      <ImageViewModal
        visible={visibleImageViewModal}
        initialIndex={initialImageIndex}
        images={place.images?.map((image) => image.url) ?? []}
        onClose={closeImageViewModal}
      />
    </div>
  );
}

export default PlaceCard;
