import style from './GNBLink.module.css';
import icons from '@/icons';
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import SVGIcon from '../SVGIcon/SVGIcon';

GNBLink.propTypes = {
  initialSelected: string,
};

function GNBLink({ initialSelected = 'navMusic' }) {
  const [selectedIcon, setSelectedIcon] = useState(initialSelected);

  const handleIconClick = (event, iconName) => {
    setSelectedIcon(iconName); // 아이콘 선택 상태 업데이트
  };

  const bottleIcon = icons.navBottle;
  const bottleIconSelected = icons.navBottle_selected;
  const musicIcon = icons.navMusic;
  const musicIconSelected = icons.navMusic_selected;
  const personIcon = icons.navPerson;
  const personIconSelected = icons.navPerson_selected;

  return (
    <nav className={style.gnbContainer}>
      <NavLink
        to="/music"
        onClick={() => handleIconClick('navMusic')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
      >
        <SVGIcon
          {...(selectedIcon === 'navMusic' ? musicIconSelected : musicIcon)}
        />
      </NavLink>
      <NavLink
        to="/home"
        onClick={() => handleIconClick('navBottle')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
      >
        <SVGIcon
          {...(selectedIcon === 'navBottle' ? bottleIconSelected : bottleIcon)}
        />
      </NavLink>
      <NavLink
        to="/my"
        onClick={() => handleIconClick('navPerson')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
      >
        <SVGIcon
          {...(selectedIcon === 'navPerson' ? personIconSelected : personIcon)}
        />
      </NavLink>
    </nav>
  );
}

export default memo(GNBLink);
