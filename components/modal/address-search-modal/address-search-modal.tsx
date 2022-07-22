import React, { useCallback, useEffect, useRef, useState } from 'react';
import Modal from '@src/components/modal/modal';
import classNames from 'classnames/bind';
import styles from './address-search-modal.module.scss';
import { loadScript } from '@src/libs/element';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean;
  onClose: () => void;
}

interface Address {
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: 'R' | 'J';
  bname: string;
  buildingName: string;
  apartment: 'Y' | 'N';
  zonecode: string;
}

function AddressSearchModal({ visible, onClose }: Props) {
  const addressSearchRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadAddressSearch = useCallback(async () => {
    await loadScript('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
    new window.daum.Postcode({
      oncomplete: function (data: Address) {
        // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        let addr = ''; // 주소 변수
        let extraAddr = ''; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === 'R') {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        // document.getElementById('sample3_postcode').value = data.zonecode;
        // document.getElementById('sample3_address').value = addr;

        console.log('postcode', data.zonecode);
        console.log('addr', addr);
        console.log('extraAddr', extraAddr);
      },
      width: '100%',
      height: '100%',
    }).embed(addressSearchRef.current, {
      autoClose: false,
    });
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => loadAddressSearch(), 16);
    } else {
      setIsLoaded(false);
    }
  }, [visible, loadAddressSearch]);

  return (
    <Modal visible={visible} contentClassName={cx('address_modal')} onClose={onClose}>
      <div className={cx('address_area', { active: isLoaded })}>
        <div ref={addressSearchRef} className={cx('address_wrap')} />
      </div>
    </Modal>
  );
}

export default AddressSearchModal;
