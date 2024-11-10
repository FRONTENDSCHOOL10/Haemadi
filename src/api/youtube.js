const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

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

// username 중복일 때 처리 필요
/** @type {(title: string) => Promise<any>} */
export async function searchVideo(title) {
  const REQUEST_URL = `https://youtube.googleapis.com/youtube/v3/search?maxResults=2&q=${title}%20%EA%B0%80%EC%82%AC&key=${API_KEY}`;

  const response = await fetch(REQUEST_URL, {
    method: 'GET',
    ...REQUEST_OPTIONS,
  });

  return handleResponse(response);
}
