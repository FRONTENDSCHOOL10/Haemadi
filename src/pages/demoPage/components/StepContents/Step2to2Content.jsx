import { oneOf } from 'prop-types';
import styles from './StepContents.module.css';

const labelForEmotion = {
  행복해요: '오늘 하루는 행복하시군요!\n다행이에요.',
  평범해요: '오늘 하루는 평범하시군요!\n그저 그런 하루이군요.',
  슬퍼요: '오늘 하루는 슬프시군요.\n마음이 무겁네요.',
  피곤해요: '오늘 하루는 피곤하시군요!\n쉬는 시간이 필요하겠어요.',
  꿀꿀해요: '오늘 하루는 꿀꿀하시군요!\n마음이 답답하신 것 같아요.',
  힘들어요: '오늘 하루는 힘드시군요.\n고생 많으셨어요, 힘내세요.',
  모르겠어요: '오늘 하루는 애매하시군요!\n그런 날도 있죠.',
};

Step2to2Content.propTypes = {
  selectedEmotion: oneOf([
    '행복해요',
    '평범해요',
    '슬퍼요',
    '피곤해요',
    '꿀꿀해요',
    '힘들어요',
    '모르겠어요',
  ]),
};

function Step2to2Content({ selectedEmotion }) {
  return (
    <div className={`${styles.step2Content} ${styles.step2to2Content}`}>
      <h1>{labelForEmotion[selectedEmotion]}</h1>
      <p>
        {
          '감정을 알려주셔서 감사해요! 해마디 서비스는 간단한\n감정과 함께 일기를 작성할 수 있어요.'
        }
      </p>
      <p>
        {
          '작성한 일기는 나의 감정을 담아 누군가에게\n답장을 받으며 감정을 공유하고 공감받을 수 있어요.'
        }
      </p>
    </div>
  );
}

export default Step2to2Content;
