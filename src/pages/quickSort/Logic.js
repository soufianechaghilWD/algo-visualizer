import React, {useEffect, useState, useCallback} from 'react'
import generateArray from '../../helpers/generateArray';

function Logic() {
    const [arrayToSort, setArrayToSort] = useState([]);
    const [length, setLength] = useState(6);
    const [sorting, setSorting] = useState(false);
    const [sortedArray, setSortedArray] = useState([]);
    const [speed, setSpeed] = useState(500);
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const [pivotP, setPivotP] = useState(undefined)
  
  
    const setTim = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, speed);
      });
    };
  
  
    const myQuickSort = async (arr, start, finish) => {
      if (finish - start <= 1) return arr;
  
      const pivot = arr[start];
      var pivot_pos = start;
      setPivotP(pivot)
      forceUpdate();
      await setTim()
  
      for (let i = start + 1; i < finish; i++) {
        const crt = arr[i];
  
        if (crt < pivot) {
          arr[pivot_pos] = crt;
          arr[i] = pivot;
          pivot_pos = i;
          forceUpdate();
          await setTim()
  
          let j = i - 1;
          while (arr[j] > pivot) {
            const tmp = arr[j];
            arr[j] = pivot;
            arr[pivot_pos] = tmp;
            pivot_pos = j;
            j--;
            forceUpdate();
            await setTim()
          }
        }
      }
  
      await myQuickSort(arr, start, pivot_pos);
      await myQuickSort(arr, pivot_pos + 1, finish);
    };
  
    const sort = async () => {
      setSorting(true)
      await myQuickSort(arrayToSort, 0, arrayToSort.length)
      setSorting(false)
      setPivotP(undefined)
    };
  
    const generateNewArray = () => {
      const arr = generateArray(length);
      const sorted = [...arr].sort((a, b) => a - b);
      setArrayToSort(arr);
      setSortedArray(sorted)
    };
  
    useEffect(() => {
      generateNewArray();
    }, [length]);
  
    const returnBarForNum = (num, idx) => {
      // check if the item is in its natural place place
      const isThisOneDone = sortedArray.indexOf(num) === arrayToSort.indexOf(num);
      const width =
        length === 10 || length === 6
          ? 20
          : length === 50
          ? 15
          : length === 75
          ? 5
          : 4;
  
      const height =
        length === 10 || length === 6
          ? num * 25
          : length === 50
          ? num * 5
          : length === 75
          ? num * 3
          : num * 2;
  
  
      const isPivot = num === pivotP
  
      return (
        <div
          style={{ height: `${height}px`, width: `${width}px` }}
          key={idx}
          className={`bar ${isPivot ? "pivot" : ""}  ${isThisOneDone ? "thisOneInPlace" : ""}  `}
        >
          {(length === 10 || length === 6) && `${num}`}
        </div>
      );
    };
  
    const handleLength = (e) => {
      const newLength = parseInt(e.target.value);
      setLength(newLength);
      if (newLength === 4) setSpeed(500);
      else if (newLength === 10) setSpeed(250);
      else if (newLength === 50) setSpeed(125);
      else if (newLength === 75) setSpeed(30);
      else setSpeed(8);
    };
    

    return {sorting, generateNewArray, sort, handleLength, arrayToSort, returnBarForNum};

}

export default Logic