import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import { bool } from 'prop-types';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import SVGIcon from '../../components/SVGIcon/SVGIcon';
import styles from './GlobalNav.module.css';

GlobalNav.propTypes = {
  darkBg: bool,
};

function GlobalNav({ darkBg = false }) {
  const desktop = useMediaStore((store) => store.desktop);

  const navItems = [
    {
      to: '/music',
      icon: darkBg && desktop ? icons.navMusic_darkBg : icons.navMusic,
      selectedIcon:
        darkBg && desktop
          ? icons.navMusic_darkBg_selected
          : icons.navMusic_selected,
      label: '플레이리스트',
    },
    {
      to: '/',
      icon: darkBg && desktop ? icons.navBottle_darkBg : icons.navBottle,
      selectedIcon:
        darkBg && desktop
          ? icons.navBottle_darkBg_selected
          : icons.navBottle_selected,
      label: '홈 화면',
    },
    {
      to: '/my',
      icon: darkBg && desktop ? icons.navPerson_darkBg : icons.navPerson,
      selectedIcon:
        darkBg && desktop
          ? icons.navPerson_darkBg_selected
          : icons.navPerson_selected,
      label: '내 정보',
    },
  ];

  return (
    <nav className={styles.gnbContainer}>
      <ul className={styles.iconList}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} className={styles.iconWrapper}>
              {({ isActive }) => (
                <>
                  <SVGIcon {...(isActive ? item.selectedIcon : item.icon)} />
                  <span
                    className={desktop ? styles.iconText : 'sr-only'}
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

export default memo(GlobalNav);
