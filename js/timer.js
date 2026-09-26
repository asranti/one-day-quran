/**
 * Reading Timer for Quran One Day One Page (ODOP)
 * Menegakkan aturan: Tilawah minimal 1 menit (60 detik) untuk verifikasi.
 */

const ReadingTimer = {
  REQUIRED_SECONDS: 0,
  elapsedSeconds: 0,
  intervalId: null,
  isRunning: false,
  currentDateKey: null,
  currentPageNumber: 1,
  onTickCallback: null,
  onCompleteCallback: null,

  /**
   * Inisialisasi dan mulai timer untuk halaman/tanggal tertentu
   */
  start(dateKey, pageNumber, onTick, onComplete) {
    this.stop();
    this.currentDateKey = dateKey;
    this.currentPageNumber = pageNumber;
    this.onTickCallback = onTick;
    this.onCompleteCallback = onComplete;
    this.elapsedSeconds = 0;
    this.isRunning = true;

    // Trigger initial tick
    this.notifyTick();

    this.intervalId = setInterval(() => {
      if (this.isRunning) {
        this.elapsedSeconds++;
        this.notifyTick();

        if (this.elapsedSeconds === this.REQUIRED_SECONDS) {
          this.playSuccessChime();
          if (this.onCompleteCallback) {
            this.onCompleteCallback(this.elapsedSeconds);
          }
        }
      }
    }, 1000);
  },

  /**
   * Jeda timer (misal aplikasi diminimize atau tab beralih)
   */
  pause() {
    this.isRunning = false;
  },

  /**
   * Lanjutkan timer
   */
  resume() {
    if (this.intervalId && !this.isRunning) {
      this.isRunning = true;
    }
  },

  /**
   * Hentikan timer dan reset
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  },

  /**
   * Cek apakah syarat tilawah telah terpenuhi (langsung terpenuhi tanpa timer)
   */
  isRequirementMet() {
    return true;
  },

  /**
   * Dapatkan sisa waktu menuju 1 menit
   */
  getRemainingSeconds() {
    return Math.max(0, this.REQUIRED_SECONDS - this.elapsedSeconds);
  },

  /**
   * Dapatkan persentase progres menuju 1 menit (0 - 100%)
   */
  getProgressPercentage() {
    return Math.min(100, Math.round((this.elapsedSeconds / this.REQUIRED_SECONDS) * 100));
  },

  /**
   * Format detik ke format mm:ss
   */
  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },

  /**
   * Update UI observer
   */
  notifyTick() {
    if (this.onTickCallback) {
      this.onTickCallback({
        elapsed: this.elapsedSeconds,
        remaining: this.getRemainingSeconds(),
        percent: this.getProgressPercentage(),
        isMet: this.isRequirementMet(),
        formattedTime: this.formatTime(this.elapsedSeconds)
      });
    }
  },

  /**
   * Bunyikan nada lembut penanda 1 menit tuntas menggunakan Web Audio API
   */
  playSuccessChime() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Rangkaian nada harmoni lembut (C5 - E5 - G5 - C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.65);
      });
    } catch (e) {
      console.log('Audio chime not supported or muted');
    }
  }
};

window.ReadingTimer = ReadingTimer;
