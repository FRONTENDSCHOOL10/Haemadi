import { memo, useId, useRef } from 'react';
import { string, func } from 'prop-types';

import styles from './NickNameInput.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';

NickNameInput.propTypes = {
  initialNickname: string,
  onChange: func,
};

function NickNameInput({ initialNickname, onChange }) {
  const desktop = useMediaStore((store) => store.desktop);
  const id = useId();
  const inputRef = useRef(null);

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
        onChange={onChange}
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
          color={desktop ? '#fff' : icons.remove.color} // 사용 시 #fff로 변경해주세요!
        />
      </button>
    </div>
  );
}

export default memo(NickNameInput);
