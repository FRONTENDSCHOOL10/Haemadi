import { memo, useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';

import styles from './UserProfile.module.css';
import defaultProfile from '@/assets/default_Profile.png';
import { getStorage } from '@/utils';
import { getUserProfileImg } from '@/api/users';

function UserProfile() {
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [userData, setUserData] = useState(null); // 유저 데이터를 상태로 관리

  useEffect(() => {
    // 로컬 스토리지에서 authStore의 유저 정보 불러오기
    const authStore = getStorage('authStore');
    const storedUserData = authStore?.state?.userInfo || null;

    // 만약 유저 정보가 있다면 상태에 저장하고, 로딩을 종료함
    if (storedUserData) {
      setUserData(storedUserData);
      setLoading(false);
    } else {
      setLoading(false); // 유저 정보가 없을 경우 로딩만 종료
    }
  }, []);

  if (loading) {
    return <SyncLoader color="#2E7FB9" />; // 로딩 상태를 보여줌
  }

  // 데이터가 없는 경우 처리
  if (!userData) {
    return <p>유저 데이터를 불러올 수 없습니다.</p>;
  }
  console.log(userData);

  return (
    <>
      <img
        className={styles.profileImg}
        src={
          userData?.profileImage ? getUserProfileImg(userData) : defaultProfile
        } // 프로필 이미지가 없을 경우 기본 이미지 표시
        alt="유저 프로필"
      />
      <span className={styles.profileName}>
        {userData.nickName || '닉네임 없음'}
      </span>
    </>
  );
}

export default memo(UserProfile);
