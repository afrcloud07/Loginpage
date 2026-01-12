# AFRCloud Login (React + Vite)

Ini hasil convert dari `login.html` kamu ke **ReactJS (Vite)**.
- **Tema & desain tetap sama** (CSS asli dipakai).
- Showcase kiri sekarang jadi **Tab**:
  - **Tab IKLAN**: slider gambar iklan
  - **Tab PAKET**: list harga (yang sebelumnya)

## Jalankan di lokal
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Hasil ada di folder `dist/` dengan struktur:

- `dist/online/`  → versi normal (yang kamu pakai sekarang)
- `dist/offline/` → versi maintenance (hanya 2 file)

### Output (Multi-page)
Build ini menghasilkan halaman default MikroTik berikut (di `dist/online/`):
- `login.html`
- `alogin.html`
- `redirect.html`
- `logout.html`
- `status.html`
- `error.html`

Semua halaman memakai bundle React yang sama dan membaca variabel MikroTik dari `window.MT` yang didefinisikan di masing-masing file HTML.

### Output Offline (Maintenance)
Di `dist/offline/` hanya ada:
- `login.html`
- `status.html`

Keduanya adalah halaman **maintenance** (self-contained, tidak butuh assets/iklan/paket) supaya folder offline cukup 2 file.

## Edit paket / harga
Edit di:
- `src/data/pricing.js`

## Edit gambar iklan (slider)
1. Taruh gambar di:
- `public/ads/`  (wildcard: `*.jpg *.jpeg *.png *.webp *.gif`)
2. Jalankan ulang:
- `npm run dev` atau `npm run build`

Sistem akan otomatis membuat daftar file ke:
- `public/ads/manifest.json`

React akan membaca manifest itu saat Tab **IKLAN** dibuka.

## Catatan RouterOS (MikroTik)
Di setiap halaman (`login.html`, `status.html`, dll) sudah ada `window.MT = { ... }` berisi placeholder `$(...)`.
Saat file hasil build dipasang di hotspot MikroTik, RouterOS akan mengganti placeholder itu otomatis.
