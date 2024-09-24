import { useEffect } from 'react';
import { useImmer } from 'use-immer';

// 사용 예시
// const ENDPOINT = `${BASE_URL}/api/collections/diaries/records/${diaryId}?expand=replyId,userId`;
// const { status, error, data } = useFetch(ENDPOINT);
/** @type {(url: string) => { status: 'loading' | 'success' | 'error', error: null | Error, data }} */
function useFetch(url) {
  const [state, setState] = useImmer({
    status: 'loading',
    error: null,
    data: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setState((draft) => {
        draft.status = 'loading';
      });
      const REQUEST_URL = url;

      try {
        const response = await fetch(REQUEST_URL, {
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error('서버 응답이 실패했습니다.');

        const responseData = await response.json();

        setState((draft) => {
          draft.status = 'success';
          draft.data = responseData;
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState((draft) => {
            draft.status = 'error';
            draft.error = error;
          });
        }
      }
    }

    fetchData();

    return () => abortController.abort();
  }, [url, setState]);

  return state;
}

export default useFetch;
