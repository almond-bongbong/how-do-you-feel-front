import { isServer } from './environment';
import { MODAL_PORTAL_ID } from '../constants/element';

export const addRootElementOrCreate = (id: string): HTMLElement | null => {
  if (isServer()) return null;
  let rootElement = document.getElementById(id);
  if (!rootElement) {
    const element = document.createElement('div');
    element.setAttribute('id', id);
    document.body.appendChild(element);
    rootElement = element;
  }

  return rootElement;
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
