import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './modal.module.scss';
import { useResizeDetector } from 'react-resize-detector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-light-svg-icons';
import { isServer } from '@src/libs/environment';
import { getActiveModalLength, getLastModalId } from '@src/libs/element';
import { lockBodyScroll, unlockBodyScroll } from '@src/libs/lock-body-scroll';
import { MODAL_PORTAL_ID } from '@src/constants/element';
import Portal from '@src/components/common/util/portal';
import ScreenLoading from '@src/components/common/loading/screen-loading';

const cx = classNames.bind(styles);

interface Props {
  visible?: boolean;
  children: React.ReactNode;
  width?: number | string;
  isEscClosable?: boolean;
  isMaskClosable?: boolean;
  hasCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
  closeButtonClassName?: string;
  center?: boolean;
  loading?: boolean;
  onClose?: () => void;
}

function Modal({
  visible = false,
  children,
  width,
  isEscClosable = false,
  isMaskClosable = false,
  hasCloseButton = true,
  className,
  contentClassName,
  closeButtonClassName,
  center = false,
  loading = false,
  onClose,
}: Props) {
  const id = useId();
  const modalBodyRef = useRef<HTMLDivElement | null>(null);
  const [localVisible, setLocalVisible] = useState(visible);
  const [hasScroll, setHasScroll] = useState(false);
  const { height: contentHeight, ref: resizeTargetRef } = useResizeDetector();
  const display = visible || (!visible && localVisible);

  const checkHasScroll = useCallback(() => {
    if (modalBodyRef.current) {
      const windowHeight = window.innerHeight;
      const height = modalBodyRef.current.clientHeight;
      const margin = 100;

      if (windowHeight - margin < height) {
        setHasScroll(true);
      }
    }
  }, []);

  useEffect(() => {
    checkHasScroll();
  }, [checkHasScroll, contentHeight]);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setLocalVisible(visible), 16);
    }
    if (!visible && localVisible) {
      setTimeout(() => setLocalVisible(visible), 300);
    }
  }, [visible, localVisible]);

  useEffect(() => {
    if (isServer()) return;

    setTimeout(() => {
      const isFirstModal = getActiveModalLength() === 1;
      console.log(getActiveModalLength());
      if (isFirstModal) lockBodyScroll();
    }, 16);

    return () => {
      setTimeout(() => {
        const noExistModal = getActiveModalLength() === 0;
        if (noExistModal) unlockBodyScroll();
      }, 16);
    };
  }, [display]);

  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (isEscClosable && getLastModalId() === id && e.code === 'Escape') {
        onClose?.();
      }
    },
    [isEscClosable, id, onClose],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', keydownHandler);
    }
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [visible, keydownHandler]);

  const handleClickMask = useCallback(() => {
    if (isMaskClosable) onClose?.();
  }, [isMaskClosable, onClose]);

  return (
    <Portal id={MODAL_PORTAL_ID}>
      {display && (
        <div
          id={id}
          data-visible={display}
          className={cx('modal_wrap', className, {
            active: visible && localVisible,
          })}
        >
          <div className={cx('mask')} />
          {loading ? (
            <ScreenLoading />
          ) : (
            <div
              className={cx('modal', { has_scroll: hasScroll, center })}
              onClick={handleClickMask}
            >
              <div className={cx('inner')}>
                <div
                  className={cx('content', contentClassName)}
                  ref={(el) => {
                    modalBodyRef.current = el;
                    resizeTargetRef.current = el;
                  }}
                  style={{ width }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={cx('section')}>{children}</div>
                </div>
              </div>
              {hasCloseButton && (
                <button
                  type="button"
                  className={cx('close_button', closeButtonClassName)}
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faXmark} title="닫기" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Portal>
  );
}

export default Modal;
