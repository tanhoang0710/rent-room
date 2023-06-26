export const getRangeInString = (str: string): number[] => {
  const numberPattern = /\d+/g;
  const numbers = str.match(numberPattern)?.map(Number);

  return numbers;
};
