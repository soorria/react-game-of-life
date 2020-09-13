import React from "react";
import Cell from "./Cell";

export default function Grid({ handleCellUpdate, grid }) {
  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((isAlive, j) => (
            <Cell
              key={`${i}-${j}`}
              handleUpdate={handleCellUpdate(i, j)}
              alive={isAlive}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
