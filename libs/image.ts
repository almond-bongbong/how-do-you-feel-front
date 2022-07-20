export const loadImage = (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error('Image load error'));
    };
    img.src = src;
  });
