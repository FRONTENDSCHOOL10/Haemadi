import style from './GNBLink.module.css';
import icons from '@/icons';
import { memo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types'; 
import SVGIcon from '../SVGIcon/SVGIcon';

GNBLink.propTypes = {
  GNBLink_darkBg: PropTypes.bool,
};

function GNBLink({ GNBLink_darkBg = false }) {
  const desktop = useMediaQuery({ query: '(min-width: 640px)' });

  const [activeLink, setActiveLink] = useState(null); // 현재 선택된 링크를 관리

  const navItems = [
    {
      to: '/music',
      icon: GNBLink_darkBg ? icons.navMusic_darkBg : icons.navMusic,
      selectedIcon: GNBLink_darkBg ? icons.navMusic_darkBg : icons.navMusic_selected,
      ariaLabel: '플레이리스트로 이동하기',
      label: '플레이리스트',
    },
    {
      to: '/home',
      icon: GNBLink_darkBg ? icons.navBottle_darkBg : icons.navBottle,
      selectedIcon: GNBLink_darkBg ? icons.navBottle_darkBg : icons.navBottle_selected,
      ariaLabel: '메인 홈으로 이동하기',
      label: '메인 홈',
    },
    {
      to: '/my',
      icon: GNBLink_darkBg ? icons.navPerson_darkBg : icons.navPerson,
      selectedIcon: GNBLink_darkBg ? icons.navPerson_darkBg : icons.navPerson_selected,
      ariaLabel: '내 정보로 이동하기',
      label: '내 정보',
    },
  ];

  return (
    <nav
      className={style.gnbContainer}
      style={{ flexDirection: desktop ? 'row' : 'column' }}
    >
      {navItems.map((item, index) => (
        <div
          key={item.to}
          role="button" // div 요소에 버튼 역할 부여
          className={`${style.gnbItem} ${activeLink === index ? style.active : ''}`}
          aria-label={item.ariaLabel}
          onClick={() => setActiveLink(index)} // 클릭 시 활성화된 링크 인덱스 설정
          style={{ cursor: 'pointer' }}
        >
          <div className={style.iconWrapper}>
            <SVGIcon {...(activeLink === index ? item.selectedIcon : item.icon)} />
            {/* 텍스트는 640px 미만일 때만 표시 */}
            {!desktop && (
              <span
                className={style.iconText}
                style={{ color: activeLink === index ? '#FBE517' : '#56483B' }}
              >
                {item.label} {/* 텍스트 출력 */}
              </span>
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default memo(GNBLink);
