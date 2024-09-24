import { useMediaStore } from '@/stores/mediaStore';
import styles from './StepContents.module.css';
import { memo } from 'react';

function Step3Content() {
  const desktop = useMediaStore((store) => store.desktop);
  return (
    <div className={styles.step3Content}>
      <h1>매일 당신을 기다릴게요!</h1>
      <p>
        {
          '평화로운 나만의 섬에서 유리병 편지에 당신의 이야기를\n담아주세요.어떤 답장이 올 지 기대해도 좋아요.'
        }
      </p>
      <p>{`해마디 ${desktop ? '' : '\n'}한번 시작해 볼까요?`}</p>
    </div>
  );
}

export default memo(Step3Content);
