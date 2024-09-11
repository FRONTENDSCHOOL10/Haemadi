import { useId, memo } from 'react';
import styles from './KeywordInput.module.css';

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
