/**
 * Storage Manager for Quran One Day One Page (ODOP)
 * Mengelola riwayat membaca, status tanda silang per tanggal, dan streak.
 */

const STORAGE_KEYS = {
  READING_HISTORY: 'quran_odop_history',
  SETTINGS: 'quran_odop_settings'
};

const StorageManager = {
  /**
   * Mengambil semua riwayat bacaan
   * Format: { 'YYYY-MM-DD': { isCompleted: true, duration: 65, page: 1, completedAt: '...' } }
   */
  getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.READING_HISTORY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error reading history from storage:', e);
      return {};
    }
  },

  /**
   * Cek apakah suatu tanggal sudah selesai dibaca dan ditandai silang
   */
  isDateCompleted(dateStr) {
    const history = this.getHistory();
    return !!(history[dateStr] && history[dateStr].isCompleted);
  },

  /**
   * Dapatkan detail bacaan pada tanggal tertentu
   */
  getDateRecord(dateStr) {
    const history = this.getHistory();
    return history[dateStr] || null;
  },

  /**
   * Tandai tanggal selesai dibaca (berikan tanda silang)
   */
  markDateCompleted(dateStr, page, duration) {
    const history = this.getHistory();
    history[dateStr] = {
      isCompleted: true,
      page: page,
      duration: Math.max(60, duration || 60),
      completedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Error saving history to storage:', e);
    }
    return history[dateStr];
  },

  /**
   * Batalkan tanda silang pada tanggal tertentu
   */
  unmarkDate(dateStr) {
    const history = this.getHistory();
    if (history[dateStr]) {
      delete history[dateStr];
      try {
        localStorage.setItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(history));
      } catch (e) {
        console.error('Error updating storage:', e);
      }
    }
  },

  /**
   * Dapatkan pengaturan aplikasi
   */
  getSettings() {
    const defaults = {
      mode: 'continuous', // Default: Khatam 604 Halaman Berkelanjutan tanpa reset bulanan
      startDate: '2026-09-01', // Patokan tanggal mulai One Day One Page
      startPageOffset: 1, // Halaman Al-Qur'an pada tanggal mulai (1 = Al-Fatihah)
      theme: 'tema1', // 'tema1' (Coral) | 'tema2' (Biru / Sky Ice) | 'tema_cyan' (Biru Cyan)
      soundEnabled: true,
      nightMode: false
    };

    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return defaults;
      const parsed = JSON.parse(data);

      // Pastikan startDate dan default mode continuous
      if (!parsed.startDate) {
        parsed.startDate = '2026-09-01';
      }
      // Jika mode masih 'monthly' default lama (bukan explicit), migrasikan ke continuous
      if (parsed.mode === 'monthly' && !parsed.explicitMonthly) {
        parsed.mode = 'continuous';
      }
      if (!parsed.startPageOffset || parsed.startPageOffset < 1) {
        parsed.startPageOffset = 1;
      }
      if (!parsed.theme) {
        parsed.theme = 'tema1';
      }
      return { ...defaults, ...parsed };
    } catch (e) {
      return defaults;
    }
  },

  /**
   * Simpan pengaturan
   */
  saveSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
    return updated;
  },

  /**
   * Hitung statistik bacaan (total halaman tuntas, streak saat ini)
   */
  getStats() {
    const history = this.getHistory();
    const completedDates = Object.keys(history).filter(k => history[k] && history[k].isCompleted);
    const totalPages = completedDates.length;

    if (totalPages === 0) {
      return {
        totalPages: 0,
        streak: 0,
        maxStreak: 0,
        percentKhatam: '0.0'
      };
    }

    // Ubah string tanggal 'YYYY-MM-DD' ke integer nomor hari UTC murni
    const dayNumbers = completedDates.map(k => {
      const parts = k.split('-').map(Number);
      return Math.round(Date.UTC(parts[0], parts[1] - 1, parts[2]) / (1000 * 60 * 60 * 24));
    }).sort((a, b) => a - b);

    // Hapus duplikat nomor hari
    const uniqueDays = Array.from(new Set(dayNumbers));

    // Hitung seluruh rangkaian hari berturut-turut (consecutive streaks)
    let maxStreak = 1;
    let currentChain = 1;

    for (let i = 1; i < uniqueDays.length; i++) {
      if (uniqueDays[i] - uniqueDays[i - 1] === 1) {
        currentChain++;
        if (currentChain > maxStreak) {
          maxStreak = currentChain;
        }
      } else {
        currentChain = 1;
      }
    }
    const latestChain = currentChain; // Rangkaian berturut-turut pada grup tanggal terakhir

    // Cek juga streak aktif terhadap tanggal hari ini (real-time clock)
    const now = new Date();
    const todayDayNum = Math.round(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / (1000 * 60 * 60 * 24));

    let activeTodayStreak = 0;
    let checkDay = uniqueDays.includes(todayDayNum) ? todayDayNum : (todayDayNum - 1);
    while (uniqueDays.includes(checkDay)) {
      activeTodayStreak++;
      checkDay--;
    }

    // Streak efektif yang ditampilkan:
    // Mengutamakan streak riil berturut-turut yang telah dicapai pengguna (minimal 1 jika ada hari tuntas)
    const effectiveStreak = Math.max(activeTodayStreak, latestChain, maxStreak);

    return {
      totalPages,
      streak: effectiveStreak,
      maxStreak,
      percentKhatam: ((totalPages / 604) * 100).toFixed(1)
    };
  },

  /**
   * Helper format date ke YYYY-MM-DD
   */
  formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
};

window.StorageManager = StorageManager;
