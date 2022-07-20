import React from "react";
import Logic from "./Logic";
import './style.css'

function Index() {

    const {sorting, generateNewArray, sort, handleLength, arrayToSort, returnBarForNum} = Logic()

  return (
    <div className="bubble">
      <h1>Quick Sort</h1>
      <div className="options">
        <button disabled={sorting === true} onClick={generateNewArray}>
          Generate new array
        </button>
        <button onClick={sort} disabled={sorting === true}>
          Sort array
        </button>

        <select disabled={sorting === true} onChange={handleLength}>
          <option value={6}>Array's length</option>
          <option value={10}>10 elements</option>
          <option value={50}>50 elements</option>
          <option value={75}>75 elements</option>
          <option value={100}>100 elements</option>
        </select>
      </div>
      <div className="bars">
        {arrayToSort?.length > 0 &&
          arrayToSort.map((ele, idx) => returnBarForNum(ele, idx))}
      </div>
    </div>
  );
}

export default Index;
