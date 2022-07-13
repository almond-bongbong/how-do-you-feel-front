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
}

function alertModal(message: ReactNode, options?: Options): Promise<void> {
  const { okText = '확인' } = options || {};

  return new Promise((resolve) => {
    const container = addRootElementOrCreate(CONTAINER_ID);
    if (!container) return;
    const root = createRoot(container);

    const handleClose = () => {
      if (container) {
        root.unmount();
        unlockBodyScroll();
        resolve();
      }
    };

    lockBodyScroll();
    root.render(
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('message')}>{message}</div>
          <div className={cx('button_wrap')}>
            <Button theme="primary-line" size="lg" autoFocus onClick={handleClose}>
              {okText}
            </Button>
          </div>
        </div>
      </div>,
    );
  });
}

export default alertModal;
