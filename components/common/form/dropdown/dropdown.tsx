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
    key: string;
    label: string;
    onClick?: (key: string) => void;
  }[];
  closeOnSelect?: boolean;
  onSelect?: (key: string) => void;
}

function Dropdown({ children, menu, closeOnSelect = true, onSelect }: Props) {
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
    const targetElement = e.target as HTMLElement;
    const isClickInside = dropdownRef.current?.contains(targetElement as Node);
    const isClickDropdownItem = targetElement?.closest(`.${cx('dropdown_item')}`);

    if (isClickInside && !isClickDropdownItem) {
      e.stopPropagation();
    }

    if (targetElement?.closest(`.${cx('dropdown')}`)) {
      return;
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
      {open && (
        <div className={cx('dropdown')}>
          {menu.map((item) => (
            <button
              key={item.key}
              type="button"
              className={cx('dropdown_item')}
              onClick={() => {
                if (closeOnSelect) setOpen(false);
                onSelect?.(item.key);
                item.onClick?.(item.key);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

export default Dropdown;
