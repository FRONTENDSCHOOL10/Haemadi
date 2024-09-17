import Button from '@/components/Button/Button';
import { useMediaStore } from '@/stores/mediaStore';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './DemoPage.module.css';
import Step1Content from './components/StepContents/Step1Content';
import Step2Content from './components/StepContents/Step2Content';
import Step2to2Content from './components/StepContents/Step2to2Content';
import Step3Content from './components/StepContents/Step3Content';
import StepIndicator from './components/StepIndicator/StepIndicator';

function DemoPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const navigate = useNavigate();
  const { step } = useParams();
  const [buttonState, setButtonState] = useState('disabled');
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleChange = useCallback((value) => {
    setSelectedEmotion(value);
  }, []);

  useEffect(() => {
    setButtonState(step !== '2' || selectedEmotion ? 'default' : 'disabled');
  }, [step, selectedEmotion]);
  useEffect(() => {
    setSelectedEmotion(null);
  }, [step]);

  let content;
  switch (step) {
    default:
    case '1':
      content = <Step1Content />;
      break;
    case '2':
      content = <Step2Content handleSelect={handleChange} />;
      break;
    case '2-2':
      content = <Step2to2Content selectedEmotion={selectedEmotion} />;
      break;
    case '3':
      content = <Step3Content />;
      break;
  }

  const handleNextClick = useCallback(() => {
    switch (step) {
      default:
      case '1':
        navigate('/demo/2');
        break;
      case '2':
        navigate('/demo/2-2');
        break;
      case '2-2':
        navigate('/demo/3');
        break;
      case '3':
        navigate('/auth');
        break;
    }
  }, [navigate, step]);

  return (
    <div
      className={styles.pageContainer}
      style={{
        backgroundImage: `url(/demoPage/demoPage_step${step.slice(0, 1)}Bg.png)`,
        backgroundPositionX: !desktop && step.slice(0, 1) === '2' ? '80%' : '',
      }}
    >
      {content}
      <div className={styles.buttonWrapper}>
        <Button type="normal" state={buttonState} onClick={handleNextClick}>
          다음으로
        </Button>
        <StepIndicator step={step.slice(0, 1)} />
      </div>
    </div>
  );
}

export default DemoPage;
