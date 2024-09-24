/** @type {(date: Date, type: number) => string} */
export function formatDate(date, type) {
  // 1. 2024-09-18 형식
  if (type === 1) {
    const formatted1 = date.toISOString().split('T')[0];
    return formatted1;
  }
  // 2. 24.09.18 (Wed) 형식
  else if (type === 2) {
    // 요일만 추출 (Wed)
    const formattedDay = date.toLocaleDateString('en-US', {
      weekday: 'short',
    });
    // 24.09.18
    const formattedDate = date
      .toLocaleDateString('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '.');
    // 24.09.18 (Wed)
    const finalFormatted2 = `${formattedDate} (${formattedDay})`;
    return finalFormatted2;
  }
}
