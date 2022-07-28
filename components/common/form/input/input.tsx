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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/pro-light-svg-icons';

const cx = classNames.bind(styles);

interface Props {
  type?: HTMLInputTypeAttribute;
  search?: boolean;
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
    search,
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
      {search && <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />}
      {max && (
        <span className={cx('max')}>
          {value.length}/{max}
        </span>
      )}
      {description && <p className={cx('description')}>{description}</p>}
    </div>
  );
}

export default forwardRef(Input);
