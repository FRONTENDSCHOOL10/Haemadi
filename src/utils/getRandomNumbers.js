/** @type {(length: number, want: number) => Array<number>} */
export function getRandomNumbers(length, want = 5) {
  let result = [];
  let numbers = Array.from({ length: length }, (_, i) => i);

  if (length < want) {
    // 먼저 모든 숫자를 배열에 넣고 섞음
    while (numbers.length) {
      let randomIndex = Math.floor(Math.random() * numbers.length);
      result.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1);
    }
    // 추가로 필요한 숫자를 무작위로 선택해 채움
    while (result.length < want) {
      result.push(Math.floor(Math.random() * length));
    }
  } else {
    // 중복 허용하지 않음
    while (result.length < want) {
      let randomIndex = Math.floor(Math.random() * numbers.length);
      result.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1); // 선택된 숫자를 배열에서 제거
    }
  }

  return result;
}
