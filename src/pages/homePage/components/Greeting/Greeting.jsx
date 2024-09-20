import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { bool, func } from 'prop-types';
import styles from './Greeting.module.css';

Greeting.propTypes = {
  greetingOpen: bool,
  onButtonClick: func,
};

function Greeting({ greetingOpen = true, onButtonClick, ...restProps }) {
  return (
    <div className={styles.greeting} {...restProps}>
      <button
        type="button"
        className={styles.greetingButton}
        onClick={onButtonClick}
        aria-label={`인사 메세지 ${greetingOpen ? '닫기' : '열기'}`}
      >
        <SVGIcon {...icons.shell_glad} width={58} />
      </button>
      {greetingOpen && (
        <div role="alert" className={styles.greetingMessage}>
          {
            '당신을 환영해요! 오늘의 하루는 어땠나요?\n잠시 이 곳에서 쉬면서 기분을 환기시켜보세요.'
          }
        </div>
      )}
    </div>
  );
}

export default Greeting;
