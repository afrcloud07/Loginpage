import { useEffect, useRef } from "react"

function drawHand(ctx, radius, angle, length, width, color) {
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = "round"
  ctx.beginPath()
  ctx.moveTo(radius, radius)
  ctx.lineTo(radius + Math.sin(angle) * length, radius - Math.cos(angle) * length)
  ctx.stroke()
}

function drawAnalogClock(canvas) {
  if (!canvas) return
  const ctx = canvas.getContext("2d")
  if (!ctx) return

  const radius = canvas.width / 2
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const scale = radius / 100

  ctx.strokeStyle = "#FFFFFF"
  ctx.lineWidth = 2 * scale
  ctx.beginPath()
  ctx.arc(radius, radius, radius - 5 * scale, 0, 2 * Math.PI)
  ctx.stroke()

  for (let i = 1; i <= 12; i += 1) {
    const ang = (i * Math.PI) / 6
    const x1 = radius + Math.sin(ang) * (radius - 18 * scale)
    const y1 = radius - Math.cos(ang) * (radius - 18 * scale)
    const x2 = radius + Math.sin(ang) * (radius - 8 * scale)
    const y2 = radius - Math.cos(ang) * (radius - 8 * scale)

    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 1.5 * scale
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    ctx.fillStyle = "#FFFFFF"
    ctx.font = `bold ${12 * scale}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    const numX = radius + Math.sin(ang) * (radius - 30 * scale)
    const numY = radius - Math.cos(ang) * (radius - 30 * scale)
    ctx.fillText(i, numX, numY)
  }

  const now = new Date()
  const hour = now.getHours() % 12
  const minute = now.getMinutes()
  const second = now.getSeconds()

  drawHand(
    ctx,
    radius,
    (hour + minute / 60) * (Math.PI / 6),
    radius * 0.4,
    4 * scale,
    "#FFFFFF"
  )
  drawHand(
    ctx,
    radius,
    (minute + second / 60) * (Math.PI / 30),
    radius * 0.6,
    3 * scale,
    "#FFFFFF"
  )
  drawHand(
    ctx,
    radius,
    (second * Math.PI) / 30,
    radius * 0.65,
    1.5 * scale,
    "#FF4444"
  )

  ctx.fillStyle = "#FFFFFF"
  ctx.beginPath()
  ctx.arc(radius, radius, 3 * scale, 0, 2 * Math.PI)
  ctx.fill()
}

export default function AnalogClock() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    drawAnalogClock(canvas)
    const timer = setInterval(() => drawAnalogClock(canvas), 1000)
    return () => clearInterval(timer)
  }, [])

  return <canvas id="analogClock" ref={canvasRef} width="500" height="500" />
}
