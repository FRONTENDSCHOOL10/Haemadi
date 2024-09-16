import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import PropTypes from 'prop-types';
import { memo, useId, useState } from 'react';
import styles from './NickName.module.css';

function NickName({ initialNickname }) {
  const [nickname, setNickname] = useState(initialNickname || '');
  const [editing, setIsEditing] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const desktop = useMediaStore((store) => store.desktop);

  const id = useId();

  // 닉네임 유효성 검사 함수
  const validateNickname = (name) => /^[가-힣a-zA-Z0-9 ]{4,9}$/.test(name);

  const handleChange = (event) => {
    const { value } = event.target;
    if (validateNickname(value)) {
      setNickname(value);
    }
  };

  const handleFocus = () => setIsEditing(true);

  const handleBlur = () => setIsEditing(false);

  return (
    <form className={styles.form}>
      <label htmlFor={id} className="${styles.label} sr-only">
        사용자 닉네임 입력창
      </label>
      <input
        type="text"
        id={id}
        name="nickname"
        defaultValue={nickname}
        placeholder="닉네임을 작성해주세요"
        className={styles.input}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        key={inputKey}
        maxLength={9}
        aria-required="true"
      />
      <button
        type="reset"
        className={styles.clearButton}
        aria-label="닉네임 지우기"
      >
        <SVGIcon
          {...icons.remove}
          color={
            desktop ? '#000' : icons.remove.color
          } /* 사용 시 #fff로 변경해주세요*/
        />
      </button>
    </form>
  );
}

NickName.propTypes = {
  initialNickname: PropTypes.string,
};

export default memo(NickName);
