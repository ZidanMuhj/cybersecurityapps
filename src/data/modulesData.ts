import { SecurityModule, PhishingScenario, DefenderThreat } from "../types";

export const SECURITY_MODULES: SecurityModule[] = [
  {
    id: "mod-phishing",
    category: "phishing",
    title: "Menguasai Deteksi Phishing",
    description: "Belajar caranya mendeteksi tipu daya digital, rekayasa sosial, manipulasi tautan, dan pengiriman paket fiktif (.apk) sebelum kamu terjebak.",
    difficulty: "Pemula",
    lessons: [
      {
        id: "phish-1",
        title: "Apa itu Serangan Phishing?",
        subtitle: "Memahami taktik dasar penipuan digital",
        content: [
          "Phishing adalah upaya mendapatkan informasi sensitif seperti kata sandi, kode OTP, atau nomor kartu kredit dengan menyamar sebagai institusi terpercaya lewat pesan digital.",
          "Pelaku penipuan ini biasanya memanfaatkan rasa cemas, panik, rasa ingin tahu yang tinggi, atau keserakahan (umpan hadiah gratis) dari para korban agar mereka bertindak terburu-buru.",
          "Teknik phishing modern tidak hanya menargetkan email, tetapi juga meluas ke pesan singkat (SMS), panggilan suara, dan chat WhatsApp yang sering menyamar sebagai kurir paket, teman lama, atau bahkan otoritas sekolah.",
          "Sebagai langkah awal, kita harus selalu menerapkan prinsip: Sceptic, Stop, and Check (Ragu, Berhenti, dan Periksa kembali) setiap kali menerima instruksi yang mencurigakan."
        ],
        quizQuestion: "Manakah dari elemen berikut yang merupakan tanda paling umum dari serangan phishing?",
        quizOptions: [
          "Informasi dikirimkan secara berkala setiap akhir bulan.",
          "Sentimen kepanikan atau urgensi tinggi yang memaksa tindakan langsung tanpa ditunda.",
          "Gaya bahasa resmi yang memanggil Anda dengan nama lengkap yang terdaftar.",
          "Pesan menyertakan petunjuk cara menghubungi nomor layanan pelanggan resmi."
        ],
        quizAnswer: 1,
        quizExplanation: "Pesan phishing hampir selalu menggunakan taktik psikologis berupa urgensi tinggi (misal: 'Akun Anda akan diblokir dalam 24 jam') untuk membuat korban gugup dan langsung mengklik tautan berbahaya tanpa berpikir jernih."
      },
      {
        id: "phish-2",
        title: "Seni Membedakan Domain URL Palsu",
        subtitle: "Menembus manipulasi teks alamat website",
        content: [
          "Penipu seringkali mengkloning website bank, platform game, atau media sosial agar tampak 99% mirip aslinya. Satu-satunya hal yang tidak bisa mereka duplikasi secara identik adalah nama domain inti URL.",
          "Pelaku akan memanipulasi sub-domain atau menggunakan karakter yang mirip (typosquatting). Contoh: 'instagram.com.verify-accounts.net' bukan milik Instagram, melainkan milik domain utama 'verify-accounts.net'.",
          "Perhatikan dengan seksama letak garis miring '/' pertama setelah protokol 'https://'. Domain sebenarnya terletak tepat sebelum garis miring tunggal pertama tersebut, dibaca dari kanan ke kiri.",
          "Perhatikan juga penggantian huruf mirip, misalnya huruf 'o' diganti dengan angka '0' (sh0pee.co.id) atau huruf 'l' diganti dengan angka '1' (go0g1e.com). Selalu ketik sendiri alamat resmi di browser ketika ragu."
        ],
        quizQuestion: "Manakah di bawah ini alamat website yang paling aman dan BENAR-BENAR merupakan milik resmi Instagram?",
        quizOptions: [
          "https://instagram.security-update.net/login",
          "https://security.instagram.com/reset-password",
          "https://instagram-login-verification.co/verify",
          "https://help-instagram-team.support/accounts"
        ],
        quizAnswer: 1,
        quizExplanation: "Domain utama adalah bagian sebelum garis miring tunggal pertama, dibaca dari titik terakhir. Dalam 'security.instagram.com', domain aslinya adalah 'instagram.com' yang memiliki sub-domain 'security'. Sisa pilihan lainnya menggunakan domain lain (security-update.net, instagram-login-verification.co, help-instagram-team.support) yang hanya membonceng nama Instagram sebagai umpan."
      }
    ]
  },
  {
    id: "mod-password",
    category: "password",
    title: "Sandi Tangguh & Keamanan Akun",
    description: "Kupas tuntas rahasia membuat kata sandi yang tidak mempan diretas komputer perkasa dan keampuhan Two-Factor Authentication (2FA).",
    difficulty: "Menengah",
    lessons: [
      {
        id: "pass-1",
        title: "Anatomi Kata Sandi yang Kokoh",
        subtitle: "Beralih dari kata sandi pendek ke Passphrase cerdas",
        content: [
          "Metode peretasan populer yaitu 'Brute Force' menggunakan program komputer otomatis untuk mencoba miliaran kombinasi kata sandi per detik. Sandi pendek seperti 'jakarta123' dapat dijebol dalam hitungan menit.",
          "Strategi terbaik saat ini adalah menggunakan 'Passphrase' (frasa sandi), yaitu menggabungkan 4-5 kata acak yang tidak berhubungan tetapi mudah Anda bayangkan. Contoh: 'kopi-sepeda-tidur-bulan-biru!'.",
          "Frasa sandi jauh lebih panjang (lebih dari 15 karakter) sehingga membutuhkan waktu ribuan tahun bagi komputer hacker untuk meretasnya, namun sangat gampang dihafal oleh ingatan manusia.",
          "Hindari menggunakan tanggal lahir, nama sekolah, nama pacar, atau nama hewan peliharaan karena data-data tersebut sangat gampang dikumpulkan peretas lewat mengamati media sosial Anda."
        ],
        quizQuestion: "Mengapa menggunakan frasa bernada acak seperti 'kucing-loncat-belanja-angkasa' lebih baik daripada 'Zulfa2009!'?",
        quizOptions: [
          "Karena tidak menggunakan angka sama sekali sehingga browser tidak terganggu.",
          "Karena panjang karakter yang luar biasa menyulitkan peretasan algoritma brute force, namun sangat mudah diingat manusia.",
          "Karena penipu tidak menyukai hewan kucing.",
          "Karena kata sandi tersebut secara otomatis mengaktifkan enkripsi tingkat tinggi di semua server."
        ],
        quizAnswer: 1,
        quizExplanation: "Komputer meretas dengan mencoba kombinasi karakter secara matematika. Semakin panjang sebuah sandi (misal 25 karakter pada frasa), tingkat kombinasinya membesar secara eksponensial sehingga mustahil dipecahkan secara brute-force dalam periode hidup manusia."
      },
      {
        id: "pass-2",
        title: "Mengenal Perisai Berlapis 2FA / MFA",
        subtitle: "Mengunci pintu akun meskipun kunci utama dicuri",
        content: [
          "Meskipun kata sandi Anda sangat kuat, kebocoran data (data breach) di server perusahaan luar masih bisa membeberkan sandi Anda. Di sinilah Two-Factor Authentication (2FA) menyelamatkan akun.",
          "Dengan mengaktifkan 2FA, sistem meminta dua bukti identitas sebelum mengizinkan login: sesuatu yang Anda TAHU (kata sandi) dan sesuatu yang Anda MILIKI (ponsel untuk menerima OTP, kunci keamanan fisik, atau aplikasi Authenticator).",
          "Hindari 2FA berbasis SMS jika ada opsi lain. Penipu bisa mencuri kartu SIM Anda melalui trik 'SIM Swap'. Gunakan aplikasi Google Authenticator, Microsoft Authenticator, atau verifikasi prompt bawaan perangkat yang jauh lebih aman.",
          "Ingat: Jangan pernah membagikan kode OTP atau menekan tombol 'Ya' pada prompt login jika Anda sendiri tidak sedang berupaya masuk ke akun tersebut."
        ],
        quizQuestion: "Jika seorang hacker berhasil mengetahui password Instagram Anda, sistem pelindung apa yang mencegahnya masuk ke akun Anda?",
        quizOptions: [
          "Email pemulihan lama yang sudah tidak aktif.",
          "Two-Factor Authentication (2FA) yang aktif menggunakan Google Authenticator.",
          "Browser Chrome yang diperbarui ke versi terbaru.",
          "Verifikasi CAPTCHA bergambar jembatan di layar utama."
        ],
        quizAnswer: 1,
        quizExplanation: "Meskipun password bocor, dengan 2FA aktif penyerang tetap tidak bisa login karena mereka tidak menguasai kode 6-digit acak yang berganti tiap 30 detik di smartphone pribadi Anda."
      }
    ]
  },
  {
    id: "mod-privacy",
    category: "privacy",
    title: "Kedaulatan Privasi Digital Pelajar",
    description: "Bagaimana melacak jejak digital sendiri, mengendalikan izin akses aplikasi di ponsel, dan menghindari aplikasi bajakan pembawa malware.",
    difficulty: "Menengah",
    lessons: [
      {
        id: "priv-1",
        title: "Jejak Digital Anda Bersifat Abadi",
        subtitle: "Menjaga reputasi online masa depan sejak sekolah",
        content: [
          "Setiap postingan, komentar, pencarian, dan lokasi yang Anda bagikan membentuk database jejak digital Anda. Sekali diunggah ke internet, data tersebut sangat sulit dihapus selamanya akibat tangkapan layar (screenshot) atau web archiving.",
          "Banyak Universitas terkemuka dan Departemen HRD Perusahaan zaman sekarang melakukan pemeriksaan latar belakang (background check) media sosial pelamar untuk menilai kepribadian dan rekam jejak mereka.",
          "Sebelum memposting sesuatu yang kontroversial atau candaan kasar, tanyakan pada diri sendiri: 'Apakah saya tetap merasa nyaman jika postingan ini dibaca oleh ibu saya atau calon bos saya 5 tahun lagi?'Jika jawabannya tidak, urungkan niat itu.",
          "Mulailah memeriksa pengaturan privasi akun secara berkala. Batasi siapa yang dapat melihat postingan lama Anda dan hapus tag foto-foto masa lalu yang kurang layak."
        ],
        quizQuestion: "Sebelum membagikan foto konyol teman atau opini emosional di story publik, tindakan pencegahan paling bijak adalah...",
        quizOptions: [
          "Mengunggahnya saja karena story akan otomatis hilang dalam 24 jam.",
          "Melakukan filter 'Close Friends' saja tanpa memikirkan kemungkinan mereka mengambil screensot.",
          "Mempertimbangkan dampak reputasi jangka panjang dan kemungkinan tangkapan layar yang bisa disimpan selamanya.",
          "Menambahkan tulisan disclaimer 'Jangan disebar' di ujung pojok foto."
        ],
        quizAnswer: 2,
        quizExplanation: "Internet memiliki ingatan abadi. Story 24 jam bisa dengan mudah di-screenshot atau direkam layar oleh orang lain dan disebarkan kembali di kemudian hari saat Anda melamar pekerjaan atau beasiswa."
      },
      {
        id: "priv-2",
        title: "Waspada APK Modifikasi & Izin Ponsel",
        subtitle: "Menutup gerbang masuk spyware penembus file pribadi",
        content: [
          "Banyak pelajar sangat gemar mengunduh game populer versi modifikasi gratis (biasanya berkas format .apk di Android) dari situs web tidak resmi. Ini adalah ladang subur penyebaran malware.",
          "Aplikasi modifikasi gratis ini sering disisipi Trojan Horse atau Spyware yang berjalan diam-diam di latar belakang ponsel untuk merekam ketukan tombol keyboard (keylogger) atau mencuri log SMS bank.",
          "Ketika menginstal aplikasi baru di Android/iOS, biasakan membaca daftar izin (permissions) yang diminta. Jika aplikasi game offline sederhana meminta izin membaca SMS, kontak, kamera, dan lokasi, ini adalah tanda bahaya merah!",
          "Batasi izin aplikasi secara ketat. Berikan izin lokasi atau mikrofon hanya dengan opsi 'Hanya saat aplikasi digunakan' (Only while using the app), jangan berikan izin permanen."
        ],
        quizQuestion: "Aplikasi Game Teka-Teki luring (offline) yang baru Anda instal tiba-tiba meminta akses membaca SMS Anda. Tindakan paling tepat adalah...",
        quizOptions: [
          "Langsung memberikan izin demi kelancaran permainan game.",
          "Menolak/menolaknya karena game offline tidak memerlukan fungsi SMS, dan segera menghapus aplikasi tersebut karena mencurigakan.",
          "Mengizinkannya asal ponsel dihubungkan ke charger.",
          "Mengirimkan SMS ke teman untuk menanyakan pendapat mereka."
        ],
        quizAnswer: 1,
        quizExplanation: "Sebuah game teka-teki offline tidak memiliki alasan logis apapun untuk membaca SMS pribadi Anda. Ini mengindikasikan aplikasi tersebut berpotensi menguping SMS masuk untuk mencuri kode verifikasi OTP perbankan atau media sosial Anda."
      }
    ]
  },
  {
    id: "mod-social",
    category: "social",
    title: "Bersosial Media dengan Aman & Cerdas",
    description: "Kenali taktik rekayasa sosial di dunia maya, bahaya oversharing, dan cara mengamankan ruang berbagi Anda dari penguntit digital.",
    difficulty: "Pemula",
    lessons: [
      {
        id: "soc-1",
        title: "Bahaya Terselubung Oversharing",
        subtitle: "Menjaga batas aman antara dunia nyata dan maya",
        content: [
          "Oversharing adalah perilaku membagikan kehidupan pribadi secara berlebihan di internet. Seringkali tanpa sadar kita memperlihatkan informasi berharga bagi pelaku kejahatan lokal maupun digital.",
          "Contoh oversharing berbahaya: memfoto tiket pesawat/konser dengan barcode utuh, mengunggah kartu pelajar dengan Nomor Induk Siswa Nasional (NISN), memvideokan jalan komplek rumah secara detail, atau melakukan update lokasi secara langsung (real-time).",
          "Barcode tiket konser dapat dipindai oleh penipu lain dari story Instagram Anda untuk diduplikasi, membuat Anda ditolak masuk ke area konser karena tiket sudah dianggap terpakai.",
          "Gunakan fitur 'delay sharing' - bagikan keseruan atau foto liburan Anda 1-2 hari setelah Anda sudah berpindah lokasi atau pulang ke rumah untuk menghindari penguntit (stalker) fisik."
        ],
        quizQuestion: "Dari aktivitas berikut, manakah skenario oversharing yang paling berisiko tinggi membahayakan keamanan fisik atau data Anda di dunia nyata?",
        quizOptions: [
          "Membagikan ulasan buku bacaan sekolah di blog pribadi.",
          "Mengunggah foto kelulusan dengan menyensor nomor ijazah dan alamat rumah.",
          "Mengunggah foto tiket perjalanan kereta yang memperlihatkan barcode dan jadwal keberangkatan secara utuh ke publik beberapa jam sebelum berangkat.",
          "Melakukan livestreaming membahas resep memasak dengan teman sekolah."
        ],
        quizAnswer: 2,
        quizExplanation: "Memamerkan tiket aktif beserta barcodenya secara langsung memungkinkan penjahat mencuri barcode tersebut untuk membatalkan tiket Anda, mencuri poin reward perjalanan, atau menyusul posisi Anda di stasiun keberangkatan demi niat jahat."
      }
    ]
  }
];

