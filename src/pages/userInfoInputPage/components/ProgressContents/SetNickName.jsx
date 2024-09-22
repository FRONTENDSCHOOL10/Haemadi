import { memo } from 'react';
import { func } from 'prop-types';

import styles from './ProgressContents.module.css';
import NickNameInput from '../NickNameInput/NickNameInput';

SetNickName.propTypes = {
  handle: func,
};

function SetNickName({ handle }) {
  return (
    <div className={styles.container}>
      <p className={styles.title} style={{ marginBottom: '90px' }}>
        만나서 반가워요!
        <br />
        먼저 사용하실
        <br />
        닉네임을 알려주세요!
      </p>
      <NickNameInput onChange={handle} />
    </div>
  );
}

export default memo(SetNickName);
