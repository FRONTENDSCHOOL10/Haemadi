import { useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BottleRadio from '../BottleRadio/BottleRadio';

import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './BottleRadioGroup.module.css';

const bottleLabel = [
  '첫 번째 편지',
  '두 번째 편지',
  '세 번째 편지',
  '네 번째 편지',
  '다섯 번째 편지',
];

function BottleRadioGroup() {
  const desktop = useMediaQuery({ query: '(min-width: 960px)' }); // 640px -> 이 컴포넌트만 중단점 다름
  const [currentIndex, setCurrentIndex] = useState(() => !desktop && 0); // 모바일에서만 페이지 진입 시 첫 번째 유리병이 선택된 상태

  // 유리병 선택 시 상태 변경
  const handleSelect = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // 스와이퍼 넘길 때, 가운데 위치한 유리병(radio input) 선택
  const handleSlideChange = useCallback((swiper) => {
    setCurrentIndex(swiper.activeIndex);
  }, []);

  // 스와이퍼에서 가운데와 몇 칸 떨어져있는 지에 따라 적용할 스타일
  const getDiff = (index) => {
    const diff = Math.abs(currentIndex - index);
    if (diff === 0) return { scale: 1, color: '#2A348E' }; // currentIndex
    if (diff === 1) return { scale: 0.8, color: '#4651B4B3' }; // currentIndex와 1 차이
    if (diff >= 2) return { scale: 0.5, color: '#737DD480' }; // currentIndex와 2이상 차이
  };

  const renderDesktopView = () => (
    <ol className={styles.groupWrapper}>
      {bottleLabel.map((labelText, index) => (
        <li key={index}>
          <BottleRadio
            index={index}
            selected={currentIndex === index}
            onSelect={handleSelect}
            labelText={labelText}
            desktop={desktop}
          />
        </li>
      ))}
    </ol>
  );

  const renderMobilView = () => (
    <Swiper
      slidesPerView={4}
      spaceBetween={-20}
      centeredSlides={true}
      onSlideChange={handleSlideChange}
      modules={[Navigation]}
      navigation={{
        nextEl: `.${styles.swiperButtonNext}`,
        prevEl: `.${styles.swiperButtonPrev}`,
      }}
    >
      {bottleLabel.map((labelText, index) => (
        <SwiperSlide
          key={index}
          style={{
            transform: `scale(${getDiff(index).scale})`,
            transition: '0.3s',
          }}
        >
          <BottleRadio
            index={index}
            selected={currentIndex === index}
            onSelect={handleSelect}
            labelText={labelText}
            desktop={desktop}
            bottleColor={getDiff(index).color}
          />
        </SwiperSlide>
      ))}
      {/* Navigation 왼쪽 버튼 */}
      <button
        type="button"
        className={`${styles.swiperButton} ${styles.swiperButtonPrev}`}
      >
        <SVGIcon {...icons.leftArrow} />
      </button>
      {/* Navigation 오른쪽 버튼 */}
      <button
        type="button"
        className={`${styles.swiperButton} ${styles.swiperButtonNext}`}
      >
        <SVGIcon {...icons.rightArrow} />
      </button>
    </Swiper>
  );

  // desktop에서는 ordered list / mobile에서는 swiper 렌더링
  return desktop ? renderDesktopView() : renderMobilView();
}

export default BottleRadioGroup;
