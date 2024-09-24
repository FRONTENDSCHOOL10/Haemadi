import { bool, func, node, string } from 'prop-types';
import { memo } from 'react';
import ReactModal from 'react-modal';
import style from './ModalDialog.module.css';

ModalDialog.propTypes = {
  children: node.isRequired,
  isOpen: bool.isRequired,
  closeModal: func.isRequired,
  confirmModal: func,
  contentLabel: string,
};

function ModalDialog({
  children,
  isOpen,
  closeModal,
  confirmModal,
  contentLabel,
}) {
  return (
    <ReactModal
      isOpen={isOpen} // 모달의 열림 상태
      onRequestClose={closeModal} // 모달 바깥 클릭이나 ESC 키로 모달을 닫음
      contentLabel={contentLabel} // 접근성을 위한 모달의 라벨
      overlayClassName={style.modalOverlay} // 모달 뒷배경 className
      className={style.modalContent} // 모달 창 className
    >
      {children}
      <div className={style.buttonWrapper}>
        <button onClick={closeModal}>아니오</button>
        <button onClick={confirmModal}>예</button>
      </div>
    </ReactModal>
  );
}

export default memo(ModalDialog);

/*
사용 예시

const [modalOpen, setModalOpen] = useState(false);

const openModal = () => setModalOpen(true);
const closeModal = () => setModalOpen(false);
const confirmModal = () => console.log('confirm');

return (
<>
  <button type="button" onClick={openModal}>asdf</button>
  <ModalDialog
    isOpen={modalOpen}
    closeModal={closeModal}
    confirmModal={confirmModal}
    contentLabel="변경 사항 저장되지 않음에 대한 확인"
  >
    <h2>정말 돌아가시나요?</h2>
    <p>
      저장하지 않은 일기의 내용은
      <br />
      저장되지 않습니다.
    </p>
  </ModalDialog>
</>
)
*/
