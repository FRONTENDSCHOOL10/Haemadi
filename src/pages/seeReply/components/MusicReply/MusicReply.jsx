import { memo } from 'react';
import { func, bool } from 'prop-types';

import styles from './MusicReply.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

MusicReply.propTypes = {
  onClick: func,
};

function MusicReply({ onClick, ...restProps }) {
  //   const classNames =
  // `${styles.skipButton} ${colored ? styles.skipButton_colored : ''}`.trim();

  return (
    <div className={styles.musicReply}>
      <div className={styles.songInfo}>
        <img
          src="https://lh3.googleusercontent.com/Sk-qk0u9mZ1QWBDazMJdzLWVic1TSa7TWZYC8_-FUtkUDyy0Vg61zHZlJs88ejYy3o60GRbmSDTOUm8w=w544-h544-l90-rj"
          alt="뉴진스"
        />

        <div className={styles.textWrapper}>
          <span>Hot Sweet</span>
          <span>NewJeans</span>
        </div>
      </div>

      <button
        //   className={classNames}
        type="button"
        onClick={onClick}
        {...restProps}
      >
        <SVGIcon {...icons.musicPlay} yPos={6} />
      </button>
    </div>
  );
}

export default memo(MusicReply);
