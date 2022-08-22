import React from 'react';

interface Props {
  accountId: string;
}

function MyBookmarkPlaceList({ accountId }: Props) {
  return <div>{accountId} working...</div>;
}

export default MyBookmarkPlaceList;
