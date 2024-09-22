import { getUserProfileImg, updateUserProfileImage } from '@/api/users';
import defaultProfile from '@/assets/default_profile.png';
import { useAuthStore } from '@/stores/authStore';
import { memo, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettingInfo.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { SyncLoader } from 'react-spinners';

function ProfileSettingInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(defaultProfile); // 프로필 이미지 상태
  const fileInput = useRef(null); // 프로필 이미지 변경 input을 위한 ref
  const fetchUserInfo = useAuthStore((state) => state.fetchUserInfo);
  const token = useAuthStore((state) => state.token); // 토큰 가져오기

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
          setUserData(userInfo);
          setImage(userInfo.profileImage ? getUserProfileImg(userInfo) : defaultProfile);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [fetchUserInfo]);

  const onChange = async (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        if (reader.readyState === 2) {
          setImage(reader.result); // 선택한 이미지로 업데이트

          try {
            const userId = userData.id;
            await updateUserProfileImage(token, userId, selectedImage);
            await fetchUserInfo(); // 사용자 정보 새로 고침
          } catch (error) {
            console.error('Failed to update profile image:', error);
          }
        }
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(defaultProfile); // 업로드 취소 시 기본 이미지로 설정
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.current.click();
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <SyncLoader color="#fff" size={12} />
      </div>
    );
  }

  if (!userData) {
    return <p>유저 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>프로필 설정</h2>
      <div
        className={styles.imageWrapper}
        onClick={() => fileInput.current.click()}
        onKeyDown={handleKeyDown} // Enter 또는 Space 키 입력을 처리
        role="button"
        tabIndex="0" // 키보드 포커스가 가능하게 설정
        aria-label="프로필 이미지 변경하기"
      >
        <img
          className={styles.profileImg}
          src={image}
          alt={`${userData.nickName}의 프로필 이미지`}
        />
        <SVGIcon className={styles.svgCamera} {...icons.camera}/>
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      {/* 유저 정보 표시 */}
      <ul className={styles.profileDetails}>
        <li>
          <span className={styles.infolabel}>닉네임</span>
          <span className={styles.infoValue}>{userData.nickName || '닉네임 없음'}</span>
        </li>
        <li>
          <span className={styles.infolabel}>관심사</span>
          <span className={styles.infoValue}>{userData.interest || '관심사 없음'}</span>
        </li>
        <li>
          <span className={styles.infolabel}>나이</span>
          <span className={styles.infoValue}>{userData.age || '나이 정보 없음'}</span>
        </li>
        <li>
          <span className={styles.infolabel}>성별</span>
          <span className={styles.infoValue}>{userData.gender || '성별 정보 없음'}</span>
        </li>
      </ul>
      <button
        className={styles.editButton}
        onClick={() => navigate('./settings/userInfoInput/:progress')}
        aria-label="수정하기"
        onKeyDown={(e) => e.key === 'Enter' && navigate('./settings/userInfoInput/:progress')}
      >
        수정하기
      </button>
    </div>
  );
}

export default memo(ProfileSettingInfo);
