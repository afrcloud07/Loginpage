# Hotspot Pages (React) - Online & Offline

Ini hasil konversi dari ZIP kamu yang berisi folder `online/` dan `offline/`.

## Build
```bash
npm install
npm run build:all
```

Hasil build:
- `dist/online/`  -> upload ke folder hotspot online
- `dist/offline/` -> upload ke folder hotspot offline/maintenance

## Deploy ke MikroTik
Copy isi `dist/online/` ke `flash/online` dan `dist/offline/` ke `flash/offline` (atau sesuai profil kamu).

## Telegram
Token & chatId diambil dari file redirect yang kamu upload dan disimpan di `online/redirect.html` sebagai:
`window.__TG__ = { botToken, chatId, systemName }`
(kamu bisa ganti langsung di file output kalau perlu)

## Catatan
- Placeholder MikroTik `$(...)` dibiarkan agar RouterOS yang isi.


## Output Path Fix
Sekarang output build akan menjadi:
- dist/online/login.html (bukan dist/online/online/login.html)
- dist/offline/login.html (bukan dist/offline/offline/login.html)


### Update v2
- Pembacaan variabel MikroTik dibuat lebih tahan (re-read setelah DOMContentLoaded + retry).
- Teks identity dibesarkan (inline style) agar tidak terlalu kecil.


### Update v3
- Fix trial URL: tidak double-encode `$(mac-esc)` / `$(link-orig-esc)`.
- Halaman logout dirapikan mengikuti layout utama.


### Folder Rapih
- JS output: `dist/<target>/js/`
- CSS: `dist/<target>/css/`
- Image: `dist/<target>/img/`


### Update v5
- Logout dibuat simple (hanya konfirmasi YA/TIDAK), tanpa jam.


### Update v6
- Logout dibuat *exact* seperti contoh kamu (simple, black background, tombol YA/BATAL), tanpa layout lain.


### Update v7
- Tata letak tombol logout dirapikan: rata tengah, ukuran sama, responsif (HP jadi 1 kolom).


### Update v8
- Tambah watermark floating fixed pojok bawah kanan: AFRCloud-NET (subtle, tidak bisa di-klik).


### Update v9
- Watermark dibesarkan sedikit dan dibuat lebih jelas (opacity lebih tinggi + pill background).

## Mode "Satu Login.html"
Build sekarang hanya memproses **1 file sumber**: `login.html`.
Setelah build selesai, file itu **di-clone otomatis** menjadi:
- Online: `status.html`, `redirect.html`, `alogin.html`, `error.html`, `logout.html`
- Offline: `status.html`

Jadi kamu cukup edit **1 file template** saja, tapi tetap kompatibel dengan endpoint MikroTik yang berbeda.
