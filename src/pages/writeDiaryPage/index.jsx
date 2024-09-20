import BackButton from '@/components/BackButton/BackButton';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import { formatDate } from '@/utils';
import { memo, useEffect, useId, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SaveButton from './components/SaveButton/SaveButton';
import styles from './WriteDiaryPage.module.css';

function WriteDiaryPage() {
  const { emotion } = useParams();
  const desktop = useMediaStore((store) => store.desktop);
  const textAreaRef = useRef(null);
  const formId = useId();

  const today = new Date();
  const formattedDate1 = formatDate(today, 1); // 2024-09-18 형식
  const formattedDate2 = formatDate(today, 2); // 24.09.18 (Wed) 형식

  const handleResizeHeight = (e) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <BackButton />
          <h1>일기 작성하기</h1>
          <SaveButton form={formId} />
        </div>
        {desktop && <time dateTime={formattedDate1}>{formattedDate2}</time>}
      </header>

      <main className={styles.main}>
        {!desktop && <time dateTime={formattedDate1}>{formattedDate2}</time>}

        <form id={formId} className={styles.diary} onSubmit={handleSubmit}>
          <h2>오늘은 어떤 하루였나요?</h2>
          <SVGIcon
            {...icons[`shell_${emotion}`]}
            width={58}
            style={{ marginBottom: desktop ? '45px' : '38px' }}
          />
          <h3>오늘의 이야기를 들려주세요.</h3>
          <textarea
            ref={textAreaRef}
            onChange={handleResizeHeight}
            rows={10}
          ></textarea>
        </form>
      </main>
    </div>
  );
}

export default memo(WriteDiaryPage);
