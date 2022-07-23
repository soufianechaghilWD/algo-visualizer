import React, { useCallback, useEffect, useState } from "react";
import generateArray, { getIndex } from "../../helpers/generateArray";

function Logic() {
  const setTim = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, speed);
    });
  };

  const [array, setArray] = useState([]);
  const [toFind, setToFind] = useState(null);
  const [length, setLength] = useState(20);
  const [searching, setSearching] = useState(false);
  const [index, setIndex] = useState(null);
  const [speed, setSpeed] = useState(750);
  const [whereAmI, setWhereAmI] = useState(null);
  const [start, setStart] = useState(null);
  const [finish, setFinish] = useState(null);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const generateNewArray = () => {
    const arr = generateArray(length).sort((a, b) => a - b);
    const idx = getIndex(length);
    setArray(arr);
    setIndex(idx);
    setToFind(arr[idx]);
    setStart(0);
    setFinish(length);
  };

  useEffect(() => {
    generateNewArray();
  }, [length]);

  const search = async () => {
    setSearching(true);

    var newStart = start;
    var newFinish = finish;

    while (true) {
      const mid = Math.floor((newFinish + newStart) / 2);
      const crt = array[mid];

      if (crt === toFind) {
        setStart(mid);
        setFinish(mid);
        break;
      }

      if (crt < toFind) newStart = mid + 1;
      else newFinish = mid - 1;

      setWhereAmI(mid);
      setStart(newStart);
      setFinish(newFinish);
      forceUpdate();
      await setTim();
    }

    setWhereAmI(null);
    setSearching(false);
  };

  const handleLength = (e) => {
    const newLength = parseInt(e.target.value);
    setLength(newLength);
    // set the speed
    if (newLength === 20) setSpeed(750);
    else if (newLength === 75) setSpeed(500);
    else if (newLength === 150) setSpeed(450);
    else setSpeed(300);
  };
  const setSearchedFor = (num, idx) => {
    if (!searching) {
      setToFind(num);
      setIndex(idx);
    }
  };

  const returnBarForNum = (num, idx) => {
    // check if the item is in its natural place place
    const isThatWhatWeWant = num === toFind;
    const areWeHere = idx === whereAmI;
    const outRange = idx > finish || idx < start;

    const width =
      length === 20 ? 20 : length === 75 ? 7 : length === 150 ? 4 : 3;

    const height =
      length === 20
        ? num * 17
        : length === 75
        ? num * 3
        : length === 150
        ? num * 2
        : num;

    return (
      <div
        style={{ height: `${height}px`, width: `${width}px` }}
        key={idx}
        className={`bar  ${
          outRange
            ? "outRange"
            : areWeHere
            ? "areWeHere"
            : isThatWhatWeWant
            ? "isThatWhatWeWant"
            : ""
        } `}
        onClick={() => setSearchedFor(num, idx)}
      >
        {isThatWhatWeWant && length === 20 && num}
      </div>
    );
  };

  return {
    searching,
    generateNewArray,
    toFind,
    index,
    search,
    handleLength,
    array,
    returnBarForNum,
  };
}

export default Logic;
