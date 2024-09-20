import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import PropTypes from 'prop-types';
import { memo, useId, useRef } from 'react';
import styles from './NickNameInput.module.css';

function NickNameInput({ initialNickname }) {
  const desktop = useMediaStore((store) => store.desktop);
  const id = useId();
  const inputRef = useRef(null);

  // 닉네임 유효성 검사
  const validateNickname = (name) => /^[가-힣a-zA-Z0-9 ]{4,9}$/.test(name);

  const handleChange = (event) => {
    const { value } = event.target;
    validateNickname(value); // 유효성 검사 수행
  };

  // 닉네임 초기화
  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={styles.nickWrap}>
      <label htmlFor={id} className={`${styles.label} sr-only`}>
        사용자 닉네임 입력창
      </label>
      <input
        type="text"
        id={id}
        name="nicknameInput"
        ref={inputRef}
        defaultValue={initialNickname || ''}
        placeholder="닉네임을 작성해주세요"
        className={styles.input}
        onChange={handleChange}
        maxLength={9}
        aria-required="true"
      />
      <button
        type="button"
        className={styles.clearButton}
        aria-label="닉네임 지우기"
        onClick={handleReset}
      >
        <SVGIcon
          {...icons.remove}
          color={desktop ? '#000' : icons.remove.color} // 사용 시 #fff로 변경해주세요!
        />
      </button>
    </div>
  );
}

NickNameInput.propTypes = {
  initialNickname: PropTypes.string,
};

export default memo(NickNameInput);
