import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { number, string, oneOf, oneOfType } from 'prop-types';

import styles from './OtherSettingPage.module.css';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

OtherSettingPage.propTypes = {
  type: oneOf([
    'announcement',
    'headset',
    'question',
    'list',
    'information',
    'version',
  ]),
  navigateTo: oneOfType([number, string]),
};

const OtherSettingPageList = {
  announcement: '공지사항',
  headset: '문의하기',
  question: '자주 묻는 질문',
  list: '이용약관',
  information: '개인정보 처리방침',
  version: '버전정보(1.00)',
};

function OtherSettingPage({ type = 'announcement', navigateTo = '/error' }) {
  const navigate = useNavigate();

  const iconStyle = icons[type];

  const handleNavigation = () => {
    navigate(navigateTo); // props로 받은 navigateTo 값으로 이동
  };

  return (
    <button
      className={styles.settingButton}
      type="button"
      onClick={handleNavigation}
    >
      <div className={styles.settingTitle}>
        <SVGIcon {...iconStyle} />
        <span>{OtherSettingPageList[type]}</span>
      </div>
      <SVGIcon {...icons.nextArrow} />
    </button>
  );
}

export default memo(OtherSettingPage);
