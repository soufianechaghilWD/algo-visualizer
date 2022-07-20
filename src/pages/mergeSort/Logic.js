import React, { useEffect, useState, useCallback } from "react";
import generateArray from "../../helpers/generateArray";

function Logic() {


  const [arrayToSort, setArrayToSort] = useState([]);
  const [length, setLength] = useState(6);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [speed, setSpeed] = useState(200);
  const [sortedArray, setSortedArray] = useState([]);
  const [sorting, setSorting] = useState(false);

  const setTim = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, speed);
    });
  };

  const generateNewArray = () => {
    const arr = generateArray(length);
    const sorted = [...arr].sort((a, b) => a - b);
    setArrayToSort(arr);
    setSortedArray(sorted);
  };

  useEffect(() => {
    generateNewArray();
  }, [length]);

  const selectionSort = async (arr, start, finish) => {
    for (let i = start; i < finish; i++) {
      let min = i;
      for (let j = i; j < finish; j++) {
        if (arr[j] < arr[min]) min = j;
      }

      if (min != i) {
        const tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
      }
      setArrayToSort(arr);
      forceUpdate();

      await setTim();
    }
  };



  const selectionMerge = async (arr, start, finish) => {
    if (finish - start <= 1) return arr;

    const mid = parseInt((finish - start) / 2);


    await selectionMerge(arr, start, start + mid);

    await selectionMerge(arr, start + mid, finish);


    await selectionSort(arr, start, finish);
    
  };

  const sort = async () => {
    setSorting(true)
    await selectionMerge(arrayToSort, 0, arrayToSort.length);
    setSorting(false)
  };

  const handleLength = (e) => {
    const newLength = parseInt(e.target.value);
    setLength(newLength);
    if (newLength === 4) setSpeed(200);
    else if (newLength === 10) setSpeed(175);
    else if (newLength === 50) setSpeed(75);
    else if (newLength === 100) setSpeed(30);
    else setSpeed(10);
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

  return {
    sorting,
    generateNewArray,
    sort,
    handleLength,
    arrayToSort,
    returnBarForNum,
  };
}

export default Logic;
