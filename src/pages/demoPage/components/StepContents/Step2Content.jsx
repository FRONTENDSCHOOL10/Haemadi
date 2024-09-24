import RadioList from '@/components/RadioList/RadioList';
import { func } from 'prop-types';
import styles from './StepContents.module.css';
import { memo } from 'react';

Step2Content.propTypes = {
  handleSelect: func,
};
function Step2Content({ handleSelect }) {
  return (
    <div className={styles.step2Content}>
      <h1>{'오늘 하루\n나의 감정은 어떤가요?'}</h1>
      <p>오늘 하루의 감정을 저에게 알려주세요.</p>
      <RadioList type="emotion" onSelect={handleSelect} />
    </div>
  );
}

export default memo(Step2Content);
