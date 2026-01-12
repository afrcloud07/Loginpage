import React, { useEffect, useMemo, useState } from 'react'
import AdsSlider from './AdsSlider.jsx'
import PricingGrid from './PricingGrid.jsx'
import { useAdsManifest } from '../hooks/useAdsManifest.js'
import { pricing } from '../data/pricing.js'
import { getMT } from '../utils/mikrotik.js'

export default function ShowcasePanel({ defaultTab = 'ads' }) {
  const mt = useMemo(() => getMT(), [])
  // Clock
  const [timeText, setTimeText] = useState('00:00')
  const [dateText, setDateText] = useState('Date')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTimeText(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit'
        })
      )
      setDateText(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'short'
        })
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const [tab, setTab] = useState(defaultTab)
  const { items: adsItems, status: adsStatus } = useAdsManifest()

  return (
    <div className="showcase-area">
      <div className="mini-clock">
        <div className="mc-time" id="jam">{timeText}</div>
        <div className="mc-date" id="tanggal">{dateText}</div>
      </div>

      <div className="showcase-inner">
        <div className="brand-wrapper">
          <h1 className="brand-logo">{mt.identity}</h1>
          <div className="brand-tagline">Unlimited WiFi</div>
        </div>

        <div className="section-title">
          <span>DAFTAR PAKET</span>
        </div>

        {/* Tabs: IKLAN / PAKET */}
        <div className="showcase-tabbar">
          <div
            className={`showcase-tab ${tab === 'ads' ? 'active' : ''}`}
            onClick={() => setTab('ads')}
            role="button"
            tabIndex={0}
            onKeyDown={(ev) => ev.key === 'Enter' && setTab('ads')}
          >
            IKLAN
          </div>
          <div
            className={`showcase-tab ${tab === 'prices' ? 'active' : ''}`}
            onClick={() => setTab('prices')}
            role="button"
            tabIndex={0}
            onKeyDown={(ev) => ev.key === 'Enter' && setTab('prices')}
          >
            PAKET
          </div>
        </div>

        <div className={`showcase-tabcontent ${tab === 'ads' ? 'is-ads' : 'is-prices'}`}>
          {tab === 'ads' ? <AdsSlider items={adsItems} status={adsStatus} /> : <PricingGrid items={pricing} />}
        </div>

        <div className="showcase-foot">
          * Masa aktif berjalan sejak KODE VOUCHER di gunakan
          <br />
          * Gunakan Dengan Sebijak Mungkin
        </div>
      </div>
    </div>
  )
}
