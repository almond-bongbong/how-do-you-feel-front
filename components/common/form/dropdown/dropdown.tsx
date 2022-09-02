import React, {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames/bind';
import styles from './dropdown.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: ReactNode;
  menu: {
    label: string;
    onClick: () => void;
  }[];
}

function Dropdown({ children }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(
    (onClickOrigin?: MouseEventHandler) => (e: MouseEvent) => {
      setOpen(true);
      onClickOrigin?.(e);
    },
    [],
  );

  const handleClose: EventListener = useCallback((e) => {
    if (dropdownRef.current?.contains(e.target as Node)) {
      e.stopPropagation();
    }

    if (e.target instanceof HTMLElement) {
      if (e.target.closest(`.${cx('dropdown')}`)) {
        return;
      }
    }

    setOpen((prev) => (prev ? false : prev));
  }, []);

  useEffect(() => {
    if (open) {
      document.body.addEventListener('click', handleClose, {
        capture: true,
      });
    }
    return () => {
      document.body.removeEventListener('click', handleClose, {
        capture: true,
      });
    };
  }, [open, handleClose]);

  const wrappedChildren = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            onClick: handleClick(child.props.onClick),
          });
        }
        return child;
      }),
    [children, handleClick],
  );

  return (
    <span ref={dropdownRef} className={cx('dropdown_wrap')}>
      {wrappedChildren}
      {open && <div className={cx('dropdown')}>dropdown</div>}
    </span>
  );
}

export default Dropdown;
