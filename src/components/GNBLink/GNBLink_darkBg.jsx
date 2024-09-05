import style from './GNBLink_darkBg.module.css';
import icons from '@/icons';
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import SVGIcon from '../SVGIcon/SVGIcon';

GNBLink_darkBg.propTypes = {
  initialSelected: string,
};

function GNBLink_darkBg({ initialSelected = 'navBottle' }) { // initialSelected 아이콘 변경 시 selected 상태 변경
  const [selectedIcon, setSelectedIcon] = useState(initialSelected);

  const handleIconClick = (event, iconName) => {
    setSelectedIcon(iconName);
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
        aria-label="플레이리스트로 이동하기"
      >
        <SVGIcon
          {...(selectedIcon === 'navMusic' ? musicIconSelected : musicIcon)}
          color="#ffffff"
          aria-hidden="true"
        />
      </NavLink>
      <NavLink
        to="/home"
        onClick={() => handleIconClick('navBottle')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
        aria-label="메인 홈으로 이동하기"
      >
        <SVGIcon
          {...(selectedIcon === 'navBottle' ? bottleIconSelected : bottleIcon)}
          color="#ffffff"
          aria-hidden="true"
        />
      </NavLink>
      <NavLink
        to="/my"
        onClick={() => handleIconClick('navPerson')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
        aria-label="내 정보로 이동하기"
      >
        <SVGIcon
          {...(selectedIcon === 'navPerson' ? personIconSelected : personIcon)}
          color="#ffffff"
          aria-hidden="true"
        />
      </NavLink>
    </nav>
  );
}

export default memo(GNBLink_darkBg);
