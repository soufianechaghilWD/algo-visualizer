import React, { useState, useEffect, useCallback } from "react";
import generateArray from "../../helpers/generateArray";

function Logic() {
  const [arrayToSort, setArrayToSort] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [speed, setSpeed] = useState(1000);
  const [length, setLength] = useState(6);
  const [sortedArray, setSortedArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShlowLogs] = useState(false);

  const setTim = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, speed);
    });
  };

  const insertion_sort = async (arr) => {
    const rr = [];
    setSorting(true);
    for (let i = 0; i < arr.length - 1; i++) {
      let j = i;

      while (arr[j] > arr[j + 1]) {
        const innerLog = `The element ${arr[j]} is greater than ${
          arr[j + 1]
        } even though it precedes it, so we are going to swap them`;
        rr.push({ title: false, body: innerLog });

        const tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
        j = j - 1;

        const afterLog = `The array after the swap is: `;
        rr.push({ title: false, body: afterLog, array: JSON.stringify(arr) });

        setArrayToSort(arr);
        forceUpdate();

        await setTim();
      }
    }
    setLogs(logs.concat(rr));
    setSorting(false);
  };

  const sort = () => {
    insertion_sort(arrayToSort);
  };

  const returnBarForNum = (num, idx) => {
    // check if the item is in its natural place place
    const isThisOneDone = sortedArray.indexOf(num) === arrayToSort.indexOf(num);
    const width =
      length === 10 || length === 6
        ? 20
        : length === 50
        ? 15
        : length === 100
        ? 5
        : 4;

    const height =
      length === 10 || length === 6
        ? num * 25
        : length === 50
        ? num * 5
        : length === 100
        ? num * 3
        : num * 2;

    return (
      <div
        style={{ height: `${height}px`, width: `${width}px` }}
        key={idx}
        className={`bar  ${isThisOneDone ? "thisOneInPlace" : ""} `}
      >
        {(length === 10 || length === 6) && `${num}`}
      </div>
    );
  };

  const generateNewArray = () => {
    const newOne = generateArray(length);
    setArrayToSort(newOne);
    var sorted = [...newOne].sort((a, b) => a - b);
    setSortedArray(sorted);
    setLogs([
      {
        title: true,
        body: `The array to sort is`,
        array: JSON.stringify(newOne),
      },
    ]);
  };

  useEffect(() => {
    generateNewArray();
  }, [length]);

  const handleLength = (e) => {
    const newLength = parseInt(e.target.value);
    setLength(newLength);
    if (newLength === 4) setSpeed(1000);
    else if (newLength === 10) setSpeed(300);
    else if (newLength === 50) setSpeed(100);
    else if (newLength === 100) setSpeed(20);
    else setSpeed(5);
  };

  return {
    sorting,
    generateNewArray,
    sort,
    handleLength,
    arrayToSort,
    returnBarForNum,
    showLogs,
    setShlowLogs,
    logs,
  };
}

export default Logic;
