import React from 'react';
import Cell from "./Cell"

export default function Grid({ handleCellClick, grid }) {
  return (<div className="grid">
    {grid.map(
      (row, i) => (
        <div key={i} className="row">
          {row.map(
            (isAlive, j) => <Cell key={`${i}-${j}`} handleClick={() => handleCellClick(i, j)} alive={isAlive} />
          )}
        </div>
      )
    )}
  </div>);
}
