import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { SyncLoader } from 'react-spinners';

import styles from './SignInPage.module.css';
import BackButton from '@/components/BackButton/BackButton';
import AuthInput from '@/components/AuthInput/AuthInput';
import Button from '@/components/Button/Button';
import { useMediaStore } from '@/stores/mediaStore';
import { userSignIn } from '@/api/users';
import { useToaster } from '@/stores/ToasterStore';
import { Link } from 'react-router-dom';

function SignInPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const toast = useToaster();
  const navigate = useNavigate();
  const [values, setValues] = useImmer({
    username: '',
    password: '',
  });

  const [buttonState, setButtonState] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  useEffect(() => {
    const { username, password } = values;

    if (username.length > 0 && password.length > 0) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [values]);

  const validateInput = useCallback((name, value) => {
    // 아이디 및 비밀번호 유효성 검사 정규 표현식
    const ID_REGEX = /^[a-zA-Z0-9]{4,20}$/;
    const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/;

    if (name === 'username') return ID_REGEX.test(value);
    if (name === 'password') return PW_REGEX.test(value);
    return true;
  }, []);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setValues((draft) => {
        draft[name] = value;
      });
    },
    [setValues]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = values;

    // 입력 값 유효성 검사
    if (!validateInput('username', username)) {
      toast('warn', '아이디가 유효하지 않습니다.');
      return;
    }

    if (!validateInput('password', password)) {
      toast('warn', '비밀번호가 유효하지 않습니다.');
      return;
    }

    // 서버에 정보 저장 및 로그인 처리
    try {
      setLoading(true); // 로딩 상태 활성화
      await userSignIn(username, password);

      // 홈화면으로 이동
      navigate('/');
    } catch {
      toast('warn', '아이디와 비빌번호를 확인해주세요.');
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  return (
    <div className={styles.signinPage}>
      <div className={styles.titleWrapper}>
        <BackButton color={desktop ? 'white' : 'black'} />
        <h1>로그인</h1>
      </div>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label className="sr-only" htmlFor="username">
            아이디
          </label>
          <AuthInput
            id="username"
            name="username"
            placeholder="아이디"
            onChange={handleChange}
            value={values.username}
          />
          <label className="sr-only" htmlFor="password">
            비밀번호
          </label>
          <AuthInput
            id="password"
            name="password"
            placeholder="비밀번호"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <Button
          type="stroke"
          state={
            !buttonState || loading
              ? 'disabled'
              : desktop
                ? 'default'
                : 'primary'
          }
          role="submit"
        >
          {loading ? (
            <SyncLoader margin={3} size={7} color="#2E7FB9" />
          ) : (
            '로그인하기'
          )}
        </Button>
      </form>
      <Link className={styles.registerButton} to="./../sign-up">
        회원가입
      </Link>
    </div>
  );
}

export default SignInPage;
