import React, { useMemo } from 'react'
import ShowcasePanel from '../components/ShowcasePanel.jsx'
import { getMT } from '../utils/mikrotik.js'

export default function ErrorPage() {
  const mt = useMemo(() => getMT(), [])

  const title = mt.error ? `ERROR: ${mt.error}` : 'TERJADI KESALAHAN'
  const detail = mt.errorOrig || ''

  return (
    <div className="split-container">
      <ShowcasePanel defaultTab="ads" />

      <div className="login-area expanded">
        <h2 className="login-title">{title}</h2>
        <p className="login-subtitle" style={{ display: 'block' }}>
          Silakan coba lagi atau hubungi admin.
        </p>

        <div className="card" style={{ padding: 18, borderRadius: 12, marginBottom: 18 }}>
          <div style={{ color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8 }}>Detail</div>
          <div style={{ color: '#fff', fontWeight: 700, wordBreak: 'break-word' }}>
            {detail || '-'}
          </div>
        </div>

        {mt.linkLoginOnly && mt.linkLoginOnly !== '#' ? (
          <a
            href={mt.linkLoginOnly}
            className="btn btn-cyber"
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
          >
            KEMBALI KE LOGIN
          </a>
        ) : (
          <button className="btn btn-cyber" type="button" disabled>
            KEMBALI KE LOGIN
          </button>
        )}

        {mt.linkStatus && (
          <a
            href={mt.linkStatus}
            className="btn btn-cancel"
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 12 }}
          >
            LIHAT STATUS
          </a>
        )}
      </div>
    </div>
  )
}