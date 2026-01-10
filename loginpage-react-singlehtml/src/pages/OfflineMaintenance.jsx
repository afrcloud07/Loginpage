import React from "react";
import AnalogClockCanvas from "../components/AnalogClockCanvas";
import { safe } from "../lib/mikrotik";
import { useMT } from "../hooks/useMT";

export default function OfflineMaintenance() {
  const mt = useMT();
  return (
    <div className="main-wrapper">
      <div className="greeting-section">
        <div className="status-badge">⚠️ MAINTENANCE ⚠️</div>

        <div className="clock-container">
          <AnalogClockCanvas />
        </div>

        <div className="wifi-name" style={{ fontSize: "1.8rem", lineHeight: 1.15, wordBreak: "break-word" }}>{safe(mt.identity)}</div>

        <div className="maintenance-desc">
          Mohon maaf, koneksi internet sedang dalam perbaikan. Sistem akan otomatis kembali normal saat internet pulih.
        </div>

        <button className="action-btn" onClick={() => location.reload()} style={{ width: "100%" }}>
          <i className="fa-solid fa-rotate-right"></i> CEK STATUS
        </button>
      </div>

      <div className="footer-nav">
        <span>IP: {safe(mt.ip)}</span>
        <span>MAC: {safe(mt.mac)}</span>
      </div>
    </div>
  );
}
