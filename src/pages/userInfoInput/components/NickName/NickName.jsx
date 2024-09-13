import styles from './NickName.module.css';
import PropTypes from 'prop-types';
import React, { useState, memo } from 'react';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { useMediaStore } from '@/stores/mediaStore';

function NickName({ initialNickname }) {
  const [nickname, setNickname] = useState(initialNickname || '');
  const [isEditing, setIsEditing] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const isDesktop = useMediaStore((store) => store.desktop);

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


  const handleClear = () => {
    setNickname('');
    setInputKey((prevKey) => prevKey + 1); 
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="nickname"
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
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="닉네임 지우기"
        >
          <SVGIcon 
            {...icons.remove} 
            color={isDesktop ? '#000' : icons.remove.color} /* 사용 시 #fff로 변경해주세요*/
          />
        </button>
      </div>
    </form>
  );
}

NickName.propTypes = {
  initialNickname: PropTypes.string,
};

export default memo(NickName);
