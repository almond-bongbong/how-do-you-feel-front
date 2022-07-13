import React, { CSSProperties, MouseEventHandler } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  theme?: 'default' | 'primary' | 'primary-line';
  size?: 'sm' | 'md' | 'lg';
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
  className,
  style,
  autoFocus,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      autoFocus={autoFocus}
      className={cx('btn', theme, size, className)}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
