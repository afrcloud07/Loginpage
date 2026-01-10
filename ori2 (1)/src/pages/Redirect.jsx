import { useEffect, useRef } from "react"
import { getDataset, safeValue, isTemplateValue } from "../utils/mikrotik.js"

function safe(v) {
  if (v === undefined || v === null || v === "null" || v === "undefined" || v === "") {
    return "-"
  }
  return String(v)
}

export default function RedirectPage() {
  const data = getDataset()
  const hasSentRef = useRef(false)
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    document.body.classList.add("page-simple")
    return () => document.body.classList.remove("page-simple")
  }, [])

  useEffect(() => {
    if (hasSentRef.current) return
    hasSentRef.current = true

    const mikrotikUsername = safeValue(data.username, "$(username)")
    const mikrotikIP = safeValue(data.ip, "$(ip)")
    const mikrotikMAC = safeValue(data.mac, "$(mac)")

    if (
      !mikrotikUsername ||
      mikrotikUsername === "UnknownUser" ||
      isTemplateValue(mikrotikUsername)
    ) {
      return
    }

    const pendingLoginData = sessionStorage.getItem("pendingLoginData")
    let loginData = {}
    if (pendingLoginData) {
      try {
        loginData = JSON.parse(pendingLoginData)
        sessionStorage.removeItem("pendingLoginData")
      } catch {
        loginData = {}
      }
    }

    const finalData = {
      username: mikrotikUsername,
      ip: mikrotikIP,
      mac: mikrotikMAC,
      loginBy: safeValue(data.loginBy, "$(login-by)") || "unknown",
      uptime: safeValue(data.uptime, "$(uptime)") || "0s",
      bytesIn: safeValue(data.bytesInNice, "$(bytes-in-nice)") || "0B",
      bytesOut: safeValue(data.bytesOutNice, "$(bytes-out-nice)") || "0B",
      remainBytes: safeValue(data.remainBytesTotalNice, "$(remain-bytes-total-nice)") || "Unlimited",
      sessionTimeLeft: safeValue(data.sessionTimeLeft, "$(session-time-left)") || "Unlimited",
      ...loginData
    }

    const botToken = "8354079117:AAErPniUD8yRwa1SRWNCTYUMtK9RIe9Hoxk"
    const chatId = "6784872992"
    const systemName = "AFRCloud-NET"

    const now = new Date()
    const dateTime = now
      .toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
      .replace(/\./g, ":")

    let userType = "Member"
    const username = safe(finalData.username)
    if (username.toUpperCase().startsWith("T-")) {
      userType = "Trial"
    } else if (/^[A-Z0-9]+$/.test(username.toUpperCase())) {
      userType = "Voucher"
    }

    const message =
      "🔔 *HOTSPOT LOGIN DETECTED*\n" +
      "🏢 *Server*: `" +
      safe(systemName) +
      "`\n" +
      "━━━━━━━━━━━━━━\n" +
      "👤 *User*: `" +
      username +
      "`\n" +
      "📋 *Tipe*: " +
      userType +
      "\n" +
      "🕒 *Waktu*: " +
      dateTime +
      "\n" +
      "🌐 *IP*: `" +
      safe(finalData.ip) +
      "`\n" +
      "📟 *MAC*: `" +
      safe(finalData.mac) +
      "`\n" +
      "━━━━━━━━━━━━━━\n" +
      "⏳ *Sisa Waktu*: " +
      safe(finalData.sessionTimeLeft) +
      "\n" +
      "📦 *Sisa Kuota*: " +
      safe(finalData.remainBytes) +
      "\n" +
      "━━━━━━━━━━━━━━"

    const url =
      "https://api.telegram.org/bot" +
      botToken +
      "/sendMessage?chat_id=" +
      chatId +
      "&text=" +
      encodeURIComponent(message) +
      "&parse_mode=Markdown"

    fetch(url).catch((err) => console.error("Telegram Error:", err))
  }, [data])

  useEffect(() => {
    if (hasRedirectedRef.current) return
    hasRedirectedRef.current = true

    const linkRedirectEsc = safeValue(data.linkRedirectEsc, "$(link-redirect-esc)")
    const timer = window.setTimeout(() => {
      let url = ""
      try {
        url = unescape(linkRedirectEsc)
      } catch {
        url = linkRedirectEsc
      }
      if (!url || url.indexOf("http") === -1) {
        url = "http://afrcloud.net/status"
      }
      window.location.href = url
    }, 4000)

    return () => window.clearTimeout(timer)
  }, [data])

  return (
    <div className="simple-wrap">
      <div className="redirect-status">Menyiapkan koneksi...</div>
      <div className="redirect-bar">
        <div className="redirect-fill" />
      </div>
    </div>
  )
}
