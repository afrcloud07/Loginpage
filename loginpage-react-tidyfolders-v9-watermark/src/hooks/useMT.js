import { useEffect, useState } from "react";
import { getMT } from "../lib/mikrotik";

// Make MikroTik variable reading robust (some captive browsers can run scripts before body fully parsed)
export function useMT() {
  const [mt, setMt] = useState(() => {
    try {
      return getMT();
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const readNow = () => {
      try {
        setMt(getMT());
      } catch {
        setMt({});
      }
    };

    // Always re-read after mount + small retry
    if (typeof document !== "undefined" && document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", readNow, { once: true });
    } else {
      readNow();
    }

    const t = setTimeout(readNow, 80);
    return () => clearTimeout(t);
  }, []);

  return mt;
}
