import React from 'react'

export default function PricingGrid({ items }) {
  return (
    <div className="pricing-grid">
      {items.map((p, idx) => (
        <div className="price-card" key={`${p.name}-${idx}`}>
          <div className="p-info">
            <div className="p-name">{p.name}</div>
            <div className="p-desc">{p.desc}</div>
          </div>
          <div className="p-price">{p.price}</div>
        </div>
      ))}
    </div>
  )
}
