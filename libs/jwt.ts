import { JwtPayload } from 'jsonwebtoken';
import { TOKEN_KEY } from '@src/constants/keys';
import cookie from '@src/libs/cookie';

const getPayload = (jwt: string): JwtPayload => {
  const [, payload] = jwt.split('.');
  return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
};

const getAccountIdByCookie = (cookieString: string): string => {
  const parsedCookie = cookie.parse(cookieString || '');
  const token = parsedCookie[TOKEN_KEY];
  const payload = token ? jwt.getPayload(token) : {};
  return payload.id;
};

const jwt = {
  getPayload,
  getAccountIdByCookie,
};

export default jwt;
