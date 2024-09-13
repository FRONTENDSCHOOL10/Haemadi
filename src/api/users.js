import { BASE_URL } from './pbconfig';

const REQUEST_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

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

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: '서버에서 요청에 응답하지 않습니다.' }),
      { status: 500 }
    );
  }

  const responseData = await response.json();

  return responseData;
}

/** @type {(username: string, password: string) => Promise<any>} */
export async function userSignIn(username, password) {
  const REQUEST_URL = `${BASE_URL}/api/collections/users/auth-with-password`;

  const body = JSON.stringify({ identity: username, password });
  console.log(body);

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
