import fs from 'node:fs'
import path from 'node:path'

// Create dist/offline with ONLY:
// - login.html
// - status.html
// No assets required (self-contained HTML).

const distDir = path.resolve(process.cwd(), 'dist')
const offlineDir = path.resolve(distDir, 'offline')

fs.rmSync(offlineDir, { recursive: true, force: true })
fs.mkdirSync(offlineDir, { recursive: true })

const baseHtml = ({ title, headline, message, buttonText, buttonHref, extra }) => `<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="refresh" content="15" />
    <title>${title}</title>
    <style>
      :root{
        --bg0:#05060a;
        --bg1:#0b1020;
        --card:rgba(15,20,40,.72);
        --border:rgba(255,255,255,.12);
        --text:#ffffff;
        --muted:rgba(255,255,255,.72);
        --accent:#57d3ff;
      }
      *{box-sizing:border-box}
      body{
        margin:0;
        font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,Helvetica,sans-serif;
        min-height:100vh;
        color:var(--text);
        background:
          radial-gradient(900px 520px at 10% 10%, rgba(87,211,255,.18), transparent 60%),
          radial-gradient(900px 520px at 90% 90%, rgba(128,90,255,.14), transparent 60%),
          linear-gradient(180deg,var(--bg0),var(--bg1));
        display:grid;
        place-items:center;
        padding:24px;
      }
      .card{
        width:min(560px, 100%);
        background:var(--card);
        border:1px solid var(--border);
        border-radius:18px;
        padding:22px;
        box-shadow:0 18px 70px rgba(0,0,0,.55);
        backdrop-filter: blur(10px);
      }
      .brand{
        font-weight:900;
        letter-spacing:.5px;
        font-size:22px;
        margin:0 0 6px;
      }
      .brand small{ color: var(--muted); font-weight:700; }
      .headline{
        margin:0 0 10px;
        font-size:28px;
        font-weight:900;
      }
      .msg{
        margin:0 0 16px;
        color:var(--muted);
        line-height:1.55;
        font-weight:650;
      }
      .meta{
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap:10px;
        margin: 14px 0 18px;
      }
      .pill{
        border:1px solid var(--border);
        border-radius:14px;
        padding:10px 12px;
        background:rgba(0,0,0,.18);
        font-weight:800;
        color:var(--text);
        font-size:13px;
      }
      .pill span{ color: var(--muted); font-weight:800; display:block; font-size:11px; margin-bottom:4px; }
      .btn{
        display:block;
        width:100%;
        border:none;
        border-radius:14px;
        padding:13px 14px;
        text-align:center;
        text-decoration:none;
        font-weight:900;
        color:#00131b;
        background:linear-gradient(90deg, var(--accent), #a7ffcf);
      }
      .btn:active{ transform: translateY(1px); }
      .foot{
        margin-top:14px;
        color:var(--muted);
        font-weight:700;
        font-size:12px;
        text-align:center;
      }
      @media (max-width:480px){
        .meta{ grid-template-columns: 1fr; }
        .headline{ font-size:24px; }
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1 class="brand">$(identity) <small>Hotspot</small></h1>
      <h2 class="headline">${headline}</h2>
      <p class="msg">${message}</p>

      <div class="meta">
        <div class="pill"><span>IP</span> $(ip)</div>
        <div class="pill"><span>MAC</span> $(mac)</div>
      </div>

      ${extra || ''}

      <a class="btn" href="${buttonHref}">${buttonText}</a>

      <div class="foot">Halaman akan refresh otomatis setiap 15 detik.</div>
    </div>
  </body>
</html>`

const offlineLogin = baseHtml({
  title: 'Maintenance',
  headline: 'Sedang Maintenance',
  message:
    'Layanan hotspot sementara dalam perawatan / koneksi internet sedang tidak stabil. ' +
    'Silakan tunggu sebentar, lalu klik tombol di bawah untuk mencoba lagi.',
  buttonText: 'COBA LAGI',
  buttonHref: '$(link-login-only)'
})

const offlineStatus = baseHtml({
  title: 'Maintenance Status',
  headline: 'Maintenance Mode',
  message:
    'Jika Anda melihat halaman ini, sistem sedang dalam mode maintenance. ' +
    'Silakan refresh atau coba akses ulang setelah internet kembali normal.',
  buttonText: 'KEMBALI',
  buttonHref: '$(link-login-only)',
  extra: '<div class="meta"><div class="pill"><span>User</span> $(username)</div><div class="pill"><span>Uptime</span> $(uptime)</div></div>'
})

fs.writeFileSync(path.join(offlineDir, 'login.html'), offlineLogin, 'utf8')
fs.writeFileSync(path.join(offlineDir, 'status.html'), offlineStatus, 'utf8')

console.log('✅ dist/offline/login.html & dist/offline/status.html generated')
