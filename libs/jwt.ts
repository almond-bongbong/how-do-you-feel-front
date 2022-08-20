import { JwtPayload } from 'jsonwebtoken';

const getPayload = (jwt: string): JwtPayload => {
  const [, payload] = jwt.split('.');
  return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
};

const jwt = {
  getPayload,
};

export default jwt;
