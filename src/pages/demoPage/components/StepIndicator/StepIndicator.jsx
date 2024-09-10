import { oneOf } from 'prop-types';
import { memo } from 'react';
import styles from './StepIndicator.module.css';

StepIndicator.propTypes = {
  step: oneOf([1, 2, 3]).isRequired,
};

function StepIndicator({ step }) {
  return (
    <nav aria-label="스텝">
      <ol className={styles.stepIndicator}>
        {[1, 2, 3].map((item) => (
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
