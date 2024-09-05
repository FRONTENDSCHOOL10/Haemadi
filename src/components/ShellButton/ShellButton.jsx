import { emotionType } from '@/@types';
import { EMOTION_LABEL } from '@/constants';
import icons from '@/icons';
import { bool, func } from 'prop-types';
import { memo, useState } from 'react';
import SVGIcon from '../SVGIcon/SVGIcon';
import style from './ShellButton.module.css';

ShellButton.propTypes = {
  emotion: emotionType.isRequired,
  block: bool,
  onClick: func,
};

function ShellButton({ emotion, block = false, onClick }) {
  const [hovered, setHovered] = useState(false);

  // 캘린더 전용 / 일기 쓰기
  const shell = block
    ? icons[`shell_${emotion}_block`]
    : icons[`shell_${emotion}${hovered ? '_hovered' : ''}`];

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <button
      title={
        block
          ? `일기 보기 (${EMOTION_LABEL[emotion]})`
          : `일기 작성하기 (${EMOTION_LABEL[emotion]})`
      }
      aria-label={
        block
          ? `일기 보기 (${EMOTION_LABEL[emotion]})`
          : `일기 작성하기 (${EMOTION_LABEL[emotion]})`
      }
      type="button"
      className={style.shellButton}
      onMouseEnter={block ? undefined : handleMouseEnter}
      onMouseLeave={block ? undefined : handleMouseLeave}
      onClick={onClick}
    >
      <SVGIcon {...shell} />
    </button>
  );
}

export default memo(ShellButton);
