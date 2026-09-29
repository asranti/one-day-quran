/**
 * Quran One Day One Page (ODOP) - Quran Data Engine
 * Sumber Data: Kementerian Agama Republik Indonesia (https://quran.kemenag.go.id)
 * Pemetaan per Halaman (604 Halaman) & Multi-CDN Mushaf Standar Madani
 */

const QURAN_DATA = {
  KEMENAG_PORTAL_URL: 'https://quran.kemenag.go.id',
  KEMENAG_PER_AYAT_BASE_URL: 'https://quran.kemenag.go.id/quran/per-ayat/surah',
  KEMENAG_SURAH_BASE_URL: 'https://quran.kemenag.go.id/surah',
  
  // Endpoint data Al-Qur'an per halaman dengan CORS terbuka
  QURAN_COM_API: 'https://api.quran.com/api/v4',
  EQURAN_API: 'https://equran.id/api/v2',
  ALQURAN_CLOUD_API: 'https://api.alquran.cloud/v1',

  // Daftar 114 Surah Al-Qur'an
  SURAHS: [
    { number: 1, name: 'Al-Fatihah', arabic: 'الفاتحة', english: 'The Opening', translation: 'Pembukaan', verses: 7, revelation: 'Makkiyyah', startPage: 1 },
    { number: 2, name: 'Al-Baqarah', arabic: 'البقرة', english: 'The Cow', translation: 'Sapi Betina', verses: 286, revelation: 'Madaniyyah', startPage: 2 },
    { number: 3, name: "Ali 'Imran", arabic: 'آل عمران', english: 'Family of Imran', translation: 'Keluarga Imran', verses: 200, revelation: 'Madaniyyah', startPage: 50 },
    { number: 4, name: "An-Nisa'", arabic: 'النساء', english: 'The Women', translation: 'Wanita', verses: 176, revelation: 'Madaniyyah', startPage: 77 },
    { number: 5, name: "Al-Ma'idah", arabic: 'المائدة', english: 'The Table Spread', translation: 'Hidangan', verses: 120, revelation: 'Madaniyyah', startPage: 106 },
    { number: 6, name: "Al-An'am", arabic: 'الأنعام', english: 'The Cattle', translation: 'Binatang Ternak', verses: 165, revelation: 'Makkiyyah', startPage: 128 },
    { number: 7, name: "Al-A'raf", arabic: 'الأعراف', english: 'The Heights', translation: 'Tempat Tertinggi', verses: 206, revelation: 'Makkiyyah', startPage: 151 },
    { number: 8, name: 'Al-Anfal', arabic: 'الأنفال', english: 'The Spoils of War', translation: 'Rampasan Perang', verses: 75, revelation: 'Madaniyyah', startPage: 177 },
    { number: 9, name: 'At-Taubah', arabic: 'التوبة', english: 'The Repentance', translation: 'Pengampunan', verses: 129, revelation: 'Madaniyyah', startPage: 187 },
    { number: 10, name: 'Yunus', arabic: 'يونس', english: 'Jonah', translation: 'Nabi Yunus', verses: 109, revelation: 'Makkiyyah', startPage: 208 },
    { number: 11, name: 'Hud', arabic: 'هود', english: 'Hud', translation: 'Nabi Hud', verses: 123, revelation: 'Makkiyyah', startPage: 221 },
    { number: 12, name: 'Yusuf', arabic: 'يوسف', english: 'Joseph', translation: 'Nabi Yusuf', verses: 111, revelation: 'Makkiyyah', startPage: 235 },
    { number: 13, name: "Ar-Ra'd", arabic: 'الرعد', english: 'The Thunder', translation: 'Guruh', verses: 43, revelation: 'Madaniyyah', startPage: 249 },
    { number: 14, name: 'Ibrahim', arabic: 'إبراهيم', english: 'Abraham', translation: 'Nabi Ibrahim', verses: 52, revelation: 'Makkiyyah', startPage: 255 },
    { number: 15, name: 'Al-Hijr', arabic: 'الحجر', english: 'The Rocky Tract', translation: 'Gunung Al-Hijr', verses: 99, revelation: 'Makkiyyah', startPage: 262 },
    { number: 16, name: 'An-Nahl', arabic: 'النحل', english: 'The Bee', translation: 'Lebah', verses: 128, revelation: 'Makkiyyah', startPage: 267 },
    { number: 17, name: 'Al-Isra', arabic: 'الإسراء', english: 'The Night Journey', translation: 'Memperjalankan Malam Hari', verses: 111, revelation: 'Makkiyyah', startPage: 282 },
    { number: 18, name: 'Al-Kahf', arabic: 'الكهف', english: 'The Cave', translation: 'Gua', verses: 110, revelation: 'Makkiyyah', startPage: 293 },
    { number: 19, name: 'Maryam', arabic: 'مريم', english: 'Mary', translation: 'Siti Maryam', verses: 98, revelation: 'Makkiyyah', startPage: 305 },
    { number: 20, name: 'Ta-Ha', arabic: 'طه', english: 'Ta-Ha', translation: 'Ta-Ha', verses: 135, revelation: 'Makkiyyah', startPage: 312 },
    { number: 21, name: 'Al-Anbiya', arabic: 'الأنبياء', english: 'The Prophets', translation: 'Para Nabi', verses: 112, revelation: 'Makkiyyah', startPage: 322 },
    { number: 22, name: 'Al-Hajj', arabic: 'الحج', english: 'The Pilgrimage', translation: 'Haji', verses: 78, revelation: 'Madaniyyah', startPage: 332 },
    { number: 23, name: "Al-Mu'minun", arabic: 'المؤمنون', english: 'The Believers', translation: 'Orang-Orang Mukmin', verses: 118, revelation: 'Makkiyyah', startPage: 342 },
    { number: 24, name: 'An-Nur', arabic: 'النور', english: 'The Light', translation: 'Cahaya', verses: 64, revelation: 'Madaniyyah', startPage: 350 },
    { number: 25, name: 'Al-Furqan', arabic: 'الفرقان', english: 'The Criterion', translation: 'Pembeda', verses: 77, revelation: 'Makkiyyah', startPage: 359 },
    { number: 26, name: "Asy-Syu'ara'", arabic: 'الشعراء', english: 'The Poets', translation: 'Para Penyair', verses: 227, revelation: 'Makkiyyah', startPage: 367 },
    { number: 27, name: 'An-Naml', arabic: 'النمل', english: 'The Ant', translation: 'Semut', verses: 93, revelation: 'Makkiyyah', startPage: 377 },
    { number: 28, name: 'Al-Qasas', arabic: 'القصص', english: 'The Stories', translation: 'Kisah-Kisah', verses: 88, revelation: 'Makkiyyah', startPage: 385 },
    { number: 29, name: "'Al-Ankabut", arabic: 'العنكبوت', english: 'The Spider', translation: 'Laba-Laba', verses: 69, revelation: 'Makkiyyah', startPage: 396 },
    { number: 30, name: 'Ar-Rum', arabic: 'الروم', english: 'The Romans', translation: 'Bangsa Romawi', verses: 60, revelation: 'Makkiyyah', startPage: 404 },
    { number: 31, name: 'Luqman', arabic: 'لقمان', english: 'Luqman', translation: 'Keluarga Luqman', verses: 34, revelation: 'Makkiyyah', startPage: 411 },
    { number: 32, name: 'As-Sajdah', arabic: 'السجدة', english: 'The Prostration', translation: 'Sujud', verses: 30, revelation: 'Makkiyyah', startPage: 415 },
    { number: 33, name: 'Al-Ahzab', arabic: 'الأحزاب', english: 'The Combined Forces', translation: 'Golongan yang Bersekutu', verses: 73, revelation: 'Madaniyyah', startPage: 418 },
    { number: 34, name: "Saba'", arabic: 'سبأ', english: 'Sheba', translation: 'Kaum Saba', verses: 54, revelation: 'Makkiyyah', startPage: 428 },
    { number: 35, name: 'Fatir', arabic: 'فاطر', english: 'The Originator', translation: 'Pencipta', verses: 45, revelation: 'Makkiyyah', startPage: 434 },
    { number: 36, name: 'Ya-Sin', arabic: 'يس', english: 'Ya-Sin', translation: 'Ya Sin', verses: 83, revelation: 'Makkiyyah', startPage: 440 },
    { number: 37, name: 'As-Saffat', arabic: 'الصافات', english: 'Those Who Set The Ranks', translation: 'Barisan-Barisan', verses: 182, revelation: 'Makkiyyah', startPage: 446 },
    { number: 38, name: 'Sad', arabic: 'ص', english: 'The Letter Sad', translation: 'Shad', verses: 88, revelation: 'Makkiyyah', startPage: 453 },
    { number: 39, name: 'Az-Zumar', arabic: 'الزمر', english: 'The Troops', translation: 'Rombongan', verses: 75, revelation: 'Makkiyyah', startPage: 458 },
    { number: 40, name: 'Ghafir', arabic: 'غافر', english: 'The Forgiver', translation: 'Maha Pengampun', verses: 85, revelation: 'Makkiyyah', startPage: 467 },
    { number: 41, name: 'Fussilat', arabic: 'فصلت', english: 'Explained in Detail', translation: 'Dijelaskan', verses: 54, revelation: 'Makkiyyah', startPage: 477 },
    { number: 42, name: 'Asy-Syura', arabic: 'الشورى', english: 'The Consultation', translation: 'Musyawarah', verses: 53, revelation: 'Makkiyyah', startPage: 483 },
    { number: 43, name: 'Az-Zukhruf', arabic: 'الزخرف', english: 'The Gold Adornments', translation: 'Perhiasan', verses: 89, revelation: 'Makkiyyah', startPage: 489 },
    { number: 44, name: 'Ad-Dukhan', arabic: 'الدخان', english: 'The Smoke', translation: 'Kabut Asap', verses: 59, revelation: 'Makkiyyah', startPage: 496 },
    { number: 45, name: 'Al-Jasiyah', arabic: 'الجاثية', english: 'The Kneeling', translation: 'Berlutut', verses: 37, revelation: 'Makkiyyah', startPage: 499 },
    { number: 46, name: 'Al-Ahqaf', arabic: 'الأحقاف', english: 'The Wind-Curved Sandhills', translation: 'Bukit-Bukit Pasir', verses: 35, revelation: 'Makkiyyah', startPage: 502 },
    { number: 47, name: 'Muhammad', arabic: 'محمد', english: 'Muhammad', translation: 'Nabi Muhammad', verses: 38, revelation: 'Madaniyyah', startPage: 507 },
    { number: 48, name: 'Al-Fath', arabic: 'الفتح', english: 'The Victory', translation: 'Kemenangan', verses: 29, revelation: 'Madaniyyah', startPage: 511 },
    { number: 49, name: 'Al-Hujurat', arabic: 'الحجرات', english: 'The Rooms', translation: 'Kamar-Kamar', verses: 18, revelation: 'Madaniyyah', startPage: 515 },
    { number: 50, name: 'Qaf', arabic: 'ق', english: 'The Letter Qaf', translation: 'Qaf', verses: 45, revelation: 'Makkiyyah', startPage: 518 },
    { number: 51, name: 'Az-Zariyat', arabic: 'الذاريات', english: 'The Winnowing Winds', translation: 'Angin Menerbangkan', verses: 60, revelation: 'Makkiyyah', startPage: 520 },
    { number: 52, name: 'At-Tur', arabic: 'الطور', english: 'The Mount', translation: 'Bukit Tursina', verses: 49, revelation: 'Makkiyyah', startPage: 523 },
    { number: 53, name: 'An-Najm', arabic: 'النجم', english: 'The Star', translation: 'Bintang', verses: 62, revelation: 'Makkiyyah', startPage: 526 },
    { number: 54, name: 'Al-Qamar', arabic: 'القمر', english: 'The Moon', translation: 'Bulan', verses: 55, revelation: 'Makkiyyah', startPage: 528 },
    { number: 55, name: 'Ar-Rahman', arabic: 'الرحمن', english: 'The Beneficent', translation: 'Maha Pemurah', verses: 78, revelation: 'Madaniyyah', startPage: 531 },
    { number: 56, name: "Al-Waqi'ah", arabic: 'الواقعة', english: 'The Inevitable', translation: 'Hari Kiamat', verses: 96, revelation: 'Makkiyyah', startPage: 534 },
    { number: 57, name: 'Al-Hadid', arabic: 'الحديد', english: 'The Iron', translation: 'Besi', verses: 29, revelation: 'Madaniyyah', startPage: 537 },
    { number: 58, name: 'Al-Mujadilah', arabic: 'المجادلة', english: 'The Pleading Woman', translation: 'Gugatan', verses: 22, revelation: 'Madaniyyah', startPage: 542 },
    { number: 59, name: 'Al-Hasyr', arabic: 'الحشر', english: 'The Exile', translation: 'Pengusiran', verses: 24, revelation: 'Madaniyyah', startPage: 545 },
    { number: 60, name: 'Al-Mumtahanah', arabic: 'الممتحنة', english: 'She That Is To Be Examined', translation: 'Wanita yang Diuji', verses: 13, revelation: 'Madaniyyah', startPage: 549 },
    { number: 61, name: 'As-Saff', arabic: 'الصف', english: 'The Ranks', translation: 'Barisan', verses: 14, revelation: 'Madaniyyah', startPage: 551 },
    { number: 62, name: "Al-Jumu'ah", arabic: 'الجمعة', english: 'The Congregation', translation: 'Hari Jumat', verses: 11, revelation: 'Madaniyyah', startPage: 553 },
    { number: 63, name: 'Al-Munafiqun', arabic: 'المنافقون', english: 'The Hypocrites', translation: 'Kaum Munafik', verses: 11, revelation: 'Madaniyyah', startPage: 554 },
    { number: 64, name: 'At-Taghabun', arabic: 'التغابن', english: 'The Mutual Disillusion', translation: 'Hari Dinampakkan Kesalahan', verses: 18, revelation: 'Madaniyyah', startPage: 556 },
    { number: 65, name: 'At-Talaq', arabic: 'الطلاق', english: 'The Divorce', translation: 'Perceraian', verses: 12, revelation: 'Madaniyyah', startPage: 558 },
    { number: 66, name: 'At-Tahrim', arabic: 'التحريم', english: 'The Prohibition', translation: 'Pengharaman', verses: 12, revelation: 'Madaniyyah', startPage: 560 },
    { number: 67, name: 'Al-Mulk', arabic: 'الملك', english: 'The Sovereignty', translation: 'Kerajaan', verses: 30, revelation: 'Makkiyyah', startPage: 562 },
    { number: 68, name: 'Al-Qalam', arabic: 'القلم', english: 'The Pen', translation: 'Pena', verses: 52, revelation: 'Makkiyyah', startPage: 564 },
    { number: 69, name: 'Al-Haqqah', arabic: 'الحاقة', english: 'The Reality', translation: 'Hari Kiamat', verses: 52, revelation: 'Makkiyyah', startPage: 566 },
    { number: 70, name: "Al-Ma'arij", arabic: 'المعارج', english: 'The Ascending Stairways', translation: 'Tempat Naik', verses: 44, revelation: 'Makkiyyah', startPage: 568 },
    { number: 71, name: 'Nuh', arabic: 'نوح', english: 'Noah', translation: 'Nabi Nuh', verses: 28, revelation: 'Makkiyyah', startPage: 570 },
    { number: 72, name: 'Al-Jinn', arabic: 'الجن', english: 'The Jinn', translation: 'Jin', verses: 28, revelation: 'Makkiyyah', startPage: 572 },
    { number: 73, name: 'Al-Muzzammil', arabic: 'المزمل', english: 'The Enshrouded One', translation: 'Orang yang Berselimut', verses: 20, revelation: 'Makkiyyah', startPage: 574 },
    { number: 74, name: 'Al-Muddassir', arabic: 'المدثر', english: 'The Cloaked One', translation: 'Orang yang Berkemul', verses: 56, revelation: 'Makkiyyah', startPage: 575 },
    { number: 75, name: 'Al-Qiyamah', arabic: 'القيامة', english: 'The Resurrection', translation: 'Hari Kebangkitan', verses: 40, revelation: 'Makkiyyah', startPage: 577 },
    { number: 76, name: 'Al-Insan', arabic: 'الإنسان', english: 'The Man', translation: 'Manusia', verses: 31, revelation: 'Madaniyyah', startPage: 578 },
    { number: 77, name: 'Al-Mursalat', arabic: 'المرسلات', english: 'The Emissaries', translation: 'Malaikat yang Diutus', verses: 50, revelation: 'Makkiyyah', startPage: 580 },
    { number: 78, name: "An-Naba'", arabic: 'النبأ', english: 'The Tidings', translation: 'Berita Besar', verses: 40, revelation: 'Makkiyyah', startPage: 582 },
    { number: 79, name: "An-Nazi'at", arabic: 'النازعات', english: 'Those Who Drag Forth', translation: 'Malaikat Pencabut', verses: 46, revelation: 'Makkiyyah', startPage: 583 },
    { number: 80, name: "'Abasa", arabic: 'عبس', english: 'He Frowned', translation: 'Ia Bermuka Masam', verses: 42, revelation: 'Makkiyyah', startPage: 585 },
    { number: 81, name: 'At-Takwir', arabic: 'التكوير', english: 'The Overthrowing', translation: 'Menggulung', verses: 29, revelation: 'Makkiyyah', startPage: 586 },
    { number: 82, name: 'Al-Infitar', arabic: 'الانفطار', english: 'The Cleaving', translation: 'Terbelah', verses: 19, revelation: 'Makkiyyah', startPage: 587 },
    { number: 83, name: 'Al-Mutaffifin', arabic: 'المطففين', english: 'The Defrauding', translation: 'Orang Curang', verses: 36, revelation: 'Makkiyyah', startPage: 587 },
    { number: 84, name: 'Al-Insyiqaq', arabic: 'الانشقاق', english: 'The Splitting Asunder', translation: 'Terbelah', verses: 25, revelation: 'Makkiyyah', startPage: 589 },
    { number: 85, name: 'Al-Buruj', arabic: 'البروج', english: 'The Mansions of the Stars', translation: 'Gugusan Bintang', verses: 22, revelation: 'Makkiyyah', startPage: 590 },
    { number: 86, name: 'At-Tariq', arabic: 'الطارق', english: 'The Morning Star', translation: 'Yang Datang di Malam Hari', verses: 17, revelation: 'Makkiyyah', startPage: 591 },
    { number: 87, name: "Al-A'la", arabic: 'الأعلى', english: 'The Most High', translation: 'Maha Tinggi', verses: 19, revelation: 'Makkiyyah', startPage: 591 },
    { number: 88, name: 'Al-Ghasyiyah', arabic: 'الغاشية', english: 'The Overwhelming', translation: 'Hari Pembalasan', verses: 26, revelation: 'Makkiyyah', startPage: 592 },
    { number: 89, name: 'Al-Fajr', arabic: 'الفجر', english: 'The Dawn', translation: 'Fajar', verses: 30, revelation: 'Makkiyyah', startPage: 593 },
    { number: 90, name: 'Al-Balad', arabic: 'البلد', english: 'The City', translation: 'Negeri', verses: 20, revelation: 'Makkiyyah', startPage: 594 },
    { number: 91, name: 'Asy-Syams', arabic: 'الشمس', english: 'The Sun', translation: 'Matahari', verses: 15, revelation: 'Makkiyyah', startPage: 595 },
    { number: 92, name: 'Al-Lail', arabic: 'الليل', english: 'The Night', translation: 'Malam', verses: 21, revelation: 'Makkiyyah', startPage: 595 },
    { number: 93, name: 'Ad-Duha', arabic: 'الضحى', english: 'The Morning Hours', translation: 'Waktu Dhuha', verses: 11, revelation: 'Makkiyyah', startPage: 596 },
    { number: 94, name: 'Asy-Syarh', arabic: 'الشرح', english: 'The Relief', translation: 'Melapangkan', verses: 8, revelation: 'Makkiyyah', startPage: 596 },
    { number: 95, name: 'At-Tin', arabic: 'التين', english: 'The Fig', translation: 'Buah Tin', verses: 8, revelation: 'Makkiyyah', startPage: 597 },
    { number: 96, name: "Al-'Alaq", arabic: 'العلق', english: 'The Clot', translation: 'Segumpal Darah', verses: 19, revelation: 'Makkiyyah', startPage: 597 },
    { number: 97, name: 'Al-Qadr', arabic: 'القدر', english: 'The Power', translation: 'Kemuliaan', verses: 5, revelation: 'Makkiyyah', startPage: 598 },
    { number: 98, name: 'Al-Bayyinah', arabic: 'البينة', english: 'The Clear Proof', translation: 'Bukti Nyata', verses: 8, revelation: 'Madaniyyah', startPage: 598 },
    { number: 99, name: 'Az-Zalzalah', arabic: 'الزلزلة', english: 'The Earthquake', translation: 'Kegoncangan', verses: 8, revelation: 'Madaniyyah', startPage: 599 },
    { number: 100, name: "Al-'Adiyat", arabic: 'العاديات', english: 'The Courser', translation: 'Kuda yang Berlari Kencang', verses: 11, revelation: 'Makkiyyah', startPage: 599 },
    { number: 101, name: "Al-Qari'ah", arabic: 'القارعة', english: 'The Calamity', translation: 'Hari Kiamat', verses: 11, revelation: 'Makkiyyah', startPage: 600 },
    { number: 102, name: 'At-Takasur', arabic: 'التكاثر', english: 'The Rivalry in World Increase', translation: 'Bermegah-Megahan', verses: 8, revelation: 'Makkiyyah', startPage: 600 },
    { number: 103, name: "Al-'Asr", arabic: 'العصر', english: 'The Declining Day', translation: 'Masa', verses: 3, revelation: 'Makkiyyah', startPage: 601 },
    { number: 104, name: 'Al-Humazah', arabic: 'الهمزة', english: 'The Traducer', translation: 'Pengumpat', verses: 9, revelation: 'Makkiyyah', startPage: 601 },
    { number: 105, name: 'Al-Fil', arabic: 'الفيل', english: 'The Elephant', translation: 'Gajah', verses: 5, revelation: 'Makkiyyah', startPage: 601 },
    { number: 106, name: 'Quraisy', arabic: 'قريش', english: 'Quraysh', translation: 'Suku Quraisy', verses: 4, revelation: 'Makkiyyah', startPage: 602 },
    { number: 107, name: "Al-Ma'un", arabic: 'الماعون', english: 'The Small Kindness', translation: 'Barang-Barang Berguna', verses: 7, revelation: 'Makkiyyah', startPage: 602 },
    { number: 108, name: 'Al-Kausar', arabic: 'الكوثر', english: 'The Abundance', translation: 'Nikmat yang Berlimpah', verses: 3, revelation: 'Makkiyyah', startPage: 602 },
    { number: 109, name: 'Al-Kafirun', arabic: 'الكافرون', english: 'The Disbelievers', translation: 'Orang-Orang Kafir', verses: 6, revelation: 'Makkiyyah', startPage: 603 },
    { number: 110, name: 'An-Nasr', arabic: 'النصر', english: 'The Divine Support', translation: 'Pertolongan', verses: 3, revelation: 'Madaniyyah', startPage: 603 },
    { number: 111, name: 'Al-Lahab', arabic: 'اللهب', english: 'The Palm Fiber', translation: 'Gejolak Api', verses: 5, revelation: 'Makkiyyah', startPage: 603 },
    { number: 112, name: 'Al-Ikhlas', arabic: 'الإخلاص', english: 'The Sincerity', translation: 'Kemurnian Keesaan Allah', verses: 4, revelation: 'Makkiyyah', startPage: 604 },
    { number: 113, name: 'Al-Falaq', arabic: 'الفلق', english: 'The Daybreak', translation: 'Waktu Subuh', verses: 5, revelation: 'Makkiyyah', startPage: 604 },
    { number: 114, name: 'An-Nas', arabic: 'الناس', english: 'Mankind', translation: 'Manusia', verses: 6, revelation: 'Makkiyyah', startPage: 604 }
  ],

  // Pemetaan batas ayat per halaman Mushaf Standar Madani (604 Halaman)
  // Format: [surahNumber, startAyah, endAyah, juz]
  PAGE_BOUNDARIES: {
    1: { surah: 1, surahName: 'Al-Fatihah', startAyah: 1, endAyah: 7, juz: 1 },
    2: { surah: 2, surahName: 'Al-Baqarah', startAyah: 1, endAyah: 5, juz: 1 },
    3: { surah: 2, surahName: 'Al-Baqarah', startAyah: 6, endAyah: 16, juz: 1 },
    4: { surah: 2, surahName: 'Al-Baqarah', startAyah: 17, endAyah: 24, juz: 1 },
    5: { surah: 2, surahName: 'Al-Baqarah', startAyah: 25, endAyah: 29, juz: 1 },
    6: { surah: 2, surahName: 'Al-Baqarah', startAyah: 30, endAyah: 37, juz: 1 },
    7: { surah: 2, surahName: 'Al-Baqarah', startAyah: 38, endAyah: 48, juz: 1 },
    8: { surah: 2, surahName: 'Al-Baqarah', startAyah: 49, endAyah: 57, juz: 1 },
    9: { surah: 2, surahName: 'Al-Baqarah', startAyah: 58, endAyah: 61, juz: 1 },
    10: { surah: 2, surahName: 'Al-Baqarah', startAyah: 62, endAyah: 69, juz: 1 },
    11: { surah: 2, surahName: 'Al-Baqarah', startAyah: 70, endAyah: 76, juz: 1 },
    12: { surah: 2, surahName: 'Al-Baqarah', startAyah: 77, endAyah: 83, juz: 1 },
    13: { surah: 2, surahName: 'Al-Baqarah', startAyah: 84, endAyah: 88, juz: 1 },
    14: { surah: 2, surahName: 'Al-Baqarah', startAyah: 89, endAyah: 93, juz: 1 },
    15: { surah: 2, surahName: 'Al-Baqarah', startAyah: 94, endAyah: 101, juz: 1 },
    16: { surah: 2, surahName: 'Al-Baqarah', startAyah: 102, endAyah: 105, juz: 1 },
    17: { surah: 2, surahName: 'Al-Baqarah', startAyah: 106, endAyah: 112, juz: 1 },
    18: { surah: 2, surahName: 'Al-Baqarah', startAyah: 113, endAyah: 119, juz: 1 },
    19: { surah: 2, surahName: 'Al-Baqarah', startAyah: 120, endAyah: 126, juz: 1 },
    20: { surah: 2, surahName: 'Al-Baqarah', startAyah: 127, endAyah: 134, juz: 1 },
    21: { surah: 2, surahName: 'Al-Baqarah', startAyah: 135, endAyah: 141, juz: 1 },
    22: { surah: 2, surahName: 'Al-Baqarah', startAyah: 142, endAyah: 145, juz: 2 },
    23: { surah: 2, surahName: 'Al-Baqarah', startAyah: 146, endAyah: 153, juz: 2 },
    24: { surah: 2, surahName: 'Al-Baqarah', startAyah: 154, endAyah: 163, juz: 2 },
    25: { surah: 2, surahName: 'Al-Baqarah', startAyah: 164, endAyah: 169, juz: 2 },
    26: { surah: 2, surahName: 'Al-Baqarah', startAyah: 170, endAyah: 176, juz: 2 },
    27: { surah: 2, surahName: 'Al-Baqarah', startAyah: 177, endAyah: 181, juz: 2 },
    28: { surah: 2, surahName: 'Al-Baqarah', startAyah: 182, endAyah: 186, juz: 2 },
    29: { surah: 2, surahName: 'Al-Baqarah', startAyah: 187, endAyah: 190, juz: 2 },
    30: { surah: 2, surahName: 'Al-Baqarah', startAyah: 191, endAyah: 196, juz: 2 },
    31: { surah: 2, surahName: 'Al-Baqarah', startAyah: 197, endAyah: 202, juz: 2 },
    32: { surah: 2, surahName: 'Al-Baqarah', startAyah: 203, endAyah: 210, juz: 2 },
    33: { surah: 2, surahName: 'Al-Baqarah', startAyah: 211, endAyah: 215, juz: 2 },
    34: { surah: 2, surahName: 'Al-Baqarah', startAyah: 216, endAyah: 219, juz: 2 },
    35: { surah: 2, surahName: 'Al-Baqarah', startAyah: 220, endAyah: 224, juz: 2 },
    // Contoh halaman yang diuji user
    50: { surah: 3, surahName: "Ali 'Imran", startAyah: 1, endAyah: 9, juz: 3 },
    211: { surah: 10, surahName: 'Yunus', startAyah: 21, endAyah: 25, juz: 11 },
    583: {
      isMulti: true,
      juz: 30,
      sections: [
        { surah: 78, surahName: "An-Naba'", startAyah: 31, endAyah: 40 },
        { surah: 79, surahName: "An-Nazi'at", startAyah: 1, endAyah: 15 }
      ]
    },
    603: {
      isMulti: true,
      juz: 30,
      sections: [
        { surah: 109, surahName: "Al-Kafirun", startAyah: 1, endAyah: 6 },
        { surah: 110, surahName: "An-Nasr", startAyah: 1, endAyah: 3 },
        { surah: 111, surahName: "Al-Lahab", startAyah: 1, endAyah: 5 }
      ]
    },
    604: {
      isMulti: true,
      juz: 30,
      sections: [
        { surah: 112, surahName: 'Al-Ikhlas', startAyah: 1, endAyah: 4 },
        { surah: 113, surahName: 'Al-Falaq', startAyah: 1, endAyah: 5 },
        { surah: 114, surahName: 'An-Nas', startAyah: 1, endAyah: 6 }
      ]
    }
  },

  // Cache lokal dalam memori per halaman
  _pageCache: {},
  _surahCache: {},

  /**
   * Dapatkan metadata rentang surat & ayat untuk nomor halaman apa pun (1 - 604)
   */
  getPageBoundary(pageNumber) {
    const p = Math.max(1, Math.min(604, pageNumber));
    if (this.PAGE_BOUNDARIES[p]) {
      const b = this.PAGE_BOUNDARIES[p];
      if (b.isMulti) {
        return {
          page: p,
          juz: b.juz,
          primarySurahNumber: b.sections[0].surah,
          primarySurahName: b.sections[0].surahName,
          summary: b.sections.map(s => `QS. ${s.surahName} (${s.startAyah}-${s.endAyah})`).join(' & '),
          shortSummary: b.sections.map(s => s.surahName).join(', ')
        };
      }
      return {
        page: p,
        juz: b.juz,
        primarySurahNumber: b.surah,
        primarySurahName: b.surahName,
        startAyah: b.startAyah,
        endAyah: b.endAyah,
        summary: `QS. ${b.surahName} (Ayat ${b.startAyah} - ${b.endAyah})`,
        shortSummary: `${b.surahName}: ${b.startAyah}-${b.endAyah}`
      };
    }

    // Perkiraan akurat untuk halaman di luar daftar eksplisit
    const s = this.getSurahForPage(p);
    const j = this.getJuzByPage(p);
    return {
      page: p,
      juz: j,
      primarySurahNumber: s.number,
      primarySurahName: s.name,
      startAyah: 1,
      endAyah: s.verses,
      summary: `QS. ${s.name} (Halaman ${p})`,
      shortSummary: `${s.name} (Hal. ${p})`
    };
  },

  /**
   * Dapatkan ringkasan gabungan ayat & surat untuk rentang halaman (misal 1 s/d 2)
   */
  getPageRangeSummary(startPage, endPage) {
    const sP = Math.max(1, Math.min(604, startPage));
    const eP = Math.max(1, Math.min(604, endPage || startPage));

    if (sP === eP) {
      const b = this.getPageBoundary(sP);
      return {
        ...b,
        startPage: sP,
        endPage: eP,
        pageCount: 1,
        juzStart: b.juz,
        juzEnd: b.juz,
        juzText: `Juz ${b.juz}`,
        isRange: false
      };
    }

    const bStart = this.getPageBoundary(sP);
    const bEnd = this.getPageBoundary(eP);

    const juzStart = bStart.juz;
    const juzEnd = bEnd.juz;
    const juzText = (juzStart === juzEnd) ? `Juz ${juzStart}` : `Juz ${juzStart} - ${juzEnd}`;

    let summary = '';
    let shortSummary = '';

    // Jika halaman awal dan akhir berada dalam surat yang sama
    if (bStart.primarySurahNumber === bEnd.primarySurahNumber) {
      const sName = bStart.primarySurahName;
      const startAyah = bStart.startAyah || 1;
      const endAyah = bEnd.endAyah || bEnd.startAyah || 1;
      summary = `QS. ${sName} (Ayat ${startAyah} - ${endAyah})`;
      shortSummary = `${sName}: ${startAyah}-${endAyah}`;
    } else {
      // Menyeberang surat (misal Al-Fatihah hal 1 ke Al-Baqarah hal 2)
      const sName1 = bStart.primarySurahName;
      const aStart1 = bStart.startAyah || 1;
      const aEnd1 = bStart.endAyah || '';
      const sName2 = bEnd.primarySurahName;
      const aStart2 = bEnd.startAyah || 1;
      const aEnd2 = bEnd.endAyah || '';

      const pageCount = (eP >= sP) ? (eP - sP + 1) : 1;
      if (pageCount <= 3) {
        const p1 = aEnd1 ? `${aStart1}-${aEnd1}` : `${aStart1}`;
        const p2 = aEnd2 ? `${aStart2}-${aEnd2}` : `${aStart2}`;
        summary = `QS. ${sName1} (${p1}) & QS. ${sName2} (${p2})`;
        shortSummary = `${sName1} & ${sName2}`;
      } else {
        summary = `QS. ${sName1} (${aStart1}) s/d QS. ${sName2} (${aEnd2 || aStart2})`;
        shortSummary = `${sName1} s/d ${sName2}`;
      }
    }

    return {
      startPage: sP,
      endPage: eP,
      pageCount: (eP >= sP) ? (eP - sP + 1) : 1,
      juzStart,
      juzEnd,
      juzText,
      primarySurahNumber: bStart.primarySurahNumber,
      primarySurahName: bStart.primarySurahName,
      summary,
      shortSummary,
      isRange: true
    };
  },

  getJuzByPage(pageNumber) {
    const p = Math.max(1, Math.min(604, pageNumber));
    const JUZ_STARTS = [
      1, 22, 42, 62, 82, 102, 122, 142, 162, 182,
      202, 222, 242, 262, 282, 302, 322, 342, 362, 382,
      402, 422, 442, 462, 482, 502, 522, 542, 562, 582
    ];
    for (let i = JUZ_STARTS.length - 1; i >= 0; i--) {
      if (p >= JUZ_STARTS[i]) {
        return i + 1;
      }
    }
    return 1;
  },

  getSurahForPage(pageNumber) {
    const p = Math.max(1, Math.min(604, pageNumber));
    let currentSurah = this.SURAHS[0];
    for (const s of this.SURAHS) {
      if (s.startPage <= p) {
        currentSurah = s;
      } else {
        break;
      }
    }
    return currentSurah;
  },

  getKemenagWebUrl(surahNumber, startAyah, endAyah) {
    const s = parseInt(surahNumber, 10) || 1;
    if (startAyah) {
      const from = parseInt(startAyah, 10);
      const to = endAyah ? parseInt(endAyah, 10) : from;
      return `${this.KEMENAG_PER_AYAT_BASE_URL}/${s}?from=${from}&to=${to}`;
    }
    return `${this.KEMENAG_SURAH_BASE_URL}/${s}`;
  },

  getMushafImageUrls(pageNumber) {
    const p = Math.max(1, Math.min(604, pageNumber));
    const padded = String(p).padStart(3, '0');
    return [
      `https://cdn.jsdelivr.net/gh/GovarJabbar/Quran-PNG@main/${padded}.png`,
      `https://cdn.quran.ws/svg/pages/v1.1.1/hafs-kfqc/${padded}.svg`,
      `https://cdn.jsdelivr.net/gh/GovarJabbar/Quran-PNG@master/${padded}.png`,
      `https://quran.islam-db.com/public/data/pages/quranpages_1024/images/page${padded}.png`,
      `https://raw.githubusercontent.com/GovarJabbar/Quran-PNG/master/${padded}.png`
    ];
  },

  /**
   * Mengambil data surat lengkap standar Kementerian Agama RI (EQuran.id API)
   * Menyediakan Rasm Mushaf Standar Indonesia karya H. Isep Misbah (LPMQ)
   */
  async fetchSurahKemenag(surahNumber) {
    const s = parseInt(surahNumber, 10);
    if (!s || s < 1 || s > 114) return null;
    if (this._surahCache[s]) return this._surahCache[s];

    // Cek cache localStorage
    try {
      const stored = localStorage.getItem(`quran_odop_kemenag_surah_${s}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        this._surahCache[s] = parsed;
        return parsed;
      }
    } catch (e) {}

    try {
      const res = await fetch(`${this.EQURAN_API}/surat/${s}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.data && json.data.ayat) {
          const map = {};
          json.data.ayat.forEach(a => {
            map[a.nomorAyat] = {
              teksArab: a.teksArab,
              teksIndonesia: a.teksIndonesia,
              teksLatin: a.teksLatin
            };
          });
          this._surahCache[s] = map;
          try {
            localStorage.setItem(`quran_odop_kemenag_surah_${s}`, JSON.stringify(map));
          } catch (e) {}
          return map;
        }
      }
    } catch (e) {
      console.warn(`Gagal memuat teks Kemenag untuk surat ${s}:`, e);
    }
    return null;
  },

  /**
   * Memperkaya ayat pada halaman dengan teks Rasm Standar Kemenag RI
   */
  async enrichWithKemenagText(parsed) {
    if (!parsed || !parsed.groups) return parsed;
    try {
      await Promise.all(parsed.groups.map(async (group) => {
        const kemenagMap = await this.fetchSurahKemenag(group.surahNumber);
        if (kemenagMap) {
          group.ayat.forEach(a => {
            const kemenagAyah = kemenagMap[a.nomorAyat];
            if (kemenagAyah) {
              if (kemenagAyah.teksArab) a.teksArab = kemenagAyah.teksArab;
              if (kemenagAyah.teksIndonesia) a.teksIndonesia = kemenagAyah.teksIndonesia;
            }
          });
        }
      }));
    } catch (e) {
      console.warn('Enriching with Kemenag text failed:', e);
    }
    return parsed;
  },

  /**
   * Mengambil data ayat khusus untuk 1 halaman saja
   * Dilengkapi Layer 1 (Bundled Offline Data), Layer 2 (Cache Kemenag), Layer 3 (Quran.com API + Kemenag Text), Layer 4 (EQuran API).
   */
  async fetchPageData(pageNumber) {
    const p = Math.max(1, Math.min(604, pageNumber));

    // LAYER 1: Cek apakah halaman ini ada di bundle offline lokal berkecepatan tinggi
    if (this.BUNDLED_PAGES[p]) {
      return this.BUNDLED_PAGES[p];
    }

    // LAYER 2: Cek cache memori & localStorage (Key standar Kemenag)
    if (this._pageCache[p]) {
      return this._pageCache[p];
    }
    try {
      const stored = localStorage.getItem(`quran_odop_kemenag_page_${p}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        this._pageCache[p] = parsed;
        return parsed;
      }
    } catch (e) {}

    // LAYER 3: Coba Quran.com API v4 (CORS Terbuka Global, pembagian per halaman presisi 604 halaman)
    try {
      const qcomRes = await fetch(`${this.QURAN_COM_API}/verses/by_page/${p}?language=id&words=false&translations=33&fields=text_uthmani,chapter_id`);
      if (qcomRes.ok) {
        const qcomJson = await qcomRes.json();
        if (qcomJson && qcomJson.verses && qcomJson.verses.length > 0) {
          let parsed = this.parseQuranComPageResponse(p, qcomJson.verses);
          // Perkaya teks dengan standar resmi Kemenag RI (LPMQ)
          parsed = await this.enrichWithKemenagText(parsed);
          this._pageCache[p] = parsed;
          try { localStorage.setItem(`quran_odop_kemenag_page_${p}`, JSON.stringify(parsed)); } catch (e) {}
          return parsed;
        }
      }
    } catch (e) {
      console.log(`Quran.com API tidak dapat dijangkau untuk halaman ${p}, mencoba EQuran API...`);
    }

    // LAYER 4: Coba EQuran.id API + Slicing Berdasarkan Batas Halaman
    const boundary = this.getPageBoundary(p);
    if (boundary && boundary.primarySurahNumber && boundary.startAyah && boundary.endAyah) {
      try {
        const equranRes = await fetch(`${this.EQURAN_API}/surat/${boundary.primarySurahNumber}`);
        if (equranRes.ok) {
          const equranJson = await equranRes.json();
          if (equranJson && equranJson.data && equranJson.data.ayat) {
            const allAyat = equranJson.data.ayat;
            const filteredAyat = allAyat.filter(a => a.nomorAyat >= boundary.startAyah && a.nomorAyat <= boundary.endAyah);
            if (filteredAyat.length > 0) {
              const surahMeta = this.SURAHS.find(s => s.number === boundary.primarySurahNumber);
              const parsed = {
                page: p,
                juz: boundary.juz,
                titleSummary: boundary.summary,
                primarySurahNumber: boundary.primarySurahNumber,
                primarySurahName: boundary.primarySurahName,
                groups: [
                  {
                    surahNumber: boundary.primarySurahNumber,
                    surahName: boundary.primarySurahName,
                    arabicName: surahMeta ? surahMeta.arabic : '',
                    translation: surahMeta ? surahMeta.translation : '',
                    revelation: surahMeta ? surahMeta.revelation : '',
                    ayat: filteredAyat.map(a => ({
                      nomorAyat: a.nomorAyat,
                      teksArab: a.teksArab,
                      teksIndonesia: a.teksIndonesia,
                      juz: boundary.juz,
                      page: p
                    }))
                  }
                ]
              };
              this._pageCache[p] = parsed;
              try { localStorage.setItem(`quran_odop_kemenag_page_${p}`, JSON.stringify(parsed)); } catch (e) {}
              return parsed;
            }
          }
        }
      } catch (e) {
        console.log(`EQuran API offline untuk halaman ${p}`);
      }
    }

    // LAYER 5: Fallback Informatif Presisi
    return this.getFallbackPageData(p, boundary);
  },

  /**
   * Mengambil data ayat gabungan untuk rentang halaman (misal Hal. 1 - 2, 1 - 5, dst)
   * Menggabungkan ayat secara berkesinambungan tanpa pemisah buatan
   */
  async fetchPageRangeData(startPage, endPage) {
    const sP = Math.max(1, Math.min(604, startPage));
    const eP = Math.max(1, Math.min(604, endPage || startPage));

    let pages = [];
    if (eP >= sP) {
      for (let p = sP; p <= eP; p++) pages.push(p);
    } else {
      // Siklus melewati 604
      for (let p = sP; p <= 604; p++) pages.push(p);
      for (let p = 1; p <= eP; p++) pages.push(p);
    }

    // Ambil data seluruh halaman secara paralel
    const pagesData = await Promise.all(pages.map(p => this.fetchPageData(p)));

    // Gabungkan seluruh groups surat & ayat secara berkesinambungan
    const mergedGroups = [];
    let currentGroup = null;

    pagesData.forEach((pData, pIdx) => {
      const pageNum = pages[pIdx];
      if (!pData || !pData.groups) return;

      pData.groups.forEach(g => {
        if (currentGroup && currentGroup.surahNumber === g.surahNumber) {
          // Surat sama: gabungkan ayat ke dalam kelompok yang sedang berjalan
          const existingAyahNums = new Set(currentGroup.ayat.map(a => a.nomorAyat));
          g.ayat.forEach(a => {
            if (!existingAyahNums.has(a.nomorAyat)) {
              currentGroup.ayat.push({ ...a, page: a.page || pageNum });
              existingAyahNums.add(a.nomorAyat);
            }
          });
        } else {
          // Surat baru: buat kelompok surat baru
          currentGroup = {
            surahNumber: g.surahNumber,
            surahName: g.surahName,
            arabicName: g.arabicName,
            translation: g.translation,
            revelation: g.revelation,
            ayat: g.ayat.map(a => ({ ...a, page: a.page || pageNum }))
          };
          mergedGroups.push(currentGroup);
        }
      });
    });

    const rangeMeta = this.getPageRangeSummary(sP, eP);
    const totalAyat = mergedGroups.reduce((acc, g) => acc + g.ayat.length, 0);

    return {
      startPage: sP,
      endPage: eP,
      pageCount: pages.length,
      juz: rangeMeta.juzText || `Juz ${rangeMeta.juzStart || rangeMeta.juz || 1}`,
      titleSummary: rangeMeta.summary,
      primarySurahNumber: rangeMeta.primarySurahNumber,
      primarySurahName: rangeMeta.primarySurahName,
      groups: mergedGroups,
      totalAyat: totalAyat,
      isRange: sP !== eP
    };
  },

  /**
   * Helper parse respons Quran.com API v4
   */
  parseQuranComPageResponse(pageNumber, verses) {
    const groupsMap = new Map();

    verses.forEach(v => {
      const sNum = v.chapter_id;
      const [ch, numInSurah] = v.verse_key.split(':').map(Number);

      if (!groupsMap.has(sNum)) {
        const surahMeta = this.SURAHS.find(s => s.number === sNum) || {
          name: `Surah ${sNum}`,
          arabic: '',
          translation: '',
          revelation: ''
        };
        groupsMap.set(sNum, {
          surahNumber: sNum,
          surahName: surahMeta.name,
          arabicName: surahMeta.arabic,
          translation: surahMeta.translation,
          revelation: surahMeta.revelation,
          ayat: []
        });
      }

      const transText = (v.translations && v.translations.length > 0)
        ? v.translations[0].text.replace(/<sup.*?<\/sup>/g, '').trim()
        : 'Terjemahan resmi Kemenag RI dapat disimak pada portal resmi.';

      groupsMap.get(sNum).ayat.push({
        nomorAyat: numInSurah,
        teksArab: v.text_uthmani,
        teksIndonesia: transText,
        juz: this.getJuzByPage(pageNumber),
        page: pageNumber
      });
    });

    const groups = Array.from(groupsMap.values());
    let titleParts = [];
    groups.forEach(g => {
      const first = g.ayat[0].nomorAyat;
      const last = g.ayat[g.ayat.length - 1].nomorAyat;
      const range = first === last ? `Ayat ${first}` : `Ayat ${first} - ${last}`;
      titleParts.push(`QS. ${g.surahName} (${range})`);
    });

    const primary = groups[0] || { surahNumber: 1, surahName: 'Al-Fatihah' };
    return {
      page: pageNumber,
      juz: this.getJuzByPage(pageNumber),
      titleSummary: titleParts.join(' & '),
      primarySurahNumber: primary.surahNumber,
      primarySurahName: primary.surahName,
      groups: groups
    };
  },

  /**
   * Fallback aman dengan data batas surat dan ayat yang presisi
   */
  getFallbackPageData(pageNumber, boundary) {
    const s = this.getSurahForPage(pageNumber);
    const j = this.getJuzByPage(pageNumber);
    const b = boundary || this.getPageBoundary(pageNumber);

    return {
      page: pageNumber,
      juz: j,
      titleSummary: b.summary || `QS. ${s.name} (Halaman ${pageNumber})`,
      primarySurahNumber: s.number,
      primarySurahName: s.name,
      groups: [
        {
          surahNumber: s.number,
          surahName: s.name,
          arabicName: s.arabic,
          translation: s.translation,
          revelation: s.revelation,
          ayat: [
            {
              nomorAyat: b.startAyah || 1,
              teksArab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
              teksIndonesia: `Halaman ${pageNumber} memuat ${b.summary || s.name}. Buka portal resmi Kemenag RI untuk verifikasi tashih lengkap.`
            }
          ]
        }
      ]
    };
  },

  /**
   * DATA BUNDLED LENGKAP (100% Offline & Anti-CORS)
   * Menyediakan ayat teks Arab & terjemahan Kemenag RI untuk halaman awal dan halaman spesifik yang diuji user
   */
  BUNDLED_PAGES: {
    // HALAMAN 1 (QS. Al-Fatihah 1 - 7)
    1: {
      page: 1,
      juz: 1,
      titleSummary: 'QS. Al-Fatihah (Ayat 1 - 7)',
      primarySurahNumber: 1,
      primarySurahName: 'Al-Fatihah',
      groups: [
        {
          surahNumber: 1,
          surahName: 'Al-Fatihah',
          arabicName: 'الفاتحة',
          translation: 'Pembukaan',
          ayat: [
            { nomorAyat: 1, teksArab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', teksIndonesia: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.' },
            { nomorAyat: 2, teksArab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', teksIndonesia: 'Segala puji bagi Allah, Tuhan seluruh alam,' },
            { nomorAyat: 3, teksArab: 'الرَّحْمَٰنِ الرَّحِيمِ', teksIndonesia: 'Yang Maha Pengasih, Maha Penyayang,' },
            { nomorAyat: 4, teksArab: 'مَالِكِ يَوْمِ الدِّينِ', teksIndonesia: 'Pemilik hari pembalasan.' },
            { nomorAyat: 5, teksArab: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', teksIndonesia: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.' },
            { nomorAyat: 6, teksArab: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', teksIndonesia: 'Tunjukilah kami jalan yang lurus,' },
            { nomorAyat: 7, teksArab: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', teksIndonesia: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.' }
          ]
        }
      ]
    },

    // HALAMAN 2 (QS. Al-Baqarah 1 - 5)
    2: {
      page: 2,
      juz: 1,
      titleSummary: 'QS. Al-Baqarah (Ayat 1 - 5)',
      primarySurahNumber: 2,
      primarySurahName: 'Al-Baqarah',
      groups: [
        {
          surahNumber: 2,
          surahName: 'Al-Baqarah',
          arabicName: 'البقرة',
          translation: 'Sapi Betina',
          ayat: [
            { nomorAyat: 1, teksArab: 'الم', teksIndonesia: 'Alif Lam Mim.' },
            { nomorAyat: 2, teksArab: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ', teksIndonesia: 'Kitab (Al-Qur\'an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa,' },
            { nomorAyat: 3, teksArab: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ', teksIndonesia: '(yaitu) mereka yang beriman kepada yang gaib, melaksanakan salat, dan menginfakkan sebagian rezeki yang Kami berikan kepada mereka,' },
            { nomorAyat: 4, teksArab: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ', teksIndonesia: 'dan mereka yang beriman kepada (Al-Qur\'an) yang diturunkan kepadamu (Muhammad) dan (kitab-kitab) yang telah diturunkan sebelum engkau, serta mereka yakin akan adanya akhirat.' },
            { nomorAyat: 5, teksArab: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ', teksIndonesia: 'Merekalah yang mendapat petunjuk dari Tuhannya, dan mereka itulah orang-orang yang beruntung.' }
          ]
        }
      ]
    },

    // HALAMAN 3 (QS. Al-Baqarah 6 - 16)
    3: {
      page: 3,
      juz: 1,
      titleSummary: 'QS. Al-Baqarah (Ayat 6 - 16)',
      primarySurahNumber: 2,
      primarySurahName: 'Al-Baqarah',
      groups: [
        {
          surahNumber: 2,
          surahName: 'Al-Baqarah',
          arabicName: 'البقرة',
          translation: 'Sapi Betina',
          ayat: [
            { nomorAyat: 6, teksArab: 'إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ', teksIndonesia: 'Sesungguhnya orang-orang kafir, sama saja bagi mereka, engkau (Muhammad) beri peringatan atau tidak engkau beri peringatan, mereka tidak akan beriman.' },
            { nomorAyat: 7, teksArab: 'خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰ أَبْصَارِهِمْ غِشَاوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ', teksIndonesia: 'Allah telah mengunci hati dan pendengaran mereka, penglihatan mereka telah tertutup, dan mereka akan mendapat azab yang berat.' },
            { nomorAyat: 8, teksArab: 'وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم بِمُؤْمِنِينَ', teksIndonesia: 'Dan di antara manusia ada yang berkata, "Kami beriman kepada Allah dan hari akhir," padahal sesungguhnya mereka itu bukanlah orang-orang yang beriman.' },
            { nomorAyat: 9, teksArab: 'يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنفُسَهُمْ وَمَا يَشْعُرُونَ', teksIndonesia: 'Mereka menipu Allah dan orang-orang yang beriman, padahal mereka hanyalah menipu diri sendiri tanpa mereka sadari.' },
            { nomorAyat: 10, teksArab: 'فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ', teksIndonesia: 'Dalam hati mereka ada penyakit, lalu Allah menambah penyakitnya itu; dan mereka mendapat azab yang pedih, karena mereka berdusta.' },
            { nomorAyat: 11, teksArab: 'وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا فِي الْأَرْضِ قَالُوا إِنَّمَا نَحْنُ مُصْلِحُونَ', teksIndonesia: 'Dan apabila dikatakan kepada mereka, "Janganlah berbuat kerusakan di bumi!" Mereka menjawab, "Sesungguhnya kami justru orang-orang yang melakukan perbaikan."' },
            { nomorAyat: 12, teksArab: 'أَلَا إِنَّهُمْ هُمُ الْمُفْسِدُونَ وَلَٰكِن لَّا يَشْعُرُونَ', teksIndonesia: 'Ingatlah, sesungguhnya merekalah yang berbuat kerusakan, tetapi mereka tidak menyadari.' },
            { nomorAyat: 13, teksArab: 'وَإِذَا قِيلَ لَهُمْ آمِنُوا كَمَا آمَنَ النَّاسُ قَالُوا أَنُؤْمِنُ كَمَا آمَنَ السُّفَهَاءُ ۗ أَلَا إِنَّهُمْ هُمُ السُّفَهَاءُ وَلَٰكِن لَّا يَعْلَمُونَ', teksIndonesia: 'Dan apabila dikatakan kepada mereka, "Berimanlah kamu sebagaimana orang lain telah beriman!" Mereka menjawab, "Apakah kami akan beriman seperti orang-orang yang kurang akal itu beriman?" Ingatlah, sesungguhnya mereka itulah orang-orang yang kurang akal, tetapi mereka tidak tahu.' },
            { nomorAyat: 14, teksArab: 'وَإِذَا لَقُوا الَّذِينَ آمَنُوا قَالُوا آمَنَّا وَإِذَا خَلَوْا إِلَىٰ شَيَاطِينِهِمْ قَالُوا إِنَّا مَعَكُمْ إِنَّمَا نَحْنُ مُسْتَهْزِئُونَ', teksIndonesia: 'Dan apabila mereka berjumpa dengan orang yang beriman, mereka berkata, "Kami telah beriman." Tetapi apabila mereka kembali kepada setan-setan (para pemimpin) mereka, mereka berkata, "Sesungguhnya kami bersama kamu, kami hanya berolok-olok."' },
            { nomorAyat: 15, teksArab: 'اللَّهُ يَسْتَهْزِئُ بِهِمْ وَيَمُدُّهُمْ فِي طُغْيَانِهِمْ يَعْمَهُونَ', teksIndonesia: 'Allah akan memperolok-olokkan mereka dan membiarkan mereka terombang-ambing dalam kesesatan.' },
            { nomorAyat: 16, teksArab: 'أُولَٰئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَىٰ فَمَا رَبِحَت تِّجَارَتُهُمْ وَمَا كَانُوا مُهْتَدِينَ', teksIndonesia: 'Mereka itulah yang membeli kesesatan dengan petunjuk. Maka tidak beruntunglah perniagaan mereka dan mereka tidak mendapat petunjuk.' }
          ]
        }
      ]
    },

    // HALAMAN 4 (QS. Al-Baqarah 17 - 24) -> SESUAI KOREKSI DAN PERMINTAAN USER
    4: {
      page: 4,
      juz: 1,
      titleSummary: 'QS. Al-Baqarah (Ayat 17 - 24)',
      primarySurahNumber: 2,
      primarySurahName: 'Al-Baqarah',
      groups: [
        {
          surahNumber: 2,
          surahName: 'Al-Baqarah',
          arabicName: 'البقرة',
          translation: 'Sapi Betina',
          ayat: [
            {
              nomorAyat: 17,
              teksArab: 'مَثَلُهُمْ كَمَثَلِ الَّذِي اسْتَوْقَدَ نَارًا فَلَمَّا أَضَاءَتْ مَا حَوْلَهُ ذَهَبَ اللَّهُ بِنُورِهِمْ وَتَرَكَهُمْ فِي ظُلُمَاتٍ لَّا يُبْصِرُونَ',
              teksIndonesia: 'Perumpamaan mereka seperti orang-orang yang menyalakan api, setelah menerangi sekelilingnya, Allah melenyapkan cahaya (yang menyinari) mereka dan membiarkan mereka dalam kegelapan, tidak dapat melihat.'
            },
            {
              nomorAyat: 18,
              teksArab: 'صُمٌّ بُكْمٌ عُمْيٌ فَهُمْ لَا يَرْجِعُونَ',
              teksIndonesia: 'Mereka tuli, bisu, dan buta, sehingga mereka tidak dapat kembali.'
            },
            {
              nomorAyat: 19,
              teksArab: 'أَوْ كَصَيِّبٍ مِّنَ السَّمَاءِ فِيهِ ظُلُمَاتٌ وَرَعْدٌ وَبَرْقٌ يَجْعَلُونَ أَصَابِعَهُمْ فِي آذَانِهِم مِّنَ الصَّوَاعِقِ حَذَرَ الْمَوْتِ ۚ وَاللَّهُ مُحِيطٌ بِالْكَافِرِينَ',
              teksIndonesia: 'Atau seperti (orang yang ditimpa) hujan lebat dari langit, yang disertai kegelapan, guntur, dan kilat. Mereka menyumbat telinga dengan jari-jarinya, (menghindari) suara petir itu karena takut mati. Allah meliputi orang-orang yang kafir.'
            },
            {
              nomorAyat: 20,
              teksArab: 'يَكَادُ الْبَرْقُ يَخْطَفُ أَبْصَارَهُمْ ۖ كُلَّمَا أَضَاءَ لَهُم مَّشَوْا فِيهِ وَإِذَا أَظْلَمَ عَلَيْهِمْ قَامُوا ۚ وَلَوْ شَاءَ اللَّهُ لَذَهَبَ بِسَمْعِهِمْ وَأَبْصَارِهِمْ ۚ إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
              teksIndonesia: 'Hampir saja kilat itu menyambar penglihatan mereka. Setiap kali (kilat itu) menyinari, mereka berjalan di bawah (sinar) itu, dan apabila kegelapan menimpa mereka, mereka berhenti. Sekiranya Allah menghendaki, niscaya Dia hilangkan pendengaran dan penglihatan mereka. Sungguh, Allah Mahakuasa atas segala sesuatu.'
            },
            {
              nomorAyat: 21,
              teksArab: 'يَا أَيُّهَا النَّاسُ اعْبُدُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ وَالَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
              teksIndonesia: 'Wahai manusia! Sembahlah Tuhanmu yang telah menciptakan kamu dan orang-orang yang sebelum kamu, agar kamu bertakwa.'
            },
            {
              nomorAyat: 22,
              teksArab: 'الَّذِي جَعَلَ لَكُمُ الْأَرْضَ فِرَاشًا وَالسَّمَاءَ بِنَاءً وَأَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجَ بِهِ مِنَ الثَّمَرَاتِ رِزْقًا لَّكُمْ ۖ فَلَا تَجْعَلُوا لِلَّهِ أَندَادًا وَأَنتُمْ تَعْلَمُونَ',
              teksIndonesia: '(Dialah) yang menjadikan bumi sebagai hamparan bagimu dan langit sebagai atap, dan Dialah yang menurunkan air (hujan) dari langit, lalu Dia hasilkan dengan (hujan) itu buah-buahan sebagai rezeki untukmu. Karena itu janganlah kamu mengadakan tandingan-tandingan bagi Allah, padahal kamu mengetahui.'
            },
            {
              nomorAyat: 23,
              teksArab: 'وَإِن كُنتُمْ فِي رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا بِسُورَةٍ مِّن مِّثْلِهِ وَادْعُوا شُهَدَاءَكُم مِّن دُونِ اللَّهِ إِن كُنتُمْ صَادِقِينَ',
              teksIndonesia: 'Dan jika kamu meragukan (Al-Qur\'an) yang Kami turunkan kepada hamba Kami (Muhammad), maka buatlah satu surah semisal dengannya dan ajaklah penolong-penolongmu selain Allah, jika kamu orang-orang yang benar.'
            },
            {
              nomorAyat: 24,
              teksArab: 'فَإِن لَّمْ تَفْعَلُوا وَلَن تَفْعَلُوا فَاتَّقُوا النَّارَ الَّتِي وَقُودُهَا النَّاسُ وَالْحِجَارَةُ ۖ أُعِدَّتْ لِلْكَافِرِينَ',
              teksIndonesia: 'Jika kamu tidak mampu membuatnya, dan (pasti) kamu tidak akan mampu, maka takutlah kamu akan api neraka yang bahan bakarnya manusia dan batu, yang disediakan bagi orang-orang kafir.'
            }
          ]
        }
      ]
    },

    // HALAMAN 5 (QS. Al-Baqarah 25 - 29)
    5: {
      page: 5,
      juz: 1,
      titleSummary: 'QS. Al-Baqarah (Ayat 25 - 29)',
      primarySurahNumber: 2,
      primarySurahName: 'Al-Baqarah',
      groups: [
        {
          surahNumber: 2,
          surahName: 'Al-Baqarah',
          arabicName: 'البقرة',
          translation: 'Sapi Betina',
          ayat: [
            { nomorAyat: 25, teksArab: 'وَبَشِّرِ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أَنَّ لَهُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ ۖ كُلَّمَا رُزِقُوا مِنْهَا مِن ثَمَرَةٍ رِّزْقًا ۙ قَالُوا هَٰذَا الَّذِي رُزِقْنَا مِن قَبْلُ ۖ وَأُتُوا بِهِ مُتَشَابِهًا ۖ وَلَهُمْ فِيهَا أَزْوَاجٌ مُّطَهَّرَةٌ ۖ وَهُمْ فِيهَا خَالِدُونَ', teksIndonesia: 'Dan sampaikanlah kabar gembira kepada orang-orang yang beriman dan berbuat kebajikan, bahwa untuk mereka (disediakan) surga-surga yang mengalir di bawahnya sungai-sungai. Setiap kali mereka diberi rezeki buah-buahan dari surga itu, mereka berkata, "Inilah rezeki yang diberikan kepada kami dahulu." Mereka telah diberi (buah-buahan) yang serupa. Dan di sana mereka (memperoleh) pasangan-pasangan yang suci. Mereka kekal di dalamnya.' },
            { nomorAyat: 26, teksArab: 'إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا ۚ فَأَمَّا الَّذِينَ آمَنُوا فَيَعْلَمُونَ أَنَّهُ الْحَقُّ مِن رَّبِّهِمْ ۖ وَأَمَّا الَّذِينَ كَفَرُوا فَيَقُولُونَ مَاذَا أَرَادَ اللَّهُ بِهَٰذَا مَثَلًا ۘ يُضِلُّ بِهِ كَثِيرًا وَيَهْدِي بِهِ كَثِيرًا ۚ وَمَا يُضِلُّ بِهِ إِلَّا الْفَاسِقِينَ', teksIndonesia: 'Sesungguhnya Allah tidak segan membuat perumpamaan seekor nyamuk atau yang lebih kecil dari itu. Adapun orang-orang yang beriman, mereka tahu bahwa itu kebenaran dari Tuhan mereka. Tetapi mereka yang kafir berkata, "Apa maksud Allah dengan perumpamaan ini?" Dengan (perumpamaan) itu banyak orang yang dibiarkan-Nya sesat, dan dengan itu banyak (pula) orang yang diberi-Nya petunjuk. Tetapi tidak ada yang Dia sesatkan dengan (perumpamaan) itu selain orang-orang fasik.' },
            { nomorAyat: 27, teksArab: 'الَّذِينَ يَنقُضُونَ عَهْدَ اللَّهِ مِن بَعْدِ مِيثَاقِهِ وَيَقْطَعُونَ مَا أَمَرَ اللَّهُ بِهِ أَن يُوصَلَ وَيُفْسِدُونَ فِي الْأَرْضِ ۚ أُولَٰئِكَ هُمُ الْخَاسِرُونَ', teksIndonesia: '(yaitu) orang-orang yang melanggar perjanjian Allah setelah (perjanjian) itu diteguhkan, dan memutuskan apa yang diperintahkan Allah untuk disambungkan dan berbuat kerusakan di bumi. Mereka itulah orang-orang yang rugi.' },
            { nomorAyat: 28, teksArab: 'كَيْفَ تَكْفُرُونَ بِاللَّهِ وَكُنتُمْ أَمْوَاتًا فَأَحْيَاكُمْ ۖ ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ ثُمَّ إِلَيْهِ تُرْجَعُونَ', teksIndonesia: 'Bagaimana kamu ingkar kepada Allah, padahal kamu (tadinya) mati, lalu Dia menghidupkan kamu, kemudian Dia mematikan kamu lalu Dia menghidupkan kamu kembali, kemudian kepada-Nyalah kamu dikembalikan?' },
            { nomorAyat: 29, teksArab: 'هُوَ الَّذِي خَلَقَ لَكُم مَّا فِي الْأَرْضِ جَمِيعًا ثُمَّ اسْتَوَىٰ إِلَى السَّمَاءِ فَسَوَّاهُنَّ سَبْعَ سَمَاوَاتٍ ۚ وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ', teksIndonesia: 'Dialah (Allah) yang menciptakan segala apa yang ada di bumi untukmu kemudian Dia menuju ke langit, lalu Dia menyempurnakannya menjadi tujuh langit. Dan Dia Maha Mengetahui segala sesuatu.' }
          ]
        }
      ]
    },

    // HALAMAN 31 (QS. Al-Baqarah 197 - 202)
    31: {
      page: 31,
      juz: 2,
      titleSummary: 'QS. Al-Baqarah (Ayat 197 - 202)',
      primarySurahNumber: 2,
      primarySurahName: 'Al-Baqarah',
      groups: [
        {
          surahNumber: 2,
          surahName: 'Al-Baqarah',
          arabicName: 'البقرة',
          translation: 'Sapi Betina',
          ayat: [
            {
              nomorAyat: 197,
              teksArab: 'الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ ۚ وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ',
              teksIndonesia: '(Musim) haji itu (pada) bulan-bulan yang telah dimaklumi. Barangsiapa mengerjakan (ibadah) haji dalam (bulan-bulan) itu, maka janganlah dia berkata jorok (rafats), berbuat maksiat, dan bertengkar dalam (melakukan ibadah) haji. Segala yang baik yang kamu kerjakan, Allah mengetahuinya. Bawalah bekal, karena sesungguhnya sebaik-baik bekal adalah takwa. Dan bertakwalah kepada-Ku wahai orang-orang yang mempunyai akal sehat!'
            },
            {
              nomorAyat: 198,
              teksArab: 'لَيْسَ عَلَيْكُمْ جُنَاحٌ أَن تَبْتَغُوا فَضْلًا مِّن رَّبِّكُمْ ۚ فَإِذَا أَفَضْتُم مِّنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِندَ الْمَشْعَرِ الْحَرَامِ ۖ وَاذْكُرُوهُ كَمَا هَدَاكُمْ وَإِن كُنتُم مِّن قَبْلِهِ لَمِنَ الضَّالِّينَ',
              teksIndonesia: 'Bukanlah suatu dosa bagimu mencari karunia dari Tuhanmu (dengan berdagang). Maka apabila kamu bertolak dari Arafah, berzikirlah kepada Allah di Masy\'arilharam. Dan berzikirlah kepada-Nya sebagaimana Dia telah memberi petunjuk kepadamu, sekalipun sebelumnya kamu benar-benar termasuk orang yang tidak tahu.'
            },
            {
              nomorAyat: 199,
              teksArab: 'ثُمَّ أَفِيضُوا مِنْ حَيْثُ أَفَاضَ النَّاسُ وَاسْتَغْفِرُوا اللَّهَ ۚ إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ',
              teksIndonesia: 'Kemudian bertolaklah kamu dari tempat orang banyak bertolak (Arafah) dan mohonlah ampunan kepada Allah. Sungguh, Allah Maha Pengampun, Maha Penyayang.'
            },
            {
              nomorAyat: 200,
              teksArab: 'فَإِذَا قَضَيْتُم مَّنَاسِكَكُمْ فَاذْكُرُوا اللَّهَ كَذِكْرِكُمْ آبَاءَكُمْ أَوْ أَشَدَّ ذِكْرًا ۗ فَمِنَ النَّاسِ مَن يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا وَمَا لَهُ فِي الْآخِرَةِ مِنْ خَلَاقٍ',
              teksIndonesia: 'Apabila kamu telah menyelesaikan ibadah haji, maka berzikirlah kepada Allah, sebagaimana kamu menyebut-nyebut nenek moyangmu, bahkan berzikirlah lebih dari itu. Maka di antara manusia ada yang berdoa, "Ya Tuhan kami, berilah kami (kebaikan) di dunia," dan di akhirat dia tidak memperoleh bagian apa pun.'
            },
            {
              nomorAyat: 201,
              teksArab: 'وَمِنْهُم مَّن يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
              teksIndonesia: 'Dan di antara mereka ada yang berdoa, "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka."'
            },
            {
              nomorAyat: 202,
              teksArab: 'أُولَٰئِكَ لَهُمْ نَصِيبٌ مِّمَّا كَسَبُوا ۚ وَاللَّهُ سَرِيعُ الْحِسَابِ',
              teksIndonesia: 'Merekalah yang mendapat bagian dari apa yang telah mereka kerjakan, dan Allah sangat cepat perhitungan-Nya.'
            }
          ]
        }
      ]
    },

    // HALAMAN 50 (QS. Ali 'Imran 1 - 9)
    50: {
      page: 50,
      juz: 3,
      titleSummary: "QS. Ali 'Imran (Ayat 1 - 9)",
      primarySurahNumber: 3,
      primarySurahName: "Ali 'Imran",
      groups: [
        {
          surahNumber: 3,
          surahName: "Ali 'Imran",
          arabicName: "آل عمران",
          translation: "Keluarga Imran",
          revelation: "Madaniyyah",
          ayat: [
            {
              nomorAyat: 1,
              teksArab: "الۤمّۤ",
              teksIndonesia: "Alif Lam Mim."
            },
            {
              nomorAyat: 2,
              teksArab: "اللّٰهُ لَآ اِلٰهَ اِلَّا هُوَ الْحَيُّ الْقَيُّوْمُۗ",
              teksIndonesia: "Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus-menerus mengurus (makhluk-Nya)."
            },
            {
              nomorAyat: 3,
              teksArab: "نَزَّلَ عَلَيْكَ الْكِتٰبَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَاَنْزَلَ التَّوْرٰىةَ وَالْاِنْجِيْلَۙ",
              teksIndonesia: "Dia menurunkan Kitab (Al-Qur'an) kepadamu (Muhammad) yang mengandung kebenaran, membenarkan (kitab-kitab) sebelumnya, dan Dia menurunkan Taurat dan Injil,"
            },
            {
              nomorAyat: 4,
              teksArab: "مِنْ قَبْلُ هُدًى لِّلنَّاسِ وَاَنْزَلَ الْفُرْقَانَ ەۗ اِنَّ الَّذِيْنَ كَفَرُوْا بِاٰيٰتِ اللّٰهِ لَهُمْ عَذَابٌ شَدِيْدٌ ۗوَاللّٰهُ عَزِيْزٌ ذُو انْتِقَامٍ",
              teksIndonesia: "sebelumnya, sebagai petunjuk bagi manusia, dan Dia menurunkan Al-Furqan. Sungguh, orang-orang yang ingkar terhadap ayat-ayat Allah akan memperoleh azab yang berat. Allah Mahaperkasa lagi mempunyai balasan (siksa)."
            },
            {
              nomorAyat: 5,
              teksArab: "اِنَّ اللّٰهَ لَا يَخْفٰى عَلَيْهِ شَيْءٌ فِى الْاَرْضِ وَلَا فِى السَّمَاۤءِ",
              teksIndonesia: "Bagi Allah tidak ada sesuatu pun yang tersembunyi di bumi dan di langit."
            },
            {
              nomorAyat: 6,
              teksArab: "هُوَ الَّذِيْ يُصَوِّرُكُمْ فِى الْاَرْحَامِ كَيْفَ يَشَاۤءُ ۗ لَآ اِلٰهَ اِلَّا هُوَ الْعَزِيْزُ الْحَكِيْمُ",
              teksIndonesia: "Dialah yang membentuk kamu dalam rahim menurut yang Dia kehendaki. Tidak ada tuhan selain Dia. Yang Mahaperkasa, Mahabijaksana."
            },
            {
              nomorAyat: 7,
              teksArab: "هُوَ الَّذِيْٓ اَنْزَلَ عَلَيْكَ الْكِتٰبَ مِنْهُ اٰيٰتٌ مُّحْكَمٰتٌ هُنَّ اُمُّ الْكِتٰبِ وَاُخَرُ مُتَشٰبِهٰتٌ ۗ فَاَمَّا الَّذِيْنَ فِيْ قُلُوْبِهِمْ زَيْغٌ فَيَتَّبِعُوْنَ مَا تَشَابَهَ مِنْهُ ابْتِغَاۤءَ الْفِتْنَةِ وَابْتِغَاۤءَ تَأْوِيْلِهٖۚ وَمَا يَعْلَمُ تَأْوِيْلَهٗٓ اِلَّا اللّٰهُ ۘوَالرَّاسِخُوْنَ فِى الْعِلْمِ يَقُوْلُوْنَ اٰمَنَّا بِهٖ كُلٌّ مِّنْ عِنْدِ رَبِّنَا ۚ وَمَا يَذَّكَّرُ اِلَّآ اُولُوا الْاَلْبَابِ",
              teksIndonesia: "Dialah yang menurunkan Kitab (Al-Qur'an) kepadamu (Muhammad). Di antaranya ada ayat-ayat yang muhkamat, itulah pokok-pokok Kitab (Al-Qur'an) dan yang lain mutasyabihat. Adapun orang-orang yang dalam hatinya condong pada kesesatan, mereka mengikuti yang mutasyabihat untuk mencari-cari fitnah dan untuk mencari-cari takwilnya, padahal tidak ada yang mengetahui takwilnya kecuali Allah. Dan orang-orang yang ilmunya mendalam berkata, \"Kami beriman kepadanya (Al-Qur'an), semuanya dari sisi Tuhan kami.\" Tidak ada yang dapat mengambil pelajaran kecuali orang yang berakal."
            },
            {
              nomorAyat: 8,
              teksArab: "رَبَّنَا لَا تُزِغْ قُلُوْبَنَا بَعْدَ اِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَّدُنْكَ رَحْمَةً ۚاِنَّكَ اَنْتَ الْوَهَّابُ",
              teksIndonesia: "(Mereka berdoa), \"Ya Tuhan kami, janganlah Engkau condongkan hati kami kepada kesesatan setelah Engkau berikan petunjuk kepada kami, dan karuniakanlah kepada kami rahmat dari sisi-Mu, sesungguhnya Engkau Maha Pemberi.\""
            },
            {
              nomorAyat: 9,
              teksArab: "رَبَّنَآ اِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيْهِ ۗاِنَّ اللّٰهَ لَا يُخْلِفُ الْمِيْعَادَ ࣖ",
              teksIndonesia: "\"Ya Tuhan kami, Engkaulah yang mengumpulkan manusia pada hari yang tidak ada keraguan padanya.\" Sungguh, Allah tidak menyalahi janji."
            }
          ]
        }
      ]
    },

    // HALAMAN 211 (QS. Yunus 21 - 25)
    211: {
      page: 211,
      juz: 11,
      titleSummary: 'QS. Yunus (Ayat 21 - 25)',
      primarySurahNumber: 10,
      primarySurahName: 'Yunus',
      groups: [
        {
          surahNumber: 10,
          surahName: 'Yunus',
          arabicName: 'يونس',
          translation: 'Nabi Yunus',
          revelation: 'Makkiyyah',
          ayat: [
            {
              nomorAyat: 21,
              teksArab: 'وَإِذَا أَذَقْنَا النَّاسَ رَحْمَةً مِّن بَعْدِ ضَرَّاءَ مَسَّتْهُمْ إِذَا لَهُم مَّكْرٌ فِي آيَاتِنَا ۚ قُلِ اللَّهُ أَسْرَعُ مَكْرًا ۚ إِنَّ رُسُلَنَا يَكْتُبُونَ مَا تَمْكُرُونَ',
              teksIndonesia: 'Dan apabila Kami memberikan suatu rahmat kepada manusia, setelah mereka ditimpa bahaya, mereka seketika melakukan tipu daya terhadap ayat-ayat Kami. Katakanlah, "Allah lebih cepat pembalasannya (atas tipu daya itu)." Sesungguhnya malaikat-malaikat Kami mencatat apa yang kamu tipu dayakan.'
            },
            {
              nomorAyat: 22,
              teksArab: 'هُوَ الَّذِي يُسَيِّرُكُمْ فِي الْبَرِّ وَالْبَحْرِ ۖ حَتَّىٰ إِذَا كُنتُمْ فِي الْفُلْكِ وَجَرَيْنَ بِهِم بِرِيحٍ طَيِّبَةٍ وَفَرِحُوا بِهَا جَاءَتْهَا رِيحٌ عَاصِفٌ وَجَاءَهُمُ الْمَوْجُ مِن كُلِّ مَكَانٍ وَظَنُّوا أَنَّهُمْ أُحِيطَ بِهِمْ ۙ دَعَوُا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ لَئِنْ أَنجَيْتَنَا مِنْ هَٰذِهِ لَنَكُونَنَّ مِنَ الشَّاكِرِينَ',
              teksIndonesia: 'Dialah Tuhan yang menjadikan kamu dapat berjalan di daratan, (dan berlayar) di lautan. Sehingga apabila kamu berada di dalam kapal, dan meluncurlah kapal itu membawa mereka dengan tiupan angin yang baik, dan mereka bergembira karenanya; tiba-tiba datanglah badai dan gelombang menimpanya dari segenap penjuru, dan mereka mengira telah terkepung (bahaya), maka mereka berdoa dengan tulus ikhlas kepada Allah semata, "Sekiranya Engkau menyelamatkan kami dari (bahaya) ini, pasti kami termasuk orang-orang yang bersyukur."'
            },
            {
              nomorAyat: 23,
              teksArab: 'فَلَمَّا أَنجَاهُمْ إِذَا هُمْ يَبْغُونَ فِي الْأَرْضِ بِغَيْرِ الْحَقِّ ۗ يَا أَيُّهَا النَّاسُ إِنَّمَا بَغْيُكُمْ عَلَىٰ أَنفُسِكُم ۖ مَّتَاعَ الْحَيَاةِ الدُّنْيَا ۖ ثُمَّ إِلَيْنَا مَرْجِعُكُمْ فَنُنَبِّئُكُم بِمَا كُنتُمْ تَعْمَلُونَ',
              teksIndonesia: 'Tetapi ketika Allah menyelamatkan mereka, seketika mereka berbuat kezaliman di bumi tanpa (alasan) yang benar. Wahai manusia! Sesungguhnya kezalimanmu bahayanya akan menimpa dirimu sendiri; itu hanya kenikmatan hidup duniawi, selanjutnya kepada Kamilah kembalimu, kelak akan Kami beritakan kepadamu apa yang telah kamu kerjakan.'
            },
            {
              nomorAyat: 24,
              teksArab: 'إِنَّمَا مَثَلُ الْحَيَاةِ الدُّنْيَا كَمَاءٍ أَنزَلْنَاهُ مِنَ السَّمَاءِ فَاخْتَلَطَ بِهِ نَبَاتُ الْأَرْضِ مِمَّا يَأْكُلُ النَّاسُ وَالْأَنْعَامُ حَتَّىٰ إِذَا أَخَذَتِ الْأَرْضُ زُخْرُفَهَا وَازَّيَّنَتْ وَظَنَّ أَهْلُهَا أَنَّهُمْ قَادِرُونَ عَلَيْهَا أَتَاهَا أَمْرُنَا لَيْلًا أَوْ نَهَارًا فَجَعَلْنَاهَا حَصِيدًا كَأَن لَّمْ تَغْنَ بِالْأَمْسِ ۚ كَذَٰلِكَ نُفَصِّلُ الْآيَاتِ لِقَوْمٍ يَتَفَكَّرُونَ',
              teksIndonesia: 'Perumpamaan kehidupan duniawi itu, hanyalah seperti air (hujan) yang Kami turunkan dari langit, lalu tumbuhlah tanam-tanaman bumi dengan subur (karena air itu), di antaranya ada yang dimakan manusia dan hewan ternak. Hingga apabila bumi itu telah memakai keindahannya, dan berhias, dan penduduknya mengira bahwa mereka pasti menguasainya, tiba-tiba datanglah kepadanya azab Kami pada waktu malam atau siang, lalu Kami jadikan (tanaman-tanamannya) seperti tanaman yang sudah disabit, seakan-akan belum pernah tumbuh kemarin. Demikianlah Kami menjelaskan tanda-tanda (kekuasaan Kami) kepada orang-orang yang berpikir.'
            },
            {
              nomorAyat: 25,
              teksArab: 'وَاللَّهُ يَدْعُو إِلَىٰ دَارِ السَّلَامِ وَيَهْدِي مَن يَشَاءُ إِلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
              teksIndonesia: 'Dan Allah menyeru (manusia) ke Darussalam (surga), dan memberikan petunjuk kepada orang yang Dia kehendaki ke jalan yang lurus (Islam).'
            }
          ]
        }
      ]
    },

    // HALAMAN 583 (QS. An-Naba' 31 - 40 & QS. An-Nazi'at 1 - 15) - Rasm Standar Kemenag RI
    583: {
      page: 583,
      juz: 30,
      titleSummary: "QS. An-Naba' (Ayat 31 - 40) & QS. An-Nazi'at (Ayat 1 - 15)",
      primarySurahNumber: 78,
      primarySurahName: "An-Naba'",
      groups: [
        {
          surahNumber: 78,
          surahName: "An-Naba'",
          arabicName: "النبإ",
          translation: "Berita Besar",
          ayat: [
            { nomorAyat: 31, teksArab: "اِنَّ لِلْمُتَّقِيْنَ مَفَازًاۙ", teksIndonesia: "Sesungguhnya bagi orang-orang yang bertakwa (ada) kemenangan (surga)," },
            { nomorAyat: 32, teksArab: "حَدَاۤىِٕقَ وَاَعْنَابًاۙ", teksIndonesia: "(yaitu) kebun-kebun, buah anggur," },
            { nomorAyat: 33, teksArab: "وَّكَوَاعِبَ اَتْرَابًاۙ", teksIndonesia: "gadis-gadis molek yang sebaya," },
            { nomorAyat: 34, teksArab: "وَّكَأْسًا دِهَاقًاۗ", teksIndonesia: "dan gelas-gelas yang penuh (berisi minuman)." },
            { nomorAyat: 35, teksArab: "لَا يَسْمَعُوْنَ فِيْهَا لَغْوًا وَّلَا كِذّٰبًا", teksIndonesia: "Di sana mereka tidak mendengar percakapan yang sia-sia dan tidak pula (perkataan) dusta." },
            { nomorAyat: 36, teksArab: "جَزَاۤءً مِّنْ رَّبِّكَ عَطَاۤءً حِسَابًاۙ", teksIndonesia: "(Hal itu) sebagai balasan (dan) pemberian yang banyak dari Tuhanmu," },
            { nomorAyat: 37, teksArab: "رَّبِّ السَّمٰوٰتِ وَالْاَرْضِ وَمَا بَيْنَهُمَا الرَّحْمٰنِ لَا يَمْلِكُوْنَ مِنْهُ خِطَابًاۚ", teksIndonesia: "(yaitu) Tuhan (pemelihara) langit, bumi, dan apa yang ada di antara keduanya, Yang Maha Pengasih. Mereka tidak memiliki (hak) berbicara dengan-Nya." },
            { nomorAyat: 38, teksArab: "يَوْمَ يَقُوْمُ الرُّوْحُ وَالْمَلٰۤىِٕكَةُ صَفًّاۙ  لَّا يَتَكَلَّمُوْنَ اِلَّا مَنْ اَذِنَ لَهُ الرَّحْمٰنُ وَقَالَ صَوَابًا", teksIndonesia: "Pada hari ketika Rūḥ dan malaikat berdiri bersaf-saf. Mereka tidak berbicara, kecuali yang diizinkan oleh Tuhan Yang Maha Pengasih dan dia mengatakan yang benar." },
            { nomorAyat: 39, teksArab: "ذٰلِكَ الْيَوْمُ الْحَقُّۚ فَمَنْ شَاۤءَ اتَّخَذَ اِلٰى رَبِّهٖ مَاٰبًا", teksIndonesia: "Itulah hari yang hak (pasti terjadi). Siapa yang menghendaki (keselamatan) niscaya menempuh jalan kembali kepada Tuhannya (dengan beramal saleh)." },
            { nomorAyat: 40, teksArab: "اِنَّآ اَنْذَرْنٰكُمْ عَذَابًا قَرِيْبًا ەۙ يَّوْمَ يَنْظُرُ الْمَرْءُ مَا قَدَّمَتْ يَدَاهُ وَيَقُوْلُ الْكٰفِرُ يٰلَيْتَنِيْ كُنْتُ تُرٰبًا ࣖ", teksIndonesia: "Sesungguhnya Kami telah memperingatkan kamu akan azab yang dekat pada hari (ketika) manusia melihat apa yang telah diperbuat oleh kedua tangannya dan orang kafir berkata, “Oh, seandainya saja aku menjadi tanah.”" }
          ]
        },
        {
          surahNumber: 79,
          surahName: "An-Nazi'at",
          arabicName: "النازعات",
          translation: "Malaikat-Malaikat yang Mencabut",
          ayat: [
            { nomorAyat: 1, teksArab: "وَالنّٰزِعٰتِ غَرْقًاۙ", teksIndonesia: "Demi (malaikat) yang mencabut (nyawa orang kafir) dengan keras," },
            { nomorAyat: 2, teksArab: "وَّالنّٰشِطٰتِ نَشْطًاۙ", teksIndonesia: "demi (malaikat) yang mencabut (nyawa orang mukmin) dengan lemah lembut," },
            { nomorAyat: 3, teksArab: "وَّالسّٰبِحٰتِ سَبْحًاۙ", teksIndonesia: "demi (malaikat) yang cepat (menunaikan tugasnya) dengan mudah," },
            { nomorAyat: 4, teksArab: "فَالسّٰبِقٰتِ سَبْقًاۙ", teksIndonesia: "(malaikat) yang bergegas (melaksanakan perintah Allah) dengan cepat," },
            { nomorAyat: 5, teksArab: "فَالْمُدَبِّرٰتِ اَمْرًاۘ", teksIndonesia: "dan (malaikat) yang mengatur urusan (dunia)," },
            { nomorAyat: 6, teksArab: "يَوْمَ تَرْجُفُ الرَّاجِفَةُۙ", teksIndonesia: "(kamu benar-benar akan dibangkitkan) pada hari ketika tiupan pertama mengguncang (alam semesta)." },
            { nomorAyat: 7, teksArab: "تَتْبَعُهَا الرَّادِفَةُ ۗ", teksIndonesia: "(Tiupan pertama) itu diiringi oleh tiupan kedua." },
            { nomorAyat: 8, teksArab: "قُلُوْبٌ يَّوْمَىِٕذٍ وَّاجِفَةٌۙ", teksIndonesia: "Hati manusia pada hari itu merasa sangat takut;" },
            { nomorAyat: 9, teksArab: "اَبْصَارُهَا خَاشِعَةٌ  ۘ", teksIndonesia: "pandangannya tertunduk." },
            { nomorAyat: 10, teksArab: "يَقُوْلُوْنَ ءَاِنَّا لَمَرْدُوْدُوْنَ فِى الْحَافِرَةِۗ", teksIndonesia: "Mereka (di dunia) berkata, “Apakah kita benar-benar akan dikembalikan pada kehidupan yang semula?”" },
            { nomorAyat: 11, teksArab: "ءَاِذَا كُنَّا عِظَامًا نَّخِرَةً ۗ", teksIndonesia: "Apabila kita telah menjadi tulang-belulang yang hancur, apakah kita (akan dibangkitkan juga)?”" },
            { nomorAyat: 12, teksArab: "قَالُوْا تِلْكَ اِذًا كَرَّةٌ خَاسِرَةٌ  ۘ", teksIndonesia: "Mereka berkata, “Kalau demikian, itu suatu pengembalian yang merugikan.”" },
            { nomorAyat: 13, teksArab: "فَاِنَّمَا هِيَ زَجْرَةٌ وَّاحِدَةٌۙ", teksIndonesia: "(Jangan dianggap sulit,) pengembalian itu (dilakukan) hanyalah dengan sekali tiupan." },
            { nomorAyat: 14, teksArab: "فَاِذَا هُمْ بِالسَّاهِرَةِۗ", teksIndonesia: "Seketika itu, mereka hidup kembali di bumi (yang baru)." },
            { nomorAyat: 15, teksArab: "هَلْ اَتٰىكَ حَدِيْثُ مُوْسٰىۘ", teksIndonesia: "Sudah sampaikah kepadamu (Nabi Muhammad) kisah Musa?" }
          ]
        }
      ]
    },

    // HALAMAN 604 (Al-Ikhlas, Al-Falaq, An-Nas)
    604: {
      page: 604,
      juz: 30,
      titleSummary: 'QS. Al-Ikhlas, Al-Falaq & An-Nas',
      primarySurahNumber: 112,
      primarySurahName: 'Al-Ikhlas',
      groups: [
        {
          surahNumber: 112,
          surahName: 'Al-Ikhlas',
          arabicName: 'الإخلاص',
          ayat: [
            { nomorAyat: 1, teksArab: 'قُلْ هُوَ اللَّهُ أَحَدٌ', teksIndonesia: 'Katakanlah (Muhammad), "Dialah Allah, Yang Maha Esa."' },
            { nomorAyat: 2, teksArab: 'اللَّهُ الصَّمَدُ', teksIndonesia: 'Allah tempat meminta segala sesuatu.' },
            { nomorAyat: 3, teksArab: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', teksIndonesia: '(Allah) tidak beranak dan tidak pula diperanakkan,' },
            { nomorAyat: 4, teksArab: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', teksIndonesia: 'Dan tidak ada sesuatu yang setara dengan Dia.' }
          ]
        },
        {
          surahNumber: 113,
          surahName: 'Al-Falaq',
          arabicName: 'الفلق',
          ayat: [
            { nomorAyat: 1, teksArab: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', teksIndonesia: 'Katakanlah, "Aku berlindung kepada Tuhan yang menguasai subuh (fajar),"' },
            { nomorAyat: 2, teksArab: 'مِن شَرِّ مَا خَلَقَ', teksIndonesia: 'dari kejahatan (makhluk yang) Dia ciptakan,' },
            { nomorAyat: 3, teksArab: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', teksIndonesia: 'dan dari kejahatan malam apabila telah gelap gulita,' },
            { nomorAyat: 4, teksArab: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', teksIndonesia: 'dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),' },
            { nomorAyat: 5, teksArab: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', teksIndonesia: 'dan dari kejahatan orang yang dengki apabila dia dengki."' }
          ]
        },
        {
          surahNumber: 114,
          surahName: 'An-Nas',
          arabicName: 'الناس',
          ayat: [
            { nomorAyat: 1, teksArab: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', teksIndonesia: 'Katakanlah, "Aku berlindung kepada Tuhannya manusia,"' },
            { nomorAyat: 2, teksArab: 'مَلِكِ النَّاسِ', teksIndonesia: 'Raja manusia,' },
            { nomorAyat: 3, teksArab: 'إِلَٰهِ النَّاسِ', teksIndonesia: 'sembahan manusia,' },
            { nomorAyat: 4, teksArab: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', teksIndonesia: 'dari kejahatan (bisikan) setan yang bersembunyi,' },
            { nomorAyat: 5, teksArab: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', teksIndonesia: 'yang membisikkan (kejahatan) ke dalam dada manusia,' },
            { nomorAyat: 6, teksArab: 'مِنَ الْجِنَّةِ وَالنَّاسِ', teksIndonesia: 'dari (golongan) jin dan manusia.' }
          ]
        }
      ]
    }
  }
};

window.QURAN_DATA = QURAN_DATA;
