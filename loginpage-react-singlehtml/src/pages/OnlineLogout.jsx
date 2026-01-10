import React from "react";
import { isFilled } from "../lib/mikrotik";
import { useMT } from "../hooks/useMT";

export default function OnlineLogout() {
  const mt = useMT();

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body {
          background: #000; color: #fff; font-family: sans-serif;
          min-height: 100vh; margin: 0; display: flex; flex-direction: column;
          justify-content: center; align-items: center; text-align: center;
          padding: 24px;
        }
        h2 { font-weight: 300; font-size: 2rem; margin: 0 0 10px; }
        p { color: #666; margin: 0 0 40px; max-width: 520px; line-height: 1.5; }

        .actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          max-width: 520px;
        }
        form { margin: 0; }

        button {
          padding: 15px 40px;
          border-radius: 999px;
          font-weight: bold;
          cursor: pointer;
          border: none;
          transition: 0.2s;
          min-width: 160px;
          height: 52px;
        }

        .yes { background: #fff; color: #000; }
        .yes:hover { background: #ddd; }

        .no {
          background: transparent;
          color: #9a9a9a;
          border: 1px solid #333;
        }
        .no:hover { border-color: #fff; color: #fff; }

        /* Mobile: tombol jadi satu kolom, rata tengah dan lebar sama */
        @media (max-width: 420px) {
          .actions { flex-direction: column; gap: 12px; }
          form { width: 100%; }
          button { width: 100%; min-width: 0; max-width: 320px; margin: 0 auto; }
        }
      `}</style>

      <h2>Putuskan Koneksi?</h2>
      <p>Anda harus login kembali untuk menggunakan internet.</p>

      <div className="actions">
        <form action={isFilled(mt.linkLogout) ? mt.linkLogout : "#"} name="logout" method="post">
          <input type="hidden" name="erase-cookie" value="on" />
          <button type="submit" className="yes">YA</button>
        </form>

        <button onClick={() => (location.href = "status.html")} className="no">BATAL</button>
      </div>
    </>
  );
}
