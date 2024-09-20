export function getRandomNumbers(length, want = 5) {
  let result = [];
  let numbers = Array.from({ length: length }, (_, i) => i);

  if (length < want) {
    // 중복 허용
    for (let i = 0; i < want; i++) {
      result.push(numbers[Math.floor(Math.random() * length)]);
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
