import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './form-field.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: ReactNode;
  label?: ReactNode;
  id?: string;
}

function FormField({ children, label, id }: Props) {
  return (
    <div className={cx('form_field')}>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
    </div>
  );
}

export default FormField;
