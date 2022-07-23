const generateArray = (num) => {
  const res = [];

  while (res.length < num) {
    const randomNumber = Math.floor(Math.random() * 2 * num);
    if (randomNumber !== 0 && res.find((x) => x === randomNumber) === undefined)
      res.push(randomNumber);
  }
  return res;
};

const getIndex = (len) => {

  const random = Math.floor(Math.random() * (len - 1))

  return random

}

export {getIndex}

export default generateArray;
