import styles from './AuthInput.module.css';
import { oneOf, string } from 'prop-types';

AuthInput.propTypes = {
  type: oneOf(['text', 'password']),
  name: oneOf(['username', 'password', 'passwordConfirm']),
  placeholder: string,
};

function AuthInput({
  type = 'text',
  name = 'username',
  placeholder,
  ...restProps
}) {
  return (
    <input
      type={type}
      className={styles.authInput}
      placeholder={placeholder}
      name={name}
      minLength={name === 'username' ? 4 : 8}
      maxLength={20}
      autoFocus={name === 'username'}
      {...restProps}
    />
  );
}

export default AuthInput;
