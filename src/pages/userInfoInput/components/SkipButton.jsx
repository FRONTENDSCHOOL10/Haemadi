import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { number, string, bool, oneOfType } from 'prop-types';

import styles from './SkipButton.module.css';

SkipButton.propTypes = {
  colored: bool,
  navigateTo: oneOfType([number, string]).isRequired,
};

function SkipButton({ colored = false, navigateTo }) {
  const navigate = useNavigate();
  const classNames =
    `${styles.skipButton} ${colored ? styles.skipButton_colored : ''}`.trim();

  const handleNavigation = () => {
    navigate(navigateTo); // props로 받은 navigateTo 값으로 이동
  };

  return (
    <button className={classNames} type="button" onClick={handleNavigation}>
      건너뛰기
    </button>
  );
}

export default memo(SkipButton);