export const PHISHING_SCENARIOS: PhishingScenario[] = [
  {
    id: "scen-whatsapp-apk",
    senderName: "Kurir J&T Expres (Paket Gagal)",
    senderAddress: "+62 813-9923-2811 (Nomor Ponsel Biasa)",
    recipient: "WhatsApp Anda",
    subject: "Konfirmasi Paket Gagal Dikirim - Resi JNT-889",
    dateStr: "Hari ini, 10:42 AM",
    isPhishing: true,
    avatarLetter: "J",
    avatarBg: "bg-red-600",
    difficulty: "Mudah",
    emailBody: `Halo Kak, kami dari kurir resmi J&T Express ingin mengabarkan bahwa kurir kami gagal mengirimkan paket ke rumah Kakak karena alamat kurang lengkap / nomor rumah tidak terlihat.

Silakan unduh aplikasi pelacak resmi kami di bawah ini untuk melihat foto paket yang gagal dikirim dan memperbaiki lokasi rumah Kakak agar bisa dikirim ulang sore ini juga:

🔗 [DOWNLOAD_PAKET_JNT.apk] (Ukuran: 4.8MB)

Harap segera diinstal ya kak agar paket tidak kami kembalikan ke gudang pusat. Terima kasih.`,
    clues: [
      {
        id: "clue-apk-1",
        targetText: "+62 813-9923-2811",
        label: "Nomor Kontak Mencurigakan",
        type: "warning",
        reason: "Akun bisnis resmi J&T Express memiliki centang hijau verifikasi resmi WhatsApp, bukan menggunakan nomor seluler pribadi tidak dikenal."
      },
      {
        id: "clue-apk-2",
        targetText: "DOWNLOAD_PAKET_JNT.apk",
        label: "Ekstensi Berkas Berbahaya (.APK)",
        type: "warning",
        reason: "Ekstensi file '.apk' adalah aplikasi instalasi Android. Aplikasi pelacakan resmi selalu dipasang dari Google Play Store/App Store. Menginstal APK dari luar toko resmi akan memasang Malware pencuri SMS/m-banking ke HP Anda."
      },
      {
        id: "clue-apk-3",
        targetText: "agar paket tidak kami kembalikan",
        label: "Taktik Intimidasi & Urgensi",
        type: "warning",
        reason: "Pembuat pesan phishing sengaja mengancam paket akan dikembalikan agar korban panik dan buru-buru mengklik tautan tanpa berpikir logis."
      }
    ],
    explanation: "Ini adalah modus phishing 'Dokumen APK Kurir' yang sangat marak di Indonesia. Pelaku menyebarkan malware berkedok foto/aplikasi pelacak guna menyadap isi SMS korban untuk merampas akun perbankan digital dan e-wallet secara instan."
  },
  {
    id: "scen-insta-fake",
    senderName: "Instagram Security Team Support",
    senderAddress: "no-reply@instagram-security-alert.net",
    recipient: "user.generasi.digital@gmail.com",
    subject: "PERINGATAN: Akun Instagram Anda akan ditangguhkan dlm 24 Jam!",
    dateStr: "Kemarin, 03:15 PM",
    isPhishing: true,
    avatarLetter: "I",
    avatarBg: "bg-purple-600",
    difficulty: "Sedang",
    emailBody: `Dear @user.generasi.digital,

Sistem pusat kami mendeteksi adanya pelanggaran Hak Cipta (Copyright Infringement) pada beberapa foto dan musik yang Anda unggah di feed Anda.

Ada pihak ketiga yang mengajukan keberatan resmi atas akun Anda. Jika Anda tidak mengajukan banding pembelaan dalam waktu 24 jam ke depan, akun Anda akan dihapus secara permanen dari server kami.

Silakan lakukan login dan ajukan formulir banding banding Anda melalui tautan resmi tim bantuan kami:

👉 [https://instagram.security-alert-center.net/case-verification/login]

Terima kasih atas kerja sama Anda dalam menjaga komunitas Instagram tetap aman.`,
    clues: [
      {
        id: "clue-ig-1",
        targetText: "no-reply@instagram-security-alert.net",
        label: "Alamat Pengirim Palsu",
        type: "warning",
        reason: "Email resmi dari Instagram/Meta pasti diakhiri dengan domain '@mail.instagram.com' atau '@meta.com'. Domain 'instagram-security-alert.net' adalah domain baru yang dibeli pelaku penipuan."
      },
      {
        id: "clue-ig-2",
        targetText: "https://instagram.security-alert-center.net/case-verification/login",
        label: "Alamat URL Website Palsu",
        type: "warning",
        reason: "Meskipun diawali kata 'instagram.', domain induk sebenarnya adalah 'security-alert-center.net' (terletak tepat sebelum garis miring tunggal pertama). Jika Anda memasukkan password di sini, hacker akan langsung merekam password Anda."
      },
      {
        id: "clue-ig-3",
        targetText: "dihapus secara permanen dlm 24 Jam",
        label: "Tekanan Psikologis",
        type: "warning",
        reason: "Menakut-nakuti hilangnya akun berharga adalah cara andalan peretas memaksa Anda mengabaikan kejanggalan sistem keamanan."
      }
    ],
    explanation: "Ini merupakan modus credential harvesting. Halaman login palsu dibuat semirip mungkin dengan Instagram asli. Ketika korban memasukkan username dan password mereka, data tersebut dikirim langsung ke server pelaku."
  },
  {
    id: "scen-google-real",
    senderName: "Google Account Team",
    senderAddress: "no-reply@accounts.google.com",
    recipient: "user.generasi.digital@gmail.com",
    subject: "Pemberitahuan keamanan: Perangkat baru baru saja masuk ke akun Anda",
    dateStr: "2 hari yang lalu, 08:01 AM",
    isPhishing: false,
    avatarLetter: "G",
    avatarBg: "bg-blue-600",
    difficulty: "Sedang",
    emailBody: `Keamanan Akun Google

Seseorang baru saja login ke Akun Google Anda (user.generasi.digital@gmail.com) melalui perangkat baru: Windows PC (Batam, Indonesia).

Waktu: 25 Mei 2026, 08:00 WIB
Browser: Google Chrome

Jika ini memang aktivitas Anda, tidak ada tindakan lebih lanjut yang perlu dilakukan. Namun, jika Anda tidak merasa melakukan login dari komputer di tempat tersebut, harap segera amankan akun Anda:

Amankan dengan mengeklik tombol tinjau aktivitas berikut:
👉 [https://myaccount.google.com/notifications]

Hormat kami,
Tim Akun Google`,
    clues: [
      {
        id: "clue-go-1",
        targetText: "no-reply@accounts.google.com",
        label: "Email Pengirim Valid",
        type: "safe",
        reason: "Alamat email berakhiran '@accounts.google.com' merupakan subdomain resmi milik Google LLC yang dijamin keamanannya dan tidak dapat dipalsukan jika sistem menyertakan validasi DKIM/SPF di penyedia email modern Anda."
      },
      {
        id: "clue-go-2",
        targetText: "https://myaccount.google.com/notifications",
        label: "Tautan Enkripsi Resmi Google",
        type: "safe",
        reason: "Domain inti dibaca 'google.com' sebelum garis miring tunggal pertama, yang merupakan portal kelola akun resmi Google yang dienkripsi aman."
      }
    ],
    explanation: "Ini adalah email keamanan resmi (Legitimate Email) dari Google. Sangat penting bagi kita untuk mengenali bahwa tidak semua peringatan itu jahat. Belajar mengenali domain asli membantu kita menavigasi notifikasi keamanan yang sah agar tanggap terhadap upaya pembobolan riil."
  },
  {
    id: "scen-shopee-shoppay",
    senderName: "Gebyar Shopee Indonesia",
    senderAddress: "gebyar-shopee-rejekihariini@shopeepay-undian66.com",
    recipient: "user.generasi.digital@gmail.com",
    subject: "🎁 Selamat! Saldo ShopeePay Rp2.500.000 Menanti Anda!",
    dateStr: "3 hari yang lalu, 11:20 AM",
    isPhishing: true,
    avatarLetter: "S",
    avatarBg: "bg-orange-500",
    difficulty: "Sedang",
    emailBody: `Pengguna Shopee yang berbahagia,

Dalam rangka menyambut hari jadi Shopee Indonesia ke-11, tim Shopee mengadakan undian acak berkala. Selamat! Alamat email Anda terpilih sebagai pemenang hadiah subsidi saldo ShopeePay senilai Rp 2.500.000!

Hadiah ini ditiadakan pajak dan dapat langsung diklaim ke dompet digital Anda sekarang dengan mengikuti langkah pengisian kode OTP dan kupon klaim di website kami:

👉 [https://undian-shopee.shopeepay-undian66.com/claim-hadiah/index.html]

Catatan: Proses pencairan dana maksimal pukul 24.00 WIB hari ini. Jika kuota habis, hadiah hangus dan dialihkan ke pemenang lain.`,
    clues: [
      {
        id: "clue-sh-1",
        targetText: "gebyar-shopee-rejekihariini@shopeepay-undian66.com",
        label: "Domain Email Gratis/Abal-abal",
        type: "warning",
        reason: "Akun resmi Shopee Indonesia menggunakan domain '@shopee.co.id' atau '@shopeepay.co.id'. Penggunaan gabungan kata berbelit-belit seperti 'shopeepay-undian66.com' adalah taktik murahan membeli domain murah."
      },
      {
        id: "clue-sh-2",
        targetText: "https://undian-shopee.shopeepay-undian66.com/claim-hadiah/index.html",
        label: "Subdomain Pengalih",
        type: "warning",
        reason: "Bagian 'shopeepay-undian66.com' adalah nama domain aslinya. Kata 'undian-shopee.' diletakkan di depan sebagai subdomain palsu hanya untuk membohongi pengguna yang membaca sekilas."
      },
      {
        id: "clue-sh-3",
        targetText: "pengisian kode OTP",
        label: "Permintaan OTP Mencurigakan",
        type: "warning",
        reason: "Pihak Shopee maupun institusi resmi manapun tidak pernah meminta kode One-Time Password (OTP) Anda demi mentransfer hadiah. OTP adalah kunci akses gerbang brankas uang digital Anda."
      }
    ],
    explanation: "Ini adalah taktik Phishing bermotif Finansial (SopheePay Sweepstakes Scams). Korban didorong mengisi formulir, memasukkan password akun, dan menyerahkan kode OTP transaksi yang masuk via SMS agar pelaku bisa membeli barang di Shopee menggunakan pulsa/saldo korban."
  }
];

