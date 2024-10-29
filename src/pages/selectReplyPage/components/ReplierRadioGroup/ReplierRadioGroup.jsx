import { func, oneOf } from 'prop-types';
import { useId, memo } from 'react';
import styles from './ReplierRadioGroup.module.css';

ReplierRadioGroup.propTypes = {
  onSelect: func,
  selectedValue: oneOf(['ai', 'user']),
};

function ReplierRadioGroup({ selectedValue, onSelect }) {
  const radioAiId = useId();
  const radioUserId = useId();

  const handleChange = (e) => {
    onSelect?.(e.currentTarget.value);
  };

  return (
    <fieldset className={styles.groupWrapper}>
      <legend className="sr-only">답장 유형 선택</legend>
      <input
        type="radio"
        name="replier"
        value="ai"
        id={radioAiId}
        className={styles.radioInput}
        checked={selectedValue === 'ai'}
        onChange={handleChange}
      />
      <label htmlFor={radioAiId} className={styles.radioCard}>
        <strong>Ai 마디</strong>
        <p>간단한 답장과 함께 노래, 명언, 책을 추천받을 수 있어요</p>
      </label>

      <input
        type="radio"
        name="replier"
        value="user"
        id={radioUserId}
        className={styles.radioInput}
        checked={selectedValue === 'user'}
        onChange={handleChange}
      />
      <label htmlFor={radioUserId} className={styles.radioCard}>
        <strong>익명의 누군가</strong>
        <p>편지에 대해 조언, 공감 등 다양한 이야기를 받아볼 수 있어요</p>
      </label>
    </fieldset>
  );
}

export default memo(ReplierRadioGroup);
