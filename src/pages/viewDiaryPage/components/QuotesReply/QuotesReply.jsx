import { string } from 'prop-types';
import styles from './QuotesReply.module.css';
import { memo } from 'react';

QuotesReply.propTypes = {
  quotes: string.isRequired,
  author: string.isRequired,
};

function QuotesReply({ quotes, author }) {
  return (
    <blockquote className={styles.component}>
      {quotes}
      <br />
      <br />
      <cite>- {author}</cite>
    </blockquote>
  );
}

export default memo(QuotesReply);
