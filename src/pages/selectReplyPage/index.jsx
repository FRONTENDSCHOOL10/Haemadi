import { createDiary } from '@/api/diaries';
import Button from '@/components/Button/Button';
import SendingCompleteScreen from '@/components/SendingCompleteScreen/SendingCompleteScreen';
import SendingScreen from '@/components/SendingScreen/SendingScreen';
import { useDiaryStore } from '@/stores/diaryStore';
import { memo, useCallback, useEffect, useId, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ContentsRadioGroup from './components/ContentsRadioGroup/ContentsRadioGroup';
import ReplierRadioGroup from './components/ReplierRadioGroup/ReplierRadioGroup';
import styles from './SelectReplyPage.module.css';

function SelectReplyPage() {
  const navigate = useNavigate();
  const { step } = useParams();
  const { diary, resetDiary } = useDiaryStore();
  const formId = useId();
  const [status, setStatus] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [showComplete, setShowComplete] = useState(null);

  const handleSelect = useCallback((value) => setSelectedValue(value), []);

  useEffect(() => {
    setSelectedValue(null);
  }, [step]);

  const renderContent = () => {
    if (step === '1')
      return (
        <>
          <h1>누구에게 답장을 받고 싶은가요?</h1>
          <ReplierRadioGroup
            selectedValue={selectedValue}
            onSelect={handleSelect}
          />
        </>
      );
    if (step === '2')
      return (
        <>
          <h1>Ai 마디에게 어떤 답장을 받아볼까요?</h1>
          <ContentsRadioGroup
            selectedValue={selectedValue}
            onSelect={handleSelect}
          />
        </>
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === '1') {
      if (selectedValue === 'ai') {
        setSelectedValue(null);
        navigate('/write-diary/select-reply/2');
        return;
      }
    }
    if (step === '2') {
      /* -------------------------------------------------------------------------- */
      /*                                Ai 답장 만들기 로직                                */
      /* -------------------------------------------------------------------------- */
    }

    setStatus('loading');

    createDiary(diary).then(
      () => {
        setStatus('success');
        resetDiary();
      },
      (error) => {
        setStatus('error');
        throw new Error(error);
      }
    );
  };

  const onComplete = (value) => setShowComplete(value);

  // 서버 요청 중 유리병 보내는 화면
  if (status === 'loading') return <SendingScreen onComplete={onComplete} />;
  // 서버 요청 성공 후 잠시동안 완료 화면 보여줌
  if (status === 'success' && showComplete) return <SendingCompleteScreen />;
  // 완료 화면 끝나면 홈 화면으로 이동
  if (status === 'success' && !showComplete) return <Navigate to="/" />;

  return (
    <div className={styles.pageBackground}>
      <div className={styles.page}>
        <form id={formId} onSubmit={handleSubmit}>
          {renderContent()}
        </form>

        <Button
          role="submit"
          state={selectedValue ? 'default' : 'disabled'}
          form={formId}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
}

export default memo(SelectReplyPage);
