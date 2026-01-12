import { useEffect, useState } from 'react'

/**
 * Reads /ads/manifest.json (generated from /public/ads) and returns slider items.
 * This works for static hosting (including MikroTik) because the manifest file is copied to /dist.
 */
export function useAdsManifest() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  useEffect(() => {
    let cancelled = false

    async function run() {
      setStatus('loading')
      try {
        const res = await fetch(`/ads/manifest.json?v=${Date.now()}`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const list = await res.json()
        const files = Array.isArray(list) ? list : []

        const next = files
          .filter((x) => typeof x === 'string' && x.trim().length)
          .map((name, i) => ({ src: `/ads/${name}`, alt: `Iklan ${i + 1}` }))

        if (!cancelled) {
          setItems(next)
          setStatus('success')
        }
      } catch {
        if (!cancelled) {
          setItems([])
          setStatus('error')
        }
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [])

  return { items, status }
}
