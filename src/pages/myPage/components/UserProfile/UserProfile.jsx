import { memo, useState, useEffect } from 'react';
import { SyncLoader } from 'react-spinners';

import styles from './UserProfile.module.css';
import defaultProfile from '@/assets/default_Profile.png';
import { getStorage } from '@/utils';
import { getUserData, getUserProfileImg } from '@/api/users';

function UserProfile() {
  /* 추후 유저 전역 상태 관리 제작 시 변경 */
  const [userData, setUserData] = useState(null); // 유저 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const USER_TOKEN = getStorage('token');

  useEffect(() => {
    // 토큰이 존재하고 유저 데이터가 없을 경우에만 API 호출
    if (USER_TOKEN && !userData) {
      getUserData(USER_TOKEN)
        .then((data) => {
          setUserData(data); // 가져온 유저 데이터를 상태에 저장
        })
        .catch((error) => {
          console.error(
            '유저 데이터를 불러오는 중 오류가 발생했습니다.',
            error
          );
        })
        .finally(() => setLoading(false)); // 성공 여부와 상관없이 로딩 종료
    } else {
      setLoading(false); // 이미 데이터가 존재하면 로딩 종료
    }
  }, [USER_TOKEN, userData]);

  if (loading) {
    return <SyncLoader color="#2E7FB9" />; // 로딩 상태를 보여줌
  }

  // 데이터가 없는 경우 처리 (추후에 빈 화면 처리 가능)
  if (!userData) {
    return <p>유저 데이터를 불러올 수 없습니다.</p>;
  }

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
