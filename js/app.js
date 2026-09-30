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
    this.applyTheme(settings.theme || 'tema_cyan');

    // Inisialisasi komponen kalender & reader
    CalendarController.init('calendar-container');
    ReaderController.init();

    // Inisialisasi navigasi riwayat browser (tombol back HP / browser)
    this.initHistoryNavigation();

    // Event listeners navigasi global
    this.bindGlobalEvents();

    // Inisialisasi PWA Service Worker jika didukung
    this.initServiceWorker();

    // Tampilkan layar awal (Kalender)
    this.showScreen('calendar', false);
  },

  bindGlobalEvents() {
    // Tombol navigasi kalender
    const btnPrevMonth = document.getElementById('btn-prev-month');
    const btnNextMonth = document.getElementById('btn-next-month');
    const btnToday = document.getElementById('btn-go-today');

    if (btnPrevMonth) btnPrevMonth.addEventListener('click', () => CalendarController.prevPeriod('slide-right'));
    if (btnNextMonth) btnNextMonth.addEventListener('click', () => CalendarController.nextPeriod('slide-left'));
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
        const selected = document.querySelector('input[name="setting-theme-choice"]:checked')?.value || 'tema_cyan';
        this.applyTheme(selected, true);
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

    // Slider Jumlah Halaman Tilawah Tiap Hari
    const sliderPages = document.getElementById('setting-pages-per-day');
    const badgePages = document.getElementById('pages-per-day-badge');
    const descPages = document.getElementById('pages-per-day-desc');

    const updateSliderDisplay = (val) => {
      const v = parseInt(val, 10) || 1;
      let label = `${v} Halaman / Hari`;
      if (v === 2) label += ' (1 Lembar)';
      if (v === 10) label += ' (½ Juz)';
      if (v === 20) label += ' (1 Juz)';
      if (badgePages) badgePages.textContent = label;

      const daysNeeded = Math.ceil(604 / v);
      const monthsNeeded = (daysNeeded / 30).toFixed(1);
      if (descPages) {
        descPages.innerHTML = `${v} Halaman per hari &bull; Khatam dalam <strong>~${daysNeeded} hari</strong> (~${monthsNeeded} bulan)`;
      }
    };

    if (sliderPages) {
      sliderPages.addEventListener('input', (e) => updateSliderDisplay(e.target.value));
      sliderPages.addEventListener('change', (e) => updateSliderDisplay(e.target.value));
    }

    // Form Pengaturan Simpan (Program Tilawah)
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const mode = document.querySelector('input[name="reading-mode"]:checked')?.value || 'continuous';
        const calendarType = document.querySelector('input[name="calendar-type"]:checked')?.value || 'gregorian';
        const startDate = document.getElementById('setting-start-date')?.value || '2026-09-01';
        const startPageOffset = parseInt(document.getElementById('setting-start-page')?.value, 10) || 1;
        const pagesPerDay = parseInt(document.getElementById('setting-pages-per-day')?.value, 10) || 1;
        const explicitMonthly = (mode === 'monthly');
        StorageManager.saveSettings({ mode, startDate, startPageOffset, pagesPerDay, explicitMonthly, calendarType });
        if (typeof CalendarController.setCalendarType === 'function') {
          CalendarController.setCalendarType(calendarType);
        } else {
          CalendarController.calendarType = calendarType;
          CalendarController.render();
        }
        settingsModal.classList.remove('active');
        this.showToast('Pengaturan kalender & tilawah berhasil disimpan!', 'success');
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
   * Inisialisasi navigasi riwayat browser / tombol back HP berbasis hash routing
   * Menjamin tombol back pada HP selalu kembali ke Kalender saat berada di Reader
   */
  initHistoryNavigation() {
    // Bersihkan hash jika awalnya dibuka dengan #reader
    if (window.location.hash === '#reader') {
      try {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.hash = '';
        }
      } catch (e) {
        window.location.hash = '';
      }
    }

    const onNavChange = () => {
      // Tutup modal terbuka jika ada
      const settingsModal = document.getElementById('settings-modal');
      const jumpModal = document.getElementById('jump-modal');
      if (settingsModal && settingsModal.classList.contains('active')) settingsModal.classList.remove('active');
      if (jumpModal && jumpModal.classList.contains('active')) jumpModal.classList.remove('active');

      const isReaderHash = (window.location.hash === '#reader');
      if (!isReaderHash) {
        // Tombol back HP ditekan saat di reader: kembali ke kalender
        if (this.currentScreen === 'reader') {
          this.showScreen('calendar', false);
        }
      } else {
        // Jika navigasi forward ke #reader
        if (this.currentScreen !== 'reader') {
          this.showScreen('reader', false);
        }
      }
    };

    window.addEventListener('hashchange', onNavChange);
    window.addEventListener('popstate', onNavChange);
  },

  /**
   * Beralih antara tampilan Kalender dan Reader
   * @param {string} screenName 'calendar' atau 'reader'
   * @param {boolean} updateHistory sinkronkan ke history browser untuk tombol back HP (default: true)
   */
  showScreen(screenName, updateHistory = true) {
    this.currentScreen = screenName;
    const calendarView = document.getElementById('calendar-view');
    const readerView = document.getElementById('reader-view');

    if (screenName === 'calendar') {
      if (calendarView) calendarView.style.display = 'block';
      if (readerView) readerView.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Jika kembali ke kalender melalui tombol UI reader dan hash masih #reader,
      // panggil history.back() agar hash terlepas kembali ke kosong
      if (updateHistory) {
        if (window.location.hash === '#reader') {
          try {
            window.history.back();
          } catch (e) {
            window.location.hash = '';
          }
          if (typeof window !== 'undefined' && window.setTimeout) {
            window.setTimeout(() => {
              if (window.location.hash === '#reader') {
                try { window.location.hash = ''; } catch (err) {}
              }
            }, 100);
          }
        }
      }
    } else if (screenName === 'reader') {
      if (calendarView) calendarView.style.display = 'none';
      if (readerView) readerView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Masukkan hash #reader ke URL agar tombol back fisik/sistem HP mengenali riwayat dan kembali ke Kalender
      if (updateHistory) {
        if (window.location.hash !== '#reader') {
          try {
            window.location.hash = 'reader';
          } catch (e) {
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', '#reader');
            }
          }
        }
      }
    }
  },

  /**
   * Buka reader dari klik kotak tanggal kalender
   */
  openReader(dateKey, pageNumber, day, monthName, year, endPage = null) {
    this.showScreen('reader');
    ReaderController.open(dateKey, pageNumber, day, monthName, year, endPage);
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
    ReaderController.open(todayKey, pageNumber, day, monthName, year, pageNumber);
    this.showToast(`Membuka Halaman ${pageNumber}...`, 'info');
  },

  /**
   * Terapkan tema warna aplikasi secara menyeluruh
   */
  applyTheme(themeName, explicit = false) {
    document.documentElement.setAttribute('data-theme', themeName);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      if (themeName === 'tema2') {
        metaTheme.setAttribute('content', '#EDBBCC');
      } else if (themeName === 'tema1') {
        metaTheme.setAttribute('content', '#F89A7E');
      } else {
        metaTheme.setAttribute('content', '#58C4CF');
      }
    }
    const updateObj = { theme: themeName };
    if (explicit) updateObj.explicitTheme = true;
    StorageManager.saveSettings(updateObj);
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
    const sliderPages = document.getElementById('setting-pages-per-day');
    const badgePages = document.getElementById('pages-per-day-badge');
    const descPages = document.getElementById('pages-per-day-desc');

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

    const ppdVal = parseInt(settings.pagesPerDay, 10) || 1;
    if (sliderPages) {
      sliderPages.value = ppdVal;
      let label = `${ppdVal} Halaman / Hari`;
      if (ppdVal === 2) label += ' (1 Lembar)';
      if (ppdVal === 10) label += ' (½ Juz)';
      if (ppdVal === 20) label += ' (1 Juz)';
      if (badgePages) badgePages.textContent = label;

      const daysNeeded = Math.ceil(604 / ppdVal);
      const monthsNeeded = (daysNeeded / 30).toFixed(1);
      if (descPages) {
        descPages.innerHTML = `${ppdVal} Halaman per hari &bull; Khatam dalam <strong>~${daysNeeded} hari</strong> (~${monthsNeeded} bulan)`;
      }
    }

    const radioGregorian = document.getElementById('cal-type-gregorian');
    const radioHijri = document.getElementById('cal-type-hijri');
    if (settings.calendarType === 'hijri' && radioHijri) {
      radioHijri.checked = true;
    } else if (radioGregorian) {
      radioGregorian.checked = true;
    }

    // Set nilai radio & kartu tema aktif
    const currentTheme = settings.theme || 'tema_cyan';
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
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(reg => {
            console.log('Service Worker terdaftar:', reg.scope);
            try { reg.update(); } catch (e) {}
          })
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
