import { isFilled, safe } from "./mikrotik";

function formatDateTimeID() {
  try {
    return new Date()
      .toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/\./g, ":");
  } catch {
    return new Date().toString();
  }
}

function detectUserType(username) {
  const u = String(username || "").toUpperCase();
  if (u.startsWith("T-")) return "Trial";
  if (/^[A-Z0-9]+$/.test(u) && u.length >= 3) return "Voucher";
  return "Member";
}

function buildMessage(data, systemName) {
  const username = safe(data.username);
  const userType = detectUserType(username);
  const dateTime = formatDateTimeID();

  return (
    "🔔 *HOTSPOT LOGIN DETECTED*\n" +
    "🏢 *Server*: `" + safe(systemName) + "`\n" +
    "━━━━━━━━━━━━━━\n" +
    "👤 *User*: `" + username + "`\n" +
    "📋 *Tipe*: " + userType + "\n" +
    "🕒 *Waktu*: " + dateTime + "\n" +
    "🌐 *IP*: `" + safe(data.ip) + "`\n" +
    "📟 *MAC*: `" + safe(data.mac) + "`\n" +
    "━━━━━━━━━━━━━━\n" +
    "⏳ *Sisa Waktu*: " + safe(data.sessionTimeLeft) + "\n" +
    "📦 *Sisa Kuota*: " + safe(data.remainBytes) + "\n" +
    "━━━━━━━━━━━━━━"
  );
}

export function getTG() {
  if (typeof window === "undefined") return null;
  return window.__TG__ || null;
}

export async function sendTelegram(cfg, data) {
  if (!cfg) return;
  const botToken = cfg.botToken;
  const chatId = cfg.chatId;
  const systemName = cfg.systemName || "HOTSPOT";

  if (!isFilled(botToken) || !isFilled(chatId)) return;
  if (!isFilled(data?.username)) return;

  const message = buildMessage(data, systemName);
  const url = "https://api.telegram.org/bot" + botToken + "/sendMessage";

  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown",
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "no-cors",
    });
  } catch {
    // ignore
  }
}
