import React, { useEffect, useMemo, useRef, useState } from 'react'
import AdsSlider from '../components/AdsSlider.jsx'
import PricingGrid from '../components/PricingGrid.jsx'
import ToastContainer from '../components/ToastContainer.jsx'
import { useAdsManifest } from '../hooks/useAdsManifest.js'
import { pricing } from '../data/pricing.js'
import { getMT } from '../utils/mikrotik.js'

export default function LoginPage() {
  const mt = useMemo(() => getMT(), [])
  const didInitRef = useRef(false)

  // Clock
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

  // Toasts
  const [toasts, setToasts] = useState([])
  const showToast = (msg) => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((t) => [...t, { id, msg, closing: false }])

    // Start closing at 5s, then remove
    window.setTimeout(() => {
      setToasts((arr) => arr.map((x) => (x.id === id ? { ...x, closing: true } : x)))
      window.setTimeout(() => {
        setToasts((arr) => arr.filter((x) => x.id !== id))
      }, 320)
    }, 5000)
  }

  useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true
    if (mt.error) showToast(mt.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Showcase tabs (IKLAN / PAKET)
  // Default tab: IKLAN
  const [showcaseTab, setShowcaseTab] = useState('ads')

  // Ads auto-manifest (public/ads/*.jpg|png|jpeg|webp|gif -> /ads/manifest.json)
  const { items: adsItems, status: adsStatus } = useAdsManifest()

  // Login mode (VOUCHER / MEMBER)
  const [mode, setMode] = useState('voucher')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const switchMode = (next) => {
    setMode(next)
    if (next === 'member') setPassword('')
    // voucher will auto-copy password from username in the effect below
  }

  useEffect(() => {
    if (mode === 'voucher') {
      setPassword(username)
    }
  }, [mode, username])

  // Mobile bottom sheet
  const [sheetExpanded, setSheetExpanded] = useState(false)
  const openSheet = () => setSheetExpanded(true)
  const toggleSheet = () => setSheetExpanded((v) => !v)

  // CHAP submit support
  const sendinRef = useRef(null)
  const chapEnabled = Boolean(mt.chapId && mt.chapChallenge)

  const onSubmit = (e) => {
    // Local dev preview (RouterOS will replace these values)
    if (!mt.linkLoginOnly || mt.linkLoginOnly === '#') {
      e.preventDefault()
      showToast('Mode preview: endpoint login belum tersedia (RouterOS akan mengisi otomatis).')
      return
    }

    if (!chapEnabled) return // normal form submit
    e.preventDefault()

    const form = sendinRef.current
    if (!form) return

    const passPlain = mode === 'voucher' ? username : password

    // window.hexMD5 is provided by assets/js/md5.min.js (same as your original template)
    if (typeof window.hexMD5 !== 'function') {
      showToast('MD5 helper tidak ditemukan (md5.min.js)')
      return
    }

    form.username.value = username
    form.password.value = window.hexMD5(`${mt.chapId}${passPlain}${mt.chapChallenge}`)
    form.dst.value = mt.linkOrig
    form.popup.value = 'true'
    form.submit()
  }

  const trialUrl = mt.trial === 'yes' && mt.linkLoginOnly && mt.linkOrigEsc && mt.macEsc
    ? `${mt.linkLoginOnly}?dst=${mt.linkOrigEsc}&username=T-${mt.macEsc}`
    : ''

  return (
    <>
      <ToastContainer toasts={toasts} />

      <div className="split-container">
        {/* Showcase Area (Left/Top) */}
        <div className="showcase-area">
          <div className="mini-clock">
            <div className="mc-time" id="jam">{timeText}</div>
            <div className="mc-date" id="tanggal">{dateText}</div>
          </div>

          <div className="showcase-inner">
            <div className="brand-wrapper">
              <h1 className="brand-logo">{mt.identity}</h1>
              <div className="brand-tagline">Unlimited WiFi</div>
            </div>
            {/* Tabs: IKLAN / PAKET */}
            <div className="showcase-tabbar">
              <div
                className={`showcase-tab ${showcaseTab === 'ads' ? 'active' : ''}`}
                onClick={() => setShowcaseTab('ads')}
                role="button"
                tabIndex={0}
                onKeyDown={(ev) => ev.key === 'Enter' && setShowcaseTab('ads')}
              >
                IKLAN
              </div>
              <div
                className={`showcase-tab ${showcaseTab === 'prices' ? 'active' : ''}`}
                onClick={() => setShowcaseTab('prices')}
                role="button"
                tabIndex={0}
                onKeyDown={(ev) => ev.key === 'Enter' && setShowcaseTab('prices')}
              >
                PAKET
              </div>
            </div>

            <div className={`showcase-tabcontent ${showcaseTab === 'ads' ? 'is-ads' : 'is-prices'}`}>
              {showcaseTab === 'ads' ? (
                <AdsSlider items={adsItems} status={adsStatus} />
              ) : (
                <PricingGrid items={pricing} />
              )}
            </div>

            <div className="showcase-foot">
              * Masa aktif berjalan sejak KODE VOUCHER di gunakan
              <br />
              * Gunakan Dengan Sebijak Mungkin
            </div>
          </div>
        </div>

        {/* Login Area (Right/Bottom) */}
        <div className={`login-area ${sheetExpanded ? 'expanded' : ''}`} id="loginSheet">
          <div className="sheet-handle" id="sheetHandle" onClick={toggleSheet} />

          <div className="login-header-mobile" id="sheetHeader" onClick={toggleSheet}>
            <h2 className="login-title">LOGIN AREA</h2>
            <div className="cta-arrow">Klik Untuk Login ▲</div>
          </div>

          <p className="login-subtitle">Silakan masuk menggunakan kode voucher.</p>

          <div className="mode-switch">
            <div
              className={`switch-item ${mode === 'voucher' ? 'active' : ''}`}
              id="tabVoucher"
              onClick={() => switchMode('voucher')}
              role="button"
              tabIndex={0}
              onKeyDown={(ev) => ev.key === 'Enter' && switchMode('voucher')}
            >
              VOUCHER
            </div>
            <div
              className={`switch-item ${mode === 'member' ? 'active' : ''}`}
              id="tabMember"
              onClick={() => switchMode('member')}
              role="button"
              tabIndex={0}
              onKeyDown={(ev) => ev.key === 'Enter' && switchMode('member')}
            >
              MEMBER
            </div>
          </div>

          {/* Hidden Error Input (kept for compatibility) */}
          <input type="hidden" id="mikrotik-error" value={mt.error || ''} />

          {/* Login Form */}
          <form name="login" action={mt.linkLoginOnly || '#'} method="post" onSubmit={onSubmit}>
            <input type="hidden" name="dst" value={mt.linkOrig || ''} />
            <input type="hidden" name="popup" value="true" />

            <div className="input-group">
              <input
                type="text"
                name="username"
                id="userField"
                className="cyber-input"
                required
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={openSheet}
              />
              <label className="input-label" id="userLabel">
                {mode === 'voucher' ? 'Kode Voucher' : 'Username'}
              </label>
            </div>

            <div
              className="input-group"
              id="passGroup"
              style={{ display: mode === 'member' ? 'block' : 'none' }}
            >
              <input
                type="password"
                name="password"
                id="passField"
                className="cyber-input"
                value={mode === 'voucher' ? username : password}
                onChange={(e) => setPassword(e.target.value)}
                required={mode === 'member'}
              />
              <label className="input-label">Password</label>
            </div>

            <button type="submit" className="btn btn-cyber">
              MASUK SEKARANG
            </button>
          </form>

          {trialUrl && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <a
                href={trialUrl}
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderBottom: '1px dashed var(--text-muted)'
                }}
              >
                Coba Gratis (Trial 5 Menit)
              </a>
            </div>
          )}

          {/* Hidden CHAP sendin form (used only when chapId/chapChallenge exists) */}
          <form
            ref={sendinRef}
            name="sendin"
            action={mt.linkLoginOnly || '#'}
            method="post"
            style={{ display: 'none' }}
          >
            <input type="hidden" name="username" />
            <input type="hidden" name="password" />
            <input type="hidden" name="dst" />
            <input type="hidden" name="popup" />
          </form>
        </div>
      </div>
    </>
  )
}
