import { memo, useId, useState } from 'react';

import styles from './KeywordList.module.css';
import { INTERESTS_KEYWORDS } from '@/constants';

function KeywordList() {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleCheckboxChange = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      // 이미 선택된 경우 선택 해제
      setSelectedKeywords(selectedKeywords.filter((item) => item !== keyword));
    } else {
      // 3개 이하로만 선택 가능
      if (selectedKeywords.length < 3) {
        setSelectedKeywords([...selectedKeywords, keyword]);
      }
    }
  };

  return (
    <ul className={styles.keywordList}>
      {INTERESTS_KEYWORDS.map((element, index) => {
        const uniqueId = useId();
        const isChecked = selectedKeywords.includes(element);

        return (
          <li key={index}>
            <input
              className={styles['appearance-none']}
              type="checkbox"
              name="KeywordsOfInterest"
              value={element}
              id={uniqueId}
              checked={isChecked}
              onChange={() => handleCheckboxChange(element)}
            />
            <label className={styles.keyword} htmlFor={uniqueId}>
              {element}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(KeywordList);
