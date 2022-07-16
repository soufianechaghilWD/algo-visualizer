const generateArray = (num) => {
  const res = [];

  while (res.length < num) {
    const randomNumber = Math.floor(Math.random() * 2 * num);
    if (randomNumber !== 0 && res.find((x) => x === randomNumber) === undefined)
      res.push(randomNumber);
  }
  return res;
};
export default generateArray;
