import React from 'react';

export default function Cell({ handleClick, alive }) {
  return (
    <div
      style={{backgroundColor: alive ? 'var(--aliveCol)' : 'var(--deadCol)'}}
      className="cell"
      onClick={handleClick}
    ></div>
  );
}
