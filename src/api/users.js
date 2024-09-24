import { useAuthStore } from '@/stores/authStore';
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
  useAuthStore.getState().loginUser(responseData.token, responseData.record);

  return responseData;
}

/** @type {(token: string) => Promise<UserData>} */
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

/** @type {(id: string, data: object) => Promise<UserData>} */
export async function setUserData(id, data) {
  const REQUEST_URL = `${BASE_URL}/api/collections/users/records/${id}`;

  const body = JSON.stringify({ ...data });

  const response = await fetch(REQUEST_URL, {
    method: 'PATCH',
    body,
    ...REQUEST_OPTIONS,
  });

  const responseData = await handleResponse(response);
  // authStore 업데이트
  useAuthStore.getState().updateUserInfo(responseData);

  return responseData;
}

export function getUserProfileImg(data) {
  return `${BASE_URL}/api/files/${data.collectionId}/${data.id}/${data.profileImage}`;
}

// 사용자의 프로필 이미지를 업데이트하는 API 함수
/** @type {(userId: string, imageFile: File) => Promise<any>} */
export async function updateUserProfileImage(userId, imageFile) {
  const REQUEST_URL = `${BASE_URL}/api/collections/users/records/${userId}`;

  const formData = new FormData();
  formData.append('profileImage', imageFile);

  const response = await fetch(REQUEST_URL, {
    method: 'PATCH',
    body: formData,
  });

  const responseData = await handleResponse(response);
  useAuthStore.getState().updateUserInfo(responseData);

  return responseData;
}
