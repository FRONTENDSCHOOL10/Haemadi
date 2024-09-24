import { memo } from 'react';
import { arrayOf, string, func } from 'prop-types';

import styles from './KeywordList.module.css';
import { INTERESTS_KEYWORDS } from '@/constants';
import KeywordInput from '../KeywordInput/KeywordInput';

KeywordList.propTypes = {
  selectedKeywords: arrayOf(string).isRequired, // 배열 내 문자열 요소
  setSelectedKeywords: func.isRequired, // 함수 타입
};

function KeywordList({ selectedKeywords, setSelectedKeywords }) {
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
            ></KeywordInput>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(KeywordList);
