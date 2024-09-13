import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import { bool, func } from 'prop-types';
import { forwardRef, memo } from 'react';
import styles from './PlusButton.module.css';

// 부모의 상태와 관련된 애니메이션으로 framer-motion 사용을 위해 forwardRef 사용
// forwardRef를 export 부분에서 안쓰고 함수 선언부를 감싸니까 propTypes 사용 가능
const PlusButton = forwardRef(function _PlusButton(
  { activated, onClick, ...restProps },
  ref
) {
  const desktop = useMediaStore((store) => store.desktop);
  const plusIcon = icons[`plus${desktop ? '_pc' : ''}`];
  const label = activated ? '감정 선택 취소' : '일기 쓰기';

  return (
    <>
      <button
        type="button"
        title={(!desktop || activated) && label}
        aria-labelledby="buttonLabel"
        ref={ref}
        className={styles.plusButton}
        onClick={onClick}
        {...restProps}
      >
        <SVGIcon {...plusIcon} />
      </button>
      <span
        id="buttonLabel"
        className={`${styles.buttonLabel}${!desktop || activated ? ' sr-only' : ''}`}
      >
        {label}
      </span>
    </>
  );
});

PlusButton.propTypes = {
  onClick: func,
  activated: bool,
};

// 개발자 도구 탭의 Components에 표시될 이름 (안쓰면 _PlusButton으로 나옴)
PlusButton.displayName = 'PlusButton';

export default memo(PlusButton);
