import { BASE_URL } from './pbconfig';

const REQUEST_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

async function handleResponse(response) {
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Response(
      JSON.stringify({
        message: errorResponse.message || '서버에서 요청에 응답하지 않습니다.',
      }),
      { status: response.status }
    );
  }
  return response.json();
}

// 사용예시) createReply({messag: 'asdf', userId: 'nxorcbf2dujhxfu', replier: 'user', diaryId: 'rp9a7alacftewzq'})
/** @type {(newDiary: { message: string, diaryId: string, replier: 'user' | 'ai' userId?: string, typeOfContent?: 'music' | 'quotes' | 'book' | 'video', content?: object }) => Promise<any>} */
export async function createReply(newReply) {
  const REQUEST_URL = `${BASE_URL}/api/collections/replies/records`;
  const body = JSON.stringify(newReply);

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

  const responseData = await handleResponse(response);

  return responseData;
}
