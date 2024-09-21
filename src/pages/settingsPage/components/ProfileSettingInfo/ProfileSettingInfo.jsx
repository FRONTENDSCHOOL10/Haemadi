import { getUserProfileImg, updateUserProfileImage } from '@/api/users';
import defaultProfile from '@/assets/default_profile.png';
import { useAuthStore } from '@/stores/authStore';
import { memo, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettingInfo.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

function ProfileSettingInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(defaultProfile); // 프로필 이미지 상태
  const fileInput = useRef(null); // 프로필 이미지 변경 input을 위한 ref
  const fetchUserInfo = useAuthStore((state) => state.fetchUserInfo);
  const token = useAuthStore((state) => state.token); // 토큰 가져오기
  const removeEmojis = (text) => {
    return text.replace(/([\u2700-\u27BF]|[\u1F300-\u1F5FF]|[\u1F600-\u1F64F]|[\u1F680-\u1F6FF]|[\u1F700-\u1F77F]|[\u1F780-\u1F7FF]|[\u1F800-\u1F8FF]|[\u1F900-\u1F9FF]|[\u1FA00-\u1FA6F]|[\u1FB00-\u1FBFF]|[\u2600-\u26FF]|[\u2700-\u27BF])/g, '');
  };
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userInfo = await fetchUserInfo();
        if (userInfo) {
          setUserData(userInfo);
          // 기본 프로필 이미지를 유저 정보에서 가져오기
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

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!userData) {
    return <p>유저 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>프로필 설정</h2>
      <div className={styles.profileInfo}>
        <div className={styles.imageWrapper} onClick={() => fileInput.current.click()}>
          <img
            className={styles.profileImg}
            src={image}
            alt="유저 프로필"
          />
          <SVGIcon className={styles.svgCamera} {...icons.camera} />
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
      </div>
      <button
        className={styles.editButton}
        onClick={() => navigate("./settings/userInfoInput/:progress")}
        aria-label="수정하기"
      >
        수정하기
      </button>
    </div>
  );
}

export default memo(ProfileSettingInfo);
