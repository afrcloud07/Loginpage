import React from "react";

// NOTE:
// Client-side code can always be modified by someone with access to files.
// This watermark is embedded inside the built JS bundle and uses a small obfuscation to reduce casual editing.
const WM = String.fromCharCode(65, 70, 82, 67, 108, 111, 117, 100, 45, 78, 69, 84); // "AFRCloud-NET"

export default function Watermark() {
  return (
    <>
      <style>{`
        .__wm_fixed {
          position: fixed;
          right: 12px;
          bottom: 12px;
          z-index: 999999;
          font: 700 13px/1.1 sans-serif;
          letter-spacing: .35px;
          color: rgba(255,255,255,.6);
          text-shadow: 0 1px 3px rgba(0,0,0,.75);
          user-select: none;
          pointer-events: none;
          opacity: .62;
          transform: translateZ(0);
          white-space: nowrap;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(0,0,0,.18);
          border: 1px solid rgba(255,255,255,.10);
          backdrop-filter: blur(6px);
        }
        @media (max-width: 420px) {
          .__wm_fixed { right: 10px; bottom: 10px; font-size: 12px; padding: 6px 10px; }
        }
        @media print {
          .__wm_fixed { display: none !important; }
        }
      `}</style>
      <div className="__wm_fixed" aria-hidden="true">{WM}</div>
    </>
  );
}
