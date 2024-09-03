import { emotionType } from '@/@types';
import icons from '@/icons';
import { bool, func } from 'prop-types';
import { memo, useState } from 'react';
import SVGIcon from '../SVGIcon/SVGIcon';
import style from './ShellButton.module.css';
import { EMOTION_LABEL } from '@/constants';

ShellButton.propTypes = {
  emotion: emotionType.isRequired,
  block: bool,
  onClick: func,
};

function ShellButton({ emotion, block = false, onClick }) {
  // 캘린더 전용
  if (block) {
    const shell = icons[`shell_${emotion}_block`];

    return (
      <button
        aria-label={`일기 보기 (${EMOTION_LABEL[emotion]})`}
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
        aria-label={`일기 작성하기 (${EMOTION_LABEL[emotion]})`}
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
