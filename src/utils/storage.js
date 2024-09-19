const { localStorage: storage } = window;

function isValidKey(key) {
  if (typeof key !== 'string' || key.trim() === '') {
    console.error('key는 문자열이어야 합니다.');
    return false;
  }
  return true;
}

export function setStorage(key, value) {
  if (!isValidKey(key)) return;

  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('로컬스토리지에 저장하는 중 오류가 발생했습니다: ', error);
  }
}

export function getStorage(key) {
  if (!isValidKey(key)) return null;

  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(
      '로컬스토리지에서 값을 가져오는 중 오류가 발생했습니다:',
      error
    );
    return null;
  }
}

export function deleteStorage(key) {
  if (!isValidKey(key)) return;

  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(
      '로컬스토리지에서 값을 삭제하는 중 오류가 발생했습니다:',
      error
    );
  }
}
