import React from "react";

function Index() {
  return (
    <div className="home">
      <nav>
        <h1 className="logo">algo-visualizer</h1>
        <ul className="items">
          <li>
            <a href="/insertion_sort">Insertion sort</a>
          </li>

          <li>
            <a href="/selection_sort">Selection Sort</a>
          </li>

          <li>
            <a href="/merge_sort">Merge Sort</a>
          </li>

          <li>
            <a href="/bubble_sort">Quick Sort</a>
          </li>

          <li>
            <a href="/linear_search">Linear Search</a>
          </li>

          <li>
            <a href="/binary_search">Binary Search</a>
          </li>
        </ul>
      </nav>
      <div className="hero">
        <div className="container">
          <h2 style={{marginBottom: "1rem"}}>An application to see how sample algorithms work</h2>
          <h3>
            Please feel free to play around the algorithms and if you have a
            suggestion please let me know
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Index;
