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

  containerEl: null,
  monthLabelEl: null,
  statsBannerEl: null,
  statsLabelEl: null,
  streakLabelEl: null,

  MONTH_NAMES: [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
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

    this.bindModeButtons();
    this.render();
  },

  /**
   * Event listener tombol pemilih tampilan kalender (Bulanan, Mingguan, Harian)
   */
  bindModeButtons() {
    const btnMonth = document.getElementById('btn-cal-mode-month');
    const btnWeek = document.getElementById('btn-cal-mode-week');
    const btnDay = document.getElementById('btn-cal-mode-day');

    if (btnMonth) btnMonth.addEventListener('click', () => this.setViewMode('month'));
    if (btnWeek) btnWeek.addEventListener('click', () => this.setViewMode('week'));
    if (btnDay) btnDay.addEventListener('click', () => this.setViewMode('day'));
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
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
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
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
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
   * Hitung nomor halaman Quran untuk tanggal tertentu
   */
  calculateQuranPage(year, month, day) {
    const settings = StorageManager.getSettings();
    const startPage = parseInt(settings.startPageOffset, 10) || 1;
    
    if (settings.mode === 'monthly') {
      // Siklus bulanan: Reset tiap tanggal 1
      let page = ((startPage - 1 + (day - 1)) % 604) + 1;
      return page > 0 ? page : 1;
    }

    // Default: Mode Berkelanjutan (Khatam 604 Halaman One Day One Page)
    // Menggunakan patokan startDate (default: '2026-09-01' -> 1 Sept = Hal. 1)
    let startDateStr = settings.startDate || '2026-09-01';
    let parts = startDateStr.split('-').map(Number);
    let sYear = parts[0] || 2026;
    let sMonth = (parts[1] || 9) - 1; // 0-indexed month
    let sDay = parts[2] || 1;

    // Perhitungan selisih hari murni UTC agar terbebas dari pergeseran jam/zona waktu
    const baseUtc = Date.UTC(sYear, sMonth, sDay);
    const targetUtc = Date.UTC(year, month, day);
    const diffDays = Math.round((targetUtc - baseUtc) / (1000 * 60 * 60 * 24));

    // Rumus siklus berkelanjutan modulo 604 (1 s/d 604)
    let page = (((startPage - 1 + diffDays) % 604) + 604) % 604 + 1;
    return page > 0 ? page : 1;
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

    // Grid tanggal
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

      const quranPage = record ? record.page : this.calculateQuranPage(year, month, day);
      const boundary = QURAN_DATA.getPageBoundary(quranPage);
      const juz = boundary.juz;

      if (isCompleted) completedCountInMonth++;

      const cell = document.createElement('div');
      cell.className = `calendar-cell ${isToday ? 'cell-today' : ''} ${isCompleted ? 'cell-completed' : ''}`;
      cell.setAttribute('data-date', dateKey);
      cell.setAttribute('data-page', quranPage);

      const isHundreds = quranPage >= 100;
      cell.innerHTML = `
        <div class="cell-top-bar">
          ${isToday ? '<span class="today-badge">Hari ini</span>' : `<span class="cell-day-number">${day}</span>`}
        </div>
        
        <div class="cell-quran-info">
          <span class="page-badge ${isHundreds ? 'page-hundreds' : ''}">Hal. ${quranPage}</span>
          <span class="juz-label">Juz ${juz}</span>
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
          window.App.openReader(dateKey, quranPage, day, this.MONTH_NAMES[month], year);
        }
      });

      grid.appendChild(cell);
    }

    this.containerEl.appendChild(grid);
    this.updateStatsDisplay(completedCountInMonth, daysInMonth);
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

    // Update Header Bar info rentang minggu
    if (this.monthLabelEl) {
      const sunStr = `${sunday.getDate()} ${this.MONTH_NAMES[sunday.getMonth()].substring(0, 3)}`;
      const satStr = `${saturday.getDate()} ${this.MONTH_NAMES[saturday.getMonth()]} ${saturday.getFullYear()}`;
      this.monthLabelEl.textContent = `${sunStr} - ${satStr}`;
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

      const quranPage = record ? record.page : this.calculateQuranPage(dYear, dMonth, dDay);
      const boundary = QURAN_DATA.getPageBoundary(quranPage);
      const isMulti = boundary.summary && (boundary.summary.includes('&') || boundary.isMulti);

      if (isCompleted) completedInWeek++;

      const card = document.createElement('div');
      card.className = `week-day-card ${isToday ? 'card-today' : ''} ${isCompleted ? 'card-completed' : ''}`;
      card.innerHTML = `
        <div class="week-card-left">
          <div class="week-date-box">
            <span class="week-day-name">${this.DAY_NAMES_SHORT[i]}</span>
            <span class="week-day-num">${dDay}</span>
          </div>
          <div class="week-card-info">
            <div class="week-page-title">
              <span>Halaman ${quranPage}</span>
              ${isToday ? '<span class="today-badge">Hari Ini</span>' : ''}
            </div>
            <div class="week-quran-range ${isMulti ? 'multi-surah' : ''}">${boundary.summary} &bull; Juz ${boundary.juz}</div>
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
          window.App.openReader(dateKey, quranPage, dDay, this.MONTH_NAMES[dMonth], dYear);
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

    // Update Header Bar info hari ini
    if (this.monthLabelEl) {
      this.monthLabelEl.textContent = `${dayNameLong}, ${dDay} ${this.MONTH_NAMES[dMonth]} ${dYear}`;
    }

    const quranPage = record ? record.page : this.calculateQuranPage(dYear, dMonth, dDay);
    const boundary = QURAN_DATA.getPageBoundary(quranPage);

    const dayView = document.createElement('div');
    dayView.className = 'calendar-day-view';

    // Hero Daily Focus Card
    const dailyCard = document.createElement('div');
    dailyCard.className = 'daily-focus-card';

    const isMultiDay = boundary.summary && (boundary.summary.includes('&') || boundary.isMulti);
    const isMultiCompact = isMultiDay && (boundary.summary.length > 45 || (boundary.sections && boundary.sections.length >= 3));
    const dayDetailClass = isMultiCompact ? 'multi-surah-compact' : (isMultiDay ? 'multi-surah' : '');

    dailyCard.innerHTML = `
      <div class="daily-date-header">
        ${isToday ? '🌟 Hari Ini • ' : ''}${dayNameLong}, ${dDay} ${this.MONTH_NAMES[dMonth]} ${dYear}
      </div>

      <div class="daily-page-emblem">
        <span class="emblem-label">HALAMAN</span>
        <span class="emblem-number">${quranPage}</span>
      </div>

      <div class="daily-quran-detail">
        <h3 class="${dayDetailClass}">${boundary.summary}</h3>
        <p>Juz ${boundary.juz} • Sumber: Kemenag RI</p>
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
        window.App.openReader(dateKey, quranPage, dDay, this.MONTH_NAMES[dMonth], dYear);
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
