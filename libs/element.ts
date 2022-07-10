import { isServer } from './environment';
import { MODAL_PORTAL_ID } from '../constants/element';

export const addRootElement = (id: string): void => {
  if (isServer()) return;
  const existElement = document.getElementById(id);
  if (!existElement) {
    const element = document.createElement('div');
    element.setAttribute('id', id);
    document.body.appendChild(element);
  }
};

export const getActiveModalLength = () => {
  if (isServer()) return 0;
  const container = document.getElementById(MODAL_PORTAL_ID);
  if (!container) return 0;
  return container.children.length;
};

export const getLastModalId = (): string | null => {
  if (isServer()) return null;
  const container = document.getElementById(MODAL_PORTAL_ID);
  if (!container) return null;
  const lastModal = container.children[container.children.length - 1];
  return lastModal?.getAttribute('id');
};
