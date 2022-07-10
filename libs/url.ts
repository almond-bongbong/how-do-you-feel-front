import { NextIncomingMessage } from 'next/dist/server/request-meta';

export const getOriginByRequest = (req: NextIncomingMessage): string => {
  const protocol = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
  return `${protocol}${req.headers.host}`;
};
