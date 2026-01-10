import React, { useEffect } from "react";
import { isFilled } from "../lib/mikrotik";
import { useMT } from "../hooks/useMT";
import { getTG, sendTelegram } from "../lib/telegram";

export default function OnlineRedirect() {
  const mt = useMT();

  useEffect(() => {
    const username = mt.username;

    // Validasi agar tidak kirim notif kalau belum valid / placeholder
    if (!isFilled(username) || String(username).includes("$(") || username === "UnknownUser" || String(username).includes("$")) {
      return;
    }

    const tg = getTG();
    if (tg) {
      sendTelegram(tg, {
        username,
        ip: mt.ip,
        mac: mt.mac,
        sessionTimeLeft: isFilled(mt.sessionTimeLeft) ? mt.sessionTimeLeft : "Unlimited",
        remainBytes: isFilled(mt.remainBytesTotalNice) ? mt.remainBytesTotalNice : "Unlimited",
      });
    }

    const t = setTimeout(() => {
      let url = "";
      try {
        url = decodeURIComponent(String(mt.linkRedirectEsc || ""));
      } catch {
        url = String(mt.linkRedirectEsc || "");
      }
      if (!url || !url.includes("http")) url = String(mt.linkRedirect || "");
      if (!url || !url.includes("http")) url = "http://afrcloud.net/status";
      window.location.href = url;
    }, 4000);

    return () => clearTimeout(t);
  }, [mt]);

  return (
    <>
      <div className="status">Menyiapkan koneksi...</div>
      <div className="bar">
        <div className="fill"></div>
      </div>
    </>
  );
}
