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
      title="선택한 음악 듣기"
      aria-label="선택한 음악 듣기"
      onClick={onClick}
      {...restProps}
    >
      <img src={imgSrc} alt={`${musicTitle} 앨범 커버`} />

      <div className={styles.textWrapper}>
        <span className={styles.musicTitle}>{musicTitle}</span>
        <span className={styles.musicArtist}>{musicArtist}</span>
      </div>
    </button>
  );
}

export default memo(MusicButton);
