import { memo } from 'react';
import { func, string } from 'prop-types';

import styles from './MusicButton.module.css';

MusicButton.propTypes = {
  imgSrc: string.isRequired,
  musicTitle: string.isRequired,
  musicArtist: string.isRequired,
  onClick: func,
};

function MusicButton({
  imgSrc,
  musicTitle,
  musicArtist,
  onClick,
  ...restProps
}) {
  return (
    <button
      className={styles.musicButton}
      type="button"
      title={`${musicTitle} 음악 듣기`}
      aria-label={`${musicTitle} 음악 듣기`}
      onClick={onClick}
      {...restProps}
    >
      <img src={imgSrc} alt={`${musicTitle} 앨범 커버`} loading="lazy" />

      <div className={styles.textWrapper}>
        <span className={styles.musicTitle}>{musicTitle}</span>
        <span className={styles.musicArtist}>{musicArtist}</span>
      </div>
    </button>
  );
}

export default memo(MusicButton);
