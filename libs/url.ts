import { NextIncomingMessage } from 'next/dist/server/request-meta';

export const getOriginByRequest = (req: NextIncomingMessage): string => {
  const protocol = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
  return `${protocol}${req.headers.host}`;
};

export const getHashString = (path: string): string => {
  const [, hash] = path.split('#');
  return hash || '';
};

export const getHashParams = (path: string): Record<string, string> => {
  const hash = getHashString(path);
  if (!hash) return {};
  return hash.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    return { ...acc, [key]: value };
  }, {});
};
