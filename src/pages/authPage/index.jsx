import { useNavigate } from 'react-router-dom';

import styles from './authPage.module.css';
import Button from '@/components/Button/Button';
import { useMediaStore } from '@/stores/mediaStore';

function AuthPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const navigate = useNavigate();
  return (
    <div className={styles.authPage}>
      <h1 className="sr-only">인증하기</h1>
      <div className={styles.textWrapper}>
        <span>감정관리를 위한 일기 서비스</span>
        <strong>해마디</strong>
      </div>
      <div className={styles.buttonWrapper}>
        {desktop && (
          <Button type="stroke" onClick={() => navigate('./sign-up')}>
            회원가입
          </Button>
        )}
        <Button
          type="stroke"
          state={!desktop ? 'primary' : 'default'}
          onClick={() => navigate('./sign-in')}
        >
          로그인
        </Button>
      </div>
    </div>
  );
}

export default AuthPage;
