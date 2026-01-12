import React, { useEffect, useMemo, useState } from 'react'
import { getMT } from '../utils/mikrotik.js'

export default function PageShell({ title, subtitle, children }) {
  const mt = useMemo(() => getMT(), [])

  // Clock (same style as login)
  const [timeText, setTimeText] = useState('00:00')
  const [dateText, setDateText] = useState('Date')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTimeText(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit'
        })
      )
      setDateText(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'short'
        })
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="split-container">
      <div className="showcase-area fullpage">
        <div className="mini-clock">
          <div className="mc-time" id="jam">{timeText}</div>
          <div className="mc-date" id="tanggal">{dateText}</div>
        </div>

        <div className="showcase-inner">
          <div className="brand-wrapper">
            <h1 className="brand-logo">{mt.identity}</h1>
            <div className="brand-tagline">Unlimited WiFi</div>
          </div>

          <div className="card page-card">
            <h2 className="login-title">{title}</h2>
            {subtitle ? (
              <p className="login-subtitle" style={{ display: 'block', marginBottom: 18 }}>
                {subtitle}
              </p>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
