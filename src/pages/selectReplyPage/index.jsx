import { memo, useCallback, useEffect, useId, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './SelectReplyPage.module.css';
import { createDiary } from '@/api/diaries';
import { useDiaryStore } from '@/stores/diaryStore';
import Button from '@/components/Button/Button';
import ContentsRadioGroup from './components/ContentsRadioGroup/ContentsRadioGroup';
import ReplierRadioGroup from './components/ReplierRadioGroup/ReplierRadioGroup';

function SelectReplyPage() {
  const navigate = useNavigate();
  const { step } = useParams();
  const { diary, setDiary, resetDiary } = useDiaryStore();
  const formId = useId();
  const [status, setStatus] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

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
        navigate('/');
      },
      (error) => {
        setStatus('error');
        throw new Error(error);
      }
    );
  };

  if (status === 'loading') return <div>편지를 유리병에 넣고있어요.</div>;

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
