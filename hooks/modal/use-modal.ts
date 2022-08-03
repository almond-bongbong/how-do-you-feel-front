import { useCallback, useState } from 'react';

export const useModal = <T>(initialVisible = false) => {
  const [visible, setVisible] = useState(initialVisible);
  const [data, setData] = useState<T>();
  const openModal = useCallback((payload?: T): void => {
    setVisible(true);
    setData(payload);
  }, []);
  const closeModal = useCallback((): void => setVisible(false), []);

  return [visible, openModal, closeModal, data] as const;
};
