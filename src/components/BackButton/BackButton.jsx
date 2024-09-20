import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { number, string, oneOf, oneOfType } from 'prop-types';

import styles from './BackButton.module.css';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

BackButton.propTypes = {
  color: oneOf(['blue', 'white', 'black']),
  navigateTo: oneOfType([number, string]),
};

function BackButton({ color = 'blue', navigateTo = -1, ...restProps }) {
  const navigate = useNavigate();

  const iconStyle = icons[`goBack_${color}`];

  const handleNavigation = () => {
    navigate(navigateTo); // props로 받은 navigateTo 값으로 이동
  };

  return (
    <button
      className={styles.backButton}
      type="button"
      aria-label="뒤로가기"
      onClick={handleNavigation}
      {...restProps}
    >
      <SVGIcon {...iconStyle} />
    </button>
  );
}

export default memo(BackButton);
