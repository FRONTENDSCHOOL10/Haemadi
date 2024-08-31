import icons from '/sprites.svg';
import { string, number } from 'prop-types';
import style from './SVGIcon.module.css';

SVGIcon.propTypes = {
  name: string.isRequired,
  width: number,
  height: number,
};

function SVGIcon({ name, width = 33, height }) {
  return (
    <svg width={width} height={height ? height : width}>
      <use
        width={width}
        height={height ? height : width}
        href={`${icons}#${name}`}
      />
    </svg>
  );
}

export default SVGIcon;
