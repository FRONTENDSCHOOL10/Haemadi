import { memo } from 'react';
import { func, number, string } from 'prop-types';

import styles from './MusicButton.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

const musicNoteIcons = [
  'musicNote_pink',
  'musicNote_red',
  'musicNote_yellow',
  'musicNote_green',
  'musicNote_lightBlue',
  'musicNote_Blue',
  'musicNote_purple',
];

MusicButton.propTypes = {
  musicTitle: string.isRequired,
  musicArtist: string.isRequired,
  index: number,
  onClick: func,
};

function MusicButton({
  musicTitle,
  musicArtist,
  onClick,
  index,
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
      <SVGIcon className={styles.icons} {...icons[musicNoteIcons[index % 7]]} />

      <div className={styles.textWrapper}>
        <span className={styles.musicTitle}>{musicTitle}</span>
        <span className={styles.musicArtist}>{musicArtist}</span>
      </div>
    </button>
  );
}

export default memo(MusicButton);
