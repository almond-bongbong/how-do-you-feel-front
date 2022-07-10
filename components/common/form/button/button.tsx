import React, { CSSProperties, MouseEventHandler } from 'react';
import styles from './button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, type = 'button', style, onClick }: Props) {
  return (
    <button type={type} className={cx('btn')} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
