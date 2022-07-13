import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  HTMLInputTypeAttribute,
  useId,
} from 'react';
import classNames from 'classnames/bind';
import styles from './input.module.scss';

const cx = classNames.bind(styles);

interface Props {
  type?: HTMLInputTypeAttribute;
  value: string;
  id?: string;
  name?: string;
  placeholder?: string;
  max?: number;
  status?: 'error' | 'success';
  description?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

function Input(
  {
    type = 'text',
    value,
    id,
    name,
    placeholder,
    max,
    status,
    description,
    onChange,
    onFocus,
    onBlur,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const generatedId = useId();

  return (
    <div className={cx('input', status)}>
      <input
        ref={ref}
        type={type}
        id={id ?? generatedId}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={max}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {description && <p className={cx('description')}>{description}</p>}
    </div>
  );
}

export default forwardRef(Input);
