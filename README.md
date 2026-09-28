# One Page Quran 📖
> **One Day One Page Quran Tilawah App**

Aplikasi mobile tilawah Al-Qur'an harian (1 Halaman per Hari) yang memadukan **Kalender Interaktif (Masehi & Hijriah)** dan **Mushaf Al-Qur'an 604 Halaman**, bersumber resmi dari **Kementerian Agama Republik Indonesia ([quran.kemenag.go.id](https://quran.kemenag.go.id/))**.

---

## 🌟 Fitur Utama

1. **Tampilan Kalender Interaktif (1 - 30/31)**:
   - Menampilkan kalender bulan berjalan secara proporsional.
   - Setiap kotak tanggal dialokasikan **1 halaman Al-Qur'an** secara sistematis (dari QS. Al-Fatihah hingga QS. An-Nas).
   - Menampilkan nomor tanggal, nomor halaman Al-Qur'an, nama surat, serta nomor Juz.

2. **Tanda checklist pada Kotak Tanggal**:
   - Setelah menekan tombol selesai membaca, kotak tanggal yang bersangkutan otomatis diberi **tanda checklist** tebal dan elegan.
   - Status tersimpan secara permanen di LocalStorage perangkat dan menghitung streak berturut-turut serta progress bulanan.

3. **Sumber Resmi Al-Qur'an: Kementerian Agama RI**:
   - Rasm Utsmani Standar Mushaf Indonesia (LPMQ Kemenag RI).
   - Terjemahan resmi Al-Qur'an Kemenag RI.
   - Tombol verifikasi tashih langsung ke portal resmi `https://quran.kemenag.go.id/`.

4. **Mobile-First & PWA (Progressive Web App)**:
   - Dapat diinstal langsung ke homescreen smartphone (Add to Home Screen) di Android dan iOS tanpa perlu unduh dari Play Store / App Store.
   - Bekerja secara responsif dan offline-ready dengan Service Worker.

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
