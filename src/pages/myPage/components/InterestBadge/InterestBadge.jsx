import { memo } from 'react';
import { arrayOf, string } from 'prop-types';

import styles from './InterestBadge.module.css';

InterestBadge.propTypes = {
  list: arrayOf(string).isRequired,
};

function InterestBadge({ list }) {
  return (
    <>
      {list.length > 0 ? (
        <ul className={styles.keywordList}>
          {list.map((element, index) => (
            <li className={styles.keyword} key={`${element}-${index}`}>
              {element}
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles.nothing}>관심사가 없습니다.</span>
      )}
    </>
  );
}

export default memo(InterestBadge);
