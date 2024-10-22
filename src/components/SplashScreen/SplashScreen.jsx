import { memo, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './SplashScreen.module.css';

import wave1 from '/logoItems/wave1.webp';
import wave2 from '/logoItems/wave2.webp';
import wave3 from '/logoItems/wave3.webp';
import wave4 from '/logoItems/wave4.webp';
import boat from '/logoItems/boat.webp';
import phoneMockUp from '/logoItems/phoneMockUp.webp';

// 스플래시 스크린 엘리먼트
// 컴포넌트 초기화 과정에서 1회만 필요하므로 컴포넌트 외부에서 참조
const splashScreenElement = document.getElementById('splash-screen');

// SplashScreen 컴포넌트
function SplashScreen({ fadeOutTime = 2000 }) {
  // 레이아웃 이펙트
  useLayoutEffect(() => {
    // 페이드 아웃 타임이 되면 스플래시 스크린 콘텐츠 삭제
    const clearId = setTimeout(() => {
      splashScreenElement.innerHTML = '';
    }, fadeOutTime);

    return () => {
      // 설정된 타이머 정리
      clearTimeout(clearId);
    };
  }, [fadeOutTime]);

  // ReactDOM의 포털을 사용해 스플래시 스크린 엘리먼트에 렌더링
  // 스플래시 스크린의 적절한 제목 설정 필요
  return createPortal(
    <div className={styles.splashScreen}>
      <div className={styles.textBox}>
        <p>감정 관리를 위한 일기 서비스</p>
        <h1>해마디</h1>
      </div>
      <img className={styles.wave1} src={wave1} alt="" />
      <img className={styles.wave2} src={wave2} alt="" />
      <img className={styles.boat} src={boat} alt="" />
      <img className={styles.wave3} src={wave3} alt="" />
      <img className={styles.wave4} src={wave4} alt="" />
      <img className={styles.phoneMockUp} src={phoneMockUp} alt="" />
    </div>,
    splashScreenElement
  );
}

// 컴포넌트 속성이 변경되지 않을 경우 불필요한 리-렌더링 차단
export default memo(SplashScreen);
