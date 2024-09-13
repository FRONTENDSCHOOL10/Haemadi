import { useMediaStore } from '@/stores/mediaStore';
import { oneOf } from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './BottleLink.module.css';
import bottleLink_mailBox from '/homePage/bottleLink_mailBox.png';
import bottleLink_pickUp from '/homePage/bottleLink_pickUp.png';

BottleLink.propTypes = {
  type: oneOf(['pickUpBottle', 'mailBox']).isRequired,
};

function BottleLink({ type }) {
  const desktop = useMediaStore((store) => store.desktop);

  const typeConfigs = {
    pickUpBottle: {
      linkTo: '/pick-up-bottle',
      linkLabel: '유리병 건지기 (답장할 일기 선택)',
      bottleImg: bottleLink_pickUp,
      desktopSize: { width: '182px', height: '102px' },
      mobileSize: { width: '130px', height: '73px' },
    },
    mailBox: {
      linkTo: '/mail-box',
      linkLabel: '유리병 편지함 (받은 답장 확인)',
      bottleImg: bottleLink_mailBox,
      desktopSize: { width: '283px', height: '172px' },
      mobileSize: { width: '171px', height: '104px' },
    },
  };

  const { linkTo, linkLabel, bottleImg, desktopSize, mobileSize } =
    typeConfigs[type];

  const imgStyle = desktop ? desktopSize : mobileSize;

  return (
    <>
      {/* 답장이 왔을 때만 말풍선 표시하는 건 나중에 서버에 read 필드를 추가하거나 해야 할 듯 */}
      {type === 'mailBox' && (
        <div className={styles.notification} role="alert">
          바다 건너에서 떠내려온
          <br />
          편지를 확인해 보세요!
        </div>
      )}
      <Link
        to={linkTo}
        className={styles.bottleLink}
        role="button"
        aria-label={`편지가 든 유리병, ${linkLabel} 페이지로 이동`}
        title={`${linkLabel} 페이지로 이동`}
      >
        {/* 스크린 리더가 이미지를 무시하도록 alt 속성 일부러 비워둠. Link 태그의 aria-label 속성으로 설명함. */}
        <img src={bottleImg} alt="" style={imgStyle} />
      </Link>
    </>
  );
}

export default BottleLink;
