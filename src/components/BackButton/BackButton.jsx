import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { number, string, bool, oneOfType } from 'prop-types';

import styles from './BackButton.module.css';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

BackButton.propTypes = {
  isColored: bool,
  navigateTo: oneOfType([number, string]).isRequired,
};

function BackButton({ isColored = false, navigateTo }) {
  const navigate = useNavigate();

  const iconStyle = icons[`goBack${isColored ? '_darkBg' : ''}`];

  const handleNavigation = () => {
    navigate(navigateTo); // props로 받은 navigateTo 값으로 이동
  };

  return (
    <button
      className={styles.backButton}
      type="button"
      aria-label="뒤로가기"
      onClick={handleNavigation}
    >
      <SVGIcon {...iconStyle} />
    </button>
  );
}

export default memo(BackButton);
