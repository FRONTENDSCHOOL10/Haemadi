import { oneOf } from 'prop-types';
import { memo } from 'react';
import styles from './StepIndicator.module.css';

const STEP_RANGE = ['1', '2', '3'];

StepIndicator.propTypes = {
  step: oneOf(STEP_RANGE).isRequired,
};

function StepIndicator({ step, ...restProps }) {
  return (
    <nav aria-label="스텝" {...restProps}>
      <ol className={styles.stepIndicator}>
        {STEP_RANGE.map((item) => (
          <li
            key={item}
            aria-current={step === item ? 'step' : undefined}
            aria-label={`스텝 ${item}`}
          ></li>
        ))}
      </ol>
    </nav>
  );
}

export default memo(StepIndicator);
