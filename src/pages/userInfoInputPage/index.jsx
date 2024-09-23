import { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useImmer } from 'use-immer';

import styles from './UserInfoInputPage.module.css';
import { setUserData } from '@/api/users';
import { useToaster } from '@/stores/ToasterStore';
import { useMediaStore } from '@/stores/mediaStore';
import { useAuthStore } from '@/stores/authStore';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import SetNickName from './components/ProgressContents/SetNickName';
import SetGender from './components/ProgressContents/SetGender';
import SetAge from './components/ProgressContents/SetAge';
import ProgressBar from './components/ProgressBar/ProgressBar';
import SetExperience from './components/ProgressContents/SetExperience';
import SetKeyword from './components/ProgressContents/SetKeyword';
import SetFinish from './components/ProgressContents/SetFinish';

// experience 값을 숫자로 매핑하는 함수 분리
const ExperienceToNumber = (experience) => {
  switch (experience) {
    case '하루도 빠짐 없이 작성한다.':
      return 1;
    case '가끔 생각나면 작성한다.':
      return 2;
    case '거의 작성하지 않는다':
      return 3;
    default:
      return 4;
  }
};

function UserInfoInputPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const userInfo = useAuthStore((store) => store.userInfo);
  const navigate = useNavigate();
  const toast = useToaster();
  const { progress } = useParams();
  const [formData, setFormData] = useImmer({
    nickName: null,
    gender: null,
    age: null,
    experience: null,
    keyword: [],
  });

  // 닉네임 유효성 검사 함수
  const validateNickname = useCallback(
    (value) => /^[가-힣a-zA-Z0-9 ]{4,9}$/.test(value),
    []
  );

  // 입력 핸들러 함수
  const handleInputChange = useCallback(
    (name, value) => {
      setFormData((draft) => {
        draft[name] = value;
      });
    },
    [setFormData]
  );

  // 버튼 상태를 동적으로 설정
  const buttonState = useMemo(() => {
    switch (parseInt(progress)) {
      case 1:
        return formData.nickName ? 'primary' : 'disabled';
      case 2:
        return formData.gender ? 'primary' : 'disabled';
      case 3:
        return formData.age ? 'primary' : 'disabled';
      case 4:
        return formData.experience ? 'primary' : 'disabled';
      case 5:
        return formData.keyword.length > 0 ? 'primary' : 'disabled';
      case 6:
        return 'default';
      default:
        return 'disabled';
    }
  }, [progress, formData]);

  const renderContent = () => {
    switch (progress) {
      default:
      case '1':
        return (
          <SetNickName
            handle={(e) => handleInputChange('nickName', e.target.value)}
          />
        );
      case '2':
        return (
          <SetGender
            handle={(value) => handleInputChange('gender', value)}
            nickName={formData.nickName}
          />
        );
      case '3':
        return (
          <SetAge
            handle={(value) => handleInputChange('age', value)}
            nickName={formData.nickName}
          />
        );
      case '4':
        return (
          <SetExperience
            handle={(value) => handleInputChange('experience', value)}
            nickName={formData.nickName}
          />
        );
      case '5':
        return (
          <SetKeyword
            selectedKeywords={formData.keyword}
            setSelectedKeywords={(value) => handleInputChange('keyword', value)}
          />
        );
      case '6':
        return <SetFinish />;
    }
  };

  const handleNextClick = useCallback(async () => {
    const nextProgress = parseInt(progress) + 1;

    if (progress === '1' && !validateNickname(formData.nickName)) {
      toast('warn', '닉네임을 다시 확인해주세요.');
      return;
    } else if (progress === '5') {
      try {
        await setUserData(userInfo.id, {
          ...formData,
          experience: ExperienceToNumber(formData.experience),
        });
      } catch {
        toast('warn', '다시 한번 시도해주세요.');
        return;
      }
    } else if (progress === '6') {
      navigate('/');
      return;
    }

    navigate(`/my/settings/user-info-input/${nextProgress}`);
  }, [progress, formData, navigate, validateNickname, userInfo.id, toast]);

  return (
    <div className={styles.userInfoInputPage}>
      <Helmet>
        <title>사용자 정보 입력 - 해마디</title>
        <meta
          name="description"
          content="사용자 정보를 입력하여 프로필을 완성하세요"
        />
        <meta property="og:title" content="사용자 정보 입력 - 해마디" />
        <meta
          property="og:description"
          content="사용자 정보를 입력하여 프로필을 완성하세요"
        />
        <meta name="twitter:title" content="사용자 정보 입력 - 해마디" />
        <meta
          name="twitter:description"
          content="사용자 정보를 입력하여 프로필을 완성하세요"
        />
      </Helmet>
      <div className={styles.backButton}>
        {progress !== '1' && <BackButton color={desktop ? 'white' : 'blue'} />}
      </div>
      {renderContent()}
      <ProgressBar progress={parseInt(progress)} />
      <div className={styles.buttonWrapper}>
        <Button type="normal" state={buttonState} onClick={handleNextClick}>
          {progress != 6 ? '다음으로' : '섬으로 바로가기'}
        </Button>
      </div>
    </div>
  );
}

export default UserInfoInputPage;
