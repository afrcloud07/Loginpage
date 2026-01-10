import { useEffect, useMemo, useState } from "react"
import AnalogClock from "../components/AnalogClock.jsx"
import { getDataset, isTemplateValue, safeValue, toNumber } from "../utils/mikrotik.js"

export default function StatusPage() {
  const data = getDataset()

  const identity = safeValue(data.identity, "$(identity)")
  const loginBy = safeValue(data.loginBy, "$(login-by)")
  const username = safeValue(data.username, "$(username)")
  const bytesOutNice = safeValue(data.bytesOutNice, "$(bytes-out-nice)")
  const bytesInNice = safeValue(data.bytesInNice, "$(bytes-in-nice)")
  const ip = safeValue(data.ip, "$(ip)")
  const mac = safeValue(data.mac, "$(mac)")
  const uptime = safeValue(data.uptime, "$(uptime)")
  const remainBytesTotal = safeValue(data.remainBytesTotal, "$(remain-bytes-total)")
  const remainBytesTotalNice = safeValue(
    data.remainBytesTotalNice,
    "$(remain-bytes-total-nice)"
  )
  const sessionTimeLeft = safeValue(data.sessionTimeLeft, "$(session-time-left)")
  const blocked = safeValue(data.blocked, "$(blocked)")
  const linkAdvert = safeValue(data.linkAdvert, "$(link-advert)")
  const refreshTimeoutSecs = toNumber(data.refreshTimeoutSecs, 60)
  const linkLogout = safeValue(data.linkLogout, "$(link-logout)")
  const loginByMac = safeValue(data.loginByMac, "$(login-by-mac)")

  const [timeLeft, setTimeLeft] = useState(refreshTimeoutSecs)

  useEffect(() => {
    document.body.classList.add("page-status")
    return () => document.body.classList.remove("page-status")
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : prev))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const welcomeText = useMemo(() => {
    if (loginBy === "trial") return "Halo, Trial User!"
    if (loginBy !== "mac" && !isTemplateValue(username)) return `Halo, ${username}!`
    return ""
  }, [loginBy, username])

  const showRemainBytes = remainBytesTotal && !isTemplateValue(remainBytesTotal)
  const showSessionTime = sessionTimeLeft && !isTemplateValue(sessionTimeLeft)
  const showBlocked = blocked === "yes"
  const showLogout = loginByMac !== "yes"

  return (
    <div className="main-wrapper">
      <div className="greeting-section">
        <div className="status-badge">✅ CONNECTED</div>

        <div className="clock-container">
          <AnalogClock />
        </div>

        <div className="wifi-name">{identity}</div>

        {welcomeText ? <div className="welcome-text">{welcomeText}</div> : null}

        <div className="traffic-stats">
          <div className="stat-box">
            <div className="stat-label">
              <i className="fa-solid fa-download stat-icon" /> Download
            </div>
            <div className="stat-value">{bytesOutNice}</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">
              <i className="fa-solid fa-upload stat-icon" /> Upload
            </div>
            <div className="stat-value">{bytesInNice}</div>
          </div>
        </div>

        <table className="status-table">
          <tbody>
            <tr>
              <td>
                IP Address <i className="fa-solid fa-network-wired fa-fw" />
              </td>
              <td className="val">{ip}</td>
            </tr>
            <tr>
              <td>
                MAC Address <i className="fa-solid fa-fingerprint fa-fw" />
              </td>
              <td className="val">{mac}</td>
            </tr>
            <tr>
              <td>
                Terhubung <i className="fa-solid fa-clock fa-fw" />
              </td>
              <td className="val">{uptime}</td>
            </tr>
            {showRemainBytes ? (
              <tr>
                <td>
                  Sisa Kuota <i className="fa-solid fa-chart-pie fa-fw" />
                </td>
                <td className="val">{remainBytesTotalNice}</td>
              </tr>
            ) : null}
            <tr>
              <td>
                Sisa Waktu <i className="fa-solid fa-hourglass-half fa-fw" />
              </td>
              <td className="val">{showSessionTime ? sessionTimeLeft : "Unlimited"}</td>
            </tr>
            {showBlocked ? (
              <tr>
                <td>Status</td>
                <td className="val">
                  <a href={linkAdvert} style={{ color: "#ef4444" }}>
                    Iklan Wajib
                  </a>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>

        <iframe id="exp" src="about:blank" title="expired" />

        <div className="refresh-info">
          Refresh otomatis: <span id="countdown">{timeLeft}</span> detik
        </div>
      </div>

      <div className="input-hero">
        <form action={linkLogout} name="logout" method="post">
          <input type="hidden" name="erase-cookie" value="on" />

          {showLogout ? (
            <>
              <p
                style={{
                  fontSize: "10px",
                  textAlign: "center",
                  margin: "5px auto",
                  color: "var(--text-dim)"
                }}
              >
                Tombol LOG OFF akan memutuskan koneksi internet
              </p>
              <button
                type="submit"
                className="action-btn"
                style={{ background: "#ef4444", color: "white" }}
              >
                <i className="fa-solid fa-power-off" /> LOG OUT
              </button>
            </>
          ) : null}
        </form>
      </div>
    </div>
  )
}
