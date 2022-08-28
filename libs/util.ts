export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const omit = (obj: object, keys: string[]) =>
  Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
