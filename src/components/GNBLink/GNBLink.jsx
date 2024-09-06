import style from './GNBLink.module.css';
import icons from '@/icons';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import SVGIcon from '../SVGIcon/SVGIcon';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types'; 

GNBLink.propTypes = {
  GNBLink_darkBg: PropTypes.bool,
};

function GNBLink({ GNBLink_darkBg = false }) { //darkBg활성화 시 true, 비활성화 시 false로 사용
  const desktop = useMediaQuery({ query: '(min-width: 640px)' });

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
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          aria-label={item.ariaLabel}
        >
          {({ isActive }) => (
            <div className={style.iconWrapper}>
              <SVGIcon {...(isActive ? item.selectedIcon : item.icon)} />
              {/* 텍스트는 640px 미만일 때만 표시 */}
              {!desktop && (
                <span
                  className={style.iconText}
                  style={{ color: isActive ? '#FBE517' : '#fff' }} //텍스트 컬러 변경은 여기입니다
                >
                  {item.label}
                </span>
              )}
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default memo(GNBLink);
