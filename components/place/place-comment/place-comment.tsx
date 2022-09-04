import React, { RefObject, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './place-comment.module.scss';
import {
  GetPlaceCommentListQuery,
  GetPlaceCommentListQueryVariables,
  useCreatePlaceCommentMutation,
  useDeletePlaceCommentMutation,
  useGetPlaceCommentListQuery,
} from '@src/generated/graphql';
import ProfileImage from '@src/components/common/user/profile-image';
import Input from '@src/components/common/form/input';
import Button from '@src/components/common/form/button';
import useCurrentUser from '@src/hooks/auth/use-current-user';
import Modal from '@src/components/modal/modal';
import { GET_PLACE_COMMENT_LIST_QUERY } from '@src/graphql/place/get-place-comment-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlus } from '@fortawesome/pro-light-svg-icons';
import Dropdown from '@src/components/common/form/dropdown';
import LoadingScreen from '@src/components/common/loading/loading-screen';
import { COMMENT_LIMIT } from '@src/constants/place';
import { useApolloClient } from '@apollo/client';
import LoadingBlock from '@src/components/common/loading/loading-block';

const cx = classNames.bind(styles);

interface Props {
  placeId: number;
  commentInputRef?: RefObject<HTMLInputElement>;
  onDelete?: (commentId: number) => void;
}

function PlaceComment({ placeId, commentInputRef, onDelete }: Props) {
  const apollo = useApolloClient();
  const { currentUser } = useCurrentUser();
  const { data, loading, fetchMore } = useGetPlaceCommentListQuery({
    skip: !placeId,
    variables: { input: { placeId, limit: COMMENT_LIMIT } },
  });
  // const [comments, setComments] = useState<GetPlaceCommentListQuery['getPlaceCommentList']>(null);
  const [createCommentMutation, { loading: loadingCreate }] = useCreatePlaceCommentMutation();
  const [deleteCommentMutation, { loading: loadingDelete }] = useDeletePlaceCommentMutation();
  const [content, setContent] = useState('');
  const total = data?.getPlaceCommentList.total ?? 0;
  const comments = data?.getPlaceCommentList.items ?? [];

  const handleClickMore = async () => {
    if (!comments) return;

    const { data } = await fetchMore({
      variables: {
        input: {
          placeId,
          sinceId: comments[comments.length - 1].id,
          offset: 1,
          limit: COMMENT_LIMIT,
        },
      },
    });

    apollo.writeQuery<GetPlaceCommentListQuery, GetPlaceCommentListQueryVariables>({
      query: GET_PLACE_COMMENT_LIST_QUERY,
      variables: { input: { placeId, limit: COMMENT_LIMIT } },
      data: {
        getPlaceCommentList: {
          ...data.getPlaceCommentList,
          items: [...comments, ...data.getPlaceCommentList.items],
        },
      },
    });
  };

  const handleDeleteComment = async (commentId: number) => {
    const isOk = await Modal.confirm('댓글을 삭제하시겠습니까?');
    if (!isOk) return;

    try {
      await deleteCommentMutation({
        variables: { input: { id: commentId } },
        update: (cache, { data: deleteData }) => {
          if (!deleteData?.deletePlaceComment.isDeleted) return;

          apollo.writeQuery<GetPlaceCommentListQuery, GetPlaceCommentListQueryVariables>({
            query: GET_PLACE_COMMENT_LIST_QUERY,
            variables: { input: { placeId, limit: COMMENT_LIMIT } },
            data: {
              getPlaceCommentList: {
                ...(data?.getPlaceCommentList || {}),
                total: total - 1,
                items: comments.filter((comment) => comment.id !== commentId),
              },
            },
          });

          const normalizedPlaceId = cache.identify({ __typename: 'Place', id: placeId });
          cache.modify({
            id: normalizedPlaceId,
            fields: {
              commentCount: (prev: number) => prev - 1,
            },
          });
        },
      });

      await Modal.alert('댓글이 삭제되었습니다.');
      onDelete?.(commentId);
    } catch (error) {
      console.log(error);
      await Modal.alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content || !currentUser) return;

    try {
      await createCommentMutation({
        variables: {
          input: {
            placeId,
            content,
          },
        },
        update: (cache, result) => {
          if (!result.data?.createPlaceComment) return;

          cache.modify({
            id: cache.identify({
              __typename: 'Place',
              id: placeId,
            }),
            fields: {
              commentCount: (prev) => prev + 1,
            },
          });

          apollo.writeQuery<GetPlaceCommentListQuery, GetPlaceCommentListQueryVariables>({
            query: GET_PLACE_COMMENT_LIST_QUERY,
            variables: { input: { placeId, limit: COMMENT_LIMIT } },
            data: {
              getPlaceCommentList: {
                ...(data?.getPlaceCommentList || {}),
                total: total + 1,
                items: [
                  {
                    __typename: 'PlaceComment',
                    id: result.data.createPlaceComment.id,
                    content,
                    account: {
                      __typename: 'Account',
                      id: currentUser.id,
                      username: currentUser.username,
                      profileImage: currentUser.profileImage,
                    },
                  },
                  ...(comments || []),
                ],
              },
            },
          });
        },
      });
    } catch (error) {
      console.log(error);
      await Modal.alert('댓글 작성 실패');
    } finally {
      setContent('');
    }
  };

  if (loading) return <LoadingBlock />;

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
            max={300}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className={cx('button_wrap')}>
          <Button type="submit" theme="primary-line" loading={loadingCreate}>
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

          {comment.account.id === currentUser?.id && (
            <div className={cx('util')}>
              <Dropdown
                menu={[
                  { key: 'DELETE', label: '삭제', onClick: () => handleDeleteComment(comment.id) },
                ]}
              >
                <button type="button" className={cx('util_button')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </Dropdown>
            </div>
          )}
        </div>
      ))}

      {total > comments.length && (
        <button type="button" className={cx('more_button')} onClick={handleClickMore}>
          <FontAwesomeIcon icon={faPlus} title="더보기" />
        </button>
      )}

      {loadingDelete && <LoadingScreen />}
    </div>
  );
}

export default PlaceComment;
