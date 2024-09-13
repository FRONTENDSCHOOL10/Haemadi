import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './signUpPage.module.css';
import BackButton from '@/components/BackButton/BackButton';
import AuthInput from '@/components/AuthInput/AuthInput';
import Button from '@/components/Button/Button';
import { userSignUp } from '@/api/users';

function SignUpPage() {
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

  // 아이디 및 비밀번호 유효성 검사 정규 표현식
  const ID_REGEX = /^[a-zA-Z0-9]{4,20}$/;
  const PW_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,20}$/;

  const validateInput = useCallback((name, value) => {
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

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password, passwordConfirm } = values;

    // 비밀번호 일치 여부 확인
    if (password !== passwordConfirm) {
      console.log('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 입력 값 유효성 검사
    if (!validateInput('username', username)) {
      console.log('아이디가 유효하지 않습니다.');
      return;
    }

    if (!validateInput('password', password)) {
      console.log('비밀번호가 유효하지 않습니다.');
      return;
    }

    // 서버에 정보 저장
    userSignUp(username, password, passwordConfirm)
      .then((responseData) => {
        // 서버에서 오류가 없고 새로운 유저가 생성된 경우 navigate 실행
        //캐싱
        navigate('/my/settings/userInfoInput/1');
      })
      .catch((error) => {
        // 서버 오류가 있을 경우 에러를 처리 (예: 사용자에게 알림)
        console.error('Sign-up failed:', error);
      });
  }

  return (
    <>
      <BackButton />
      <h1>회원가입</h1>
      <form>
        <label htmlFor="username">아이디</label>
        <AuthInput
          id="username"
          name="username"
          placeholder="아이디 (영문, 숫자 포함 4자 이상)"
          onChange={handleChange}
          value={values.username}
        />
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
        <Button
          type="stroke"
          state={buttonState ? 'default' : 'disabled'}
          onClick={handleSubmit}
        >
          가입하기
        </Button>
      </form>
    </>
  );
}

export default SignUpPage;
