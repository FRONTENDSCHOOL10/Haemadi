import { memo } from 'react';

import styles from './InterestBadge.module.css';
import { useAuthStore } from '@/stores/authStore';

function InterestBadge() {
  const userInfo = useAuthStore((store) => store.userInfo);
  return (
    <>
      {userInfo.interest.length > 0 ? (
        <ul className={styles.keywordList}>
          {userInfo.interest.map((element) => (
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
