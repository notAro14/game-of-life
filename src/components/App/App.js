import React, { useState, useCallback, useRef, useEffect } from "react";
import produce from "immer";
import { generate2DArray, processNextGeneration } from "../../utils/index";
import Button from "../Button/Button";
import "./App.css";

function App() {
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState({ row: 20, col: 20 });
  const [isRunning, setRunning] = useState(false);
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;

  useEffect(() => {
    setGrid(generate2DArray(gridSize.row, gridSize.col, true));
  }, [gridSize]);

  const simulate = useCallback(() => {
    if (!runningRef.current) return;
    setGrid((prevGrid) => processNextGeneration(prevGrid));
    setTimeout(simulate, 200);
  }, []);

  const activateCell = useCallback((i, j) => {
    setGrid((previousGrid) => {
      return produce(previousGrid, (draft) => {
        draft[i][j] = draft[i][j] ? 0 : 1;
      });
    });
  }, []);

  return (
    <div className="App">
      <h1 className="title">Conway's Game of life</h1>
      <div className="buttons">
        <Button
          handleClick={() => {
            setRunning(true);
            runningRef.current = true;
            simulate();
          }}
        >
          Run
        </Button>

        <Button
          variant="danger"
          handleClick={() => {
            setRunning(false);
            runningRef.current = false;
          }}
        >
          Stop
        </Button>
        <Button
          handleClick={() => {
            setGrid(generate2DArray(gridSize.row, gridSize.col, false));
          }}
          variant="secondary"
        >
          Randomize
        </Button>
        <Button
          handleClick={() => {
            setGrid(generate2DArray(gridSize.row, gridSize.col, true));
          }}
          variant="warning"
        >
          Clear
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <Button
          handleClick={(e) => {
            e.preventDefault();
            setGridSize({ row: 40, col: 20 });
          }}
          variant="other"
        >
          Mobile
        </Button>
        <Button
          handleClick={(e) => {
            e.preventDefault();
            setGridSize({ row: 20, col: 20 });
          }}
          variant="other"
        >
          20x20
        </Button>
        <Button
          handleClick={(e) => {
            e.preventDefault();
            setGridSize({ row: 25, col: 50 });
          }}
          variant="other"
        >
          50x25
        </Button>
        <Button
          handleClick={(e) => {
            e.preventDefault();
            setGridSize({ row: 35, col: 70 });
          }}
          variant="other"
        >
          70x35
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize.col}, 15px)`,
        }}
      >
        {grid.map((row, i) => {
          return row.map((col, j) => (
            <div
              key={`${i}${j}`}
              onClick={() => {
                activateCell(i, j);
              }}
              className="cell"
              style={{
                backgroundColor: col ? "var(--cell-alive)" : "var(--cell-dead)",
              }}
            />
          ));
        })}
      </div>
    </div>
  );
}

export default App;
