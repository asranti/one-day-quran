/**
 * Main Application Orchestrator for Quran One Day One Page (ODOP)
 * Mengelola navigasi layar (Kalender & Reader), modal pengaturan, dan PWA.
 */

const App = {
  currentScreen: 'calendar',

  init() {
    console.log('Inisialisasi Quran One Day One Page...');

    // Inisialisasi tema tampilan tersimpan
    const settings = StorageManager.getSettings();
    this.applyTheme(settings.theme || 'tema1');

    // Inisialisasi komponen kalender & reader
    CalendarController.init('calendar-container');
    ReaderController.init();

    // Event listeners navigasi global
    this.bindGlobalEvents();

    // Inisialisasi PWA Service Worker jika didukung
    this.initServiceWorker();

    // Tampilkan layar awal (Kalender)
    this.showScreen('calendar');
  },

  bindGlobalEvents() {
    // Tombol navigasi kalender
    const btnPrevMonth = document.getElementById('btn-prev-month');
    const btnNextMonth = document.getElementById('btn-next-month');
    const btnToday = document.getElementById('btn-go-today');

    if (btnPrevMonth) btnPrevMonth.addEventListener('click', () => CalendarController.prevPeriod());
    if (btnNextMonth) btnNextMonth.addEventListener('click', () => CalendarController.nextPeriod());
    if (btnToday) btnToday.addEventListener('click', () => CalendarController.goToToday());

    // Modal Pengaturan & Info
    const btnOpenSettings = document.getElementById('btn-open-settings');
    const btnCloseSettings = document.getElementById('btn-close-settings');
    const settingsModal = document.getElementById('settings-modal');

    if (btnOpenSettings && settingsModal) {
      btnOpenSettings.addEventListener('click', () => {
        this.populateSettingsForm();
        settingsModal.classList.add('active');
      });
    }

    if (btnCloseSettings && settingsModal) {
      btnCloseSettings.addEventListener('click', () => {
        settingsModal.classList.remove('active');
      });
    }

    // Tab Navigasi di Modal Pengaturan (Program Tilawah & Tampilan Tema)
    const tabTilawah = document.getElementById('tab-btn-settings-tilawah');
    const tabTheme = document.getElementById('tab-btn-settings-theme');
    const panelTilawah = document.getElementById('settings-panel-tilawah');
    const panelTheme = document.getElementById('settings-panel-theme');

    const switchSettingsTab = (tabName) => {
      if (tabName === 'tilawah') {
        tabTilawah?.classList.add('active');
        tabTheme?.classList.remove('active');
        if (panelTilawah) panelTilawah.style.display = 'block';
        if (panelTheme) panelTheme.style.display = 'none';
      } else {
        tabTheme?.classList.add('active');
        tabTilawah?.classList.remove('active');
        if (panelTilawah) panelTilawah.style.display = 'none';
        if (panelTheme) panelTheme.style.display = 'block';
      }
    };

    if (tabTilawah) tabTilawah.addEventListener('click', () => switchSettingsTab('tilawah'));
    if (tabTheme) tabTheme.addEventListener('click', () => switchSettingsTab('theme'));

    // Pilihan Kartu Tema Tampilan
    const themeCards = document.querySelectorAll('.theme-card-option');
    themeCards.forEach(card => {
      card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = true;
          this.applyTheme(radio.value);
        }
      });
    });

    const btnSaveTheme = document.getElementById('btn-save-theme');
    if (btnSaveTheme) {
      btnSaveTheme.addEventListener('click', () => {
        const selected = document.querySelector('input[name="setting-theme-choice"]:checked')?.value || 'tema1';
        this.applyTheme(selected);
        if (settingsModal) settingsModal.classList.remove('active');
        this.showToast('Tema tampilan berhasil disimpan!', 'success');
      });
    }

    // Modal Lompat Halaman
    const btnOpenJump = document.getElementById('btn-open-jump');
    const btnCloseJump = document.getElementById('btn-close-jump');
    const jumpModal = document.getElementById('jump-modal');
    const jumpForm = document.getElementById('jump-page-form');
    const jumpInput = document.getElementById('jump-page-input');

    if (btnOpenJump && jumpModal) {
      btnOpenJump.addEventListener('click', () => {
        if (jumpInput) jumpInput.value = '';
        jumpModal.classList.add('active');
        if (jumpInput) setTimeout(() => jumpInput.focus(), 150);
      });
    }

    if (btnCloseJump && jumpModal) {
      btnCloseJump.addEventListener('click', () => {
        jumpModal.classList.remove('active');
      });
    }

    if (jumpForm) {
      jumpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pageNum = parseInt(jumpInput?.value, 10);
        if (pageNum >= 1 && pageNum <= 604) {
          jumpModal.classList.remove('active');
          this.jumpToSpecificPage(pageNum);
        } else {
          alert('Nomor halaman harus di antara 1 sampai 604!');
        }
      });
    }

    // Form Pengaturan Simpan (Program Tilawah)
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mode = document.querySelector('input[name="reading-mode"]:checked')?.value || 'continuous';
        const startDate = document.getElementById('setting-start-date')?.value || '2026-09-01';
        const startPageOffset = parseInt(document.getElementById('setting-start-page')?.value, 10) || 1;
        const explicitMonthly = (mode === 'monthly');
        StorageManager.saveSettings({ mode, startDate, startPageOffset, explicitMonthly });
        settingsModal.classList.remove('active');
        CalendarController.render();
        this.showToast('Pengaturan tilawah berhasil disimpan!', 'success');
      });
    }

    // Tombol Reset Data
    const btnResetData = document.getElementById('btn-reset-data');
    if (btnResetData) {
      btnResetData.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin mereset seluruh riwayat tilawah? Semua tanda silang akan dihapus.')) {
          localStorage.removeItem('quran_odop_history');
          CalendarController.render();
          settingsModal.classList.remove('active');
          this.showToast('Seluruh riwayat berhasil direset.', 'info');
        }
      });
    }
  },

  /**
   * Beralih antara tampilan Kalender dan Reader
   */
  showScreen(screenName) {
    this.currentScreen = screenName;
    const calendarView = document.getElementById('calendar-view');
    const readerView = document.getElementById('reader-view');

    if (screenName === 'calendar') {
      if (calendarView) calendarView.style.display = 'block';
      if (readerView) readerView.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (screenName === 'reader') {
      if (calendarView) calendarView.style.display = 'none';
      if (readerView) readerView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  /**
   * Buka reader dari klik kotak tanggal kalender
   */
  openReader(dateKey, pageNumber, day, monthName, year) {
    this.showScreen('reader');
    ReaderController.open(dateKey, pageNumber, day, monthName, year);
  },

  /**
   * Buka reader langsung ke nomor halaman tertentu (1 - 604)
   */
  jumpToSpecificPage(pageNumber) {
    const today = new Date();
    const todayKey = StorageManager.formatDateKey(today);
    const day = today.getDate();
    const monthNames = CalendarController.MONTH_NAMES;
    const monthName = monthNames[today.getMonth()];
    const year = today.getFullYear();

    // Tutup jump modal bila terbuka
    const jumpModal = document.getElementById('jump-modal');
    if (jumpModal) jumpModal.classList.remove('active');

    this.showScreen('reader');
    ReaderController.open(todayKey, pageNumber, day, monthName, year);
    this.showToast(`Membuka Halaman ${pageNumber}...`, 'info');
  },

  /**
   * Terapkan tema warna aplikasi secara menyeluruh
   */
  applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      if (themeName === 'tema2') {
        metaTheme.setAttribute('content', '#EDBBCC');
      } else if (themeName === 'tema_cyan') {
        metaTheme.setAttribute('content', '#58C4CF');
      } else {
        metaTheme.setAttribute('content', '#F89A7E');
      }
    }
    StorageManager.saveSettings({ theme: themeName });
    this.updateActiveThemeCard(themeName);
  },

  /**
   * Perbarui kartu tema aktif di modal pengaturan
   */
  updateActiveThemeCard(themeName) {
    document.querySelectorAll('.theme-card-option').forEach(card => {
      const input = card.querySelector('input[type="radio"]');
      if (input && input.value === themeName) {
        card.classList.add('active');
        input.checked = true;
      } else {
        card.classList.remove('active');
      }
    });
  },

  /**
   * Isi nilai awal form modal pengaturan
   */
  populateSettingsForm() {
    const settings = StorageManager.getSettings();
    const radioMonthly = document.getElementById('mode-monthly');
    const radioContinuous = document.getElementById('mode-continuous');
    const inputStartDate = document.getElementById('setting-start-date');
    const inputStartPage = document.getElementById('setting-start-page');

    if (settings.mode === 'monthly' && radioMonthly) {
      radioMonthly.checked = true;
    } else if (radioContinuous) {
      radioContinuous.checked = true;
    }

    if (inputStartDate) {
      inputStartDate.value = settings.startDate || '2026-09-01';
    }

    if (inputStartPage) {
      inputStartPage.value = settings.startPageOffset || 1;
    }

    // Set nilai radio & kartu tema aktif
    const currentTheme = settings.theme || 'tema1';
    this.updateActiveThemeCard(currentTheme);
  },

  /**
   * Toast notification modern
   */
  showToast(message, type = 'info') {
    const existing = document.querySelector('.app-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `app-toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span class="toast-msg">${message}</span>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-show');
    }, 20);

    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  /**
   * Inisialisasi Service Worker PWA
   */
  initServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(reg => console.log('Service Worker terdaftar:', reg.scope))
          .catch(err => console.log('Service Worker gagal mendaftar:', err));
      });
    }
  }
};

window.App = App;

// Jalankan aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
