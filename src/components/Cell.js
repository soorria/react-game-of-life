import React from "react";

export default function Cell({ handleUpdate, alive }) {
  return (
    <div
      style={{ backgroundColor: alive ? "var(--aliveCol)" : "var(--deadCol)" }}
      className="cell"
      onClick={handleUpdate}
    />
  );
}
