import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { bool, func, shape, string } from 'prop-types';
import { memo, useEffect, useRef } from 'react';
import styles from './CalendarModal.module.css';

CalendarModal.propTypes = {
  diaryData: shape({ emotion: string, message: string }),
  modalOpen: bool,
  closeModal: func,
  confirmModal: func,
};

function CalendarModal({
  modalOpen,
  diaryData = {},
  closeModal,
  confirmModal,
}) {
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);

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

      const handleKeyPress = (event) => {
        // tab(또는 shift + tab)키 눌렀을 때 모달 창을 벗어나지 않도록 설정
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
        // ESC 키로 모달 창을 닫을 수 있음
        if (event.key === 'Escape') {
          closeModal(false);
        }
      };

      // 모달 창에 tab, esc 키 이벤트 구독 추가
      modalElement.addEventListener('keydown', handleKeyPress);

      return () => {
        // 이벤트 구독 제거
        modalElement.removeEventListener('keydown', handleKeyPress);
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

  return (
    // 모달창이 조건부 렌더링이기 때문에 닫을 때의 애니메이션을 보여주기 위해 AnimatePresence 사용
    <AnimatePresence>
      {modalOpen && (
        // 모달 창 외부를 감싸는 요소
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-labelledby="calendarModal_label"
          aria-modal="true"
          className={styles.modalOverlay}
          onClick={handleOverlayClick}
          // 애니메이션 속성
          initial={{ y: '100vh', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100vh', opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 모달 창 */}
          <div className={styles.modalContent}>
            <SVGIcon
              {...icons[`shell_${diaryData.emotion}`]}
              width={58}
              height={58}
              style={{ marginRight: '16px' }}
            />

            <div className={styles.textWrapper}>
              <h2 id="calendarModal_label">이 날의 내 기분은...</h2>
              <p>{diaryData.message}</p>
            </div>

            <button onClick={confirmModal}>
              <SVGIcon {...icons.go} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(CalendarModal);
