/**
 * AFR-CLOUD MIKROTIK CAPTIVE PORTAL
 * Login Page JavaScript
 */

// 1. CLOCK FUNCTIONALITY
function updateClock() {
  const now = new Date()
  document.getElementById("jam").innerText = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
  document.getElementById("tanggal").innerText = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
  })
}

setInterval(updateClock, 1000)
updateClock()

// 2. MODE SWITCHER (VOUCHER/MEMBER)
const tabVoucher = document.getElementById("tabVoucher")
const tabMember = document.getElementById("tabMember")
const userField = document.getElementById("userField")
const passField = document.getElementById("passField")
const passGroup = document.getElementById("passGroup")
const userLabel = document.getElementById("userLabel")

function setMode(mode) {
  if (mode === "voucher") {
    tabVoucher.classList.add("active")
    tabMember.classList.remove("active")
    passGroup.style.display = "none"
    userLabel.innerText = "Kode Voucher"
    userField.placeholder = ""
    // Auto-copy username to password for voucher mode
    userField.onkeyup = function () {
      passField.value = this.value
    }
    passField.value = userField.value
  } else {
    tabMember.classList.add("active")
    tabVoucher.classList.remove("active")
    passGroup.style.display = "block"
    userLabel.innerText = "Username"
    userField.onkeyup = null // Disable auto-copy
    passField.value = ""
  }
  userField.focus()
}

tabVoucher.addEventListener("click", () => setMode("voucher"))
tabMember.addEventListener("click", () => setMode("member"))
setMode("voucher") // Default Init

// 3. MOBILE BOTTOM SHEET INTERACTION
const loginSheet = document.getElementById("loginSheet")
const sheetHeader = document.getElementById("sheetHeader")
const sheetHandle = document.getElementById("sheetHandle")
const userFieldInput = document.getElementById("userField")

function openSheet() {
  loginSheet.classList.add("expanded")
}

function toggleSheet() {
  loginSheet.classList.toggle("expanded")
}

sheetHeader.addEventListener("click", toggleSheet)
sheetHandle.addEventListener("click", toggleSheet)
userFieldInput.addEventListener("focus", openSheet)

// 4. TOAST ERROR NOTIFICATION SYSTEM
function showToast(msg) {
  const container = document.getElementById("toast-container")
  const toast = document.createElement("div")
  toast.className = "toast-item"
  toast.innerHTML = `
        <div class="toast-icon">⚠️</div>
        <div class="toast-content">
            <div class="toast-title">Login Gagal</div>
            <div class="toast-msg">${msg}</div>
        </div>
    `
  container.appendChild(toast)

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out forwards"
    setTimeout(() => {
      container.removeChild(toast)
    }, 300)
  }, 5000)
}

// 5. CHECK MIKROTIK ERROR FROM HIDDEN INPUT
const errorInput = document.getElementById("mikrotik-error")
if (errorInput && errorInput.value && errorInput.value !== "$(error)" && errorInput.value !== "") {
  showToast(errorInput.value)
}

