import React, { RefObject, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './place-comment.module.scss';
import { GetPlaceCommentListQuery, useCreatePlaceCommentMutation } from '@src/generated/graphql';
import ProfileImage from '@src/components/common/user/profile-image';
import Input from '@src/components/common/form/input';
import Button from '@src/components/common/form/button';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import Modal from '@src/components/modal/modal';
import { GET_PLACE_COMMENT_LIST_QUERY } from '@src/graphql/place/get-place-comment-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/pro-light-svg-icons';
import Dropdown from '@src/components/common/form/dropdown';

const cx = classNames.bind(styles);

interface Props {
  placeId: number;
  total: number;
  comments: GetPlaceCommentListQuery['getPlaceCommentList']['items'];
  commentInputRef?: RefObject<HTMLInputElement>;
}

function PlaceComment({ placeId, total, comments, commentInputRef }: Props) {
  const { currentUser } = useCurrentUser();
  const [createCommentMutation, { loading }] = useCreatePlaceCommentMutation();
  const [content, setContent] = useState('');

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;

    try {
      await createCommentMutation({
        variables: {
          input: {
            placeId,
            content,
          },
        },
        update: (cache) => {
          cache.modify({
            id: cache.identify({
              __typename: 'Place',
              id: placeId,
            }),
            fields: {
              commentCount: (prev) => prev + 1,
            },
          });
        },
        refetchQueries: [
          {
            query: GET_PLACE_COMMENT_LIST_QUERY,
            variables: {
              input: {
                placeId,
              },
            },
          },
        ],
      });
    } catch (error) {
      console.log(error);
      await Modal.alert('댓글 작성 실패');
    } finally {
      setContent('');
    }
  };

  return (
    <div className={cx('container')}>
      <form className={cx('form')} onSubmit={handleSubmitComment}>
        <div className={cx('my_photo')}>
          <ProfileImage size={36} src={currentUser?.profileImage?.url} />
        </div>
        <div className={cx('input_wrap')}>
          <Input
            ref={commentInputRef}
            placeholder="댓글을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={cx('button_wrap')}>
          <Button type="submit" theme="primary-line" loading={loading}>
            등록
          </Button>
        </div>
      </form>

      {comments.map((comment) => (
        <div key={comment.id} className={cx('comment')}>
          <div className={cx('photo')}>
            <ProfileImage size={30} src={comment.account.profileImage?.url} />
          </div>
          <div className={cx('info')}>
            <div className={cx('username')}>{comment.account.username}</div>
            <div className={cx('content')}>{comment.content}</div>
          </div>
          <div className={cx('util')}>
            <Dropdown menu={[]}>
              <button type="button">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaceComment;
