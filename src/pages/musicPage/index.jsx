import { memo, useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './MusicPage.module.css';
import { useMediaStore } from '@/stores/mediaStore';
import { useAuthStore } from '@/stores/authStore';
import { readDiaries } from '@/api/diaries';
import BackButton from '@/components/BackButton/BackButton';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';

function MusicPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const userInfo = useAuthStore((store) => store.userInfo);
  const [musics, setMusics] = useState([]);

  const getOwnMusicList = useCallback(async () => {
    try {
      const diaryContents = await readDiaries(
        `&expand=replyId&filter=(replyId.typeOfContent='music'%26%26userId='${userInfo.id}')&sort=created`
      );

      const replyArray = diaryContents.items.map((item) => item.expand.replyId);
      setMusics(replyArray);
    } catch (error) {
      console.error('뮤직 리스트 에러: ', error);
    }
  }, [userInfo.id]);

  // 컴포넌트가 처음 렌더링될 때 음악 목록 가져오기
  useEffect(() => {
    getOwnMusicList();
  }, [getOwnMusicList]);

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
          <MusicPlayer musicList={musics} />
        </div>
      </div>
    </div>
  );
}

export default memo(MusicPage);
