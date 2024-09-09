import { memo } from 'react';
import { oneOf } from 'prop-types';

import styles from './InterestBadge.module.css';
import { INTERESTS_KEYWORDS } from '@/constants';

InterestBadge.propTypes = {
  keywordList: oneOf(INTERESTS_KEYWORDS).isRequired,
};

function InterestBadge({ keywordList }) {
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
