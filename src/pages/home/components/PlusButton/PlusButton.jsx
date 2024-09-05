import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { DESKTOP } from '@/constants';
import icons from '@/icons';
import { func } from 'prop-types';
import { forwardRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import style from './PlusButton.module.css';

const PlusButton = forwardRef(function _PlusButton({ onClick }, ref) {
  const desktop = useMediaQuery(DESKTOP);
  const plusIcon = icons[`plus${desktop ? '_pc' : ''}`];

  return (
    <button
      title="일기 작성하기"
      aria-label="일기 작성하기"
      ref={ref}
      className={style.plusButton}
      onClick={onClick}
    >
      <SVGIcon {...plusIcon} />
    </button>
  );
});

PlusButton.propTypes = {
  onClick: func,
};

PlusButton.displayName = 'PlusButton';

export default PlusButton;
