import BackButton from '@/components/BackButton/BackButton';
import ModalDialog from '@/components/ModalDialog/ModalDialog';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import { formatDate } from '@/utils';
import { memo, useCallback, useEffect, useId, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SaveButton from './components/SaveButton/SaveButton';
import styles from './WriteDiaryPage.module.css';

function WriteDiaryPage() {
  const navigate = useNavigate();
  const desktop = useMediaStore((store) => store.desktop);
  const { emotion } = useParams();
  const formId = useId();
  const textAreaRef = useRef(null);
  const [openedModal, setOpenedModal] = useState(null);

  const today = new Date();
  const formattedDate1 = formatDate(today, 1); // 2024-09-18 형식
  const formattedDate2 = formatDate(today, 2); // 24.09.18 (Wed) 형식

  const handleResizeHeight = (e) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const openModal = useCallback(
    (modalName) => () => setOpenedModal(modalName),
    []
  );
  const closeModal = useCallback(() => setOpenedModal(null), []);
  const confirmModal = useCallback(() => {
    if (openedModal === 'back') {
      navigate(-1);
    }
    if (openedModal === 'save') {
      navigate('/write-diary/select-reply/1');
    }
  }, [navigate, openedModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal('save')();
  };

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <BackButton onClick={openModal('back')} />
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
            required
          ></textarea>
        </form>
      </main>

      <ModalDialog
        isOpen={openedModal === 'back' || openedModal === 'save'}
        closeModal={closeModal}
        confirmModal={confirmModal}
      >
        <h2>
          {openedModal === 'back'
            ? '정말 돌아가시나요?'
            : '일기 작성을 마무리하시나요?'}
        </h2>
        <p>
          {openedModal === 'back'
            ? '저장하지 않은 일기의 내용은\n저장되지 않습니다.'
            : '작성한 일기에 받을 답장 선택 후,\n최종 저장됩니다.'}
        </p>
      </ModalDialog>
    </div>
  );
}

export default memo(WriteDiaryPage);
