import { string } from 'prop-types';
import styles from './BookReply.module.css';
import { memo } from 'react';

BookReply.propTypes = {
  imgSrc: string.isRequired,
  bookTitle: string.isRequired,
  author: string.isRequired,
  publisher: string.isRequired,
};

function BookReply({ imgSrc, bookTitle, author, publisher }) {
  return (
    <figure className={styles.component}>
      <img src={imgSrc} alt={`${bookTitle} 책 표지`} loading="lazy" />
      <figcaption>
        <strong>{bookTitle}</strong>
        <br />
        <span>
          저자 {author} / 출판사 {publisher}
        </span>
      </figcaption>
    </figure>
  );
}

export default memo(BookReply);
