import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { bool } from 'prop-types';

import styles from './BackButton.module.css';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

BackButton.propTypes = {
  darkMode: bool,
};

function BackButton({ darkMode = false }) {
  const navigate = useNavigate();

  const iconStyle = icons[`goBack${darkMode ? '_darkBg' : ''}`];

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <button
      className={styles.backButton}
      type="button"
      aria-label="뒤로가기"
      onClick={goBack}
    >
      <SVGIcon {...iconStyle} />
    </button>
  );
}

export default memo(BackButton);
