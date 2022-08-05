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

export interface ConvertedImageFile {
  file: File;
  url: string;
}

// deprecated! 오히려 용량 증가로 서버에 위임 하는 것이 나아보임
export const convertImageFile = async (
  file: File,
  options?: ConvertImageFileOptions,
): Promise<ConvertedImageFile | null> =>
  new Promise((resolve, reject) => {
    loadImage(file, { orientation: true, ...options })
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
          return resolve({ file, url: URL.createObjectURL(file) });
        }
      })
      .catch(reject);
  });
