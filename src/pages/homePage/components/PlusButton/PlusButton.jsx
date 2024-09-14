import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { bool, func } from 'prop-types';
import { forwardRef, memo } from 'react';
import style from './PlusButton.module.css';

// 부모의 상태와 관련된 애니메이션으로 framer-motion 사용을 위해 forwardRef 사용
// forwardRef를 export 부분에서 안쓰고 함수 선언부를 감싸니까 propTypes 사용 가능
const PlusButton = forwardRef(function _PlusButton(
  { desktop = false, activated, onClick, ...restProps },
  ref
) {
  const plusIcon = icons[`plus${desktop ? '_pc' : ''}`];
  const label = activated ? '감정 선택 취소' : '작성할 일기의 감정 선택';

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      ref={ref}
      className={style.plusButton}
      onClick={onClick}
      {...restProps}
    >
      <SVGIcon {...plusIcon} />
    </button>
  );
});

PlusButton.propTypes = {
  desktop: bool,
  onClick: func,
  activated: bool,
};

// 개발자 도구 탭의 Components에 표시될 이름 (안쓰면 _PlusButton으로 나옴)
PlusButton.displayName = 'PlusButton';

export default memo(PlusButton);
