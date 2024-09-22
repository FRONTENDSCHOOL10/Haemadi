import { number } from 'prop-types';
import { memo } from 'react';

import styles from './StepIndicator.module.css';

StepIndicator.propTypes = {
  currentStep: number.isRequired,
};

function StepIndicator({ currentStep }) {
  const steps = 5; // 총 단계 수
  const progressPercentage = ((currentStep - 1) / steps) * 100; // 현재 단계에 따른 비율 계산

  return (
    <div className={styles.container}>
      <div
        className={styles.progress}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}

export default memo(StepIndicator);
