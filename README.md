# Quran One Day One Page (ODOP) 📖

Aplikasi mobile tilawah Al-Qur'an harian yang memadukan **Kalender Bulanan** dan **Mushaf Al-Qur'an 604 Halaman**, bersumber resmi dari **Kementerian Agama Republik Indonesia ([quran.kemenag.go.id](https://quran.kemenag.go.id/))**.

---

## 🌟 Fitur Utama

1. **Tampilan Kalender Interaktif (1 - 30/31)**:
   - Menampilkan kalender bulan berjalan secara proporsional.
   - Setiap kotak tanggal dialokasikan **1 halaman Al-Qur'an** secara sistematis (dari QS. Al-Fatihah hingga QS. An-Nas).
   - Menampilkan nomor tanggal, nomor halaman Al-Qur'an, nama surat, serta nomor Juz.

2. **Aturan Tilawah Minimal 1 Menit**:
   - Menegakkan komitmen membaca minimal **60 detik** per halaman.
   - Dilengkapi widget timer interaktif dengan circular progress ring dan countdown detik.
   - Tombol penyelesaian terkunci (disabled) sebelum mencapai 60 detik.
   - Jika pengguna mencoba keluar sebelum 1 menit, sistem menampilkan konfirmasi peringatan agar tilawah tidak terputus sia-sia.
   - Begitu 60 detik terlampaui, nada melodi lembut berbunyi dan tombol penyelesaian otomatis terbuka dengan animasi perayaan.

3. **Tanda Silang (✕) pada Kotak Tanggal**:
   - Setelah menekan tombol selesai membaca, kotak tanggal yang bersangkutan otomatis diberi **tanda silang (✕)** tebal dan elegan.
   - Status tersimpan secara permanen di LocalStorage perangkat dan menghitung streak berturut-turut serta progress bulanan.

4. **Sumber Resmi Al-Qur'an: Kementerian Agama RI**:
   - Rasm Utsmani Standar Mushaf Indonesia (LPMQ Kemenag RI).
   - Terjemahan resmi Al-Qur'an Kemenag RI.
   - Tombol verifikasi tashih langsung ke portal resmi `https://quran.kemenag.go.id/`.
   - Dual-Mode tampilan: **Mushaf Standar** dan **Ayat & Terjemahan Kemenag RI**.

5. **Mobile-First & PWA (Progressive Web App)**:
   - Dapat diinstal langsung ke homescreen smartphone (Add to Home Screen) di Android dan iOS tanpa perlu unduh dari Play Store / App Store.
   - Bekerja secara responsif dan offline-ready dengan Service Worker.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini bersifat *zero-dependency* (berjalan langsung di browser apa pun tanpa perlu instalasi runtime):

### Cara 1: Buka Langsung File HTML
Cukup klik ganda atau buka file `index.html` menggunakan browser favorit Anda (Google Chrome, Safari, Firefox, Edge).

```bash
open /Users/asrianti/.gemini/antigravity/scratch/quran-one-day-one-page/index.html
```

### Cara 2: Menjalankan Local Web Server (Opsional)
Bila ingin fitur Service Worker PWA aktif maksimal dengan protokol HTTP:
```bash
cd /Users/asrianti/.gemini/antigravity/scratch/quran-one-day-one-page
npx serve .
# atau
python3 -m http.server 8080
```
Lalu buka `http://localhost:8080` di browser komputer atau smartphone Anda.

---

## 📁 Struktur Direktori

```
quran-one-day-one-page/
├── index.html            # File antarmuka utama (PWA Ready)
├── manifest.json         # Konfigurasi instalasi aplikasi mobile PWA
├── sw.js                 # Service worker untuk mode offline
├── README.md             # Dokumentasi lengkap
├── css/
│   ├── main.css          # Tema warna Islami elegan & mobile shell frame
│   ├── calendar.css      # Grid kalender, kotak tanggal, dan tanda silang (✕)
│   ├── reader.css        # Reader mushaf standar dan teks terjemahan Kemenag
│   └── timer.css         # Floating timer tilawah 60 detik & tombol tuntas
└── js/
    ├── quran-data.js     # Data 114 Surat, 30 Juz, pemetaan 604 Halaman Kemenag
    ├── storage.js        # Manajer penyimpanan riwayat tanggal & tanda silang
    ├── timer.js          # Controller timer 60 detik & validasi tilawah
    ├── calendar.js       # Logika render kalender dinamis & alokasi halaman
    ├── reader.js         # Pengontrol reader Al-Qur'an & switcher mode
    └── app.js            # Inisialisasi dan orkestrasi layar aplikasi
```

---

## 📜 Lisensi & Atribusi Data
- Teks Al-Qur'an, rasm, dan terjemahan mengacu pada **Lajnah Pentashihan Mushaf Al-Qur'an (LPMQ) Kementerian Agama Republik Indonesia** ([quran.kemenag.go.id](https://quran.kemenag.go.id)).
