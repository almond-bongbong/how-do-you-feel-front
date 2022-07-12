import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { getActiveModalLength, getLastModalId } from '../../../../libs/element';
import Portal from '../../util/portal';
import classNames from 'classnames/bind';
import styles from './modal.module.scss';
import { useResizeDetector } from 'react-resize-detector';
import { isServer } from '../../../../libs/environment';
import { lockBodyScroll, unlockBodyScroll } from '../../../../libs/lock-body-scroll';
import useIsomorphicLayoutEffect from '../../../../hooks/common/useIsomorphicLayoutEffect';
import { MODAL_PORTAL_ID } from '../../../../constants/element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-light-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  visible?: boolean;
  children: React.ReactNode;
  width?: number | string;
  isMaskClosable?: boolean;
  hasCloseButton?: boolean;
  contentClassName?: string;
  onClose?: () => void;
}

function Modal({
  visible = false,
  children,
  width,
  isMaskClosable = false,
  hasCloseButton = true,
  contentClassName,
  onClose,
}: Props) {
  const id = useId();
  const modalBodyRef = useRef<HTMLDivElement | null>(null);
  const [localVisible, setLocalVisible] = useState(visible);
  const [hasScroll, setHasScroll] = useState(false);
  const { height: contentHeight, ref: resizeTargetRef } = useResizeDetector();

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
      setTimeout(() => setLocalVisible(visible), 200);
    }
  }, [visible, localVisible]);

  useIsomorphicLayoutEffect(() => {
    if (isServer()) return;

    const isFirstModal = getActiveModalLength() === 0;
    if (isFirstModal) {
      lockBodyScroll();
    }

    return () => {
      setTimeout(() => {
        if (getActiveModalLength() === 0) {
          unlockBodyScroll();
        }
      }, 16);
    };
  }, []);

  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (getLastModalId() === id && e.code === 'Escape') {
        onClose?.();
      }
    },
    [onClose, id],
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

  return visible || (!visible && localVisible) ? (
    <Portal id={MODAL_PORTAL_ID}>
      <div id={id} className={cx({ active: visible && localVisible })}>
        <div className={cx('mask')} />
        <div className={cx('modal', { has_scroll: hasScroll })} onClick={handleClickMask}>
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
            {hasCloseButton && (
              <button type="button" className={cx('close_button')} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} title="닫기" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
}

export default Modal;
