import React, { useEffect, useMemo, useState } from 'react'

export default function AdsSlider({ items, intervalMs = 4000, status = 'idle' }) {
  const slides = useMemo(() => (Array.isArray(items) ? items.filter(Boolean) : []), [items])
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(() => new Set())

  useEffect(() => {
    if (slides.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [slides.length, intervalMs])

  useEffect(() => {
    if (index >= slides.length) setIndex(0)
  }, [slides.length, index])

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  if (!slides.length) {
    const isLoading = status === 'loading'
    const isError = status === 'error'
    return (
      <div className="ads-slider">
        <div className="ads-slide">
          <div>
            <div style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              {isLoading ? 'Memuat IKLAN...' : isError ? 'IKLAN tidak terbaca' : 'IKLAN'}
            </div>
            {isLoading ? (
              <div>Mohon tunggu...</div>
            ) : (
              <div>
                Taruh gambar di <b>/public/ads</b> (jpg/png/jpeg/webp/gif).<br />
                Lalu jalankan <b>npm run dev</b> atau <b>npm run build</b> supaya <b>/ads/manifest.json</b> dibuat otomatis.
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const current = slides[index]
  const isBroken = failed.has(index)

  return (
    <div className="ads-slider">
      <div className="ads-slide">
        {!isBroken ? (
          <img
            src={current.src}
            alt={current.alt || `Iklan ${index + 1}`}
            loading="eager"
            onError={() => {
              setFailed((s) => {
                const n = new Set(s)
                n.add(index)
                return n
              })
            }}
          />
        ) : (
          <div>
            <div style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>Gambar tidak ditemukan</div>
            <div>Pastikan file ada di <b>/public</b> sesuai path: <b>{current.src}</b></div>
          </div>
        )}
      </div>

      {slides.length > 1 && (
        <>
          <div className="ads-nav">
            <button type="button" className="ads-btn" onClick={prev} aria-label="Sebelumnya">
              ‹
            </button>
            <button type="button" className="ads-btn" onClick={next} aria-label="Berikutnya">
              ›
            </button>
          </div>
          <div className="ads-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`ads-dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
