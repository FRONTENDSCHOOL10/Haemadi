import { emotionType } from '@/@types';
import { EMOTION_LABEL } from '@/constants';
import icons from '@/icons';
import { bool, func, number, oneOf } from 'prop-types';
import { memo, useState } from 'react';
import SVGIcon from '../SVGIcon/SVGIcon';
import style from './ShellButton.module.css';

ShellButton.propTypes = {
  emotion: emotionType.isRequired,
  type: oneOf(['write', 'read']),
  block: bool,
  onClick: func,
  size: number,
};

function ShellButton({
  emotion,
  type = 'write',
  block = false,
  onClick = undefined,
  size = 33,
}) {
  const [hovered, setHovered] = useState(false);
  const label = `일기 ${block ? '보기' : '작성하기'} (${EMOTION_LABEL[emotion]})`;

  const shell =
    type === 'read'
      ? // 캘린더용
        icons[`shell_${emotion}${block ? '_block' : ''}`]
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
      onMouseEnter={type === 'write' ? handleMouseEnter : undefined}
      onMouseLeave={type === 'write' ? handleMouseLeave : undefined}
      onClick={onClick}
    >
      <SVGIcon {...shell} width={size} />
    </button>
  );
}

export default memo(ShellButton);
