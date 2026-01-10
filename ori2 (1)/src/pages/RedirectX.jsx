import { useEffect, useRef } from "react"
import { getDataset, safeValue } from "../utils/mikrotik.js"

export default function RedirectXPage() {
  const data = getDataset()
  const hasRedirectedRef = useRef(false)

  useEffect(() => {
    document.body.classList.add("page-simple")
    return () => document.body.classList.remove("page-simple")
  }, [])

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
      window.location.href = url
    }, 1500)

    return () => window.clearTimeout(timer)
  }, [data])

  return (
    <div className="simple-wrap">
      <div className="redirect-bar-thin">
        <div className="redirect-fill" />
      </div>
    </div>
  )
}
