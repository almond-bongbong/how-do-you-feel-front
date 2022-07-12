import React, { ChangeEventHandler, useId } from 'react';
import classNames from 'classnames/bind';
import styles from './input.module.scss';

const cx = classNames.bind(styles);

interface Props {
  value: string;
  id?: string;
  name?: string;
  placeholder?: string;
  onChange: ChangeEventHandler;
}

function Input({ value, id, name, placeholder, onChange }: Props) {
  const generatedId = useId();

  return (
    <input
      type="text"
      id={id ?? generatedId}
      name={name}
      className={cx('input')}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
