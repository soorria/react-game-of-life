import React, { useEffect, useState, useRef } from "react";
import produce from "immer";
import Grid from "./components/Grid";

const minPadding = 50;

function make2DArray(rows, cols, fill = null) {
  const arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols)
      .fill(fill)
      .map(() => (fill === null ? Math.random() < 0.5 : fill));
  }
  return arr;
}

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

function runGameOfLife(arr) {
  return produce(arr, (copy) => {
    const numRows = copy.length;
    const numCols = copy[0].length;
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        let neighbours = 0;
        operations.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;
          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
            neighbours += arr[newI][newJ];
          }
        });

        if (neighbours < 2 || neighbours > 3) {
          copy[i][j] = false;
        } else if (!arr[i][j] && neighbours === 3) {
          copy[i][j] = true;
        }
      }
    }
  });
}

function App() {
  const [size] = useState([30, 50]);
  const [cellSize, setCellSize] = useState(20);
  const [grid, setGrid] = useState(make2DArray(...size, false));
  const [running, setRunning] = useState(false);
  const headerRef = useRef(null);

  const handleCellClick = (row, col) => (e) => {
    setGrid((prev) =>
      produce(prev, (copy) => {
        copy[row][col] = !copy[row][col];
      })
    );
  };

  const resetGrid = () => {
    setRunning(false);
    setGrid(make2DArray(...size, false));
  };

  const randomGrid = () => {
    setGrid(make2DArray(...size));
  };

  const toggleRunning = () => {
    setRunning((prev) => !prev);
  };

  useEffect(() => {
    if (running) {
      const id = setInterval(() => {
        console.log("update");
        setGrid((prev) => runGameOfLife(prev));
      }, 100);
      return () => clearInterval(id);
    }
  }, [running]);

  useEffect(() => {
    setGrid((prev) => {
      const newGrid = make2DArray(...size, false);
      const rowLimit = Math.min(prev.length, size[0]);
      for (let row = 0; row < rowLimit; row++) {
        const colLimit = Math.min(prev[row].length, size[1]);
        for (let cell = 0; cell < colLimit; cell++) {
          newGrid[row][cell] = prev[row][cell];
        }
      }
      return newGrid;
    });

    const xSpace = window.innerWidth - minPadding * 2;
    const ySpace =
      window.innerHeight - headerRef.current.clientHeight - minPadding * 2;

    const cellSize = Math.floor(Math.min(xSpace / size[1], ySpace / size[0]));

    setCellSize(cellSize);
  }, [size, setGrid]);

  return (
    <main style={{ "--size": cellSize + "px" }}>
      <header ref={headerRef} className="header">
        <h1>Conway's Game of Life</h1>
        <div className="row">
          <button className="start" onClick={toggleRunning}>
            {running ? "stop" : "start"}
          </button>
          <button className="reset" onClick={resetGrid}>
            reset
          </button>
          <button className="random" onClick={randomGrid}>
            random
          </button>
        </div>
      </header>
      <Grid handleCellUpdate={handleCellClick} grid={grid} />
    </main>
  );
}

export default App;
