import { func } from 'prop-types';
import { useLayoutEffect } from 'react';
import styles from './SendingScreen.module.css';
import letterBottle from '/sendingScreen/letterBottle.webp';

// 로딩 시작/끝 엘리먼트
// 컴포넌트 초기화 과정에서 1회만 필요하므로 컴포넌트 외부에서 참조
const loadingStartElement = document.getElementById('loading-start');
const loadingEndElement = document.getElementById('loading-end');

// 로딩 시작 설정 함수
const setLoadingStart = () => {
  loadingStartElement.innerHTML =
    '<p class="sr-only">편지를 유리병에 넣고 있어요</p>';
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
    '<p class="sr-only">편지를 보내는데 성공했어요</p>';
  loadingEndElement.setAttribute('role', 'alert');
};

// 로딩 끝 초기화 함수
const resetLoadingEnd = () => {
  loadingEndElement.innerHTML = '';
  loadingEndElement.removeAttribute('role');
};

SendingScreen.propTypes = {
  onComplete: func,
};

function SendingScreen({ onComplete }) {
  useLayoutEffect(() => {
    // 로딩 시작 설정
    setLoadingStart();

    return () => {
      // 로딩 시작 초기화
      resetLoadingStart();
      // 로딩 끝 설정
      setLoadingEnd();
      onComplete?.(true);
      // 3초 이후, 로딩 끝 초기화
      setTimeout(() => {
        resetLoadingEnd();
        onComplete?.(false);
      }, 3000);
    };
  }, [onComplete]);

  return (
    <div className={styles.sendingScreen}>
      <p>편지를 유리병에 넣고 있어요</p>
      <img src={letterBottle} alt="편지가 담긴 유리병" />
    </div>
  );
}

export default SendingScreen;
