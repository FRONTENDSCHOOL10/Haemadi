import style from './GNBLink.module.css';
import icons from '@/icons';
import { memo, useState } from 'react';
import { string } from 'prop-types';
import SVGIcon from '../SVGIcon/SVGIcon';

GNBLink.propTypes = {
  initialSelected: string,
};

function GNBLink({ initialSelected = 'navMusic' }) {
  const [selectedIcon, setSelectedIcon] = useState(initialSelected);

  const handleIconClick = (iconName) => {
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
      <div
        onClick={() => handleIconClick('navMusic')}
        className={style.gnbItem}
      >
        <SVGIcon
          {...(selectedIcon === 'navMusic' ? musicIconSelected : musicIcon)}
        />
      </div>
      <div
        onClick={() => handleIconClick('navBottle')}
        className={style.gnbItem}
      >
        <SVGIcon
          {...(selectedIcon === 'navBottle' ? bottleIconSelected : bottleIcon)}
        />
      </div>
      <div
        onClick={() => handleIconClick('navPerson')}
        className={style.gnbItem}
      >
        <SVGIcon
          {...(selectedIcon === 'navPerson' ? personIconSelected : personIcon)}
        />
      </div>
    </nav>
  );
}

export default memo(GNBLink);
