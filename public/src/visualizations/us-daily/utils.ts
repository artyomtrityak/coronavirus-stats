export function convertToDate(input: number) {
  const year = +String(input).slice(0, 4);
  let month = +String(input).slice(4, 6);
  month--;
  const day = +String(input).slice(6);
  return new Date(year, month, day);
}