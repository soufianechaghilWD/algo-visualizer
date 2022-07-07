import React, { useCallback, useEffect, useState } from "react";
import "./style.css";

function Index() {


  const [arrayToSort, setArrayToSort] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [speed, setSpeed] = useState(1000)
  const [length, setLength] = useState(4)
  const [sortedArray, setSortedArray] = useState([])
  const [sorting, setSorting] = useState(false)

  const generateArray = (num) => {

    const res = []

    while(res.length < num){
        const randomNumber =  Math.floor(Math.random() * 2 * num)
        if( randomNumber !== 0 && res.find(x => x === randomNumber) === undefined ) res.push(randomNumber)
    }
    return res
  }

    const setTim = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, speed);
        })
    }

    const sortFun = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        let j = i;
  
        while (arr[j] > arr[j + 1]) {
          const tmp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = tmp;
          j = j - 1;
  
        }
      }
    }


  const insertion_sort = async (arr) => {
    setSorting(true)
    for (let i = 0; i < arr.length - 1; i++) {
      let j = i;

      while (arr[j] > arr[j + 1]) {
        const tmp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = tmp;
        j = j - 1;

        setArrayToSort(arr)
        forceUpdate()

        await setTim()

      }
    }
    
    setSorting(false)

  };

  const sort = () => {
    insertion_sort(arrayToSort)
  };


  const returnBarForNum = (num, idx) => {

    // check if the item is in its natural place place
    const isThisOneDone = sortedArray.indexOf(num) === arrayToSort.indexOf(num)
    const width = (length === 10 || length === 4) ? 20 : length === 50 ? 15 : length === 100 ? 5 : 4

    const height = (length === 10 || length === 4) ? num * 25 : length === 50 ? num * 5 : length === 100 ? num * 3 : num * 2


    return (
      <div style={{ height: `${height}px`, width: `${width}px` }} key={idx} className={`bar  ${isThisOneDone ? "thisOneInPlace" : ""} `}>{(length === 10 || length === 4) && `${num}`}</div>
    );
  };


  const generateNewArray = () => {
    const newOne = generateArray(length)
    setArrayToSort(newOne)
    var sorted = [...newOne]
    sortFun(sorted)
    setSortedArray(sorted)
  }


  useEffect(() => {
    generateNewArray()
  }, [length])

  const handleLength =  (e) => {
    const newLength = parseInt(e.target.value) 
    setLength(newLength)
    if(newLength === 4) setSpeed(1000)
    else if(newLength === 10) setSpeed(500)
    else if (newLength === 50) setSpeed(100)
    else if (newLength === 100) setSpeed(20)
    else setSpeed(5)
  }
  

  return (
    <div className="insertion">
      <h1>Insertion sort</h1>
      <div className="options">
        <button disabled={sorting === true} onClick={generateNewArray}>Generate new array</button>
        <button onClick={sort} disabled={sorting === true}>Sort array</button>
        <button disabled={sorting === true}>See Logs</button>
        <select disabled={sorting === true} onChange={handleLength} >
          <option value={4}>Array's length</option>
          <option value={10} >10 elements</option>
          <option value={50} >50 elements</option>
          <option value={100} >100 elements</option>
          <option value={150} >150 elements</option>
        </select>
      </div>
      <div className="bars">
        {
          arrayToSort?.length > 0 && arrayToSort.map((ele, idx) => returnBarForNum(ele, idx))
        }
      </div>
    </div>
  );
}

export default Index;
