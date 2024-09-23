import { bool, func, oneOf, string } from 'prop-types';
import { memo, useId } from 'react';
import styles from './BottleRadio.module.css';
import glassBottle from '/glassBottle/glassBottle.webp';
import glassBottleSelected from '/glassBottle/glassBottle_selected.webp';
import glassBottleCenter from '/glassBottle/glassBottle_center.webp';
import glassBottleEdge from '/glassBottle/glassBottle_edge.webp';

BottleRadio.propTypes = {
  index: oneOf([0, 1, 2, 3, 4]).isRequired,
  selected: bool,
  onSelect: func,
  labelText: string.isRequired,
  desktop: bool,
  location: oneOf(['center', 'side', 'edge']),
};

function BottleRadio({
  index,
  selected = false,
  onSelect,
  labelText,
  desktop = false,
  location,
}) {
  const radioInputId = useId();

  const bottleImgSrc = () => {
    if (desktop) {
      return selected ? glassBottleSelected : glassBottle;
    } else {
      switch (location) {
        default:
        case 'center':
          return glassBottleCenter;
        case 'side':
          return glassBottle;
        case 'edge':
          return glassBottleEdge;
      }
    }
  };

  const handleClick = (e) => {
    !desktop && e.preventDefault();
  };
  const handleChange = () => onSelect?.(index);

  return (
    <>
      <input
        className={styles.radioInput}
        id={radioInputId}
        type="radio"
        name="bottle"
        value={index} // 몇 번째 유리병인지
        onChange={handleChange} // 몇 번째 유리병이 선택되었는지 currentIndex 상태 변경
        checked={selected} // 모바일에서 스와이퍼로 상호작용 할 때는 click하지 않기 때문에 checked를 직접 넣어줌
      />
      <label
        className={styles.radioCard}
        htmlFor={radioInputId}
        onClick={handleClick}
      >
        <img
          src={bottleImgSrc()}
          alt="" // label에서 span으로 정보를 제공하고 alt 속성 일부러 비워둠
          className={styles.radioIcon}
          loading="lazy"
        />
        {/* desktop에서만 "n 번째 유리병" 텍스트 보여줌 */}
        <span className={desktop ? '' : 'sr-only'}>{labelText}</span>
      </label>
    </>
  );
}

export default memo(BottleRadio);
