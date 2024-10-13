import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import styles from './NotFoundPage.module.css';

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
    </div>
  );
}

export default memo(NotFoundPage);
