import React, { useMemo } from 'react'
import ShowcasePanel from '../components/ShowcasePanel.jsx'
import { getMT } from '../utils/mikrotik.js'

export default function LogoutPage() {
  const mt = useMemo(() => getMT(), [])

  return (
    <div className="split-container">
      <ShowcasePanel defaultTab="ads" />

      <div className="login-area expanded">
        <h2 className="login-title">LOGOUT BERHASIL</h2>
        <p className="login-subtitle" style={{ display: 'block' }}>
          Anda telah logout. Terima kasih.
        </p>

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