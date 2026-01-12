import React from 'react'

export default function LoadingSpinner({ label = 'Memuat...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
      <div className="spinner" aria-hidden="true" />
      <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{label}</div>
    </div>
  )
}
