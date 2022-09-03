import React, { CSSProperties, MouseEventHandler } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'default' | 'primary' | 'primary-line' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: CSSProperties;
  autoFocus?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({
  children,
  type = 'button',
  theme = 'default',
  size = 'md',
  disabled,
  loading,
  className,
  style,
  autoFocus,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      autoFocus={autoFocus}
      disabled={disabled}
      className={cx('btn', theme, size, className, { loading })}
      style={style}
      onClick={loading ? undefined : onClick}
    >
      {children}
      {loading && <FontAwesomeIcon icon={faSpinner} className={cx('spinner', 'fa-spin')} />}
    </button>
  );
}

export default Button;
