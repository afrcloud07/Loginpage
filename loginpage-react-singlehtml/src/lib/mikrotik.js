export function isFilled(v) {
  if (v === undefined || v === null) return false;
  const s = String(v).trim();
  if (!s) return false;
  if (s === "null" || s === "undefined") return false;
  if (s.includes("$(")) return false;
  return true;
}

export function safe(v, fallback = "-") {
  return isFilled(v) ? String(v) : fallback;
}

function readHidden(id) {
  try {
    const el = document.getElementById(id);
    if (!el) return "";
    const val = el.value ?? el.getAttribute("value") ?? "";
    return String(val);
  } catch {
    return "";
  }
}

// Read MikroTik vars from hidden inputs (recommended for RouterOS substitution)
export function getMT() {
  const mt = {};

  // If window.__MT__ exists and looks filled, keep it (useful in dev).
  if (typeof window !== "undefined" && window.__MT__ && typeof window.__MT__ === "object") {
    const wmt = window.__MT__;
    // Check one key to decide if RouterOS substituted inside script
    if (isFilled(wmt.linkLoginOnly) || isFilled(wmt.linkLogout) || isFilled(wmt.identity)) return wmt;
  }

  // Login vars
  mt.identity = readHidden("mt-identity");
  mt.error = readHidden("mt-error");
  mt.chapId = readHidden("mt-chap-id");
  mt.chapChallenge = readHidden("mt-chap-challenge");
  mt.linkLoginOnly = readHidden("mt-link-login-only");
  mt.linkOrig = readHidden("mt-link-orig");
  mt.linkOrigEsc = readHidden("mt-link-orig-esc");
  mt.macEsc = readHidden("mt-mac-esc");
  mt.trial = readHidden("mt-trial");

  // Status vars
  mt.username = readHidden("mt-username");
  mt.ip = readHidden("mt-ip");
  mt.mac = readHidden("mt-mac");
  mt.uptime = readHidden("mt-uptime");
  mt.bytesInNice = readHidden("mt-bytes-in-nice");
  mt.bytesOutNice = readHidden("mt-bytes-out-nice");
  mt.remainBytesTotal = readHidden("mt-remain-bytes-total");
  mt.remainBytesTotalNice = readHidden("mt-remain-bytes-total-nice");
  mt.sessionTimeLeft = readHidden("mt-session-time-left");
  mt.loginBy = readHidden("mt-login-by");
  mt.loginByMac = readHidden("mt-login-by-mac");
  mt.blocked = readHidden("mt-blocked");
  mt.linkAdvert = readHidden("mt-link-advert");
  mt.linkLogout = readHidden("mt-link-logout");
  mt.refreshTimeoutSecs = readHidden("mt-refresh-timeout-secs");

  // Redirect vars
  mt.linkRedirect = readHidden("mt-link-redirect");
  mt.linkRedirectEsc = readHidden("mt-link-redirect-esc");

  return mt;
}

export function getTarget() {
  if (typeof window !== "undefined" && window.__TARGET__) return String(window.__TARGET__);
  if (typeof document !== "undefined" && document.body?.dataset?.target) return String(document.body.dataset.target);
  return "online";
}

export function getPage() {
  if (typeof window !== "undefined" && window.__PAGE__) return String(window.__PAGE__);
  if (typeof document !== "undefined" && document.body?.dataset?.page) return String(document.body.dataset.page);
  return "login";
}
