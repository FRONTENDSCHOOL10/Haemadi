import { memo } from 'react';
import { func, oneOf } from 'prop-types';

import styles from './RemoteButton.module.css';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

const TYPE_LIST = {
  musiclist: '재생목록',
  step_forward: '다음 곡',
  step_backward: '이전 곡',
  heart: '음악 좋아요',
  pause: '음악 멈추기',
  play: '음악 재생하기',
};

RemoteButton.propTypes = {
  type: oneOf([
    'musiclist',
    'step_forward',
    'step_backward',
    'play',
    'pause',
    'heart',
  ]).isRequired,
  onClick: func,
};

function RemoteButton({ type, onClick, ...restProps }) {
  return (
    <button
      className={styles.remoteButton}
      type="button"
      title={TYPE_LIST[type]}
      aria-label={TYPE_LIST[type]}
      onClick={onClick}
      {...restProps}
    >
      <SVGIcon {...icons[type]} />
    </button>
  );
}

export default memo(RemoteButton);
