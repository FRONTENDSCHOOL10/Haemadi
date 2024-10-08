import { oneOf, string } from 'prop-types';
import { memo } from 'react';
import styles from './AuthInput.module.css';

AuthInput.propTypes = {
  name: oneOf(['username', 'password', 'passwordConfirm']),
  placeholder: string,
};

function AuthInput({ name = 'username', placeholder, ...restProps }) {
  const isUserName = name === 'username';

  return (
    <input
      type={isUserName ? 'text' : 'password'}
      className={styles.authInput}
      placeholder={placeholder}
      name={name}
      minLength={isUserName ? 4 : 8}
      maxLength={20}
      autoFocus={isUserName}
      {...restProps}
    />
  );
}

export default memo(AuthInput);
