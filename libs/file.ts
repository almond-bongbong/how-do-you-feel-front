import Modal from '@src/components/modal/modal';
import { IMAGE_FILE_EXTENSION_REGEXP } from '@src/libs/regexp';
import loadImage from 'blueimp-load-image';
import { ConvertImageFileOptions } from '@src/types/file';

export const validateImage = (file: File, options?: { maxSize: number }): boolean => {
  if (!IMAGE_FILE_EXTENSION_REGEXP.test(file.name)) {
    Modal.alert('jpg, jpeg, png, gif 이미지만 사용할 수 있습니다.');
    return false;
  }

  if (options?.maxSize && file.size > options.maxSize) {
    Modal.alert(`파일은 최대 ${options.maxSize / 1024 / 1024}mb 까지 선택할 수 있습니다.`);
    return false;
  }

  return true;
};

export const convertImageFile = async (
  file: File,
  options?: ConvertImageFileOptions,
): Promise<{ file: File; url: string } | null> =>
  new Promise((resolve, reject) => {
    loadImage(file, { canvas: true, orientation: true, ...options })
      .then((data) => {
        if (data.image instanceof HTMLCanvasElement) {
          data.image.toBlob((blob) => {
            if (!blob) return resolve(null);
            const convertedFile = new File([blob], file.name, { type: file.type });
            resolve({
              file: convertedFile,
              url: URL.createObjectURL(convertedFile),
            });
          });
        } else {
          return resolve(null);
        }
      })
      .catch(reject);
  });
