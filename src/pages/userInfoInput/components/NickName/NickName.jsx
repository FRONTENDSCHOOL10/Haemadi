import styles from './NickName.module.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMediaStore } from '@/stores/mediaStore';
import { memo } from 'react';

// PropTypes 정의
NickName.propTypes = {
  initialNickname: PropTypes.string,
};

// PropTypes 설정
const NickName = ({ initialNickname }) => {
  // State 관리
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
          <button type="button" className={styles.clearButton} onClick={handleClear}>
            <img src="/path-to-x-icon.png" alt="Clear" />
          </button>
        )}
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </form>
  );
};