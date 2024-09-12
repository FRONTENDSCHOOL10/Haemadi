import { memo } from 'react';
import { Link } from 'react-router-dom';
import { number, string, oneOf, oneOfType } from 'prop-types';

import styles from './OtherSettingButton.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { OtherSetting_PAGES } from '@/constants';

OtherSettingButton.propTypes = {
  type: oneOf(OtherSetting_PAGES),
  navigateTo: oneOfType([number, string]),
};

const OtherSetting_PageList = {
  announcement: '공지사항',
  headset: '문의하기',
  question: '자주 묻는 질문',
  list: '이용약관',
  information: '개인정보 처리방침',
  version: '버전정보(1.00)',
};

function OtherSettingButton({ type = 'announcement', navigateTo = '/error' }) {
  const iconStyle = icons[type];

  return (
    <Link className={styles.settingButton} to={navigateTo}>
      <div className={styles.settingTitle}>
        <SVGIcon {...iconStyle} />
        <span>{OtherSetting_PageList[type]}</span>
      </div>
      <SVGIcon {...icons.nextArrow} />
    </Link>
  );
}

export default memo(OtherSettingButton);
