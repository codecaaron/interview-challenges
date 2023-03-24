export const getSeriesInterval = (count: number) => {
  if (count <= 31) {
    return 1;
  }
  if (count === 365) {
    return 31;
  }
  if (count / 365 > 1) {
    return 365;
  }
  return 7;
};
