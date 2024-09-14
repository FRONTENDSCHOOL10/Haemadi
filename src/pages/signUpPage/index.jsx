import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './signUpPage.module.css';
import BackButton from '@/components/BackButton/BackButton';
import AuthInput from '@/components/AuthInput/AuthInput';
import Button from '@/components/Button/Button';
import { useMediaStore } from '@/stores/mediaStore';
import { userSignIn, userSignUp } from '@/api/users';

function SignUpPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const [values, setValues] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    const { username, password, passwordConfirm } = values;

    if (
      username.length > 0 &&
      password.length > 0 &&
      passwordConfirm.length > 0
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [values]);

  const navigate = useNavigate();
  // const toast = useToaster();

  const validateInput = useCallback((name, value) => {
    // 아이디 및 비밀번호 유효성 검사 정규 표현식
    const ID_REGEX = /^[a-zA-Z0-9]{4,20}$/;
    const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/;

    if (name === 'username') return ID_REGEX.test(value);
    if (name === 'password') return PW_REGEX.test(value);
    return true;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = values;

    // 입력 값 유효성 검사
    if (!validateInput('username', username)) {
      console.log('아이디가 유효하지 않습니다.');
      return;
    }

    if (!validateInput('password', password)) {
      console.log('비밀번호가 유효하지 않습니다.');
      return;
    }

    // 비밀번호 일치 여부 확인
    if (password !== passwordConfirm) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 서버에 정보 저장 및 로그인 처리
    try {
      await userSignUp(username, password, passwordConfirm);
      const signInResponse = await userSignIn(username, password);

      // 로그인 성공 시 토큰과 사용자 ID를 로컬 스토리지에 저장
      localStorage.setItem('auth', {
        token: signInResponse.token,
        userId: signInResponse.record.id,
      });

      // 사용자 정보를 입력하는 페이지로 이동
      navigate('/my/settings/userInfoInput/1');
    } catch (error) {
      console.error('회원가입 또는 로그인 실패:', error);
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.titleWrapper}>
        <BackButton color={desktop ? 'white' : 'black'} />
        <h1>회원가입</h1>
      </div>
      <form className={styles.formWrapper}>
        <div className={styles.idWrapper}>
          <label htmlFor="username">아이디</label>
          <AuthInput
            id="username"
            name="username"
            placeholder="아이디 (영문, 숫자 포함 4자 이상)"
            onChange={handleChange}
            value={values.username}
          />
        </div>
        <div className={styles.passwordWrapper}>
          <label htmlFor="password">비밀번호</label>
          <AuthInput
            id="password"
            name="password"
            placeholder="비밀번호 (영문, 숫자, 특수문자 조합 8~20자리)"
            onChange={handleChange}
            value={values.password}
          />
          <label className="sr-only" htmlFor="passwordConfirm">
            비밀번호 확인
          </label>
          <AuthInput
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호 재입력"
            onChange={handleChange}
            value={values.passwordConfirm}
          />
        </div>
        <Button
          type="stroke"
          state={!buttonState ? 'disabled' : desktop ? 'default' : 'primary'}
          onClick={handleSubmit}
        >
          가입하기
        </Button>
      </form>
    </div>
  );
}

export default SignUpPage;
