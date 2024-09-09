import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import { bool } from 'prop-types';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import SVGIcon from '../SVGIcon/SVGIcon';
import styles from './GNBLink.module.css';

GNBLink.propTypes = {
  darkBg: bool,
};

function GNBLink({ darkBg = false }) {
  const desktop = useMediaStore((store) => store.desktop);

  const navItems = [
    {
      to: '/music',
      icon: darkBg && desktop ? icons.navMusic_darkBg : icons.navMusic,
      selectedIcon:
        darkBg && desktop
          ? icons.navMusic_darkBg_selected
          : icons.navMusic_selected,
      ariaLabel: '플레이리스트로 이동하기',
      label: '플레이리스트',
    },
    {
      to: '/',
      icon: darkBg && desktop ? icons.navBottle_darkBg : icons.navBottle,
      selectedIcon:
        darkBg && desktop
          ? icons.navBottle_darkBg_selected
          : icons.navBottle_selected,
      ariaLabel: '메인 홈으로 이동하기',
      label: '메인 홈',
    },
    {
      to: '/my',
      icon: darkBg && desktop ? icons.navPerson_darkBg : icons.navPerson,
      selectedIcon:
        darkBg && desktop
          ? icons.navPerson_darkBg_selected
          : icons.navPerson_selected,
      ariaLabel: '내 정보로 이동하기',
      label: '내 정보',
    },
  ];

  return (
    <nav
      className={styles.gnbContainer}
      style={{ flexDirection: desktop ? 'row' : 'column' }}
    >
      <ul className={styles.iconList}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              aria-label={item.ariaLabel}
              className={({ isActive }) =>
                `${styles.iconWrapper} ${isActive ? styles.active : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <SVGIcon {...(isActive ? item.selectedIcon : item.icon)} />
                  <span
                    className={styles.iconText}
                    style={{
                      color: darkBg
                        ? isActive
                          ? '#FBE517'
                          : '#ffffff'
                        : '#56483B',
                    }} // 텍스트 컬러 변경은 여기입니다
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
