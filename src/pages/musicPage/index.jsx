import { Helmet } from 'react-helmet-async';

import styles from './MusicPage.module.css';
import { useMediaStore } from '@/stores/mediaStore';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import BackButton from '@/components/BackButton/BackButton';
import MusicPlayer from './components/MusicPLayer/MusicPLayer';
import MusicButton from './components/MusicButton/MusicButton';

function MusicPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const videoIds = ['fZqSGS1mRnw', 'jdzKPUhXa-o', 'zASBUGhofHk'];
  return (
    <div className={styles.MusicPage}>
      <Helmet>
        <title>음악 - 해마디</title>
        <meta
          name="description"
          content="해마디에서 음악을 들으며 일기를 작성해 보세요"
        />
        <meta property="og:title" content="음악 - 해마디" />
        <meta
          property="og:description"
          content="감해마디에서 음악을 들으며 일기를 작성해 보세요"
        />
        <meta name="twitter:title" content="음악 - 해마디" />
        <meta
          name="twitter:description"
          content="해마디에서 음악을 들으며 일기를 작성해 보세요"
        />
      </Helmet>
      <div className={styles.Wrapper}>
        <header>
          <div className={styles.backButton}>
            <BackButton color={desktop ? 'white' : 'blue'} />
          </div>
          <h1 className={styles.title}>나의 플레이리스트</h1>
        </header>
        <div className={styles.MusicWrapper}>
          <MusicPlayer videoIds={videoIds} />
          <div className={styles.MusicList}>
            <span>재생목록</span>
            <MusicButton
              musicTitle="내가 S면 넌 나의 N이 되어줘"
              musicArtist="TWS"
              imgSrc="https://lh3.googleusercontent.com/TC0ZKg4DA_aotpITr0p59Ax7zP0XP4jbusQlqg1N3m6tKLJ6CvcBUzFrlCgY7zYiSMvs4nQYtV8Pr--g=w544-h544-l90-rj"
            />
            <MusicButton
              musicTitle="GODS"
              musicArtist="League of Legends 및 NewJeans"
              imgSrc="https://lh3.googleusercontent.com/T7zV1U9DY4QyX1-LRMh82bdLy4vzWszPdjassPk-gCJ5WaUFekhqCvOllR2txyn-LKyuUEj8t607PeI=w544-h544-l90-rj"
            />
            <MusicButton
              musicTitle="Rockstar"
              musicArtist="Lisa"
              imgSrc="https://lh3.googleusercontent.com/yFwY0HYOduDt6fbR8ZQHa85T0sJhjbMYQMsd_v9dyZIGJqHNeEIkteWpwMPs5y7jzo_JIxaAyealuhpS=w544-h544-l90-rj"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPage;
