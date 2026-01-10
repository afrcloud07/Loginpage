import React, { useEffect, useMemo, useState } from "react";
import AnalogClockCanvas from "../components/AnalogClockCanvas";
import { isFilled, safe } from "../lib/mikrotik";
import { useMT } from "../hooks/useMT";

export default function OnlineStatus() {
  const mt = useMT();

const placeholderDetected =
  String(mt.identity || "").includes("$(") ||
  String(mt.ip || "").includes("$(") ||
  String(mt.mac || "").includes("$(");


  const refreshSecs = useMemo(() => {
    const v = mt.refreshTimeoutSecs;
    if (!isFilled(v)) return 60;
    const n = parseInt(String(v), 10);
    return Number.isFinite(n) && n > 0 ? n : 60;
  }, [mt.refreshTimeoutSecs]);

  const [countdown, setCountdown] = useState(refreshSecs);

  useEffect(() => {
    setCountdown(refreshSecs);
    const t = setInterval(() => setCountdown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [refreshSecs]);

  useEffect(() => {
    // Auto refresh seperti meta refresh (fallback via JS)
    if (!refreshSecs) return;
    const t = setTimeout(() => window.location.reload(), refreshSecs * 1000);
    return () => clearTimeout(t);
  }, [refreshSecs]);

  const welcome = (() => {
    const by = String(mt.loginBy || "").toLowerCase();
    if (by === "trial") return <>Halo, <b>Trial User</b>!</>;
    if (isFilled(mt.username) && by !== "mac") return <>Halo, <b>{safe(mt.username)}</b>!</>;
    return null;
  })();

  const showRemainBytes = isFilled(mt.remainBytesTotal) && safe(mt.remainBytesTotal) !== "0";

  const showLogout = String(mt.loginByMac || "").toLowerCase() !== "yes";

  const onLogoutSubmit = (e) => {
    // Popup logout jika status dibuka sebagai window hotspot_status
    if (window.name === "hotspot_status" && isFilled(mt.linkLogout)) {
      e.preventDefault();
      window.open(
        mt.linkLogout,
        "hotspot_logout",
        "toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1,width=280,height=400"
      );
      window.close();
    }
  };

  return (
    <div className="main-wrapper">
      <div className="greeting-section">
        <div className="status-badge">✅ CONNECTED</div>

        <div className="clock-container">
          <AnalogClockCanvas />
        </div>

        <div className="wifi-name" style={{ fontSize: "1.8rem", lineHeight: 1.15, wordBreak: "break-word" }}>{safe(mt.identity)}</div>

        <div className="welcome-text">{welcome}</div>
{placeholderDetected && (
  <div style={{
    background: "rgba(239,68,68,.12)",
    border: "1px solid rgba(239,68,68,.25)",
    color: "#fecaca",
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 12,
    margin: "10px auto 15px auto",
    maxWidth: 520
  }}>
    Variabel MikroTik belum terbaca (masih <b>$(...)</b>). Pastikan file <b>dist/online</b> di-upload ke <b>html-directory</b> hotspot dan folder <b>chunks/</b> ikut ter-upload.
  </div>
)}


        <div className="traffic-stats">
          <div className="stat-box">
            <div className="stat-label">
              <i className="fa-solid fa-download stat-icon"></i> Download
            </div>
            <div className="stat-value">{safe(mt.bytesOutNice)}</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">
              <i className="fa-solid fa-upload stat-icon"></i> Upload
            </div>
            <div className="stat-value">{safe(mt.bytesInNice)}</div>
          </div>
        </div>

        <table className="status-table">
          <tbody>
            <tr>
              <td>IP Address <i className="fa-solid fa-network-wired fa-fw"></i></td>
              <td className="val">{safe(mt.ip)}</td>
            </tr>
            <tr>
              <td>MAC Address <i className="fa-solid fa-fingerprint fa-fw"></i></td>
              <td className="val">{safe(mt.mac)}</td>
            </tr>
            <tr>
              <td>Terhubung <i className="fa-solid fa-clock fa-fw"></i></td>
              <td className="val">{safe(mt.uptime)}</td>
            </tr>

            {showRemainBytes && (
              <tr>
                <td>Sisa Kuota <i className="fa-solid fa-chart-pie fa-fw"></i></td>
                <td className="val">{safe(mt.remainBytesTotalNice)}</td>
              </tr>
            )}

            <tr>
              <td>Sisa Waktu <i className="fa-solid fa-hourglass-half fa-fw"></i></td>
              <td className="val">{isFilled(mt.sessionTimeLeft) ? safe(mt.sessionTimeLeft) : "Unlimited"}</td>
            </tr>

            {String(mt.blocked || "").toLowerCase() === "yes" && (
              <tr>
                <td>Status</td>
                <td className="val">
                  <a href={isFilled(mt.linkAdvert) ? mt.linkAdvert : "#"} style={{ color: "#ef4444" }}>
                    Iklan Wajib
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="refresh-info">
          Refresh otomatis: <span id="countdown">{countdown}</span> detik
        </div>
      </div>

      {showLogout && (
        <div className="input-hero">
          <form action={isFilled(mt.linkLogout) ? mt.linkLogout : "#"} name="logout" method="post" onSubmit={onLogoutSubmit}>
            <input type="hidden" name="erase-cookie" value="on" />
            <p style={{ fontSize: 10, textAlign: "center", margin: "5px auto", color: "var(--text-dim)" }}>
              Tombol LOG OFF akan memutuskan koneksi internet
            </p>
            <button type="submit" className="action-btn" style={{ background: "#ef4444", color: "white" }}>
              <i className="fa-solid fa-power-off"></i> LOG OUT
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
