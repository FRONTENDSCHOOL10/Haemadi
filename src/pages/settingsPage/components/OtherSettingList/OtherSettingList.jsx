import { memo } from 'react';

import styles from './OtherSettingList.module.css';
import OtherSettingButton from '../OtherSettingButton/OtherSettingButton';
import { OtherSetting_PAGES } from '@/constants';

function OtherSettingList() {
  return (
    <div className={styles.otherSettingWrapper}>
      <h2>기타설정</h2>
      <ul>
        {OtherSetting_PAGES.map((element) => (
          <li key={element}>
            <OtherSettingButton type={element} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(OtherSettingList);
