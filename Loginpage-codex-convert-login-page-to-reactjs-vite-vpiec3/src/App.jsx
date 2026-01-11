import { useEffect, useMemo, useRef, useState } from "react"

const pricePackages = [
  { name: "2 JAM", desc: "Speed 3Mbps", price: "Rp 1.000" },
  { name: "6 JAM", desc: "Speed 3Mbps", price: "Rp 2.000" },
  { name: "12 JAM", desc: "Speed 3Mbps", price: "Rp 3.000" },
  { name: "18 JAM", desc: "Speed 3Mbps", price: "Rp 4.000" },
  { name: "1 HARI", desc: "Hemat Mingguan.", price: "Rp 5.000" },
  { name: "3 HARI", desc: "Maksimal Sebulan.", price: "Rp 10.000" },
]

const adSlides = [
  {
    src: "/assets/img/ad-1.svg",
    alt: "Promo streaming tanpa batas",
  },
  {
    src: "/assets/img/ad-2.svg",
    alt: "WiFi stabil untuk semua aktivitas",
  },
  {
    src: "/assets/img/ad-3.svg",
    alt: "Paket family dan bisnis",
  },
]

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loginMode, setLoginMode] = useState("voucher")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [sheetExpanded, setSheetExpanded] = useState(false)
  const [activeShowcaseTab, setActiveShowcaseTab] = useState("ads")
  const [activeSlide, setActiveSlide] = useState(0)
  const [toasts, setToasts] = useState([])
  const sendinRef = useRef(null)

  const chapId = "$(chap-id)"
  const chapChallenge = "$(chap-challenge)"
  const mikrotikError = "$(error)"
  const isTrial = "$(trial)" === "yes"

  const timeText = useMemo(
    () =>
      currentTime.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [currentTime]
  )

  const dateText = useMemo(
    () =>
      currentTime.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "short",
      }),
    [currentTime]
  )

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (mikrotikError && mikrotikError !== "$(error)") {
      showToast(mikrotikError)
    }
  }, [mikrotikError])

  useEffect(() => {
    if (activeShowcaseTab !== "ads") {
      return undefined
    }

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % adSlides.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [activeShowcaseTab])

  const showToast = (message) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }

  const handleModeChange = (mode) => {
    setLoginMode(mode)
    if (mode === "voucher") {
      setPassword(username)
    } else {
      setPassword("")
    }
  }

  const handleUsernameChange = (event) => {
    const value = event.target.value
    setUsername(value)
    if (loginMode === "voucher") {
      setPassword(value)
    }
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    const hasChap = chapId && chapId !== "$(chap-id)"

    if (!hasChap) {
      return
    }

    if (!window.hexMD5 || !sendinRef.current) {
      return
    }

    event.preventDefault()
    const sendinForm = sendinRef.current
    sendinForm.username.value = username
    sendinForm.password.value = window.hexMD5(`${chapId}${password}${chapChallenge}`)
    sendinForm.submit()
  }

  return (
    <>
      <div id="toast-container" className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-item">
            <div className="toast-icon">⚠️</div>
            <div className="toast-content">
              <div className="toast-title">Login Gagal</div>
              <div className="toast-msg">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="split-container">
        <div className="showcase-area">
          <div className="mini-clock">
            <div className="mc-time" id="jam">
              {timeText}
            </div>
            <div className="mc-date" id="tanggal">
              {dateText}
            </div>
          </div>

          <div className="showcase-inner">
            <div className="brand-wrapper">
              <h1 className="brand-logo">AFRCloud-NET</h1>
              <div className="brand-tagline">Unlimited WiFi</div>
            </div>

            <div className="section-title">
              <span>INFO AREA</span>
              <small style={{ color: "var(--accent)" }}>INFO AREA</small>
            </div>

            <div className="showcase-tabs">
              <button
                type="button"
                className={`showcase-tab ${activeShowcaseTab === "ads" ? "active" : ""}`}
                onClick={() => setActiveShowcaseTab("ads")}
              >
                IKLAN
              </button>
              <button
                type="button"
                className={`showcase-tab ${activeShowcaseTab === "pricing" ? "active" : ""}`}
                onClick={() => setActiveShowcaseTab("pricing")}
              >
                DAFTAR HARGA
              </button>
            </div>

            <div className="showcase-panel">
              {activeShowcaseTab === "ads" ? (
                <div>
                  <div className="ads-slider">
                    {adSlides.map((slide, index) => (
                      <div
                        key={slide.src}
                        className={`ads-slide ${activeSlide === index ? "active" : ""}`}
                      >
                        <img src={slide.src} alt={slide.alt} loading="lazy" />
                      </div>
                    ))}
                  </div>
                  <div className="ads-dots">
                    {adSlides.map((slide, index) => (
                      <button
                        key={slide.src}
                        type="button"
                        className={`ads-dot ${activeSlide === index ? "active" : ""}`}
                        onClick={() => setActiveSlide(index)}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="pricing-grid">
                    {pricePackages.map((pkg) => (
                      <div key={pkg.name} className="price-card">
                        <div className="p-info">
                          <div className="p-name">{pkg.name}</div>
                          <div className="p-desc">{pkg.desc}</div>
                        </div>
                        <div className="p-price">{pkg.price}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: "30px",
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      opacity: 0.7,
                    }}
                  >
                    * Masa aktif berjalan sejak KODE VOUCHER di gunakan
                    <br />* Gunakan Dengan Sebijak Mungkin
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`login-area ${sheetExpanded ? "expanded" : ""}`} id="loginSheet">
          <div className="sheet-handle" id="sheetHandle" onClick={() => setSheetExpanded((prev) => !prev)} />

          <div
            className="login-header-mobile"
            id="sheetHeader"
            onClick={() => setSheetExpanded((prev) => !prev)}
          >
            <h2 className="login-title">LOGIN AREA</h2>
            <div className="cta-arrow">Klik Untuk Login ▲</div>
          </div>

          <p className="login-subtitle">Silakan masuk menggunakan kode voucher.</p>

          <div className="mode-switch">
            <div
              className={`switch-item ${loginMode === "voucher" ? "active" : ""}`}
              id="tabVoucher"
              onClick={() => handleModeChange("voucher")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleModeChange("voucher")
                }
              }}
            >
              VOUCHER
            </div>
            <div
              className={`switch-item ${loginMode === "member" ? "active" : ""}`}
              id="tabMember"
              onClick={() => handleModeChange("member")}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleModeChange("member")
                }
              }}
            >
              MEMBER
            </div>
          </div>

          <input type="hidden" id="mikrotik-error" value={mikrotikError} readOnly />

          <form name="login" action="$(link-login-only)" method="post" onSubmit={handleSubmit}>
            <input type="hidden" name="dst" value="$(link-orig)" />
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
                onChange={handleUsernameChange}
                onFocus={() => setSheetExpanded(true)}
              />
              <label className="input-label" id="userLabel">
                {loginMode === "voucher" ? "Kode Voucher" : "Username"}
              </label>
            </div>

            <div
              className="input-group"
              id="passGroup"
              style={{ display: loginMode === "voucher" ? "none" : "block" }}
            >
              <input
                type="password"
                name="password"
                id="passField"
                className="cyber-input"
                value={password}
                onChange={handlePasswordChange}
              />
              <label className="input-label">Password</label>
            </div>

            <button type="submit" className="btn btn-cyber">
              MASUK SEKARANG
            </button>
          </form>

          {isTrial && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a
                href="$(link-login-only)?dst=$(link-orig-esc)&username=T-$(mac-esc)"
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  borderBottom: "1px dashed var(--text-muted)",
                }}
              >
                Coba Gratis (Trial 5 Menit)
              </a>
            </div>
          )}
        </div>
      </div>

      <form name="sendin" action="$(link-login-only)" method="post" ref={sendinRef}>
        <input type="hidden" name="username" />
        <input type="hidden" name="password" />
        <input type="hidden" name="dst" value="$(link-orig)" />
        <input type="hidden" name="popup" value="true" />
      </form>
    </>
  )
}
