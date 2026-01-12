import React, { useEffect, useMemo, useState } from 'react'
import ShowcasePanel from '../components/ShowcasePanel.jsx'
import { getMT } from '../utils/mikrotik.js'

export default function RedirectPage() {
  const mt = useMemo(() => getMT(), [])
  const [target, setTarget] = useState('')

  useEffect(() => {
    const t = mt.linkOrig || mt.linkRedirect || mt.linkStatus || mt.linkLoginOnly || '/'
    setTarget(t)
    const id = window.setTimeout(() => {
      window.location.href = t
    }, 800)
    return () => window.clearTimeout(id)
  }, [mt])

  return (
    <div className="split-container">
      <ShowcasePanel defaultTab="ads" />

      <div className="login-area expanded">
        <h2 className="login-title">MOHON TUNGGU...</h2>
        <p className="login-subtitle" style={{ display: 'block' }}>
          Mengalihkan ke halaman tujuan...
        </p>

        <div className="card" style={{ padding: 18, borderRadius: 12, marginBottom: 18 }}>
          <div style={{ color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8 }}>Tujuan</div>
          <div style={{ color: '#fff', fontWeight: 700, wordBreak: 'break-word' }}>
            {target || '-'}
          </div>
        </div>

        {target ? (
          <a
            href={target}
            className="btn btn-cyber"
            style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
          >
            LANJUTKAN
          </a>
        ) : (
          <button className="btn btn-cyber" type="button" disabled>
            LANJUTKAN
          </button>
        )}
      </div>
    </div>
  )
}
