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

function ShellButton({ emotion, block = false, onClick = undefined }) {
  const [hovered, setHovered] = useState(false);
  const label = `일기 ${block ? '보기' : '작성하기'} (${EMOTION_LABEL[emotion]})`;

  const shell = block
    ? // 캘린더용
      icons[`shell_${emotion}_block`]
    : // 일기 작성하기용
      icons[`shell_${emotion}${hovered ? '_hovered' : ''}`];

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <button
      title={label}
      aria-label={label}
      type="button"
      className={style.shellButton}
      onMouseEnter={!block ? handleMouseEnter : undefined}
      onMouseLeave={!block ? handleMouseLeave : undefined}
      onClick={onClick}
    >
      <SVGIcon {...shell} />
    </button>
  );
}

export default memo(ShellButton);
