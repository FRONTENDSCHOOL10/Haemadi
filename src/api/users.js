import { deleteStorage, getStorage, setStorage, parseJwt } from '@/utils';
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

// username 중복일 때 처리 필요
/** @type {(userName: string, password: string, passwordConfirm: string) => Promise<any>} */
export async function userSignUp(username, password, passwordConfirm) {
  const REQUEST_URL = `${BASE_URL}/api/collections/users/records`;

  const newUser = { username, password, passwordConfirm };
  const body = JSON.stringify(newUser);

  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    body,
    ...REQUEST_OPTIONS,
  });

  return handleResponse(response);
}

/** @type {(username: string, password: string) => Promise<any>} */
export async function userSignIn(username, password) {
  const REQUEST_URL = `${BASE_URL}/api/collections/users/auth-with-password`;

  const body = JSON.stringify({ identity: username, password });

  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    body,
    ...REQUEST_OPTIONS,
  });

  const responseData = await handleResponse(response);

  // 로그인 성공 시 토큰을 로컬 스토리지에 저장
  setStorage('token', responseData.token);

  return responseData;
}

/** @type {(token: string) => Promise<any>} */
export async function getUserData(token) {
  const REQUEST_URL = `${BASE_URL}/api/collections/users/auth-refresh`;

  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    headers: {
      ...REQUEST_OPTIONS.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await handleResponse(response);

  return responseData.record;
}

export function logoutUser() {
  deleteStorage('token');
  // 페이지 이동 필요 시 추가
}

// 페이지 로드 시 토큰 만료 여부 확인
export function checkTokenExpiration() {
  const token = getStorage('token');
  if (token) {
    const decodedToken = parseJwt(token);
    const expirationTime = decodedToken.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      logoutUser();
      return true;
    }

    return false;
  }

  return false;
}

/* 사용 예시 */
/* window.onload = () => {
  const isTokenValid = checkTokenExpiration(); // 페이지 로드 시 토큰 유효성 검사
  if (!isTokenValid) {}
}; */
