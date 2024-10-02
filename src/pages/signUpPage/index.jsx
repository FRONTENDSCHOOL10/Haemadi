import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useImmer } from 'use-immer';

import styles from './SignUpPage.module.css';
import { userSignIn, userSignUp } from '@/api/users';
import { useMediaStore } from '@/stores/mediaStore';
import { useToaster } from '@/stores/ToasterStore';
import BackButton from '@/components/BackButton/BackButton';
import AuthInput from '@/components/AuthInput/AuthInput';
import Button from '@/components/Button/Button';
import { SyncLoader } from 'react-spinners';

function SignUpPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const toast = useToaster();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useImmer({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const [buttonsDisabled, setbuttonsDisabled] = useState(false);

  useEffect(() => {
    const { username, password, passwordConfirm } = values;

    if (
      username.length > 0 &&
      password.length > 0 &&
      passwordConfirm.length > 0 &&
      !loading
    ) {
      setbuttonsDisabled(true);
    } else {
      setbuttonsDisabled(false);
    }
  }, [values, loading]);

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

    const { username, password, passwordConfirm } = values;

    // 입력 값 유효성 검사
    if (!validateInput('username', username)) {
      toast('warn', '아이디가 유효하지 않습니다.');
      return;
    }

    if (!validateInput('password', password)) {
      toast('warn', '비밀번호가 유효하지 않습니다.');
      return;
    }

    // 비밀번호 일치 여부 확인
    if (password !== passwordConfirm) {
      toast('warn', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    // 서버에 정보 저장 및 로그인 처리
    try {
      await userSignUp(username, password, passwordConfirm);
      await userSignIn(username, password);

      // 사용자 정보를 입력하는 페이지로 이동
      navigate('/my/settings/user-info-input/1');
    } catch (error) {
      console.error('회원가입 또는 로그인 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupPage}>
      <Helmet>
        <title>회원가입 - 해마디</title>
        <meta
          name="description"
          content="회원가입하여 해마디 서비스를 이용해 보세요"
        />
        <meta property="og:title" content="회원가입 - 해마디" />
        <meta
          property="og:description"
          content="회원가입하여 해마디 서비스를 이용해 보세요"
        />
        <meta name="twitter:title" content="회원가입 - 해마디" />
        <meta
          name="twitter:description"
          content="회원가입하여 해마디 서비스를 이용해 보세요"
        />
      </Helmet>
      <div className={styles.titleWrapper}>
        <BackButton color={desktop ? 'white' : 'black'} />
        <h1>회원가입</h1>
      </div>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
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
          state={
            !buttonsDisabled ? 'disabled' : desktop ? 'default' : 'primary'
          }
          role="submit"
        >
          {loading ? (
            <>
              <SyncLoader color="#2E7FB9" size={10} aria-hidden="true" />
              <p className="sr-only">
                회원 가입이 완료된 후 버튼이 활성화됩니다.
              </p>
            </>
          ) : (
            '가입하기'
          )}
        </Button>
      </form>
    </div>
  );
}

export default SignUpPage;
