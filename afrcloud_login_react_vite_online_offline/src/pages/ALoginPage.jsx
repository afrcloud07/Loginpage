import React, { useMemo } from 'react'
import ShowcasePanel from '../components/ShowcasePanel.jsx'
import { getMT } from '../utils/mikrotik.js'

export default function ALoginPage() {
  const mt = useMemo(() => getMT(), [])

  return (
    <div className="split-container">
      <ShowcasePanel defaultTab="ads" />

      <div className="login-area expanded">
        <h2 className="login-title">SUDAH LOGIN</h2>
        <p className="login-subtitle" style={{ display: 'block' }}>
          {mt.username ? (
            <>Anda sudah login sebagai <b>{mt.username}</b>.</>
          ) : (
            <>Anda sudah login.</>
          )}
        </p>

        {mt.linkStatus ? (
          <a
            href={mt.linkStatus}
            className="btn btn-cyber"
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
          >
            LIHAT STATUS
          </a>
        ) : (
          <button className="btn btn-cyber" type="button" disabled>
            LIHAT STATUS
          </button>
        )}

        {mt.linkLogout ? (
          <a
            href={mt.linkLogout}
            className="btn btn-danger"
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 12 }}
          >
            LOGOUT
          </a>
        ) : (
          <button className="btn btn-danger" type="button" disabled style={{ marginTop: 12 }}>
            LOGOUT
          </button>
        )}
      </div>
    </div>
  )
}
