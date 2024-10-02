import { getUserProfileImg, updateUserProfileImage } from '@/api/users';
import defaultProfile from '/default_Profile.webp';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useAuthStore } from '@/stores/authStore';
import { memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileSettingInfo.module.css';
import { convertImageToWebP } from '@/utils';

function ProfileSettingInfo() {
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const userInfo = useAuthStore((store) => store.userInfo);

  const [image, setImage] = useState(
    userInfo.profileImage ? getUserProfileImg(userInfo) : defaultProfile
  );

  const onChange = async (e) => {
    if (e.target.files[0]) {
      const selectedImage = await convertImageToWebP(e.target.files[0]);
      const convertedImage = selectedImage[0];

      const reader = new FileReader();

      reader.onload = async () => {
        if (reader.readyState === 2) {
          setImage(reader.result); // 선택한 이미지로 업데이트

          try {
            const userId = userInfo.id;
            await updateUserProfileImage(userId, convertedImage);
          } catch (error) {
            console.error('이미지 업로드에 실패했습니다', error);
          }
        }
      };
      reader.readAsDataURL(convertedImage);
    } else {
      setImage(defaultProfile); // 업로드 취소 시 기본 이미지로 설정
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2>프로필 설정</h2>

      <input
        id="profileImgInput"
        className={`sr-only ${styles.profileImgInput}`}
        type="file"
        accept="image/jpg,image/png,image/jpeg,image/webp"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
      <label htmlFor="profileImgInput" className={styles.imageLabel}>
        <img
          className={styles.profileImg}
          src={image}
          alt={`${userInfo.nickName}의 프로필 이미지`}
          loading="lazy"
        />
        <SVGIcon
          className={styles.svgCamera}
          {...icons.camera}
          width={19}
          height={16}
        />
        <span className="sr-only">프로필 이미지 변경하기</span>
      </label>

      <ul className={styles.profileDetails}>
        <li>
          <span className={styles.infolabel}>닉네임</span>
          <span className={styles.infoValue}>
            {userInfo.nickName || '닉네임 없음'}
          </span>
        </li>
        <li>
          <span className={styles.infolabel}>관심사</span>
          <span className={styles.infoValue}>
            {userInfo.interest.join(',') || '관심사 없음'}
          </span>
        </li>
        <li>
          <span className={styles.infolabel}>나이</span>
          <span className={styles.infoValue}>
            {userInfo.age || '나이 정보 없음'}
          </span>
        </li>
        <li>
          <span className={styles.infolabel}>성별</span>
          <span className={styles.infoValue}>
            {userInfo.gender || '성별 정보 없음'}
          </span>
        </li>
      </ul>

      <button
        className={styles.editButton}
        onClick={() => navigate('./user-info-input/1')}
        aria-label="수정하기"
      >
        수정하기
      </button>
    </div>
  );
}

export default memo(ProfileSettingInfo);
