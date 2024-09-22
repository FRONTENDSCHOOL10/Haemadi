import { number } from 'prop-types';
import { useLayoutEffect } from 'react';
import styles from './Loading.module.css';
import { SyncLoader } from 'react-spinners';

// 로딩 시작/끝 엘리먼트
// 컴포넌트 초기화 과정에서 1회만 필요하므로 컴포넌트 외부에서 참조
const loadingStartElement = document.getElementById('loading-start');
const loadingEndElement = document.getElementById('loading-end');

// 로딩 시작 설정 함수
const setLoadingStart = () => {
  loadingStartElement.innerHTML =
    '<p class="sr-only">콘텐츠 로딩 시작됩니다.</p>';
  loadingStartElement.setAttribute('role', 'alert');
};

// 로딩 시작 초기화 함수
const resetLoadingStart = () => {
  loadingStartElement.innerHTML = '';
  loadingStartElement.removeAttribute('role');
};

// 로딩 끝 설정 함수
const setLoadingEnd = () => {
  loadingEndElement.innerHTML =
    '<p class="sr-only">콘텐츠 로딩이 마무리되었습니다.</p>';
  loadingEndElement.setAttribute('role', 'alert');
};

// 로딩 끝 초기화 함수
const resetLoadingEnd = () => {
  loadingEndElement.innerHTML = '';
  loadingEndElement.removeAttribute('role');
};

// 컴포넌트 속성 타입 검사
Loading.propTypes = { size: number };

// Loading 컴포넌트
function Loading({ size = 24 }) {
  // 레이아웃 이펙트
  useLayoutEffect(() => {
    // 로딩 시작 설정
    setLoadingStart();

    return () => {
      // 로딩 시작 초기화
      resetLoadingStart();
      // 로딩 끝 설정
      setLoadingEnd();
      // 1초 이후, 로딩 끝 초기화
      setTimeout(resetLoadingEnd, 1000);
    };
  }, []);

  // 화면에 표시할 스피너(spinner) 마크업
  // CSS 모듈 스타일 클래스 이름으로 연결
  return (
    <SyncLoader
      margin={6}
      size={size}
      color="#2E7FB9"
      className={styles.component}
    />
  );
}

export default Loading;
