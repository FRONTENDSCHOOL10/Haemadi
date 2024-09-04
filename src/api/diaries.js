const ENDPOINT = import.meta.env.VITE_PB_URL;
const REQUEST_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/** @type {(newDiary: { message: string, emotion: emotionType, userId: string, replyId?: string }) => Promise<any>} */
export async function createDiary(newDiary) {
  const REQUEST_URL = `${ENDPOINT}/api/collections/diaries/records`;

  const body = JSON.stringify(newDiary);

  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    body,
    ...REQUEST_OPTIONS,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

/** @type {(userId: string) => Promise<any>} */
export async function readDiaries(userId) {
  const REQUEST_URL = `${ENDPOINT}/api/collections/diaries/records?filter=(userId='${userId}')&sort=created`;
  const response = await fetch(REQUEST_URL);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

/** @type {(diaryId: string) => Promise<any>} */
export async function readDiaryOne(diaryId) {
  const REQUEST_URL = `${ENDPOINT}/api/collections/diaries/records/${diaryId}`;
  const response = await fetch(REQUEST_URL);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

/** @type { (editDiary: { id: string, message?: string, emotion?: emotionType, userId?: string, replyId?: string }) => Promise<any>} */
export async function updateDiary(editDiary) {
  const REQUEST_URL = `${ENDPOINT}/api/collections/diaries/records/${editDiary.id}`;
  const body = JSON.stringify(editDiary);

  const response = await fetch(REQUEST_URL, {
    method: 'PATCH',
    body,
    ...REQUEST_OPTIONS,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

/** @type {(diaryId: string) => Promise<any>} */
export async function deleteDiary(diaryId) {
  const REQUEST_URL = `${ENDPOINT}/api/collections/diaries/records/${diaryId}`;
  const response = await fetch(REQUEST_URL, { method: 'DELETE' });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  return response;
}
