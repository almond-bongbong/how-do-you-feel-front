import React, {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  useId,
} from 'react';
import classNames from 'classnames/bind';
import styles from './textarea.module.scss';

const cx = classNames.bind(styles);

interface Props {
  value: string;
  id?: string;
  name?: string;
  placeholder?: string;
  max?: number;
  status?: 'error' | 'success';
  row?: number;
  description?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

const FONT_SIZE = 15;
const LINE_HEIGHT = 1.2;
const VERTICAL_PADDING = 20;
const FONT_HEIGHT = FONT_SIZE * LINE_HEIGHT;

function Textarea(
  {
    value,
    id,
    name,
    placeholder,
    max,
    status,
    row = 1,
    description,
    onChange,
    onFocus,
    onBlur,
  }: Props,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const generatedId = useId();

  return (
    <div className={cx('textarea', status)}>
      <textarea
        ref={ref}
        id={id ?? generatedId}
        name={name}
        placeholder={placeholder}
        value={value}
        maxLength={max}
        style={{ height: row * FONT_HEIGHT + VERTICAL_PADDING }}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {max && (
        <span className={cx('max')}>
          {value.length}/{max}
        </span>
      )}
      {description && <p className={cx('description')}>{description}</p>}
    </div>
  );
}

export default forwardRef(Textarea);
