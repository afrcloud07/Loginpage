import { useEffect, useRef, useState } from "react"
import AnalogClock from "../components/AnalogClock.jsx"
import { getDataset, isTemplateValue, safeValue } from "../utils/mikrotik.js"
import { hexMD5 } from "../utils/md5.js"

export default function LoginPage() {
  const [isMember, setIsMember] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const toastTimerRef = useRef(null)

  const data = getDataset()
  const identity = safeValue(data.identity, "$(identity)")
  const linkLoginOnly = safeValue(data.linkLoginOnly, "$(link-login-only)")
  const linkOrig = safeValue(data.linkOrig, "$(link-orig)")
  const linkOrigEsc = safeValue(data.linkOrigEsc, "$(link-orig-esc)")
  const macEsc = safeValue(data.macEsc, "$(mac-esc)")
  const chapId = safeValue(data.chapId, "$(chap-id)")
  const chapChallenge = safeValue(data.chapChallenge, "$(chap-challenge)")
  const errorValue = safeValue(data.error, "$(error)")
  const trial = safeValue(data.trial, "")

  useEffect(() => {
    document.body.classList.add("page-login")
    return () => document.body.classList.remove("page-login")
  }, [])

  useEffect(() => {
    if (errorValue && !isTemplateValue(errorValue)) {
      triggerToast(errorValue)
    }
  }, [errorValue])

  const triggerToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = window.setTimeout(() => setShowToast(false), 5000)
  }

  const handleModeToggle = () => {
    const nextMode = !isMember
    setIsMember(nextMode)

    if (usernameRef.current) usernameRef.current.value = ""
    if (passwordRef.current) passwordRef.current.value = ""

    if (!nextMode && usernameRef.current && passwordRef.current) {
      passwordRef.current.value = usernameRef.current.value
    }
  }

  const handleUsernameChange = () => {
    if (!isMember && usernameRef.current && passwordRef.current) {
      passwordRef.current.value = usernameRef.current.value
    }
  }

  const handleSubmit = (event) => {
    const usernameValue = usernameRef.current ? usernameRef.current.value.trim() : ""
    const passwordValue = passwordRef.current ? passwordRef.current.value.trim() : ""

    if (!usernameValue) {
      event.preventDefault()
      triggerToast("Masukkan kode voucher atau username member")
      return
    }

    if (isMember && !passwordValue) {
      event.preventDefault()
      triggerToast("Masukkan kata sandi")
      return
    }

    if (!isMember && passwordRef.current) {
      // Voucher mode requires password to match username
      passwordRef.current.value = usernameValue
    }

    if (chapId && chapId.trim() !== "" && passwordRef.current) {
      passwordRef.current.value = hexMD5(
        chapId + passwordRef.current.value + chapChallenge
      )
    }
  }

  const showTrial = trial === "yes"
  const trialHref = `${linkLoginOnly}?dst=${linkOrigEsc}&username=T-${macEsc}`

  return (
    <>
      <div className={`toast${showToast ? " show" : ""}`} id="toast">
        {toastMessage}
      </div>

      <div className="main-wrapper">
        <div className="greeting-section">
          <div className="status-badge">✅ CONNECTED ✅</div>

          <div className="clock-container">
            <AnalogClock />
          </div>

          <div className="wifi-name">{identity}</div>
        </div>

        <div className="input-hero">
          <form name="login" action={linkLoginOnly} method="post" onSubmit={handleSubmit}>
            <input type="hidden" name="dst" value={linkOrig} />
            <input type="hidden" name="popup" value="true" />

            <div className="hero-field">
              <input
                type="text"
                name="username"
                id="username"
                className="big-input"
                placeholder={isMember ? "Username Member" : "Masukkan Kode Voucher"}
                required
                autoComplete="off"
                ref={usernameRef}
                onInput={handleUsernameChange}
              />
            </div>

            <div className="hero-field" id="passField" style={{ display: isMember ? "block" : "none" }}>
              <input
                type="password"
                name="password"
                id="password"
                className="big-input"
                placeholder="Kata Sandi"
                required={isMember}
                ref={passwordRef}
              />
            </div>

            <button type="submit" className="action-btn">
              HUBUNGKAN
            </button>
          </form>
        </div>

        <div className="footer-nav">
          <button type="button" className="nav-link" onClick={handleModeToggle}>
            {isMember ? "PAKAI VOUCHER" : "LOGIN MEMBER"}
          </button>
          {showTrial ? (
            <a className="nav-link" href={trialHref}>
              COBA GRATIS
            </a>
          ) : null}
        </div>
      </div>
    </>
  )
}
