import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './UserInfoInputPage.module.css';
import Button from '@/components/Button/Button';
import { useMediaStore } from '@/stores/mediaStore';
import StepIndicator from './components/StepIndicator/StepIndicator';

function UserInfoInputPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const navigate = useNavigate();
  const { progress } = useParams();
  const [buttonState, setButtonState] = useState('disabled');
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleChange = useCallback((value) => {
    setSelectedEmotion(value);
  }, []);

  /*   useEffect(() => {
    setButtonState(step !== '2' || selectedEmotion ? 'default' : 'disabled');
  }, [step, selectedEmotion]);
  useEffect(() => {
    if (step === '2') setSelectedEmotion(null);
  }, [step]); */

  const renderContent = () => {
    switch (progress) {
      default:
      case '1':
        return <>1</>;
      case '2':
        return <>2</>;
      case '3':
        return <>3</>;
      case '4':
        return <>4</>;
    }
  };

  const handleNextClick = useCallback(() => {
    switch (progress) {
      default:
      case '1':
        navigate('/my/settings/userInfoInput/2');
        break;
      case '2':
        navigate('/my/settings/userInfoInput/3');
        break;
      case '3':
        navigate('/my/settings/userInfoInput/4');
        break;
      case '4':
        navigate('/auth');
        break;
    }
  }, [navigate, progress]);

  return (
    <div className={styles.userInfoInputPage}>
      {renderContent()}
      <div>
        <Button type="normal" state={buttonState} onClick={handleNextClick}>
          다음으로
        </Button>
        <StepIndicator />
      </div>
    </div>
  );
}

export default UserInfoInputPage;
