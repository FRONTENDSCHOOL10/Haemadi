import SVGIcon from '@/components/SVGIcon/SVGIcon';
import { DESKTOP } from '@/constants';
import icons from '@/icons';
import { func } from 'prop-types';
import { forwardRef, memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import style from './PlusButton.module.css';

// 부모의 상태와 관련된 애니메이션으로 framer-motion 사용을 위해 forwardRef 사용
// export 부분에서 forwardRef 안쓰고 이렇게 쓰니까 propTypes 사용 가능
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

// 개발자 도구 탭의 Components에 표시될 이름 (안쓰면 _PlusButton으로 나옴)
PlusButton.displayName = 'PlusButton';

export default memo(PlusButton);
