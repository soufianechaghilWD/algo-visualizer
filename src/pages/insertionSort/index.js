import React, { useEffect } from "react";
import Logic from "./Logic";

function Index() {

  const {sorting, generateNewArray, sort, setShlowLogs, handleLength, arrayToSort, returnBarForNum, showLogs, logs} = Logic()



  return (
    <div className="insertion">
      <h1>Insertion sort</h1>
      <div className="options">
        <button disabled={sorting === true} onClick={generateNewArray}>
          Generate new array
        </button>
        <button onClick={sort} disabled={sorting === true}>
          Sort array
        </button>
        <button disabled={sorting === true} onClick={() => setShlowLogs(true)}>
          See Logs
        </button>
        <select disabled={sorting === true} onChange={handleLength}>
          <option value={6}>Array's length</option>
          <option value={10}>10 elements</option>
          <option value={50}>50 elements</option>
          <option value={100}>100 elements</option>
          <option value={150}>150 elements</option>
        </select>
      </div>
      <div className="bars">
        {arrayToSort?.length > 0 &&
          arrayToSort.map((ele, idx) => returnBarForNum(ele, idx))}
      </div>
      {showLogs && (
        <div className="logs">
          <div className="logs_body">
            <div className="logs__header">
              <h1>LOGS</h1>
              <button onClick={() => setShlowLogs(false)}>Go back</button>
            </div>
            <div className="logs__content">
              {logs?.map((ele, idx) => {
                return (
                  <div key={idx}>
                    {ele?.title ? (
                      <h2>
                        {ele.body} {ele.array}
                      </h2>
                    ) : (
                      <>
                        <p>{ele.body} {ele?.array && <b>{ele.array}</b>}</p>
                        
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
