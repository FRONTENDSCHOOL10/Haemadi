import { string } from 'prop-types';
import styles from './QuotesReply.module.css';

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

export default QuotesReply;
