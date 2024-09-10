import { memo, useId } from 'react';
import { node, oneOf, string, func } from 'prop-types';

import styles from './RadioInput.module.css';

// props type 정의
RadioInput.propTypes = {
  children: node.isRequired,
  groupName: string.isRequired,
  type: oneOf(['gender', 'age', 'emotion']),
  onChange: func,
};

// RadioInput Component
function RadioInput({ children, groupName, type = 'emotion', onChange }) {
  const radioInputId = useId();
  const classNames = `${styles.radioStyles} ${styles[type]}`.trim();

  const handleChange = () => onChange?.(children);

  return (
    <>
      <input
        className={styles['appearance-none']}
        type="radio"
        name={groupName}
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
