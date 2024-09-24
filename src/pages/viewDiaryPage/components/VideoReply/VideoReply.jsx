import { string, arrayOf } from 'prop-types';
import styles from './VideoReply.module.css';
import { memo } from 'react';

VideoReply.propTypes = {
  imgSrc: string.isRequired,
  videoTitle: string.isRequired,
  hashTags: arrayOf(string),
};

function VideoReply({ imgSrc, videoTitle, hashTags }) {
  return (
    <figure className={styles.component}>
      <img src={imgSrc} alt={`${videoTitle} 썸네일`} loading="lazy" />
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
