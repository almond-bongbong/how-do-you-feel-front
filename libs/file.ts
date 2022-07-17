import Modal from '@src/components/modal/modal';
import { IMAGE_FILE_EXTENSION_REGEXP } from '@src/libs/regexp';

export const validateImage = (file: File, options: { maxSize: number }): boolean => {
  if (!IMAGE_FILE_EXTENSION_REGEXP.test(file.name)) {
    Modal.alert('jpg, jpeg, png, gif 이미지만 사용할 수 있습니다.');
    return false;
  }

  if (file.size > options.maxSize) {
    Modal.alert(`파일은 최대 ${options.maxSize / 1024 / 1024}mb 까지 선택할 수 있습니다.`);
    return false;
  }

  return true;
};
