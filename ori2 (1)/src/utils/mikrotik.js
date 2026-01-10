export function getDataset() {
  const root = document.getElementById("root")
  return root ? root.dataset : {}
}

export function isTemplateValue(value) {
  return typeof value === "string" && value.includes("$(")
}

export function safeValue(value, fallback = "") {
  if (value === undefined || value === null) return fallback
  if (value === "" || value === "null" || value === "undefined") return fallback
  return value
}

export function toNumber(value, fallback) {
  if (!value || isTemplateValue(value)) return fallback
  const num = Number(value)
  return Number.isNaN(num) ? fallback : num
}
