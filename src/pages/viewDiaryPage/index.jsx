import { BASE_URL } from '@/api/pbconfig';
import BackButton from '@/components/BackButton/BackButton';
import Loading from '@/components/Loading/Loading';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import useFetch from '@/hooks/useFetch';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookReply from './components/BookReply/BookReply';
import MusicReply from './components/MusicReply/MusicReply';
import QuotesReply from './components/QuotesReply/QuotesReply';
import VideoReply from './components/VideoReply/VideoReply';
import styles from './ViewDiaryPage.module.css';

function ViewDiaryPage() {
  const { diaryId } = useParams();
  const desktop = useMediaStore((store) => store.desktop);
  const [formattedDate1, setFormattedDate1] = useState('');
  const [formattedDate2, setFormattedDate2] = useState('');

  const ENDPOINT = `${BASE_URL}/api/collections/diaries/records/${diaryId}?expand=replyId,userId`;
  const { status, error, data } = useFetch(ENDPOINT);
  console.log(data);

  // 날짜 포맷팅
  useEffect(() => {
    if (data) {
      const createdDate = new Date(data.created);

      const formatted1 = formatDate(createdDate, 1); // 2024-09-18 형식
      setFormattedDate1(formatted1);
      const formatted2 = formatDate(createdDate, 2); // 24.09.18 (Wed) 형식
      setFormattedDate2(formatted2);
    }
  }, [data]);

  // data에서 구조분해할당 및 useMemo로 data가 변경될 때만 재계산
  const diaryData = useMemo(() => {
    if (!data) return null;

    const { emotion, message, expand } = data;

    return { emotion, message, reply: expand?.replyId, user: expand?.userId };
  }, [data]);

  if (status === 'loading') return <div>로딩중...</div>;
  if (status === 'error') return <div>{error.message}</div>;

  if (!data) return null;

  // data에서 구조분해할당
  const { emotion, message, reply, user } = diaryData;

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
            {reply.replier === 'ai' && (
              <>
                <h2>당신에게 추천하는 노래</h2>
                {renderReplyContent(reply.content, reply.typeOfContent)}
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default ViewDiaryPage;

// ai 답장일 경우 typeOfContent에 따라 4가지 중 알맞은 컨텐츠 렌더링
function renderReplyContent(content, typeOfContent) {
  switch (typeOfContent) {
    case 'music':
      return (
        <MusicReply
          imgSrc={content.imgSrc}
          musicTitle={content.musicTitle}
          musicArtist={content.musicArtist}
        />
      );
    case 'quotes':
      return <QuotesReply quotes={content.quotes} author={content.author} />;
    case 'book':
      return (
        <BookReply
          imgSrc={content.imgSrc}
          bookTitle={content.bookTitle}
          author={content.author}
          publisher={content.publisher}
        />
      );
    case 'video':
      return (
        <VideoReply
          imgSrc={content.imgSrc}
          videoTitle={content.videoTitle}
          hashTags={content.hashTags}
        />
      );

    default:
      return null;
  }
}
