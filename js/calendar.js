/**
 * Calendar Controller for Quran One Day One Page (ODOP)
 * Mendukung 3 Opsi Tampilan Kalender:
 * 1. Bulanan (Grid 1-30/31)
 * 2. Mingguan (7 Hari per Minggu)
 * 3. Harian (Fokus 1 Hari dengan Card Besar)
 */

const CalendarController = {
  currentDate: new Date(),
  selectedDate: null,
  viewMode: 'month', // 'month' | 'week' | 'day'
  calendarType: 'gregorian', // 'gregorian' (Masehi) | 'hijri' (Hijriah)

  containerEl: null,
  monthLabelEl: null,
  statsBannerEl: null,
  statsLabelEl: null,
  streakLabelEl: null,

  MONTH_NAMES: [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ],

  HIJRI_MONTH_NAMES: [
    'Muharram', 'Safar', "Rabi'ul Awal", "Rabi'ul Akhir",
    'Jumadil Awal', 'Jumadil Akhir', 'Rajab', "Sya'ban",
    'Ramadan', 'Syawal', 'Zulkaidah', 'Zulhijah'
  ],

  HIJRI_MONTH_SHORT: [
    'Muh', 'Saf', 'R.Aw', 'R.Ak',
    'J.Aw', 'J.Ak', 'Raj', 'Sya',
    'Ram', 'Syw', 'Zul.K', 'Zul.H'
  ],

  DAY_NAMES_SHORT: ['Ahd', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  DAY_NAMES_LONG: ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],

  /**
   * Inisialisasi controller kalender
   */
  init(containerId) {
    this.containerEl = document.getElementById(containerId);
    this.monthLabelEl = document.getElementById('current-month-display');
    this.statsBannerEl = (typeof document.querySelector === 'function') 
      ? document.querySelector('.calendar-stats-banner') 
      : null;
    this.statsLabelEl = document.getElementById('monthly-stats-display');
    this.streakLabelEl = document.getElementById('streak-display');

    const settings = (typeof StorageManager !== 'undefined' && StorageManager.getSettings) 
      ? StorageManager.getSettings() 
      : {};
    this.calendarType = settings.calendarType || 'gregorian';

    this.bindModeButtons();
    this.updateToggleBadge();
    this.render();
  },

  /**
   * Event listener tombol pemilih tampilan kalender (Bulanan, Mingguan, Harian)
   */
  bindModeButtons() {
    const btnMonth = document.getElementById('btn-cal-mode-month');
    const btnWeek = document.getElementById('btn-cal-mode-week');
    const btnDay = document.getElementById('btn-cal-mode-day');
    const btnToggleType = document.getElementById('btn-toggle-cal-type');

    if (btnMonth) btnMonth.addEventListener('click', () => this.setViewMode('month'));
    if (btnWeek) btnWeek.addEventListener('click', () => this.setViewMode('week'));
    if (btnDay) btnDay.addEventListener('click', () => this.setViewMode('day'));

    if (btnToggleType) {
      btnToggleType.addEventListener('click', () => {
        const nextType = this.calendarType === 'hijri' ? 'gregorian' : 'hijri';
        this.setCalendarType(nextType);
        if (window.App && typeof window.App.showToast === 'function') {
          const name = nextType === 'hijri' ? 'Kalender Hijriah (Qamariyah)' : 'Kalender Masehi (Miladiyah)';
          window.App.showToast(`Beralih ke ${name} ✨`, 'info');
        }
      });
    }
  },

  /**
   * Mengubah jenis kalender (Masehi / Hijriah)
   */
  setCalendarType(type, skipSave = false) {
    this.calendarType = type || 'gregorian';
    if (!skipSave && typeof StorageManager !== 'undefined' && StorageManager.saveSettings) {
      StorageManager.saveSettings({ calendarType: this.calendarType });
    }
    this.updateToggleBadge();
    this.render();
  },

  /**
   * Update label tombol quick switcher kalender
   */
  updateToggleBadge() {
    const labelEl = document.getElementById('cal-type-badge-label');
    const btn = document.getElementById('btn-toggle-cal-type');
    if (!labelEl) return;
    if (this.calendarType === 'hijri') {
      labelEl.textContent = '📅 Masehi';
      if (btn) {
        if (btn.classList && typeof btn.classList.add === 'function') btn.classList.add('badge-active-hijri');
        if (typeof btn.setAttribute === 'function') btn.setAttribute('title', 'Beralih ke Kalender Masehi (Miladiyah)');
      }
    } else {
      labelEl.textContent = '🌙 Hijriah';
      if (btn) {
        if (btn.classList && typeof btn.classList.remove === 'function') btn.classList.remove('badge-active-hijri');
        if (typeof btn.setAttribute === 'function') btn.setAttribute('title', 'Beralih ke Kalender Hijriah (Qamariyah)');
      }
    }
  },

  /**
   * Konversi tanggal Masehi ke Hijriah (Intl Umm al-Qura + Algorithmic Fallback)
   */
  getHijriInfo(date) {
    try {
      if (typeof Intl !== 'undefined' && Intl.DateTimeFormat) {
        const formatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric'
        });
        const parts = formatter.formatToParts(date);
        let day = 1, month = 1, year = 1448;
        parts.forEach(p => {
          if (p.type === 'day') day = parseInt(p.value, 10);
          if (p.type === 'month') month = parseInt(p.value, 10);
          if (p.type === 'year') year = parseInt(p.value, 10);
        });
        if (day && month && year) {
          const mIdx = Math.max(0, Math.min(11, month - 1));
          return {
            day,
            month,
            year,
            monthName: this.HIJRI_MONTH_NAMES[mIdx],
            monthShort: this.HIJRI_MONTH_SHORT[mIdx]
          };
        }
      }
    } catch (e) {}

    // Algorithmic Fallback (Kuwaiti / Astronomical approximation)
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const ym = (m > 2) ? y : y - 1;
    const mm = (m > 2) ? m : m + 12;
    const a = Math.floor(ym / 100);
    const b = 2 - a + Math.floor(a / 4);
    const jd = Math.floor(365.25 * (ym + 4716)) + Math.floor(30.6001 * (mm + 1)) + d + b - 1524.5;
    const z = jd - 1948439.5;
    const cyc = Math.floor(z / 10631);
    const rem = z - 10631 * cyc;
    const j = Math.floor((rem + 0.5) / 354.36667);
    const hYear = 30 * cyc + j + 1;
    const remDays = rem - Math.floor(j * 354.36667 + 0.5);
    const hMonth = Math.min(12, Math.floor((remDays + 28.5) / 29.5));
    const hDay = Math.floor(remDays - Math.floor((hMonth - 1) * 29.5 + 0.5)) + 1;
    const mIdx = Math.max(0, Math.min(11, hMonth - 1));
    return {
      day: Math.max(1, hDay),
      month: Math.max(1, Math.min(12, hMonth)),
      year: hYear,
      monthName: this.HIJRI_MONTH_NAMES[mIdx],
      monthShort: this.HIJRI_MONTH_SHORT[mIdx]
    };
  },

  /**
   * Mengambil seluruh hari dalam satu bulan Hijriah aktif
   */
  getHijriMonthDays(activeDate) {
    const currentH = this.getHijriInfo(activeDate);
    const d = new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDate());
    d.setDate(d.getDate() - (currentH.day - 1));

    let checkH = this.getHijriInfo(d);
    let step = 0;
    while ((checkH.month !== currentH.month || checkH.day !== 1) && step < 5) {
      if (checkH.month > currentH.month || (checkH.month === currentH.month && checkH.day > 1)) {
        d.setDate(d.getDate() - 1);
      } else {
        d.setDate(d.getDate() + 1);
      }
      checkH = this.getHijriInfo(d);
      step++;
    }

    const days = [];
    while (true) {
      const h = this.getHijriInfo(d);
      if (h.month !== currentH.month || h.year !== currentH.year) {
        break;
      }
      days.push({
        date: new Date(d),
        dateKey: (typeof StorageManager !== 'undefined' && StorageManager.formatDateKey) 
          ? StorageManager.formatDateKey(d) 
          : `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,
        hijriDay: h.day,
        hijriMonth: h.month,
        hijriYear: h.year,
        hijriMonthName: h.monthName,
        dayOfWeek: d.getDay(),
        gregorianDay: d.getDate(),
        gregorianMonth: d.getMonth(),
        gregorianYear: d.getFullYear()
      });
      d.setDate(d.getDate() + 1);
      if (days.length > 31) break;
    }

    return {
      hijriMonth: currentH.month,
      hijriYear: currentH.year,
      monthName: currentH.monthName,
      days: days
    };
  },

  /**
   * Mengubah mode tampilan aktif
   */
  setViewMode(mode) {
    this.viewMode = mode;

    const btnMonth = document.getElementById('btn-cal-mode-month');
    const btnWeek = document.getElementById('btn-cal-mode-week');
    const btnDay = document.getElementById('btn-cal-mode-day');

    if (btnMonth) btnMonth.classList.toggle('active', mode === 'month');
    if (btnWeek) btnWeek.classList.toggle('active', mode === 'week');
    if (btnDay) btnDay.classList.toggle('active', mode === 'day');

    this.render();
  },

  /**
   * Navigasi periode sebelumnya (Bulan, Minggu, atau Hari)
   */
  prevPeriod() {
    if (this.viewMode === 'month') {
      if (this.calendarType === 'hijri') {
        const h = this.getHijriInfo(this.currentDate);
        this.currentDate.setDate(this.currentDate.getDate() - (h.day + 14));
      } else {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      }
    } else if (this.viewMode === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    } else if (this.viewMode === 'day') {
      this.currentDate.setDate(this.currentDate.getDate() - 1);
    }
    this.render();
  },

  prevMonth() {
    this.prevPeriod();
  },

  /**
   * Navigasi periode berikutnya (Bulan, Minggu, atau Hari)
   */
  nextPeriod() {
    if (this.viewMode === 'month') {
      if (this.calendarType === 'hijri') {
        const h = this.getHijriInfo(this.currentDate);
        this.currentDate.setDate(this.currentDate.getDate() + (30 - h.day + 14));
      } else {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      }
    } else if (this.viewMode === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    } else if (this.viewMode === 'day') {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
    }
    this.render();
  },

  nextMonth() {
    this.nextPeriod();
  },

  /**
   * Kembali ke hari & bulan ini
   */
  goToToday() {
    this.currentDate = new Date();
    this.render();
  },

  /**
   * Hitung rentang halaman Quran untuk tanggal tertentu berdasarkan target harian
   */
  calculateQuranPageRange(year, month, day) {
    const settings = StorageManager.getSettings();
    const startPage = parseInt(settings.startPageOffset, 10) || 1;
    const pagesPerDay = parseInt(settings.pagesPerDay, 10) || 1;

    let dayOffset = 0;
    if (settings.mode === 'monthly') {
      dayOffset = (day - 1) * pagesPerDay;
    } else {
      let startDateStr = settings.startDate || '2026-09-01';
      let parts = startDateStr.split('-').map(Number);
      let sYear = parts[0] || 2026;
      let sMonth = (parts[1] || 9) - 1; // 0-indexed month
      let sDay = parts[2] || 1;

      // Perhitungan selisih hari murni UTC agar terbebas dari pergeseran jam/zona waktu
      const baseUtc = Date.UTC(sYear, sMonth, sDay);
      const targetUtc = Date.UTC(year, month, day);
      const diffDays = Math.round((targetUtc - baseUtc) / (1000 * 60 * 60 * 24));
      dayOffset = diffDays * pagesPerDay;
    }

    // Rumus siklus berkelanjutan modulo 604 (1 s/d 604)
    let startP = (((startPage - 1 + dayOffset) % 604) + 604) % 604 + 1;
    let endP = (((startP - 1 + (pagesPerDay - 1)) % 604) + 604) % 604 + 1;

    return {
      startPage: startP > 0 ? startP : 1,
      endPage: endP > 0 ? endP : 1,
      pagesPerDay: pagesPerDay,
      isRange: pagesPerDay > 1
    };
  },

  /**
   * Hitung nomor halaman Quran awal untuk tanggal tertentu (kompatibilitas backward)
   */
  calculateQuranPage(year, month, day) {
    const range = this.calculateQuranPageRange(year, month, day);
    return range.startPage;
  },

  /**
   * Render utama yang memilih layout sesuai viewMode
   */
  render() {
    if (!this.containerEl) return;

    // Sembunyikan banner statistik (Target & Streak) khusus pada tab Harian
    if (this.statsBannerEl) {
      this.statsBannerEl.style.display = this.viewMode === 'day' ? 'none' : '';
    }

    if (this.viewMode === 'month') {
      this.renderMonthView();
    } else if (this.viewMode === 'week') {
      this.renderWeekView();
    } else if (this.viewMode === 'day') {
      this.renderDayView();
    }
  },

  // ==========================================================================
  // 1. TAMPILAN BULANAN (Monthly View Grid 1-30/31)
  // ==========================================================================
  renderMonthView() {
    if (this.calendarType === 'hijri') {
      this.renderHijriMonthView();
      return;
    }

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    if (this.monthLabelEl) {
      this.monthLabelEl.textContent = `${this.MONTH_NAMES[month]} ${year}`;
    }

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = firstDayIndex; // Ahad = 0, Senin = 1, ..., Sabtu = 6

    this.containerEl.innerHTML = '';

    // Header Nama Hari (Ahd s/d Sab)
    const headerRow = document.createElement('div');
    headerRow.className = 'calendar-weekdays';
    this.DAY_NAMES_SHORT.forEach(dayName => {
      const dayEl = document.createElement('div');
      dayEl.className = 'weekday-label';
      dayEl.textContent = dayName;
      headerRow.appendChild(dayEl);
    });
    this.containerEl.appendChild(headerRow);

    // Grid tanggal Masehi
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    for (let i = 0; i < startOffset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-cell cell-empty';
      grid.appendChild(emptyCell);
    }

    let completedCountInMonth = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const dateKey = StorageManager.formatDateKey(cellDate);
      const isCompleted = StorageManager.isDateCompleted(dateKey);
      const record = StorageManager.getDateRecord(dateKey);
      const isToday = isCurrentMonth && day === todayDate;

      const pageRange = this.calculateQuranPageRange(year, month, day);
      const startP = (record && record.page) ? record.page : pageRange.startPage;
      const endP = (record && record.endPage) ? record.endPage : ((record && record.page) ? record.page : pageRange.endPage);
      const isRange = startP !== endP;
      const rangeData = QURAN_DATA.getPageRangeSummary(startP, endP);
      const pageLabel = isRange
        ? `<span class="page-line">Hal. ${startP}-</span><span class="page-line">Hal. ${endP}</span>`
        : `Hal. ${startP}`;
      const isJuzRange = rangeData.juzStart && rangeData.juzEnd && (rangeData.juzStart !== rangeData.juzEnd);
      const juzLabel = isJuzRange ? `Juz ${rangeData.juzStart}-${rangeData.juzEnd}` : (rangeData.juzText || `Juz ${rangeData.juzStart || rangeData.juz || 1}`);
      const isBadgeRange = isRange || startP >= 100;
      const hInfo = this.getHijriInfo(cellDate);

      if (isCompleted) completedCountInMonth++;

      const cell = document.createElement('div');
      cell.className = `calendar-cell ${isToday ? 'cell-today' : ''} ${isCompleted ? 'cell-completed' : ''}`;
      cell.setAttribute('data-date', dateKey);
      cell.setAttribute('data-page', startP);
      if (isRange) cell.setAttribute('data-end-page', endP);

      cell.innerHTML = `
        <div class="cell-top-bar">
          ${isToday ? '<span class="today-badge">Hari ini</span>' : `<span class="cell-day-number">${day}</span>`}
        </div>
        
        <div class="cell-quran-info">
          <span class="page-badge ${isBadgeRange ? 'page-range' : ''}" title="${rangeData.summary}">${pageLabel}</span>
          <span class="juz-label ${isJuzRange ? 'juz-range' : ''}" title="${rangeData.juzText || juzLabel}">${juzLabel}</span>
        </div>

        ${isCompleted ? `
          <div class="check-mark-overlay" title="Sudah selesai dibaca">
            <svg class="check-icon" viewBox="0 0 100 100">
              <path d="M18 52 L38 72 L82 26" fill="none" stroke="#F2B84B" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        ` : ''}
      `;

      cell.addEventListener('click', () => {
        if (window.App) {
          window.App.openReader(dateKey, startP, day, this.MONTH_NAMES[month], year, endP);
        }
      });

      grid.appendChild(cell);
    }

    this.containerEl.appendChild(grid);
    this.updateStatsDisplay(completedCountInMonth, daysInMonth);
  },

  // ==========================================================================
  // 1B. TAMPILAN BULANAN HIJRIAH (Monthly View Grid Kalender Hijriah)
  // ==========================================================================
  renderHijriMonthView() {
    const hData = this.getHijriMonthDays(this.currentDate);
    const firstDayObj = hData.days[0];
    const lastDayObj = hData.days[hData.days.length - 1];

    if (this.monthLabelEl) {
      this.monthLabelEl.textContent = `${hData.monthName} ${hData.hijriYear} H`;
    }

    const today = new Date();
    const todayStr = StorageManager.formatDateKey(today);

    this.containerEl.innerHTML = '';

    // Header Nama Hari (Ahd s/d Sab)
    const headerRow = document.createElement('div');
    headerRow.className = 'calendar-weekdays';
    this.DAY_NAMES_SHORT.forEach(dayName => {
      const dayEl = document.createElement('div');
      dayEl.className = 'weekday-label';
      dayEl.textContent = dayName;
      headerRow.appendChild(dayEl);
    });
    this.containerEl.appendChild(headerRow);

    // Grid tanggal Hijriah
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    const startOffset = firstDayObj.dayOfWeek; // Ahad = 0, ..., Sabtu = 6
    for (let i = 0; i < startOffset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-cell cell-empty';
      grid.appendChild(emptyCell);
    }

    let completedCountInMonth = 0;

    hData.days.forEach(dayObj => {
      const dateKey = dayObj.dateKey;
      const isCompleted = StorageManager.isDateCompleted(dateKey);
      const record = StorageManager.getDateRecord(dateKey);
      const isToday = dateKey === todayStr;

      const pageRange = this.calculateQuranPageRange(dayObj.gregorianYear, dayObj.gregorianMonth, dayObj.gregorianDay);
      const startP = (record && record.page) ? record.page : pageRange.startPage;
      const endP = (record && record.endPage) ? record.endPage : ((record && record.page) ? record.page : pageRange.endPage);
      const isRange = startP !== endP;
      const rangeData = QURAN_DATA.getPageRangeSummary(startP, endP);
      const pageLabel = isRange
        ? `<span class="page-line">Hal. ${startP}-</span><span class="page-line">Hal. ${endP}</span>`
        : `Hal. ${startP}`;
      const isJuzRange = rangeData.juzStart && rangeData.juzEnd && (rangeData.juzStart !== rangeData.juzEnd);
      const juzLabel = isJuzRange ? `Juz ${rangeData.juzStart}-${rangeData.juzEnd}` : (rangeData.juzText || `Juz ${rangeData.juzStart || rangeData.juz || 1}`);
      const isBadgeRange = isRange || startP >= 100;

      if (isCompleted) completedCountInMonth++;

      const cell = document.createElement('div');
      cell.className = `calendar-cell ${isToday ? 'cell-today' : ''} ${isCompleted ? 'cell-completed' : ''}`;
      cell.setAttribute('data-date', dateKey);
      cell.setAttribute('data-page', startP);
      if (isRange) cell.setAttribute('data-end-page', endP);

      cell.innerHTML = `
        <div class="cell-top-bar">
          ${isToday ? '<span class="today-badge">Hari ini</span>' : `<span class="cell-day-number">${dayObj.hijriDay}</span>`}
        </div>
        
        <div class="cell-quran-info">
          <span class="page-badge ${isBadgeRange ? 'page-range' : ''}" title="${rangeData.summary}">${pageLabel}</span>
          <span class="juz-label ${isJuzRange ? 'juz-range' : ''}" title="${rangeData.juzText || juzLabel}">${juzLabel}</span>
        </div>

        ${isCompleted ? `
          <div class="check-mark-overlay" title="Sudah selesai dibaca">
            <svg class="check-icon" viewBox="0 0 100 100">
              <path d="M18 52 L38 72 L82 26" fill="none" stroke="#F2B84B" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        ` : ''}
      `;

      cell.addEventListener('click', () => {
        if (window.App) {
          window.App.openReader(dateKey, startP, dayObj.hijriDay, hData.monthName, `${hData.hijriYear} H`, endP);
        }
      });

      grid.appendChild(cell);
    });

    this.containerEl.appendChild(grid);
    this.updateStatsDisplay(completedCountInMonth, hData.days.length);
  },

  // ==========================================================================
  // 2. TAMPILAN MINGGUAN (Weekly View: 7 Hari dalam Minggu Berjalan, Mulai Ahad)
  // ==========================================================================
  renderWeekView() {
    this.containerEl.innerHTML = '';

    // Hitung hari Ahad dari minggu saat ini
    const targetDate = new Date(this.currentDate);
    const dayOfWeek = targetDate.getDay(); // Ahad = 0, ..., Sabtu = 6
    const sunday = new Date(targetDate);
    sunday.setDate(targetDate.getDate() - dayOfWeek);

    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);

    const isHijri = this.calendarType === 'hijri';

    // Update Header Bar info rentang minggu
    if (this.monthLabelEl) {
      if (isHijri) {
        const sunH = this.getHijriInfo(sunday);
        const satH = this.getHijriInfo(saturday);
        const hijriSpan = (sunH.month === satH.month)
          ? `${sunH.day} - ${satH.day} ${satH.monthName} ${satH.year} H`
          : `${sunH.day} ${sunH.monthShort} - ${satH.day} ${satH.monthShort} ${satH.year} H`;
        this.monthLabelEl.textContent = hijriSpan;
      } else {
        const sunStr = `${sunday.getDate()} ${this.MONTH_NAMES[sunday.getMonth()].substring(0, 3)}`;
        const satStr = `${saturday.getDate()} ${this.MONTH_NAMES[saturday.getMonth()]} ${saturday.getFullYear()}`;
        this.monthLabelEl.textContent = `${sunStr} - ${satStr}`;
      }
    }

    const today = new Date();
    const todayStr = StorageManager.formatDateKey(today);

    const weekList = document.createElement('div');
    weekList.className = 'calendar-week-list';

    let completedInWeek = 0;

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(sunday);
      dayDate.setDate(sunday.getDate() + i);

      const dYear = dayDate.getFullYear();
      const dMonth = dayDate.getMonth();
      const dDay = dayDate.getDate();
      const dateKey = StorageManager.formatDateKey(dayDate);
      const isCompleted = StorageManager.isDateCompleted(dateKey);
      const record = StorageManager.getDateRecord(dateKey);
      const isToday = dateKey === todayStr;

      const pageRange = this.calculateQuranPageRange(dYear, dMonth, dDay);
      const startP = (record && record.page) ? record.page : pageRange.startPage;
      const endP = (record && record.endPage) ? record.endPage : ((record && record.page) ? record.page : pageRange.endPage);
      const isRange = startP !== endP;
      const rangeData = QURAN_DATA.getPageRangeSummary(startP, endP);
      const pageTitle = isRange ? `Halaman ${startP} - ${endP}` : `Halaman ${startP}`;
      const juzLabel = rangeData.juzText || `Juz ${rangeData.juzStart || rangeData.juz || 1}`;

      if (isCompleted) completedInWeek++;

      const hInfo = this.getHijriInfo(dayDate);
      const primaryDayNum = isHijri ? hInfo.day : dDay;

      const card = document.createElement('div');
      card.className = `week-day-card ${isToday ? 'card-today' : ''} ${isCompleted ? 'card-completed' : ''}`;
      card.innerHTML = `
        <div class="week-card-left">
          <div class="week-date-box">
            <span class="week-day-name">${this.DAY_NAMES_SHORT[i]}</span>
            <span class="week-day-num">${primaryDayNum}</span>
          </div>
          <div class="week-card-info">
            <div class="week-page-title">
              <span>${pageTitle}</span>
              ${isToday ? '<span class="today-badge">Hari Ini</span>' : ''}
            </div>
            <div class="week-quran-range">${juzLabel}</div>
          </div>
        </div>

        <div class="week-card-right">
          ${isCompleted ? `
            <span class="week-status-badge status-done">Selesai</span>
            <span class="week-check-icon" title="Tuntas diberi tanda checklist">✓</span>
          ` : `
            <span class="week-arrow">&#8250;</span>
          `}
        </div>
      `;

      card.addEventListener('click', () => {
        if (window.App) {
          if (isHijri) {
            window.App.openReader(dateKey, startP, hInfo.day, hInfo.monthName, `${hInfo.year} H`, endP);
          } else {
            window.App.openReader(dateKey, startP, dDay, this.MONTH_NAMES[dMonth], dYear, endP);
          }
        }
      });

      weekList.appendChild(card);
    }

    this.containerEl.appendChild(weekList);
    this.updateStatsDisplay(completedInWeek, 7);
  },

  // ==========================================================================
  // 3. TAMPILAN HARIAN (Daily Focus View: Fokus 1 Hari)
  // ==========================================================================
  renderDayView() {
    this.containerEl.innerHTML = '';

    const dYear = this.currentDate.getFullYear();
    const dMonth = this.currentDate.getMonth();
    const dDay = this.currentDate.getDate();
    const dayOfWeek = this.currentDate.getDay();
    const dayNameLong = this.DAY_NAMES_LONG[dayOfWeek];

    const dateKey = StorageManager.formatDateKey(this.currentDate);
    const isCompleted = StorageManager.isDateCompleted(dateKey);
    const record = StorageManager.getDateRecord(dateKey);

    const today = new Date();
    const isToday = dateKey === StorageManager.formatDateKey(today);

    const hInfo = this.getHijriInfo(this.currentDate);
    const isHijri = this.calendarType === 'hijri';

    // Update Header Bar info hari ini
    if (this.monthLabelEl) {
      if (isHijri) {
        this.monthLabelEl.textContent = `${dayNameLong}, ${hInfo.day} ${hInfo.monthName} ${hInfo.year} H`;
      } else {
        this.monthLabelEl.textContent = `${dayNameLong}, ${dDay} ${this.MONTH_NAMES[dMonth]} ${dYear}`;
      }
    }

    const pageRange = this.calculateQuranPageRange(dYear, dMonth, dDay);
    const startP = (record && record.page) ? record.page : pageRange.startPage;
    const endP = (record && record.endPage) ? record.endPage : ((record && record.page) ? record.page : pageRange.endPage);
    const isRange = startP !== endP;
    const rangeData = QURAN_DATA.getPageRangeSummary(startP, endP);

    const dayView = document.createElement('div');
    dayView.className = 'calendar-day-view';

    // Hero Daily Focus Card
    const dailyCard = document.createElement('div');
    dailyCard.className = 'daily-focus-card';

    const emblemClass = isRange ? 'daily-page-emblem emblem-wide' : 'daily-page-emblem';
    const emblemNumClass = isRange ? 'emblem-number emblem-range' : 'emblem-number';
    const emblemText = isRange ? `${startP} - ${endP}` : `${startP}`;
    const targetSubtext = isRange ? `${pageRange.pagesPerDay} Halaman / Hari &bull; ` : '';

    const dateDisplayText = isHijri
      ? `${dayNameLong}, ${hInfo.day} ${hInfo.monthName} ${hInfo.year} H`
      : `${dayNameLong}, ${dDay} ${this.MONTH_NAMES[dMonth]} ${dYear}`;

    dailyCard.innerHTML = `
      <div class="daily-date-header">
        ${isToday ? '🌟 Hari Ini • ' : ''}${dateDisplayText}
      </div>

      <div class="${emblemClass}">
        <span class="emblem-label">HALAMAN</span>
        <span class="${emblemNumClass}">${emblemText}</span>
      </div>

      <div class="daily-quran-detail">
        <p>${rangeData.juzText || ('Juz ' + (rangeData.juzStart || rangeData.juz || 1))} &bull; ${targetSubtext}Sumber: Kemenag RI</p>
      </div>

      <div class="daily-status-ribbon ${isCompleted ? 'ribbon-done' : 'ribbon-pending'}">
        ${isCompleted ? `
          <span>✓ Telah Selesai Dibaca</span>
        ` : `
          <span>⏳ Belum Dibaca</span>
        `}
      </div>

      <button type="button" class="btn-daily-read-cta" id="btn-daily-cta">
        ${isCompleted ? '📖 Buka Kembali Halaman Ini' : '📖 Buka Halaman & Mulai Tilawah'}
      </button>
    `;

    dailyCard.querySelector('#btn-daily-cta').addEventListener('click', () => {
      if (window.App) {
        if (isHijri) {
          window.App.openReader(dateKey, startP, hInfo.day, hInfo.monthName, `${hInfo.year} H`, endP);
        } else {
          window.App.openReader(dateKey, startP, dDay, this.MONTH_NAMES[dMonth], dYear, endP);
        }
      }
    });

    dayView.appendChild(dailyCard);
    this.containerEl.appendChild(dayView);
  },

  /**
   * Update ringkasan bulanan & streak
   */
  updateStatsDisplay(completedCount, totalCount) {
    const stats = StorageManager.getStats();

    if (this.statsLabelEl) {
      const percent = Math.round((completedCount / totalCount) * 100);
      const label = this.viewMode === 'week' ? 'Minggu Ini' : 'Bulan Ini';
      this.statsLabelEl.innerHTML = `
        <div class="stats-badge">
          <span class="stats-num">${completedCount}</span> / ${totalCount} Selesai (${percent}%) &bull; ${label}
        </div>
      `;
    }

    if (this.streakLabelEl) {
      this.streakLabelEl.innerHTML = `
        <div class="streak-badge">
          <span class="flame-icon">🔥</span>
          <span class="streak-count">${stats.streak}</span> Hari Berturut-turut
        </div>
      `;
    }

    const progressBar = document.getElementById('monthly-progress-bar');
    if (progressBar) {
      const pct = (completedCount / totalCount) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }
};

window.CalendarController = CalendarController;
