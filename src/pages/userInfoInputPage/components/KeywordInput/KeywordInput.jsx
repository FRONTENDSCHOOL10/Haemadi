import { useId, memo } from 'react';
import { func, string } from 'prop-types';

import styles from './KeywordInput.module.css';

KeywordInput.propTypes = {
  element: string.isRequired,
  onChange: func.isRequired,
  isChecked: func.isRequired,
};

function KeywordInput({ element, onChange, isChecked }) {
  const uniqueId = useId();

  return (
    <>
      <input
        className={styles['appearance-none']}
        type="checkbox"
        name="KeywordsOfInterest"
        value={element}
        id={uniqueId}
        checked={isChecked(element)}
        onChange={() => onChange(element)}
      />
      <label className={styles.keyword} htmlFor={uniqueId}>
        {element}
      </label>
    </>
  );
}

export default memo(KeywordInput);
