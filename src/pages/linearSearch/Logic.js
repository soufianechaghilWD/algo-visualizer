import React, { useCallback, useEffect, useState } from 'react'
import generateArray, { getIndex } from '../../helpers/generateArray';

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
  const [searching, setSearching] = useState(false);
  const [length, setLength] = useState(20);
  const [speed, setSpeed] = useState(500)
  const [index, setIndex] = useState(null)
  const [whereAmI, setWhereAmI] = useState(null)
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const generateNewArray = () => {
    setWhereAmI(null)
    const arr = generateArray(length);
    setArray(arr);
    const randomIdx = getIndex(length);
    setToFind(arr[randomIdx]);
    setIndex(randomIdx)
  };

  const returnBarForNum = (num, idx) => {
    // check if the item is in its natural place place
    const isThatWhatWeWant = num === toFind;
    const areWeHere = idx === whereAmI

    const width =
      length === 20 ? 20 : length === 75 ? 7 : length === 150 ? 4 : 3;

    const height =
      length === 20
        ? num * 17
        : length === 75
        ? num * 3
        : length === 150
        ? num * 2
        : num ;

    return (
      <div
        style={{ height: `${height}px`, width: `${width}px` }}
        key={idx}
        className={`bar  ${areWeHere ? "areWeHere" :  isThatWhatWeWant ? "isThatWhatWeWant" : ""} `}
        onClick={() => setSearchedFor(num, idx)}
      >
        {(isThatWhatWeWant && length === 20) && num}
      </div>
    );
  };

  const setSearchedFor = (num, idx) => {
    if(!searching){
        setToFind(num)
        setIndex(idx)
    }
  }


  const search = async () => {
    setSearching(true)
    for(let i = 0; i < array.length; i++){
        setWhereAmI(i)
        forceUpdate()
        if(array[i] === toFind) break
        await setTim()
        // if(array[i] === toFind)
    }
    setSearching(false)
  }

  const handleLength = (e) => {
    const newLength = parseInt(e.target.value);
    setLength(newLength);
    // set the speed
    if (newLength === 20) setSpeed(500);
    else if (newLength === 75) setSpeed(300);
    else if (newLength === 150) setSpeed(100);
    else setSpeed(20);
}

  useEffect(() => {
    generateNewArray();
  }, [length]);

  return {searching, generateNewArray, toFind, index, search, handleLength, array, returnBarForNum}

}

export default Logic