import style from './GNBLink.module.css';
import icons from '@/icons';
import { memo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types'; 
import SVGIcon from '../SVGIcon/SVGIcon';

GNBLink.propTypes = {
  GNBLink_darkBg: PropTypes.bool,
};

function GNBLink({ GNBLink_darkBg = true }) { //dark 모드 활성화 시 = true / 비활성화 시 = false로 사용 가능
  const Desktop = useMediaQuery({ query: '(min-width: 640px)' });

  const [activeLink, setActiveLink] = useState(null);

  const navItems = [
    {
      to: '/music',
      icon: GNBLink_darkBg ? icons.navMusic_darkBg : icons.navMusic,
      selectedIcon: GNBLink_darkBg ? icons.navMusic_darkBg_selected : icons.navMusic_selected,
      ariaLabel: '플레이리스트로 이동하기',
      label: '플레이리스트',
    },
    {
      to: '/home',
      icon: GNBLink_darkBg ? icons.navBottle_darkBg : icons.navBottle,
      selectedIcon: GNBLink_darkBg ? icons.navBottle_darkBg_selected : icons.navBottle_selected,
      ariaLabel: '메인 홈으로 이동하기',
      label: '메인 홈',
    },
    {
      to: '/my',
      icon: GNBLink_darkBg ? icons.navPerson_darkBg : icons.navPerson,
      selectedIcon: GNBLink_darkBg ? icons.navPerson_darkBg_selected : icons.navPerson_selected,
      ariaLabel: '내 정보로 이동하기',
      label: '내 정보',
    },
  ];

  return (
    <nav
      className={style.gnbContainer}
      style={{ flexDirection: Desktop ? 'row' : 'column' }}
    >
      {navItems.map((item, index) => (
        <div
          key={item.to}
          role="button"
          className={`${style.gnbItem} ${activeLink === index ? style.active : ''}`}
          aria-label={item.ariaLabel}
          onClick={() => setActiveLink(index)}
          style={{ cursor: 'pointer' }}
        >
          <div className={style.iconWrapper}>
            <SVGIcon {...(activeLink === index ? item.selectedIcon : item.icon)} />
            {!Desktop && (
              <span
                className={style.iconText}
                style={{ color: activeLink === index ? '#FBE517' : '#fff' }}
              >
                {item.label}
              </span>
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}

export default memo(GNBLink);
