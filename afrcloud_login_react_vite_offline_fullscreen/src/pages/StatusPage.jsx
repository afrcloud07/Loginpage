import React, { useMemo } from 'react'
import ShowcasePanel from '../components/ShowcasePanel.jsx'
import { getMT } from '../utils/mikrotik.js'

function Row({ k, v }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        padding: '10px 0',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div style={{ color: 'var(--text-muted)', fontWeight: 700 }}>{k}</div>
      <div style={{ color: '#fff', fontWeight: 700, textAlign: 'right' }}>{v || '-'}</div>
    </div>
  )
}

export default function StatusPage() {
  const mt = useMemo(() => getMT(), [])

  return (
    <div className="split-container">
      <ShowcasePanel defaultTab="ads" />

      <div className="login-area expanded">
        <h2 className="login-title">STATUS HOTSPOT</h2>
        <p className="login-subtitle" style={{ display: 'block' }}>
          Informasi koneksi Anda saat ini.
        </p>

        <div className="card" style={{ padding: 18, borderRadius: 12, marginBottom: 18 }}>
          <Row k="Username" v={mt.username} />
          <Row k="IP" v={mt.ip} />
          <Row k="MAC" v={mt.mac} />
          <Row k="Uptime" v={mt.uptime} />
          <Row k="Sisa Waktu" v={mt.sessionTimeLeft} />
          <Row k="Download" v={mt.bytesIn} />
          <Row k="Upload" v={mt.bytesOut} />
          <Row k="Sisa Kuota DL" v={mt.remainBytesIn} />
          <Row k="Sisa Kuota UL" v={mt.remainBytesOut} />
        </div>

        {mt.linkLogout ? (
          <a href={mt.linkLogout} className="btn btn-danger" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            LOGOUT
          </a>
        ) : (
          <button className="btn btn-danger" type="button" disabled>
            LOGOUT
          </button>
        )}

        {mt.linkLoginOnly && mt.linkLoginOnly !== '#' && (
          <a
            href={mt.linkLoginOnly}
            className="btn btn-cancel"
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 12 }}
          >
            KEMBALI
          </a>
        )}
      </div>
    </div>
  )
}
