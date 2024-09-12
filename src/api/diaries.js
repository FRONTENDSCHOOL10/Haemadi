import { BASE_URL } from './pbconfig';

const REQUEST_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// 사용예시) createDiary({messag: 'asdf', emotion: 'sad', userId: 'nxorcbf2dujhxfu'})
/** @type {(newDiary: { message: string, emotion: 'angry' | 'glad' | 'happy' | 'panic' | 'anxiety' | 'sad' | 'normal' | 'tired', userId: string, replyId?: string }) => Promise<any>} */
export async function createDiary(newDiary) {
  const REQUEST_URL = `${BASE_URL}/api/collections/diaries/records`;
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

// 사용예시) readDiaries('nxorcbf2dujhxfu')
/** @type {(userId: string, signal?: AbortSignal) => Promise<any>} */
export async function readDiaries(userId, signal) {
  const REQUEST_URL = `${BASE_URL}/api/collections/diaries/records?filter=(userId='${userId}')&sort=created`;

  const response = await fetch(REQUEST_URL, { signal });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

// 사용예시) const data = await readDiaryOne('99wgwkwynupzi1u');
//         const { typeOfContent } = data.expand.replyId;
/** @type {(diaryId: string, expandFields?: string, signal?: AbortSignal) => Promise<any>} */
export async function readDiaryOne(diaryId, signal) {
  const REQUEST_URL = `${BASE_URL}/api/collections/diaries/records/${diaryId}?expand=replyId`;

  const response = await fetch(REQUEST_URL, { signal });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

// 사용예시) updateDiary({id:'99wgwkwynupzi1u', emotion: 'angry'})
/** @type { (editDiary: { id: string, message?: string, emotion?: 'angry' | 'glad' | 'happy' | 'panic' | 'anxiety' | 'sad' | 'normal' | 'tired', userId?: string, replyId?: string }) => Promise<any>} */
export async function updateDiary(editDiary) {
  const REQUEST_URL = `${BASE_URL}/api/collections/diaries/records/${editDiary.id}`;
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

// 사용예시) deleteDiary('99wgwkwynupzi1u')
/** @type {(diaryId: string) => Promise<any>} */
export async function deleteDiary(diaryId) {
  const REQUEST_URL = `${BASE_URL}/api/collections/diaries/records/${diaryId}`;
  const response = await fetch(REQUEST_URL, { method: 'DELETE' });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  return response;
}
