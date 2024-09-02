import icons from '@/icons';
import { bool, func, oneOf } from 'prop-types';
import { memo, useState } from 'react';
import SVGIcon from '../SVGIcon/SVGIcon';
import style from './ShellButton.module.css';

// button의 aria-label
const emotionLabel = {
  angry: '화남',
  glad: '기쁨',
  happy: '행복',
  panic: '당황',
  anxiety: '불안',
  sad: '슬픔',
  normal: '평범',
  tired: '지침',
};

ShellButton.propTypes = {
  emotion: oneOf([
    'angry',
    'glad',
    'happy',
    'panic',
    'anxiety',
    'sad',
    'normal',
    'tired',
  ]).isRequired,
  block: bool,
  onClick: func,
};

function ShellButton({ emotion, block = false, onClick }) {
  // 캘린더 전용
  if (block) {
    const shell = icons[`shell_${emotion}_block`];

    return (
      <button
        aria-label={`일기 보기 (${emotionLabel[emotion]})`}
        type="button"
        className={style.shellButton}
        onClick={onClick}
      >
        <SVGIcon {...shell} />
      </button>
    );
  }
  // 일기쓰기 버튼
  else {
    const [hovered, setHovered] = useState(false);
    const shell = icons[`shell_${emotion}${hovered ? '_hovered' : ''}`];

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    return (
      <button
        aria-label={`일기 작성하기 (${emotionLabel[emotion]})`}
        type="button"
        className={style.shellButton}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        <SVGIcon {...shell} />
      </button>
    );
  }
}

export default memo(ShellButton);
