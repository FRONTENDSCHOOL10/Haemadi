import { memo } from 'react';
import { func } from 'prop-types';

import styles from './SaveButton.module.css';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

SaveButton.propTypes = {
  onClick: func,
};

function SaveButton({ onClick, ...restProps }) {
  return (
    <button
      className={styles.saveButton}
      type="submit"
      title="일기를 저장합니다."
      aria-label="저장하기"
      onClick={onClick}
      {...restProps}
    >
      <SVGIcon {...icons.check} />
    </button>
  );
}

export default memo(SaveButton);
