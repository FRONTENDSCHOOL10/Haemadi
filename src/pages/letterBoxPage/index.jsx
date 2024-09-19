import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './LetterBoxPage.module.css';

function LetterBoxPage() {
  const desktop = useMediaQuery({ query: '(min-width: 960px)' });
  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <BackButton
            color="white"
            style={{
              position: 'absolute',
              top: desktop ? '8vh' : '24px',
              left: desktop ? 'calc(50vw - 130px)' : '40px',
            }}
          />
          <h1>마디 유리병 편지함</h1>
        </header>

        <main className={styles.main}>
          <h2>{'Ai 마디에게 받은\n유리병 편지함이에요'}</h2>
          <SVGIcon
            {...icons[`glassBottle${desktop ? '_selected' : '_mobile'}`]}
            className={styles.glassBottle}
          />
          <p>{'마디는 해마디의 Ai 서비스로\n작성한 편지를 분석해 답변해요'}</p>
          <Button
            role="button"
            style={{ marginTop: desktop ? '4.6vh' : '5.1vh' }}
          >
            보러 갈래요
          </Button>
        </main>
      </div>
    </div>
  );
}

export default memo(LetterBoxPage);
