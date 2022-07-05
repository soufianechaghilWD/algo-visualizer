import React, { useCallback, useEffect, useState } from "react";
import "./style.css";

function Index() {


  const [arrayToSort, setArrayToSort] = useState([9, 8, 7, 6, 5, 4, 3, 2, 1]);
  const [where, setWhere] = useState(-1)
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

    const setTim = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 200);
        })
    }


  const insertion_sort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let j = i;

      while (arr[j] > arr[j + 1]) {
        const tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
        j = j - 1;

        setArrayToSort(arr)
        setWhere(j+1)
        forceUpdate()

        await setTim()

      }
    }
    

  };

  const sort = () => {
    insertion_sort(arrayToSort)
  };


  const returnBarForNum = (num, idx) => {

    const sorted = [...arrayToSort].sort()
    const allDone = JSON.stringify(sorted) === JSON.stringify(arrayToSort)
    return (
      <div style={{ height: `${num * 25}px` }} key={idx} className={`bar ${(idx === where || idx === where - 1 || allDone === true) ? "thisOne" : ""}`}></div>
    );
  };


  return (
    <div className="insertion">
      Insertion sort
      <br />
      <button onClick={sort}>Sort array</button>
      <div className="bars">
        {arrayToSort.map((ele, idx) => returnBarForNum(ele, idx))}
      </div>
    </div>
  );
}

export default Index;
