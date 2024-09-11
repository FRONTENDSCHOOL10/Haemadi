import styles from './NickName.module.css';
import PropTypes from 'prop-types';
import React, { useState, memo } from 'react';
import icons from '@/icons';

// 컴포넌트 선언
const NickName = ({ initialNickname }) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 닉네임 유효성 검사 (공백 포함 4~9 글자, 특수문자 포함 불가)
  const validateNickname = (name) => {
    const regex = /^[가-힣a-zA-Z0-9 ]{4,9}$/;
    return regex.test(name);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (validateNickname(value)) {
      setNickname(value);
      setErrorMessage('');
    } else {
      setErrorMessage('닉네임은 공백 포함 4~9 글자이며, 특수 문자는 포함될 수 없습니다.');
    }
  };

  const handleClear = () => {
    setNickname('');
    setErrorMessage('');
  };

  return (
    <form className={styles.form}>
      <label htmlFor="nickname" className={styles.label}>
        닉네임
      </label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="nickname"
          value={nickname}
          placeholder="닉네임을 작성해주세요"
          className={styles.input}
          onChange={handleChange}
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
        />
        {nickname && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="닉네임 지우기"
          >
            <SVGIcon {...icons.remove} />
          </button>
        )}
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
  );
};


// PropTypes 설정
NickName.propTypes = {
  initialNickname: PropTypes.string,
};

export default memo(NickName);
