import icons from '/sprites.svg';
import { string, number } from 'prop-types';
import style from './SVGIcon.module.css';

SVGIcon.propTypes = {
  name: string.isRequired,
  size: number,
};

function SVGIcon({ name, size = 33 }) {
  return (
    <svg width={size} height={size} className={style.svg}>
      <use href={`${icons}#${name}`} />
    </svg>
  );
}

export default SVGIcon;
