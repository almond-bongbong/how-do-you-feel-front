export const EMAIL_REGEXP =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const USERNAME_REGEXP = /^[a-zA-Z가-힣0-9-_]{3,15}$/;

export const IMAGE_FILE_EXTENSION_REGEXP = /(.*?)\.(jpg|jpeg|png|gif)$/i;

export const HTTP_URL_REGEXP = /^(http|https):\/\/[^ "]+$/;
