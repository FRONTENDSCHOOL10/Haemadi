import { memo, useState } from 'react';

import styles from './UserProfile.module.css';
import defaultProfile from '/default_Profile.webp';
import { getUserProfileImg } from '@/api/users';
import { useAuthStore } from '@/stores/authStore';

function UserProfile() {
  const userInfo = useAuthStore((store) => store.userInfo);

  // 데이터가 없는 경우 처리
  if (!userInfo) {
    return <p>유저 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <>
      <img
        className={styles.profileImg}
        src={
          userInfo?.profileImage ? getUserProfileImg(userInfo) : defaultProfile
        } // 프로필 이미지가 없을 경우 기본 이미지 표시
        alt="유저 프로필"
      />
      <span className={styles.profileName}>
        {userInfo.nickName || '닉네임 없음'}
      </span>
    </>
  );
}

export default memo(UserProfile);
