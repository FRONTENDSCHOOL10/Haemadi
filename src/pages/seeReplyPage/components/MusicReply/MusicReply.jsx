import { memo } from 'react';
import { func, string } from 'prop-types';

import styles from './MusicReply.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

MusicReply.propTypes = {
  imgSrc: string.isRequired,
  musicTitle: string.isRequired,
  musicArtist: string.isRequired,
  onClick: func,
};

function MusicReply({
  imgSrc,
  musicTitle,
  musicArtist,
  onClick,
  ...restProps
}) {
  return (
    <div className={styles.musicReply}>
      <div className={styles.songInfo}>
        <img src={imgSrc} alt={`${musicTitle} 앨범 커버`} />

        <div className={styles.textWrapper}>
          <span className={styles.musicTitle}>{musicTitle}</span>
          <span className={styles.musicArtist}>{musicArtist}</span>
        </div>
      </div>

      <button
        type="button"
        aria-label="음악 재생"
        onClick={onClick}
        {...restProps}
      >
        <SVGIcon {...icons.musicPlay} yPos={6} />
      </button>
    </div>
  );
}

export default memo(MusicReply);
