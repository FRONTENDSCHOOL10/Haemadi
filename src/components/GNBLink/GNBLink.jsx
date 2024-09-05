import style from './GNBLink.module.css';
import icons from '@/icons';
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import SVGIcon from '../SVGIcon/SVGIcon';

GNBLink.propTypes = {
  initialSelected: string,
};

function GNBLink({ initialSelected = 'navBottle' }) {
  const [selectedIcon, setSelectedIcon] = useState(initialSelected);

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  // 아이콘들을 가져옵니다
  const bottleIcon = icons.navBottle;
  const bottleIconSelected = icons.navBottle_selected;
  const musicIcon = icons.navMusic;
  const musicIconSelected = icons.navMusic_selected;
  const personIcon = icons.navPerson;
  const personIconSelected = icons.navPerson_selected;

  return (
    <nav className={style.gnbContainer}>
      <NavLink
        to="/bottle"
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
        to="/person"
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
