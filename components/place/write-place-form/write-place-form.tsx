import React from 'react';
import classNames from 'classnames/bind';
import styles from './write-place-form.module.scss';
import Textarea from '@src/components/common/form/textarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherPointed } from '@fortawesome/pro-solid-svg-icons';
import ImageUploadButton from '@src/components/common/form/image-upload-button';
import { faImage } from '@fortawesome/pro-light-svg-icons';
import Button from '@src/components/common/form/button';

const cx = classNames.bind(styles);

function WritePlaceForm() {
  return (
    <div className={cx('write_form')}>
      <FontAwesomeIcon icon={faFeatherPointed} className={cx('icon_write')} />
      <Textarea
        value=""
        id="content"
        row={20}
        placeholder="좋은건 함께 나눠요!"
        max={1000}
        onChange={console.log}
      />
      <div className={cx('util_area')}>
        <div className={cx('attachment')}>
          <ImageUploadButton
            icon={<FontAwesomeIcon icon={faImage} />}
            className={cx('image_button')}
            onChange={console.log}
          />
        </div>
        <Button theme="primary" className={cx('submit_button')}>
          확인
        </Button>
      </div>
    </div>
  );
}

export default WritePlaceForm;
