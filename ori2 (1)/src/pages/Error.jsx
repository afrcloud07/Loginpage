import { useEffect } from "react"
import { getDataset, safeValue } from "../utils/mikrotik.js"

export default function ErrorPage() {
  const data = getDataset()
  const errorMessage = safeValue(data.error, "$(error)")

  useEffect(() => {
    document.body.classList.add("page-simple")
    return () => document.body.classList.remove("page-simple")
  }, [])

  return (
    <div className="simple-wrap">
      <h1 className="simple-title">!</h1>
      <p className="simple-text">"{errorMessage}"</p>
      <button type="button" className="simple-button" onClick={() => window.history.back()}>
        KEMBALI
      </button>
    </div>
  )
}
