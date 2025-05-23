export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
