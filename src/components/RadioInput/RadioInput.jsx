import { memo, useId } from 'react';
import { node, oneOf, func } from 'prop-types';

import styles from './RadioInput.module.css';

// props type 정의
RadioInput.propTypes = {
  children: node.isRequired,
  type: oneOf(['gender', 'age', 'emotion', 'experience']),
  onChange: func,
};

// RadioInput Component
function RadioInput({ children, type = 'emotion', onChange }) {
  const radioInputId = useId();
  const classNames = `${styles.radioStyles} ${styles[type]}`.trim();

  const handleChange = () => onChange?.(children);

  return (
    <>
      <input
        className={styles['appearance-none']}
        type="radio"
        name={type}
        value={children}
        id={radioInputId}
        onChange={handleChange}
      />
      <label className={classNames} htmlFor={radioInputId}>
        {children}
      </label>
    </>
  );
}

export default memo(RadioInput);
