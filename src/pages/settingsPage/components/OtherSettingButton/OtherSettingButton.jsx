import { func, oneOf } from 'prop-types';
import { memo } from 'react';

import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { OtherSetting_PAGES } from '@/constants';
import icons from '@/icons';
import styles from './OtherSettingButton.module.css';

OtherSettingButton.propTypes = {
  type: oneOf(OtherSetting_PAGES),
  onClick: func,
};

const OtherSetting_PageList = {
  announcement: '공지사항',
  headset: '문의하기',
  question: '자주 묻는 질문',
  list: '이용약관',
  information: '개인정보 처리방침',
  version: '버전정보(1.00)',
  logout: '로그아웃',
};

function OtherSettingButton({ type = 'announcement', onClick }) {
  const iconStyle = icons[type];

  return (
    <button type="button" className={styles.settingButton} onClick={onClick}>
      <div className={styles.settingTitle}>
        <SVGIcon {...iconStyle} />
        <span>{OtherSetting_PageList[type]}</span>
      </div>
      <SVGIcon {...icons.nextArrow} />
    </button>
  );
}

export default memo(OtherSettingButton);
