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
  const activeModalElements = Array.from(container.children).filter(
    (child) => child instanceof HTMLElement && child.dataset.visible === 'true',
  );
  return activeModalElements.length;
};

export const getLastModalId = (): string | null => {
  if (isServer()) return null;
  const container = document.getElementById(MODAL_PORTAL_ID);
  if (!container) return null;
  const lastModal = container.children[container.children.length - 1];
  return lastModal?.getAttribute('id');
};

interface LoadScriptOptions {
  isReload?: boolean;
}

export const loadScript = (src: string, { isReload }: LoadScriptOptions = {}): Promise<void> =>
  new Promise((resolve, reject) => {
    const existScript = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existScript && !isReload) {
      if (existScript.dataset.loaded === 'true') resolve();
      return;
    }
    if (existScript) existScript.remove();

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
