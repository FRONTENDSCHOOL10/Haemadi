import style from './GNBLink_darkBg.module.css';
import icons from '@/icons';
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string } from 'prop-types';
import SVGIcon from '../SVGIcon/SVGIcon';

GNBLink_darkBg.propTypes = {
  initialSelected: string,
};

function GNBLink_darkBg({ initialSelected = 'navBottle' }) {
  const [selectedIcon, setSelectedIcon] = useState(initialSelected);

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  const getIconProps = (iconName) => ({
    ...(selectedIcon === iconName ? icons[`${iconName}_darkBg`] : icons[iconName]),
    color: selectedIcon === iconName ? '#FBE517' : '#ffffff', //아이콘 색상에 따라 수정해주세요
  });

  const getTextColor = (iconName) => selectedIcon === iconName ? '#FBE517' : 'black'; //폰트 색상에 따라 수정해주세요

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
        <div className={style.iconWrapper}>
          <SVGIcon {...getIconProps('navMusic')} aria-hidden="true" />
          <span className={style.iconText} style={{ color: getTextColor('navMusic') }}>플레이리스트</span>
        </div>
      </NavLink>
      <NavLink
        to="/home"
        onClick={() => handleIconClick('navBottle')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
        aria-label="메인 홈으로 이동하기"
      >
        <div className={style.iconWrapper}>
          <SVGIcon {...getIconProps('navBottle')} aria-hidden="true" />
          <span className={style.iconText} style={{ color: getTextColor('navBottle') }}>홈</span>
        </div>
      </NavLink>
      <NavLink
        to="/my"
        onClick={() => handleIconClick('navPerson')}
        className={({ isActive, isPending }) => 
          `${style.gnbItem} ${isPending ? style.pending : isActive ? style.active : ''}`
        }
        aria-label="내 정보로 이동하기"
      >
        <div className={style.iconWrapper}>
          <SVGIcon {...getIconProps('navPerson')} aria-hidden="true" />
          <span className={style.iconText} style={{ color: getTextColor('navPerson') }}>내 정보</span>
        </div>
      </NavLink>
    </nav>
  );
}

export default memo(GNBLink_darkBg);

// 사용 시 <GNBLink_darkBg initialSelected='navBottle'/>로 써주세요~
