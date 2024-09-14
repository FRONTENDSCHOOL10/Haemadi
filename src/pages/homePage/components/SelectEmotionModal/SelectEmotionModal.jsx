import ShellButton from '@/components/ShellButton/ShellButton';
import { EMOTIONS, EMOTION_LABEL } from '@/constants';
import { useSunStore } from '@/stores/sunStore';
import { AnimatePresence, motion } from 'framer-motion';
import { bool, func } from 'prop-types';
import { memo, useEffect, useId, useRef } from 'react';
import PlusButton from '../PlusButton/PlusButton';
import styles from './SelectEmotionModal.module.css';

// 각 이미지의 원형 위치 (45도씩 떨어져서 배치)
const positions = [
  { x: 0, y: -120 },
  { x: 85, y: -85 },
  { x: 120, y: 0 },
  { x: 85, y: 85 },
  { x: 0, y: 120 },
  { x: -85, y: 85 },
  { x: -120, y: 0 },
  { x: -85, y: -85 },
];

SelectEmotionModal.propTypes = {
  modalOpen: bool,
  desktop: bool,
  closeModal: func,
};

// PlusButton에 애니메이션을 주기 위함
const MotionPlusButton = motion(PlusButton);

function SelectEmotionModal({ modalOpen, desktop, closeModal }) {
  const sunset = useSunStore((store) => store.sunset);
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);
  const headingId = useId();

  // Focus Trapping (포커스가 모달창 밖으로 벗어나지 않게 함)
  useEffect(() => {
    if (modalOpen) {
      // 모달이 열릴 때 포커스가 있던 요소 기억
      lastFocusedElement.current = document.activeElement;

      const modalElement = modalRef.current;

      // focusable HTML 요소 수집
      // use 태그에서 href를 사용하고 있기 때문에 문제가 생겨서 [href]에 not(use)를 붙여서 use는 수집하지 않음
      const focusableElements = modalElement.querySelectorAll(
        'button, [href]:not(use), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // 모달 창 안의 첫 focusable 요소로 focus 이동
      firstElement.focus();

      // tab(또는 shift + tab)키 눌렀을 때 모달 창을 벗어나지 않도록 설정
      const handleTabKeyPress = (event) => {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      // ESC 키로 모달 창을 닫을 수 있음
      const handleEscapeKeyPress = (event) => {
        if (event.key === 'Escape') {
          closeModal(false);
        }
      };

      // 모달 창에 tab, esc 키 이벤트 구독 추가
      modalElement.addEventListener('keydown', handleTabKeyPress);
      modalElement.addEventListener('keydown', handleEscapeKeyPress);

      return () => {
        // 이벤트 구독 제거
        modalElement.removeEventListener('keydown', handleTabKeyPress);
        modalElement.removeEventListener('keydown', handleEscapeKeyPress);
      };
    } else if (lastFocusedElement.current) {
      // 모달이 닫힐 때 포커스를 이전에 있었던 요소로 이동
      lastFocusedElement.current.focus();
    }
  }, [modalOpen, closeModal]);

  // 모달창 바깥쪽(overlay) 클릭 시 모달창 닫음
  const handleOverlayClick = (e) => {
    // 클릭된 요소가 모달 콘텐츠가 아닌 경우에만 closeModal 호출
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // 조개버튼 각각의 애니메이션 설정값을 반환하는 함수
  const liAnimateConfig = (index) =>
    desktop
      ? {
          opacity: 1,
          x: index * 130 - 500,
          translateY: '-50%',
          display: 'flex',
          flexDirection: 'column',
        }
      : {
          opacity: 1,
          x: positions[index].x,
          y: positions[index].y,
          translate: '-50% -50%',
          display: 'list-item',
        };

  return (
    // 모달 창이 닫힐 때에도 애니메이션을 보여주기 위해 AnimatePresence 사용
    <AnimatePresence>
      {modalOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-labelledby={headingId}
          aria-modal="true"
          className={styles.modalOverlay}
          onClick={handleOverlayClick}
          style={{
            backgroundColor: sunset
              ? ' rgba(16, 16, 21, 0.6)'
              : 'rgba(151, 151, 151, 0.6)',
          }}
        >
          <section className={styles.modalContent}>
            <h2
              id={headingId}
              style={{
                color: sunset ? 'var(--white, #ffffff)' : '#333',
              }}
            >
              오늘은 어떤 하루였나요?
            </h2>
            {/* Plus 버튼 */}
            <MotionPlusButton
              desktop={desktop}
              onClick={closeModal}
              activated={modalOpen}
              initial={{ rotate: 0, translateY: 0 }}
              animate={{
                rotate: 45,
                translateY: desktop ? '-17.5vh' : '-10vh',
              }}
              transition={{ duration: 0.3 }}
              exit={{
                rotate: 0,
                translateY: 0,
                transition: { duration: 0.3, delay: 0.7 },
              }}
              style={{
                position: 'absolute',
                bottom: '15vh',
                right: '50vw',
                translate: '50% 50%',
                zIndex: 1,
              }}
            />
            {/* 8개의 조개버튼 리스트 */}
            <ul className={styles.shellList}>
              {EMOTIONS.map((emotion, index) => (
                // 각각의 조개 버튼 아이템
                <motion.li
                  key={emotion}
                  initial={{ opacity: 0 }}
                  animate={liAnimateConfig(index)}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + index * 0.05,
                  }}
                  exit={{
                    opacity: 0,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.3, delay: index * 0.05 },
                  }}
                >
                  {/* 조개 버튼 */}
                  <ShellButton emotion={emotion} size={desktop ? 90 : 70} />
                  {/* 뷰포트 가로 1024px 이상에서만 텍스트 표시 */}
                  {desktop && <span>{EMOTION_LABEL[emotion]}</span>}
                </motion.li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </AnimatePresence>
  );
}

export default memo(SelectEmotionModal);
