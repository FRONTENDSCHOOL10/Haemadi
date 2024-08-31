import icons from '/sprites.svg';
import { string, number } from 'prop-types';
import style from './SVGIcon.module.css';

SVGIcon.propTypes = {
  name: string.isRequired,
  size: number,
};

function SVGIcon({ name, width = 33, height }) {
  return (
    <svg>
      <use
        width={width}
        height={height ? height : width}
        href={`${icons}#${name}`}
      />
    </svg>
  );
}

export default SVGIcon;
