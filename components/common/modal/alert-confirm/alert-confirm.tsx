import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import classNames from 'classnames/bind';
import styles from './alert-modal.module.scss';
import { lockBodyScroll, unlockBodyScroll } from '../../../../libs/lock-body-scroll';
import Button from '../../form/button';
import { addRootElementOrCreate } from '../../../../libs/element';

const cx = classNames.bind(styles);
const CONTAINER_ID = 'alert-modal-container';

interface Options {
  okText?: string;
  cancelText?: string;
}

function showModal(
  type: 'alert' | 'confirm',
  message: ReactNode,
  options?: Options,
): Promise<boolean> {
  const { okText = '확인', cancelText = '취소' } = options || {};

  return new Promise((resolve) => {
    const container = addRootElementOrCreate(CONTAINER_ID);
    if (!container) return;
    const root = createRoot(container);

    const handleClose = (result: boolean) => {
      if (container) {
        root.unmount();
        unlockBodyScroll();
        resolve(result);
      }
    };

    lockBodyScroll();
    root.render(
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('message')}>{message}</div>
          <div className={cx('button_wrap')}>
            <Button theme="primary-line" size="lg" autoFocus onClick={() => handleClose(true)}>
              {okText}
            </Button>
            {type === 'confirm' && (
              <Button theme="primary-line" size="lg" onClick={() => handleClose(false)}>
                {cancelText}
              </Button>
            )}
          </div>
        </div>
      </div>,
    );
  });
}

function alert(message: ReactNode, options?: Pick<Options, 'okText'>) {
  return showModal('alert', message, options);
}

function confirm(message: ReactNode, options?: Options) {
  return showModal('confirm', message, options);
}

export { alert, confirm };
