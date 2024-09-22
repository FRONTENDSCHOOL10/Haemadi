import { useCallback, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './UserInfoInputPage.module.css';
import { useToaster } from '@/stores/ToasterStore';
import Button from '@/components/Button/Button';
import StepIndicator from './components/StepIndicator/StepIndicator';
import SetNickName from './components/ProgressContents/SetNickName';
import SetGender from './components/ProgressContents/SetGender';
import SetAge from './components/ProgressContents/SetAge';
import SetExperience from './components/ProgressContents/SetExperience';
import SetKeyword from './components/ProgressContents/SetKeyword';
import SetFinish from './components/ProgressContents/SetFinish';

function UserInfoInputPage() {
  const navigate = useNavigate();
  const toast = useToaster();
  const { progress } = useParams();
  const [nickName, setNickName] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [experience, setExperience] = useState(null);
  const [keyword, setKeyword] = useState([]);

  // 닉네임 유효성 검사 함수
  const validateNickname = useMemo(
    () => (value) => /^[가-힣a-zA-Z0-9 ]{4,9}$/.test(value),
    []
  );

  const handleNickname = useCallback((e) => {
    const { value } = e.target;
    setNickName(value);
  }, []);

  // 버튼 상태를 동적으로 설정
  const buttonState = useMemo(() => {
    switch (parseInt(progress)) {
      case 1:
        return nickName ? 'primary' : 'disabled';
      case 2:
        return gender ? 'primary' : 'disabled';
      case 3:
        return age ? 'primary' : 'disabled';
      case 4:
        return experience ? 'primary' : 'disabled';
      case 5:
        return keyword.length > 0 ? 'primary' : 'disabled';
      case 6:
        return 'primary';
      default:
        return 'disabled';
    }
  }, [progress, nickName, gender, age, experience, keyword]);

  const renderContent = () => {
    switch (progress) {
      default:
      case '1':
        return <SetNickName handle={handleNickname} />;
      case '2':
        return (
          <SetGender handle={(value) => setGender(value)} nickName={nickName} />
        );
      case '3':
        return <SetAge handle={(value) => setAge(value)} nickName={nickName} />;
      case '4':
        return (
          <SetExperience
            handle={(value) => setExperience(value)}
            nickName={nickName}
          />
        );
      case '5':
        return (
          <SetKeyword
            selectedKeywords={keyword}
            setSelectedKeywords={setKeyword}
          />
        );
      case '6':
        return <SetFinish />;
    }
  };

  const handleNextClick = useCallback(() => {
    switch (progress) {
      default:
      case '1':
        if (validateNickname(nickName)) {
          navigate('/my/settings/userInfoInput/2');
        } else {
          toast('warn', '닉네임을 다시 확인해주세요.');
        }
        break;
      case '2':
        navigate('/my/settings/userInfoInput/3');
        break;
      case '3':
        navigate('/my/settings/userInfoInput/4');
        break;
      case '4':
        navigate('/my/settings/userInfoInput/5');
        break;
      case '5':
        navigate('/my/settings/userInfoInput/6');
        break;
      case '6':
        navigate('/');
        break;
    }
  }, [validateNickname, navigate, progress, toast, nickName]);

  return (
    <div className={styles.userInfoInputPage}>
      {renderContent()}
      <StepIndicator />
      <div className={styles.buttonWrapper}>
        <Button type="normal" state={buttonState} onClick={handleNextClick}>
          {progress != 6 ? '다음으로' : '섬으로 바로가기'}
        </Button>
      </div>
    </div>
  );
}

export default UserInfoInputPage;
