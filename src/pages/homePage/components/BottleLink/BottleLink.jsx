import { bool, oneOf, string } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './BottleLink.module.css';
import bottleLink_letterBox from '/homePage/bottleLink_letterBox.png';
import bottleLink_pickUp from '/homePage/bottleLink_pickUp.png';

BottleLink.propTypes = {
  type: oneOf(['pickUpBottle', 'letterBox']).isRequired,
  disabled: bool,
  className: string,
};

const typeConfigs = {
  pickUpBottle: {
    navigateTo: '/pick-up-bottle',
    linkLabel: '유리병 건지기 (답장할 일기 선택)',
    bottleImg: bottleLink_pickUp,
    cssText: { width: 'calc(115px + 3.5vw)' },
    notificationMessage: '누군가 당신의 답장을\n기다리고 있어요!',
  },
  letterBox: {
    navigateTo: '/letter-box',
    linkLabel: '유리병 편지함 (받은 답장 확인)',
    bottleImg: bottleLink_letterBox,
    cssText: { width: 'calc(150px + 6vw)' },
    notificationMessage: '바다 건너에서 떠내려온\n편지를 확인해 보세요!',
  },
};

function BottleLink({ type, disabled = false, className }) {
  const navigate = useNavigate();
  const classNames = `${styles.componentWrapper} ${className}`.trim();

  const {
    navigateTo,
    linkLabel,
    bottleImg,
    cssText,

    notificationMessage,
  } = typeConfigs[type];

  const handleBottleClick = () => navigate(navigateTo);

  return (
    <div className={classNames}>
      {!disabled && (
        <div className={styles.notification} role="alert">
          {notificationMessage}
        </div>
      )}
      <button
        type="button"
        className={styles.bottleLink}
        aria-label={`편지가 든 유리병, ${linkLabel} 페이지로 이동`}
        title={`${linkLabel} 페이지로 이동`}
        onClick={handleBottleClick}
        disabled={disabled}
      >
        {/* 스크린 리더가 이미지를 무시하도록 alt 속성 일부러 비워둠. Link 태그의 aria-label 속성으로 설명함. */}
        <img src={bottleImg} alt="" style={cssText} />
      </button>
    </div>
  );
}

export default BottleLink;
