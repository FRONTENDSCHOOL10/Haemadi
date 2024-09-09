import style from './GNBLink.module.css';
import icons from '@/icons';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import SVGIcon from '../SVGIcon/SVGIcon';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types'; 

GNBLink.propTypes = {
  darkBg: PropTypes.bool,
};

function GNBLink({ darkBg = false }) {
  const desktop = useMediaQuery({ query: '(min-width: 640px)' });

  const navItems = [
    {
      to: '/music',
      icon: darkBg ? icons.navMusic_darkBg : icons.navMusic,
      selectedIcon: darkBg ? icons.navMusic_darkBg_selected : icons.navMusic_selected,
      ariaLabel: '플레이리스트로 이동하기',
      label: '플레이리스트',
    },
    {
      to: '/home',
      icon: darkBg ? icons.navBottle_darkBg : icons.navBottle,
      selectedIcon: darkBg ? icons.navBottle_darkBg_selected : icons.navBottle_selected,
      ariaLabel: '메인 홈으로 이동하기',
      label: '메인 홈',
    },
    {
      to: '/my',
      icon: darkBg ? icons.navPerson_darkBg : icons.navPerson,
      selectedIcon: darkBg ? icons.navPerson_darkBg_selected : icons.navPerson_selected,
      ariaLabel: '내 정보로 이동하기',
      label: '내 정보',
    },
  ];

  return (
    <nav
      className={style.gnbContainer}
      style={{ flexDirection: desktop ? 'row' : 'column' }}
    >
      <ul className={style.iconList}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              aria-label={item.ariaLabel}
              className={({ isActive }) =>
                `${style.iconWrapper} ${isActive ? style.active : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <SVGIcon {...(isActive ? item.selectedIcon : item.icon)} />
                  <span
                    className={style.iconText}
                    style={{ color: isActive ? '#FBE517' : '#56483B' }} // 텍스트 컬러 변경은 여기입니다
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(GNBLink);
