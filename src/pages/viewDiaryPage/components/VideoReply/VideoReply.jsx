import { string, arrayOf, bool } from 'prop-types';
import styles from './VideoReply.module.css';
import { memo } from 'react';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

VideoReply.propTypes = {
  desktop: bool.isRequired,
  videoTitle: string.isRequired,
  hashTags: arrayOf(string),
};

function VideoReply({ desktop, videoTitle, hashTags }) {
  return (
    <figure className={styles.component}>
      <SVGIcon
        {...icons.video}
        width={desktop ? 52 : 42}
        height={desktop ? 33 : 27}
      />

      <figcaption>
        <strong>{videoTitle}</strong>
        <ul>
          {hashTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}

export default memo(VideoReply);
