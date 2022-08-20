import React from 'react';
import classNames from 'classnames/bind';
import styles from './change-password-form.module.scss';
import FormField from '@src/components/common/form/form-field';
import Input from '@src/components/common/form/input';
import Button from '@src/components/common/form/button';

const cx = classNames.bind(styles);

function ChangePasswordForm() {
  return (
    <div className={cx('container')}>
      <FormField label="현재 비밀번호" id="current_password">
        <Input type="password" id="current_password" value="" onChange={console.log} />
      </FormField>
      <FormField label="새로운 비밀번호" id="new_password">
        <Input type="password" id="new_password" value="" onChange={console.log} />
      </FormField>
      <FormField label="새로운 비밀번호 확인" id="new_password_confirm">
        <Input type="password" id="new_password_confirm" value="" onChange={console.log} />
      </FormField>

      <Button theme="primary-line" className={cx('submit_button')}>
        비밀번호 변경
      </Button>
    </div>
  );
}

export default ChangePasswordForm;
