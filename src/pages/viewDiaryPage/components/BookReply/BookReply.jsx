import { bool, string } from 'prop-types';
import styles from './BookReply.module.css';
import { memo } from 'react';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

BookReply.propTypes = {
  desktop: bool.isRequired,
  bookTitle: string.isRequired,
  author: string.isRequired,
  publisher: string.isRequired,
};

function BookReply({ desktop, bookTitle, author, publisher }) {
  return (
    <figure className={styles.component}>
      <SVGIcon
        {...icons.book}
        width={desktop ? 52 : 39}
        height={desktop ? 48 : 36}
      />
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
