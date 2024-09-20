import { memo } from 'react';
import { arrayOf, oneOf } from 'prop-types';

import styles from './InterestBadge.module.css';
import { INTERESTS_KEYWORDS } from '@/constants';

InterestBadge.propTypes = {
  keywordList: arrayOf(oneOf(INTERESTS_KEYWORDS)),
};

function InterestBadge({ keywordList = [] }) {
  return (
    <>
      {keywordList.length > 0 ? (
        <ul className={styles.keywordList}>
          {keywordList.map((element) => (
            <li className={styles.keyword} key={element}>
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
