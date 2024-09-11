import { memo, useId, useState } from 'react';

import styles from './KeywordList.module.css';
import { INTERESTS_KEYWORDS } from '@/constants';
import KeywordInput from '../KeywordInput/KeywordInput';

function KeywordList() {
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const isChecked = (element) => selectedKeywords.includes(element);

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
        return (
          <li key={index}>
            <KeywordInput
              element={element}
              isChecked={isChecked}
              onChange={handleCheckboxChange}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default memo(KeywordList);
