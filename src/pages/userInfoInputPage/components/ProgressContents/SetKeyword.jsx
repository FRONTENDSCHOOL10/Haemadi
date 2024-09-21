import { memo } from 'react';

import styles from './ProgressContents.module.css';
import KeywordList from '../KeywordList/KeywordList';

function SetKeyword() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        거의 다 왔어요!
        <br />
        최근 감정에 영향을 주고 있는
        <br />
        키워드는 무엇인가요?
      </p>
      <p className={styles.subTitle}>
        나와 비슷한 타 사용자와의 소통을 위해
        <br />
        최근 가장 영향을 받고 있는 키워드를 선택해주세요!
      </p>
      <span className={styles.description}>
        *키워드는 최대 3개까지 선택할 수 있어요
      </span>
      <div className={styles.inputWrapper}>
        <KeywordList />
      </div>
    </div>
  );
}

export default memo(SetKeyword);
