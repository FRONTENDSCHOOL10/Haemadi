import { getUserProfileImg, updateUserProfileImage } from '@/api/users';
import defaultProfile from '@/assets/default_profile.png';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useAuthStore } from '@/stores/authStore';
import { memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettingInfo.module.css';

function ProfileSettingInfo() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const userInfo = useAuthStore((store) => store.userInfo);

  const [image, setImage] = useState(userInfo.profileImage ? getUserProfileImg(userInfo) : defaultProfile);

  const onChange = async (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        if (reader.readyState === 2) {
          setImage(reader.result); // 선택한 이미지로 업데이트

          try {
            const userId = userInfo.id;
            await updateUserProfileImage(userId, selectedImage);
          } catch (error) {
            console.error('이미지 업로드에 실패했습니다', error);
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

  return (
    <div className={styles.profileContainer}>
      <h2>프로필 설정</h2>
      <div
        className={styles.imageWrapper}
        onClick={() => fileInput.current.click()}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex="0"
        aria-label="프로필 이미지 변경하기"
      >
        <img
          className={styles.profileImg}
          src={image}
          alt={`${userInfo.nickName}의 프로필 이미지`}
        />
        <SVGIcon className={styles.svgCamera} {...icons.camera}/>
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpg,image/png,image/jpeg,image/webp"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <ul className={styles.profileDetails}>
        <li>
          <span className={styles.infolabel}>닉네임</span>
          <span className={styles.infoValue}>{userInfo.nickName || '닉네임 없음'}</span>
        </li>
        <li>
          <span className={styles.infolabel}>관심사</span>
          <span className={styles.infoValue}>{userInfo.interest || '관심사 없음'}</span>
        </li>
        <li>
          <span className={styles.infolabel}>나이</span>
          <span className={styles.infoValue}>{userInfo.age || '나이 정보 없음'}</span>
        </li>
        <li>
          <span className={styles.infolabel}>성별</span>
          <span className={styles.infoValue}>{userInfo.gender || '성별 정보 없음'}</span>
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
