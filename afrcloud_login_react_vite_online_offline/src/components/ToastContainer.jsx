import React from 'react'

export default function ToastContainer({ toasts }) {
  return (
    <div id="toast-container" className="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast-item"
          style={t.closing ? { animation: 'slideOut 0.3s ease-out forwards' } : undefined}
        >
          <div className="toast-icon">⚠️</div>
          <div className="toast-content">
            <div className="toast-title">Login Gagal</div>
            <div className="toast-msg">{t.msg}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
