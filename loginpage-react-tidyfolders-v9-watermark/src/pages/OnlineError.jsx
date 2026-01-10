import React from "react";
import { safe } from "../lib/mikrotik";
import { useMT } from "../hooks/useMT";

export default function OnlineError() {
  const mt = useMT();
  return (
    <div>
      <h1>!</h1>
      <p>"{safe(mt.error)}"</p>
      <button onClick={() => history.back()}>KEMBALI</button>
    </div>
  );
}
