import { memo, useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './MusicPage.module.css';
import { useMediaStore } from '@/stores/mediaStore';
import { useAuthStore } from '@/stores/authStore';
import { readDiaries } from '@/api/diaries';
import BackButton from '@/components/BackButton/BackButton';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading/Loading';

function MusicPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const userInfo = useAuthStore((store) => store.userInfo);
  const [queryLoading, setQueryLoading] = useState(true); // Suspense의 Loading에서 넘어올 때 깜빡임을 방지하기 위해 상태로 관리

  const params = useMemo(
    () =>
      `&expand=replyId&filter=(replyId.typeOfContent='music'%26%26userId='${userInfo.id}')&sort=created`,
    [userInfo.id]
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ['musicList', params],
    queryFn: () => readDiaries(params),
  });

  useEffect(() => {
    if (!isLoading) setQueryLoading(false);
  }, [isLoading]);

  if (queryLoading) return <Loading musicPage />;
  if (error) return <div>{error.message}</div>;

  const musics = data.items.map((item) => item.expand.replyId);

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
