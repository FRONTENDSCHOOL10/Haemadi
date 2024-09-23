import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import styles from './ViewDiaryPage.module.css';
import { BASE_URL } from '@/api/pbconfig';
import { useMediaStore } from '@/stores/mediaStore';
import { formatDate } from '@/utils/formatDate';
import useFetch from '@/hooks/useFetch';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import BackButton from '@/components/BackButton/BackButton';
import Loading from '@/components/Loading/Loading';
import BookReply from './components/BookReply/BookReply';
import MusicReply from './components/MusicReply/MusicReply';
import QuotesReply from './components/QuotesReply/QuotesReply';
import VideoReply from './components/VideoReply/VideoReply';

function ViewDiaryPage() {
  const { diaryId } = useParams();
  const desktop = useMediaStore((store) => store.desktop);

  const ENDPOINT = `${BASE_URL}/api/collections/diaries/records/${diaryId}?expand=replyId,userId`;
  const { status, error, data } = useFetch(ENDPOINT);

  // 상황별, 조건부 처리
  if (status === 'loading') return <Loading />;
  if (status === 'error') return <div>{error.message}</div>;

  /* --------------------------- data가 존재할 경우, 코드 실행 -------------------------- */

  // data 반응성 상태에 파생된 상태
  const { created, emotion, message, expand } = data;

  // [1] data 반응성 상태에 파생된 상태
  const reply = expand?.replyId;
  const user = expand?.userId;

  // data 반응성 상태에 파생된 상태 (날짜 포맷팅)
  const createdDate = new Date(created);
  const formattedDate1 = formatDate(createdDate, 1); // 2024-09-18 형식
  const formattedDate2 = formatDate(createdDate, 2); // 24.09.18 (Wed) 형식

  return (
    <div className={styles.page}>
      <Helmet>
        <title>일기 보기 - 해마디</title>
        <meta name="description" content="내 일기를 자세히 확인해 보세요" />
        <meta property="og:title" content="일기 보기 - 해마디" />
        <meta
          property="og:description"
          content="내 일기를 자세히 확인해 보세요"
        />
        <meta name="twitter:title" content="일기 보기 - 해마디" />
        <meta
          name="twitter:description"
          content="내 일기를 자세히 확인해 보세요"
        />
      </Helmet>
      <header className={styles.header}>
        <BackButton
          style={{
            position: 'absolute',
            top: desktop ? '9vh' : '24px',
            left: desktop ? '15.625vw' : '36px',
          }}
        />
        <h1>{user.nickName}님이 작성하신 일기에요</h1>
        {desktop && <time dateTime={formattedDate1}>{formattedDate2}</time>}
      </header>

      <main className={styles.main}>
        {!desktop && <time dateTime={formattedDate1}>{formattedDate2}</time>}

        <section className={styles.diary}>
          <h2>오늘은 어떤 하루였나요?</h2>
          <SVGIcon
            {...icons[`shell_${emotion}`]}
            width={58}
            style={{ marginBottom: desktop ? '45px' : '38px' }}
          />
          <h2>오늘의 이야기를 들려주세요.</h2>
          <p>{message}</p>
        </section>

        {reply && (
          <section className={styles.reply}>
            <h2>언제나 멋진 존재인 당신에게</h2>
            <p>{reply.message}</p>
            {reply.replier === 'ai' &&
              renderReplyContent(reply.content, reply.typeOfContent)}
          </section>
        )}
      </main>
    </div>
  );
}

export default memo(ViewDiaryPage);

// ai 답장일 경우 typeOfContent에 따라 4가지 중 알맞은 컨텐츠 렌더링
function renderReplyContent(content, typeOfContent) {
  switch (typeOfContent) {
    case 'music':
      return (
        <>
          <h2>당신에게 추천하는 노래</h2>
          <MusicReply
            imgSrc={content.imgSrc}
            musicTitle={content.musicTitle}
            musicArtist={content.musicArtist}
          />
        </>
      );
    case 'quotes':
      return (
        <>
          <h2>당신에게 추천하는 명언</h2>
          <QuotesReply quotes={content.quotes} author={content.author} />
        </>
      );
    case 'book':
      return (
        <>
          <h2>당신에게 추천하는 책</h2>
          <BookReply
            imgSrc={content.imgSrc}
            bookTitle={content.bookTitle}
            author={content.author}
            publisher={content.publisher}
          />
        </>
      );
    case 'video':
      return (
        <>
          <h2>당신에게 추천하는 영상</h2>
          <VideoReply
            imgSrc={content.imgSrc}
            videoTitle={content.videoTitle}
            hashTags={content.hashTags}
          />
        </>
      );

    default:
      return null;
  }
}
