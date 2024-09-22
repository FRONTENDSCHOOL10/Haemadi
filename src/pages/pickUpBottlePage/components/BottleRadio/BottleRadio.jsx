import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { bool, func, oneOf, string } from 'prop-types';
import { memo, useId } from 'react';
import styles from './BottleRadio.module.css';

BottleRadio.propTypes = {
  index: oneOf([0, 1, 2, 3, 4]).isRequired,
  selected: bool,
  onSelect: func,
  labelText: string.isRequired,
  desktop: bool,
  bottleColor: string,
};

function BottleRadio({
  index,
  selected = false,
  onSelect,
  labelText,
  desktop = false,
  bottleColor = '#2A348E',
}) {
  const icon =
    icons[`glassBottle${desktop ? (selected ? '_selected' : '') : '_mobile'}`]; // desktop, desktop(선택됨), mobile 세가지 크기의 아이콘
  const radioInputId = useId();

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
        <SVGIcon
          {...icon}
          className={styles.radioIcon} // desktop일 때, 유리병 이미지에 filter 스타일 적용
          color={desktop ? icon.color : bottleColor} // mobile에서 swiper에서의 유리병 위치에 따라 색상 변경
        />
        {/* desktop에서만 "n 번째 유리병" 텍스트 보여줌 */}
        <span className={desktop ? '' : 'sr-only'}>{labelText}</span>
      </label>
    </>
  );
}

export default memo(BottleRadio);