export const DEFENDER_THREATS: DefenderThreat[] = [
  {
    id: "def-laptop",
    name: "Laptop Tanpa Pengamanan di Area Publik",
    location: "Kafetaria Sekolah",
    status: "vulnerable",
    iconName: "Laptop",
    threatDescription: "Laptop Anda dibiarkan menyala tanpa dikunci layar saat Anda pergi ke wastafel selama 5 menit. Seseorang bisa memasang flashdisk berspionase, mengintip folder tugas kelompok, atau masuk ke akun media sosial Anda.",
    secureGoal: "Kunci laptop dan lindungi akses cepat saat ditinggal sebentar.",
    options: [
      {
        id: "opt-lap-1",
        label: "Biarkan saja karena kafe ramai",
        description: "Meninggalkan laptop menyala karena menganggap kafe dipenuhi orang baik dan kamera CCTV banyak.",
        points: -10,
        isSecure: false,
        feedback: "Bahaya! Pencurian session cookie atau pemasangan virus via USB ('rubber ducky') hanya butuh waktu 10 detik tanpa terlihat orang sekitar."
      },
      {
        id: "opt-lap-2",
        label: "Kunci Layar (Win + L) & Amankan Fisik",
        description: "Mengaktifkan kunci sandi/sidik jari layar dengan tombol Win+L atau membawa laptop ke wastafel bila tidak ada teman tepercaya.",
        points: 25,
        isSecure: true,
        feedback: "Pilihan Sempurna! Fitur lock screen instan menjaga sesi login Anda tetap aman dari keisengan (shoulder surfing / physical access) orang lain."
      },
      {
        id: "opt-lap-3",
        label: "Redupkan layar hingga paling gelap",
        description: "Hanya meredupkan lampu layar tanpa mengunci sistem.",
        points: 0,
        isSecure: false,
        feedback: "Kurang Tepat! Tombol keyboard apa saja tetap bisa ditekan oleh orang asing dan membuka kembali isi layar Anda."
      }
    ]
  },
  {
    id: "def-wifi",
    name: "Koneksi Wi-Fi Publik 'Kopi_Gratis_Tanpa_Sandi'",
    location: "Kedai Kopi Luar",
    status: "vulnerable",
    iconName: "Wifi",
    threatDescription: "Anda menyambungkan HP ke Wi-Fi publik gratisan yang tidak memiliki password enkripsi. Peretas di sebelah meja Anda bisa memata-matai semua data tidak terenkripsi yang keluar-masuk dari HP Anda menggunakan program packet sniffer.",
    secureGoal: "Lindungi enkripsi lalu-lintas data koneksi internet Anda.",
    options: [
      {
        id: "opt-wif-1",
        label: "Langsung login dan bertransaksi m-banking",
        description: "Mengakses situs sensitif dan transfer uang karena Wi-Fi kencang.",
        points: -15,
        isSecure: false,
        feedback: "Sangat Berbahaya! Serangan Man-in-the-Middle (MitM) dapat menangkap sandi rahasia atau memalsukan halaman portal pembayaran bank Anda."
      },
      {
        id: "opt-wif-2",
        label: "Gunakan Layanan VPN Tepercaya",
        description: "Mengaktifkan Virtual Private Network (VPN) terenkripsi sebelum membuka aplikasi apa pun, atau beralih menggunakan kuota seluler pribadi.",
        points: 25,
        isSecure: true,
        feedback: "Luar Biasa! VPN membungkus data internet Anda menggunakan terowongan berenkripsi militer sehingga tidak bisa dibaca oleh hacker wifi."
      },
      {
        id: "opt-wif-3",
        label: "Ganti ke mode incognito di browser",
        description: "Membuka browser samaran (incognito) saat mengetik sandi di Wi-Fi tanpa kunci.",
        points: 5,
        isSecure: false,
        feedback: "Mitos! Mode Incognito hanya mencegah browser menyimpan history di komputer Anda secara lokal, tetapi data yang ditransmisikan lewat udara bebas tetap tidak terenkripsi dan dapat dicuri."
      }
    ]
  },
  {
    id: "def-file",
    name: "Dokumen 'rahasia.txt' di Desktop Komputer",
    location: "Komputer Rumah / Lab Sekolah",
    status: "vulnerable",
    iconName: "FileText",
    threatDescription: "Sebuah file notepad bernama 'password-sekolah.txt' tergeletak mencolok di halaman depan. Berisi daftar sandi Instagram, Email, Akun SIAKAD sekolah, dan Akun game Mobile Legend Anda secara terbuka tanpa enkripsi sama sekali.",
    secureGoal: "Kelola kata sandi dalam wadah berenkripsi dan aman.",
    options: [
      {
        id: "opt-fil-1",
        label: "Cukup ganti nama berkas jadi 'tugas-sains.txt'",
        description: "Mengelabui dengan nama dokumen tidak penting untuk menyembunyikan kata sandi.",
        points: 0,
        isSecure: false,
        feedback: "Kurang Efektif! Alat pencari otomatis atau peretas lokal tetap dapat memindai kata kunci 'password' di semua file teks dengan cepat."
      },
      {
        id: "opt-fil-2",
        label: "Gunakan Password Manager Terenkripsi (Lengkap 2FA)",
        description: "Memindahkan daftar kata sandi ke dalam aplikasi pengelola sandi (Bitwarden, ProtonPass, dll) yang menggunakan enkripsi ujung ke ujung.",
        points: 25,
        isSecure: true,
        feedback: "Kombinasi Hebat! Pengelola sandi memberi perlindungan ganda: dia mengenkripsi data secara ketat, menyisipkan auto-fill, dan menyarankan kata sandi acak yang unik."
      },
      {
        id: "opt-fil-3",
        label: "Hapus file tapi biarkan di Recycle Bin",
        description: "Menghapusnya dari desktop biasa namun isinya masih tersimpan di folder tempat penampungan sampah komputer.",
        points: -5,
        isSecure: false,
        feedback: "Salah! File di Recycle Bin masih sangat mudah dibuka oleh siapapun yang mengecek komputer tersebut."
      }
    ]
  },
  {
    id: "def-paparazzi",
    name: "Oversharing Kartu Peserta Ujian di Instastory",
    location: "Instagram Story Pribadi",
    status: "vulnerable",
    iconName: "ShieldAlert",
    threatDescription: "Sebagai tanda perayaan kelulusan ujian semester, Anda mengunggah foto kartu peserta ujian yang menunjukkan nama lengkap, Nomor Induk Siswa Nasional (NISN), Tanggal Lahir, Tanda Tangan Digital, dan barcode pendaftaran sekolah.",
    secureGoal: "Batasi pencurian data identitas (Identity Theft) oleh pelaku kejahatan siber.",
    options: [
      {
        id: "opt-pap-1",
        label: "Unggah saja karena akun Anda berstatus 'Private'",
        description: "Menganggap pengikut akun yang merupakan teman sekolah tidak akan menyalahgunakan data Anda.",
        points: 5,
        isSecure: false,
        feedback: "Risiko Menengah. Teman dekat tetap bisa screenshot foto itu, atau akun Anda bisa disusupi fake-follower. Data sensitif tidak boleh diunggah sama sekali."
      },
      {
        id: "opt-pap-2",
        label: "Sensor/Blur Data Sensitif Sebelum Diunggah",
        description: "Menyensor NISN, Tanggal Lahir, Alamat, Tanda Tangan, dan Barcode dengan warna hitam solid sebelum diposting, atau sebaiknya tidak memajang kartu identitas sama sekali.",
        points: 25,
        isSecure: true,
        feedback: "Opsi Terbaik! Dengan menyembunyikan bagian paling privat, Anda menjauhkan diri dari penipuan rekayasa sosial atau pendaftaran pinjol fiktif menggunakan data Anda."
      },
      {
        id: "opt-pap-3",
        label: "Hapus foto 1 jam setelah melihat ada banyak 'Likes'",
        description: "Menayangkan data penting selama beberapa saat lalu menghapusnya secara manual.",
        points: -5,
        isSecure: false,
        feedback: "Sangat Rentan! Bot crawler atau pencuri data profesional memantau medsos terus-menerus dan mengarsipkan foto dalam hitungan detik saja."
      }
    ]
  }
];
