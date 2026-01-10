import { useEffect } from "react"
import { getDataset, safeValue } from "../utils/mikrotik.js"

export default function LogoutPage() {
  const data = getDataset()
  const linkLogout = safeValue(data.linkLogout, "$(link-logout)")

  useEffect(() => {
    document.body.classList.add("page-simple")
    return () => document.body.classList.remove("page-simple")
  }, [])

  return (
    <div className="simple-wrap">
      <h2 className="logout-title">Putuskan Koneksi?</h2>
      <p className="logout-subtitle">Anda harus login kembali untuk menggunakan internet.</p>

      <div className="logout-actions">
        <form action={linkLogout} name="logout" method="post">
          <input type="hidden" name="erase-cookie" value="on" />
          <button type="submit" className="logout-btn logout-yes">
            YA
          </button>
        </form>
        <button type="button" className="logout-btn logout-no" onClick={() => (window.location.href = "status.html")}>
          BATAL
        </button>
      </div>
    </div>
  )
}
