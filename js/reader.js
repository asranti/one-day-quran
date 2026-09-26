/**
 * Quran Reader Controller for Quran One Day One Page (ODOP)
 * Menampilkan Halaman Al-Qur'an (Ayat & Terjemahan Resmi Kemenag RI).
 * Menampilkan HANYA ayat-ayat yang berada pada halaman terkait (misal Hal 211 = Yunus 21-25).
 */

const ReaderController = {
  currentDateKey: null,
  currentPageNumber: 1,
  currentPageData: null,
  viewMode: 'text',

  elements: {
    container: null,
    pageTitle: null,
    surahBadge: null,
    juzBadge: null,
    kemenagLink: null,
    textContainer: null,
    completionBar: null,
    completeButton: null
  },

  init() {
    this.elements.container = document.getElementById('reader-view');
    this.elements.pageTitle = document.getElementById('reader-page-title');
    this.elements.surahBadge = document.getElementById('reader-surah-badge');
    this.elements.juzBadge = document.getElementById('reader-juz-badge');
    this.elements.kemenagLink = document.getElementById('kemenag-portal-link');
    this.elements.textContainer = document.getElementById('text-container');
    this.elements.completionBar = document.getElementById('reader-completion-container') || document.getElementById('reader-floating-completion');
    this.elements.completeButton = document.getElementById('btn-complete-reading');

    this.bindEvents();
  },

  bindEvents() {
    // Tombol selesai tilawah
    if (this.elements.completeButton) {
      this.elements.completeButton.addEventListener('click', () => {
        this.handleCompleteReading();
      });
    }

    // Tombol kembali ke kalender
    const btnBack = document.getElementById('btn-back-to-calendar');
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        this.handleBackNavigation();
      });
    }

    // Navigasi prev/next halaman di reader
    const btnPrevPage = document.getElementById('btn-reader-prev');
    const btnNextPage = document.getElementById('btn-reader-next');

    if (btnPrevPage) {
      btnPrevPage.addEventListener('click', () => {
        if (this.currentPageNumber > 1) {
          this.loadPage(this.currentPageNumber - 1, this.currentDateKey);
        }
      });
    }

    if (btnNextPage) {
      btnNextPage.addEventListener('click', () => {
        if (this.currentPageNumber < 604) {
          this.loadPage(this.currentPageNumber + 1, this.currentDateKey);
        }
      });
    }
  },

  /**
   * Buka reader untuk tanggal dan nomor halaman tertentu
   */
  open(dateKey, pageNumber, day, monthName, year) {
    this.currentDateKey = dateKey;
    this.currentPageNumber = Math.max(1, Math.min(604, pageNumber));

    // Update info tanggal di header reader
    const dateLabel = document.getElementById('reader-date-info');
    if (dateLabel) {
      dateLabel.textContent = `${day} ${monthName} ${year}`;
    }

    this.loadPage(this.currentPageNumber, dateKey);
  },

  /**
   * Muat konten presisi untuk halaman Al-Qur'an ini
   */
  async loadPage(pageNumber, dateKey) {
    this.currentPageNumber = pageNumber;

    // Tampilkan indikator memuat sementara
    if (this.elements.pageTitle) {
      this.elements.pageTitle.textContent = `Halaman ${pageNumber}`;
    }
    if (this.elements.surahBadge) {
      this.elements.surahBadge.textContent = 'Memuat ayat...';
    }

    // Ambil data halaman presisi (Hanya ayat di halaman ini)
    const pageData = await QURAN_DATA.fetchPageData(pageNumber);
    this.currentPageData = pageData;

    // Update Header Reader
    if (this.elements.surahBadge) {
      this.elements.surahBadge.textContent = pageData.titleSummary;
      const groupCount = (pageData.groups && pageData.groups.length) || 1;
      if (groupCount > 1 || (pageData.titleSummary && pageData.titleSummary.includes('&'))) {
        this.elements.surahBadge.classList.add('pill-multi-surah');
      } else {
        this.elements.surahBadge.classList.remove('pill-multi-surah');
      }
    }
    if (this.elements.juzBadge) {
      this.elements.juzBadge.textContent = `Juz ${pageData.juz}`;
    }
    // Hitung rentang ayat halaman ini untuk tautan Kemenag
    const firstAyah = (pageData.groups && pageData.groups[0] && pageData.groups[0].ayat && pageData.groups[0].ayat[0]) 
      ? pageData.groups[0].ayat[0].nomorAyat 
      : null;
    const lastGroup = (pageData.groups && pageData.groups.length > 0) 
      ? pageData.groups[pageData.groups.length - 1] 
      : null;
    const lastAyah = (lastGroup && lastGroup.ayat && lastGroup.ayat.length > 0) 
      ? lastGroup.ayat[lastGroup.ayat.length - 1].nomorAyat 
      : null;
    const pageKemenagUrl = QURAN_DATA.getKemenagWebUrl(pageData.primarySurahNumber, firstAyah, lastAyah);

    if (this.elements.kemenagLink) {
      this.elements.kemenagLink.href = pageKemenagUrl;
      this.elements.kemenagLink.setAttribute('title', `Buka ${pageData.titleSummary} di Portal Resmi quran.kemenag.go.id`);
    }

    // Cek apakah tanggal ini sudah pernah tuntas
    const isAlreadyCompleted = StorageManager.isDateCompleted(this.currentDateKey);
    this.updateCompletionButtonVisibility(isAlreadyCompleted);

    // Render tampilan Ayat & Terjemahan Kemenag RI
    this.renderTextView(pageNumber, pageData);
  },

  renderMushafView() {},
  buildDigitalMushafLayout() { return ''; },

  /**
   * Render Mode Ayat & Terjemahan Kemenag RI (HANYA AYAT DI HALAMAN INI)
   */
  renderTextView(pageNumber, pageData) {
    const groupCount = (pageData.groups && pageData.groups.length) || 1;
    let titleClass = 'page-title-latin';
    if (groupCount >= 3 || (pageData.titleSummary && pageData.titleSummary.length > 50)) {
      titleClass += ' title-multi-surah-compact';
    } else if (groupCount > 1 || (pageData.titleSummary && pageData.titleSummary.includes('&'))) {
      titleClass += ' title-multi-surah';
    }

    let html = `
      <div class="page-summary-header-card">
        <div class="page-badge-large">Halaman ${pageNumber}</div>
        <h2 class="${titleClass}">${pageData.titleSummary}</h2>
        <div class="page-meta-tags">
          <span class="meta-tag">Juz ${pageData.juz}</span>
          <span class="meta-tag kemenag-tag">Sumber Resmi: Kemenag RI</span>
          <span class="meta-tag">${pageData.groups.reduce((acc, g) => acc + g.ayat.length, 0)} Ayat</span>
        </div>
        <p class="page-note">Menampilkan khusus ayat yang tercakup pada <strong>Halaman ${pageNumber}</strong> Al-Qur'an.</p>
      </div>
    `;

    pageData.groups.forEach(g => {
      const gFirst = (g.ayat && g.ayat.length > 0) ? g.ayat[0].nomorAyat : null;
      const gLast = (g.ayat && g.ayat.length > 0) ? g.ayat[g.ayat.length - 1].nomorAyat : null;
      const surahSectionUrl = QURAN_DATA.getKemenagWebUrl(g.surahNumber, gFirst, gLast);

      html += `
        <div class="surah-section-block">
          <div class="surah-section-title">
            <span class="surah-section-name">QS. ${g.surahName} (${g.arabicName})</span>
            <a href="${surahSectionUrl}" target="_blank" rel="noopener" class="kemenag-inline-link" title="Buka QS. ${g.surahName} (${gFirst}-${gLast}) di quran.kemenag.go.id">
              quran.kemenag.go.id ↗
            </a>
          </div>
          
          <div class="ayat-list">
      `;

      g.ayat.forEach(a => {
        html += `
          <div class="ayat-item" id="ayah-${g.surahNumber}-${a.nomorAyat}">
            <div class="ayat-header">
              <span class="ayah-number-badge">${a.nomorAyat}</span>
              <div class="ayat-actions">
                <span class="ayah-surah-label">${g.surahName}:${a.nomorAyat}</span>
                <a href="${QURAN_DATA.getKemenagWebUrl(g.surahNumber, a.nomorAyat)}" target="_blank" rel="noopener" class="ayah-kemenag-link" title="Tashih Kemenag RI: QS. ${g.surahName} Ayat ${a.nomorAyat} (quran.kemenag.go.id)">
                  Tashih Kemenag ↗
                </a>
              </div>
            </div>
            <div class="ayat-arabic-text" dir="rtl">${a.teksArab}</div>
            <div class="ayat-translation-id">${a.teksIndonesia}</div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    this.elements.textContainer.innerHTML = html;
  },

  /**
   * Helper konversi angka latin ke angka arab (misal 21 -> ٢١)
   */
  convertToArabicNumber(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).split('').map(d => arabicDigits[parseInt(d, 10)] || d).join('');
  },

  setViewMode(mode) {
    this.viewMode = 'text';
    if (this.elements.textContainer) this.elements.textContainer.style.display = 'block';
  },

  updateCompletionButtonVisibility(isAlreadyDone) {
    if (!this.elements.completeButton) return;

    if (this.elements.completionBar) {
      this.elements.completionBar.style.display = 'flex';
    }

    if (isAlreadyDone) {
      this.elements.completeButton.disabled = false;
      this.elements.completeButton.className = 'btn-complete-reading btn-status-already-done';
      this.elements.completeButton.innerHTML = `
        <span class="btn-icon">✓</span>
        <span>✓ Sudah Selesai Dibaca (Bertanda Checklist)</span>
      `;
    } else {
      this.elements.completeButton.disabled = false;
      this.elements.completeButton.className = 'btn-complete-reading btn-status-ready';
      this.elements.completeButton.innerHTML = `
        <span class="btn-icon">✓</span>
        <span>Selesai Baca & Tandai Checklist (✓)</span>
      `;
    }
  },

  handleCompleteReading() {
    StorageManager.markDateCompleted(this.currentDateKey, this.currentPageNumber, 60);

    if (window.App && typeof window.App.showToast === 'function') {
      window.App.showToast('Alhamdulillah, tilawah telah diselesaikan! Tanggal kalender telah diberi tanda checklist hijau (✓). ✨', 'success');
    }

    CalendarController.render();
    this.updateCompletionButtonVisibility(true);

    setTimeout(() => {
      window.App.showScreen('calendar');
    }, 600);
  },

  handleBackNavigation() {
    window.App.showScreen('calendar');
  }
};

window.ReaderController = ReaderController;
