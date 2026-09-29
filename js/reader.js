/**
 * Quran Reader Controller for Quran One Day One Page (ODOP)
 * Menampilkan Halaman Al-Qur'an (Ayat & Terjemahan Resmi Kemenag RI).
 * Menampilkan HANYA ayat-ayat yang berada pada halaman terkait (misal Hal 211 = Yunus 21-25).
 */

const ReaderController = {
  currentDateKey: null,
  currentPageNumber: 1,
  targetStartPage: 1,
  targetEndPage: 1,
  currentPageData: null,
  viewMode: 'text',

  elements: {
    container: null,
    pageTitle: null,
    kemenagLink: null,
    textContainer: null,
    completionBar: null,
    completeButton: null
  },

  init() {
    this.elements.container = document.getElementById('reader-view');
    this.elements.pageTitle = document.getElementById('reader-page-title');
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
  },

  /**
   * Buka reader untuk tanggal dan rentang nomor halaman tertentu
   */
  open(dateKey, pageNumber, day, monthName, year, endPage = null) {
    this.currentDateKey = dateKey;
    this.targetStartPage = Math.max(1, Math.min(604, pageNumber));
    this.targetEndPage = endPage ? Math.max(1, Math.min(604, endPage)) : this.targetStartPage;
    this.currentPageNumber = this.targetStartPage;

    // Update info tanggal di header reader
    const dateLabel = document.getElementById('reader-date-info');
    if (dateLabel) {
      dateLabel.textContent = `${day} ${monthName} ${year}`;
    }

    this.loadRange(this.targetStartPage, this.targetEndPage, dateKey);
  },

  /**
   * Muat seluruh ayat untuk rentang halaman secara menyatu (kontinu)
   */
  async loadRange(startPage, endPage, dateKey) {
    this.targetStartPage = startPage;
    this.targetEndPage = endPage;
    this.currentPageNumber = startPage;
    const isRange = (startPage !== endPage);
    const pageCount = (endPage >= startPage) ? (endPage - startPage + 1) : 1;

    // Tampilkan indikator memuat sementara
    if (this.elements.pageTitle) {
      this.elements.pageTitle.textContent = isRange ? `Halaman ${startPage} - ${endPage}` : `Halaman ${startPage}`;
    }
    if (this.elements.textContainer) {
      this.elements.textContainer.innerHTML = `
        <div style="text-align: center; padding: 48px 16px; color: var(--text-muted);">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">📖</div>
          <p style="font-weight: 700; font-size: 1rem; color: var(--text-main); margin-bottom: 6px;">Memuat Target Tilawah (${pageCount} Halaman)...</p>
          <p style="font-size: 0.82rem;">Menyiapkan ayat dari Halaman ${startPage}${isRange ? (' s/d ' + endPage) : ''}</p>
        </div>
      `;
    }

    // Ambil data seluruh halaman dalam rentang secara gabungan & kontinu
    const pageData = await QURAN_DATA.fetchPageRangeData(startPage, endPage);
    this.currentPageData = pageData;

    if (this.elements.kemenagLink) {
      const firstG = pageData.groups[0];
      const sNum = (firstG && firstG.surahNumber) || 1;
      this.elements.kemenagLink.href = QURAN_DATA.getKemenagWebUrl(sNum);
      this.elements.kemenagLink.setAttribute('title', `Buka ${pageData.titleSummary} di Portal Resmi quran.kemenag.go.id`);
    }

    // Cek apakah tanggal ini sudah pernah tuntas
    const isAlreadyCompleted = StorageManager.isDateCompleted(this.currentDateKey);
    this.updateCompletionButtonVisibility(isAlreadyCompleted);

    // Render tampilan seluruh Ayat & Terjemahan Kemenag RI secara menyatu
    this.renderMergedTextView(pageData);
  },

  /**
   * Muat konten presisi untuk 1 halaman Al-Qur'an (kompatibilitas backward)
   */
  async loadPage(pageNumber, dateKey) {
    return this.loadRange(pageNumber, pageNumber, dateKey);
  },

  renderMushafView() {},
  buildDigitalMushafLayout() { return ''; },

  /**
   * Render seluruh Ayat & Terjemahan Kemenag RI secara Menyatu (Continuous View)
   */
  renderMergedTextView(pageData) {
    const isRange = pageData.isRange;
    const startP = pageData.startPage;
    const endP = pageData.endPage;

    const pageNote = isRange
      ? `Menampilkan seluruh ayat untuk target tilawah hari ini (<strong>Halaman ${startP} sampai ${endP}</strong>).`
      : `Menampilkan khusus ayat yang tercakup pada <strong>Halaman ${startP}</strong> Al-Qur'an.`;

    let html = `
      <div class="page-summary-header-card" id="page-anchor-${startP}">
        <div class="page-meta-tags">
          <span class="meta-tag">${pageData.juz}</span>
          <span class="meta-tag kemenag-tag">Sumber Resmi: Kemenag RI</span>
          <span class="meta-tag">${pageData.totalAyat} Ayat</span>
        </div>
        <p class="page-note">${pageNote}</p>
      </div>
    `;

    let lastPage = startP;

    pageData.groups.forEach(g => {
      const gFirst = (g.ayat && g.ayat.length > 0) ? g.ayat[0].nomorAyat : null;
      const gLast = (g.ayat && g.ayat.length > 0) ? g.ayat[g.ayat.length - 1].nomorAyat : null;
      const surahSectionUrl = QURAN_DATA.getKemenagWebUrl(g.surahNumber, gFirst, gLast);

      html += `
        <div class="surah-section-block">
          <div class="surah-section-title">
            <span class="surah-section-name">QS. ${g.surahName} (${g.arabicName})</span>
            <a href="${surahSectionUrl}" target="_blank" rel="noopener" class="kemenag-inline-link" title="Buka QS. ${g.surahName} di quran.kemenag.go.id">
              quran.kemenag.go.id ↗
            </a>
          </div>
          
          <div class="ayat-list">
      `;

      g.ayat.forEach(a => {
        // Jika ayat ini memasuki nomor halaman baru dalam rentang target, tampilkan pembatas halaman halus
        if (isRange && a.page && a.page !== lastPage) {
          html += `
            <div class="reader-page-divider" id="page-anchor-${a.page}">
              <span>📖 Awal Halaman ${a.page}</span>
            </div>
          `;
          lastPage = a.page;
        }

        const pageBadgeHtml = isRange && a.page 
          ? `<span class="ayah-page-tag" title="Halaman ${a.page} Mushaf Standar Madani">Hal. ${a.page}</span>` 
          : '';

        html += `
          <div class="ayat-item" id="ayah-${g.surahNumber}-${a.nomorAyat}">
            <div class="ayat-header">
              <span class="ayah-number-badge">${a.nomorAyat}</span>
              <div class="ayat-actions">
                <span class="ayah-surah-label">${g.surahName}:${a.nomorAyat}</span>
                ${pageBadgeHtml}
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
   * Render Mode Ayat & Terjemahan Kemenag RI (HANYA AYAT DI HALAMAN INI)
   */
  renderTextView(pageNumber, pageData) {
    return this.renderMergedTextView({
      ...pageData,
      startPage: pageNumber,
      endPage: pageNumber,
      pageCount: 1,
      totalAyat: pageData.groups.reduce((acc, g) => acc + g.ayat.length, 0),
      isRange: false
    });
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
    StorageManager.markDateCompleted(this.currentDateKey, this.targetStartPage, 60, this.targetEndPage);

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
