import { useCallback, useState } from 'react';

export const useModal = (initialVisible = false) => {
  const [visible, setVisible] = useState(initialVisible);
  const openModal = useCallback((): void => setVisible(true), []);
  const closeModal = useCallback((): void => setVisible(false), []);

  return [visible, openModal, closeModal] as const;
};
