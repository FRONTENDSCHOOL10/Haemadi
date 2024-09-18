import BackButton from '@/components/BackButton/BackButton';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import MusicReply from './components/MusicReply/MusicReply';
import styles from './ViewDiaryPage.module.css';
import { useMediaStore } from '@/stores/mediaStore';

function ViewDiaryPage() {
  const desktop = useMediaStore((store) => store.desktop);
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <BackButton
          style={{
            position: 'absolute',
            top: desktop ? '9vh' : '24px',
            left: desktop ? '15.625vw' : '36px',
          }}
        />
        <h1>Ai 마디에게 받은 답장이에요</h1>
        {desktop && <time dateTime="2023-08-07">23.08.07 (Sun)</time>}
      </header>
      <main className={styles.main}>
        {!desktop && <time dateTime="2023-08-07">23.08.07 (Sun)</time>}
        <section className={styles.diary}>
          <h2>오늘은 어떤 하루였나요?</h2>
          <SVGIcon
            {...icons.shell_anxiety}
            width={58}
            style={{ marginBottom: desktop ? '45px' : '38px' }}
          />
          <h2>오늘의 이야기를 들려주세요.</h2>
          <p>
            슬슬 이직할 때가 된 것 같은데 내가 과연 할 수 있을까? 내가 계속해서
            이 직무에 몸 담고 있는 것이 맞을까? 하는 끝없는 고민이 계속된다.
            현재 회사에 입사한 지 3년차, 3년 동안 나의 개인 역량이 발전됐는가에
            대한 확신이 서지 않는다. 무엇보다 이러한 직무와 관련해 신입 때보다
            확실히 나의 흥미가 줄어들었다. 요즘은 계속 방황을 하고 있는 것 같다.
            이런 시시콜콜한 이야기를 나눌 수 없는 가까운 동네 친구가 없다는 것도
            너무나 힘들다. 주절주절 편하게 쓰긴 했지만 아무나 듣고 나를
            위로해줬으면 좋겠다. 잘하고 있다는 말이 괜히 듣고 싶다.
          </p>
        </section>

        <section className={styles.reply}>
          <h2>언제나 멋진 존재인 당신에게</h2>
          <p>
            청춘의 고뇌는 어른들에게는 보이지 않는 숨겨진 전쟁이야. 내가
            누구이며 어떤 목표를 향해 나아가야 하는지에 대한 질문들이 머릿속을
            빙빙 돌지. 내가 이루고 싶은 꿈은 무엇일까? 어떻게 그 꿈을 찾아야
            할까? 아니, 그 꿈은 내게 맞을까? 하지만 이 모든 고뇌와 불안에도
            불구하고, 난 그 방황속에서 청춘의 아름다움을 느껴. 미래에 대한
            무한한 가능성과 끝없는 열정이 너를 불태우고, 네 안에는 현실의 벽을
            넘어서고 꿈을 실현하기 위한 끝없는 에너지와 용기가 있지. 좌절하지마.
            아직 젊으니까!
          </p>
          <h2>당신에게 추천하는 노래</h2>
          <MusicReply
            imgSrc={''}
            musicTitle={'새소년'}
            musicArtist={'새소년'}
          />
        </section>
      </main>
    </div>
  );
}

export default ViewDiaryPage;
