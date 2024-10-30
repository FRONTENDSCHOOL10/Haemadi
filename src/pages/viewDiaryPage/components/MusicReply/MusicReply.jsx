import { memo } from 'react';
import { bool, func, string } from 'prop-types';

import styles from './MusicReply.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

MusicReply.propTypes = {
  desktop: bool.isRequired,
  musicTitle: string.isRequired,
  musicArtist: string.isRequired,
  onClick: func,
};

function MusicReply({
  desktop,
  musicTitle,
  musicArtist,
  onClick,
  ...restProps
}) {
  return (
    <div className={styles.musicReply}>
      <div className={styles.songInfo}>
        <SVGIcon
          {...icons.music}
          width={desktop ? 30 : 25}
          height={desktop ? 44 : 36}
        />

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
        <SVGIcon {...icons.musicPlay} yPos={2} />
      </button>
    </div>
  );
}

export default memo(MusicReply);
