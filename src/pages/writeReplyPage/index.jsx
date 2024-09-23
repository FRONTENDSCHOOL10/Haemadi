import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import styles from './WriteReplyPage.module.css';
import { updateDiary } from '@/api/diaries';
import { createReply } from '@/api/replies';
import { useAuthStore } from '@/stores/authStore';
import { useMediaStore } from '@/stores/mediaStore';
import { formatDate } from '@/utils';
import SendingCompleteScreen from '@/components/SendingCompleteScreen/SendingCompleteScreen';
import BackButton from '@/components/BackButton/BackButton';
import ModalDialog from '@/components/ModalDialog/ModalDialog';
import SendingScreen from '@/components/SendingScreen/SendingScreen';
import SaveButton from '../writeDiaryPage/components/SaveButton/SaveButton';

function WriteReplyPage() {
  const { diaryId } = useParams();
  const navigate = useNavigate();
  const formId = useId();
  const desktop = useMediaStore((store) => store.desktop);
  const userInfo = useAuthStore((store) => store.userInfo);
  const textAreaRef = useRef(null);
  const [currentModal, setCurrentModal] = useState(''); // '뒤로가기', '저장하기' 중 어떤 모달이 열렸는지
  const [status, setStatus] = useState(); // 서버 요청 상태
  const [showComplete, setShowComplete] = useState(false); // 서버 요청이 완료되었는지 상태

  const today = new Date();
  const formattedDate1 = formatDate(today, 1); // 2024-09-18 형식
  const formattedDate2 = formatDate(today, 2); // 24.09.18 (Wed) 형식

  // 텍스트필드 글이 길어지면 세로 길이도 같이 길어짐
  const handleResizeHeight = (e) => {
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
  };

  const openModal = useCallback(
    (modalName) => () => setCurrentModal(modalName),
    []
  );
  const closeModal = useCallback(() => setCurrentModal(null), []);
  const confirmModal = useCallback(() => {
    // 뒤로 가기
    if (currentModal === 'back') {
      navigate(-1);
    }
    // 제출 시
    if (currentModal === 'save') {
      const message = textAreaRef.current.value;

      const newReply = {
        message,
        diaryId,
        replier: 'user',
        userId: userInfo.id,
      };

      // 보내는 동시에 상태를 loading으로 변경
      setStatus('loading');
      createReply(newReply).then(({ id: replyId }) =>
        // 답장이 만들어지면 일기에 답장을 연결
        updateDiary({ replyId, id: diaryId }).then(
          () => {
            // 모두 성공적으로 끝나면 상태를 success로 변경
            setStatus('success');
          },
          (error) => {
            setStatus('error');
            throw new Error(error);
          }
        )
      );
    }
  }, [currentModal, navigate, diaryId, userInfo.id]);

  // 저장 버튼 클릭 시 모달창 열림
  const handleSubmit = (e) => {
    e.preventDefault();
    openModal('save')();
  };

  // 페이지 입장 시 텍스트필드에 포커스
  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  const onComplete = (value) => setShowComplete(value);

  // 서버 요청 중 유리병 보내는 화면
  if (status === 'loading') return <SendingScreen onComplete={onComplete} />;
  // 서버 요청 성공 후 잠시동안 완료 화면 보여줌
  if (status === 'success' && showComplete) return <SendingCompleteScreen />;
  // 완료 화면 끝나면 홈 화면으로 이동
  if (status === 'success' && !showComplete) return <Navigate to="/" />;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <BackButton onClick={openModal('back')} tabIndex={1} />
          <h1>편지 답장하기</h1>
          <SaveButton form={formId} tabIndex={3} />
        </div>
        {desktop && <time dateTime={formattedDate1}>{formattedDate2}</time>}
      </header>

      <main className={styles.main}>
        {!desktop && <time dateTime={formattedDate1}>{formattedDate2}</time>}

        <form id={formId} className={styles.reply} onSubmit={handleSubmit}>
          <h2>언제나 멋진 존재인 당신에게</h2>
          <textarea
            ref={textAreaRef}
            onChange={handleResizeHeight}
            rows={10}
            required
            tabIndex={2}
            placeholder="당신의 이야기를 작성해주세요."
          ></textarea>
        </form>
      </main>

      <ModalDialog
        isOpen={currentModal === 'back' || currentModal === 'save'}
        closeModal={closeModal}
        confirmModal={confirmModal}
      >
        {currentModal === 'back' ? (
          <>
            <h2>정말 돌아가시나요?</h2>
            <p>{'저장하지 않은 일기의 내용은\n저장되지 않습니다.'}</p>
          </>
        ) : (
          <>
            <h2>편지를 저장하시나요?</h2>
            <p>{"'예'를 선택 시 저장되며,\n저장 후에는 수정할 수 없습니다."}</p>
          </>
        )}
      </ModalDialog>
    </div>
  );
}

export default WriteReplyPage;
