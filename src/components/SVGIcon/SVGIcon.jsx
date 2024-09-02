import icons from '/sprites.svg';
import { string, number } from 'prop-types';
import style from './SVGIcon.module.css';

SVGIcon.propTypes = {
  name: string.isRequired,
  width: number,
  height: number,
  color: string,
};

function SVGIcon({ name, width = 33, height, color }) {
  height = height ? height : width;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ color }}
    >
      <use width={width} height={height} href={`${icons}#${name}`} />
    </svg>
  );
}

/*
사용 예시
<SVGIcon
  name={icons.shell_tired_block.name}
  width={icons.shell_tired_block.width}
  height={icons.shell_tired_block.height}
  color={icons.shell_tired_block.color}
/>
*/

export default SVGIcon;
