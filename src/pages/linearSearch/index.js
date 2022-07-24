import React from "react";
import Nav from "../../helpers/Nav";
import Logic from "./Logic";

function Index() {
  const {
    searching,
    generateNewArray,
    toFind,
    index,
    search,
    handleLength,
    array,
    returnBarForNum,
  } = Logic();

  return (
    <div className="linear">
      <Nav algo={'Linear Search'}/>
      <div className="options">
        <button disabled={searching === true} onClick={generateNewArray}>
          Generate new array
        </button>
        <div>
          <h2>Element to find: {toFind !== null && toFind}</h2>
          <h4>Index of the element is: {index !== null && index}</h4>
          <small>
            Change the number you want to search for by clicking on a bar
          </small>
        </div>
        <button onClick={search} disabled={searching === true}>
          Find element
        </button>

        <select disabled={searching === true} onChange={handleLength}>
          <option value={20}>Array's length</option>
          <option value={75}>75 elements</option>
          <option value={150}>150 elements</option>
          <option value={300}>300 elements</option>
        </select>
      </div>
      <div className="bars">
        {array?.length > 0 &&
          array?.map((ele, idx) => returnBarForNum(ele, idx))}
      </div>
    </div>
  );
}
export default Index;
