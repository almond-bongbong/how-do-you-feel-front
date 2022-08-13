import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './page-title.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: ReactNode;
  className?: string;
}

function PageTitle({ children, className }: Props) {
  return <h2 className={cx('title', className)}>{children}</h2>;
}

export default PageTitle;
