import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import styles from './NotFoundPage.module.css';
import wave1 from '/logoItems/wave1.webp';
import wave2 from '/logoItems/wave2.webp';
import wave3 from '/logoItems/wave3.webp';
import wave4 from '/logoItems/wave4.webp';
import boat from '/logoItems/boat.webp';

function NotFoundPage() {
  return (
    <div className={styles.NotFoundPage}>
      <Helmet>
        <title>404 - 해마디</title>
        <meta name="description" content="해마디의 링크를 다시 확인해주세요" />
        <meta property="og:title" content="404 - 해마디" />
        <meta
          property="og:description"
          content="해마디의 링크를 다시 확인해주세요"
        />
        <meta name="twitter:title" content="404 - 해마디" />
        <meta
          name="twitter:description"
          content="해마디의 링크를 다시 확인해주세요"
        />
      </Helmet>
      <h1>PAGE NOT FOUND</h1>
      <p>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</p>
      <p className={styles.description}>
        존재하지 않는 주소를 입력하셨거나,
        <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <Link className={styles.goHome} to={'/'}>
        홈으로
      </Link>
      <div aria-hidden="true">
        <img className={styles.wave1} src={wave1} alt="" />
        <img className={styles.wave2} src={wave2} alt="" />
        <img className={styles.boat} src={boat} alt="" />
        <img className={styles.wave3} src={wave3} alt="" />
        <img className={styles.wave4} src={wave4} alt="" />
      </div>
    </div>
  );
}

export default memo(NotFoundPage);
