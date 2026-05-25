import React, { useState, useEffect } from "react";
import { UserStats, SecurityModule, Lesson } from "./types";
import { SECURITY_MODULES } from "./data/modulesData";
import PhishingSimulator from "./components/PhishingSimulator";
import MiniGame from "./components/MiniGame";
import Sertifikat from "./components/Sertifikat";
import { 
  Shield, 
  Award, 
  Terminal, 
  GraduationCap, 
  Mail, 
  Joystick, 
  TrendingUp, 
  Target, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  BookOpen, 
  Play, 
  Briefcase, 
  Info,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Coins
} from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState<"landing" | "belajar" | "phishing" | "defender" | "sertifikat" | "startup">("landing");
  
  // User global tracking state
  const [stats, setStats] = useState<UserStats>(() => {
    // Attempt local storage recall
    try {
      const recalled = localStorage.getItem("siberedu-stats");
      if (recalled) {
        return JSON.parse(recalled);
      }
    } catch (e) {
      console.error("Local storage error during initialization:", e);
    }
    
    return {
      score: 0,
      completedLessons: [],
      completedModules: [],
      phishingCompleted: false,
      phishingScore: 0,
      defenderCompleted: false,
      defenderScore: 0,
      studentName: "",
      studentSchool: "",
      certificateClaimed: false,
      certificateId: ""
    };
  });

  // Persist score changes
  useEffect(() => {
    localStorage.setItem("siberedu-stats", JSON.stringify(stats));
  }, [stats]);

  // Handle minor score updates or modules achievements
  const handleUpdateStats = (newFields: Partial<UserStats>) => {
    setStats((prev) => ({ ...prev, ...newFields }));
  };

  // Learning Modules states
  const [selectedModuleId, setSelectedModuleId] = useState<string>(SECURITY_MODULES[0].id);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState<number>(0);
  const [quizScoreFeedback, setQuizScoreFeedback] = useState<{
    submitted: boolean;
    selectedOptionIdx: number;
    isCorrect: boolean;
  } | null>(null);

  const activeModule = SECURITY_MODULES.find(m => m.id === selectedModuleId) || SECURITY_MODULES[0];
  const activeLesson = activeModule.lessons[selectedLessonIdx] || activeModule.lessons[0];

  const handleSelectModule = (modId: string) => {
    setSelectedModuleId(modId);
    setSelectedLessonIdx(0);
    setQuizScoreFeedback(null);
  };

  const handleSelectLesson = (idx: number) => {
    setSelectedLessonIdx(idx);
    setQuizScoreFeedback(null);
  };

  // Handle Lesson quiz submissions
  const handleSubmitQuiz = (optionIdx: number) => {
    if (quizScoreFeedback?.submitted) return; // Answered already

    const isCorrect = optionIdx === activeLesson.quizAnswer;
    setQuizScoreFeedback({
      submitted: true,
      selectedOptionIdx: optionIdx,
      isCorrect
    });

    // Score calculations
    const lessonKey = `${activeModule.id}-${activeLesson.id}`;
    const alreadyCompleted = stats.completedLessons.includes(lessonKey);

    if (isCorrect && !alreadyCompleted) {
      const newScore = stats.score + 10;
      const updatedLessons = [...stats.completedLessons, lessonKey];
      
      // Check if all lessons of this active module are completed
      const moduleLessonsKeys = activeModule.lessons.map(l => `${activeModule.id}-${l.id}`);
      const isModuleCompletedNow = moduleLessonsKeys.every(k => 
        updatedLessons.includes(k)
      );

      const updatedModules = isModuleCompletedNow 
        ? [...stats.completedModules, activeModule.id]
        : stats.completedModules;

      handleUpdateStats({
        score: newScore,
        completedLessons: updatedLessons,
        completedModules: updatedModules
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F3F4F6] font-sans selection:bg-[#00FF41] selection:text-[#08090A] relative">
      <div className="absolute inset-0 cyber-grid opacity-[0.6] pointer-events-none" />
      
      {/* 1. Header Navigation */}
      <nav className="h-20 border-b border-[#1F2937] bg-[#08090A]/90 backdrop-blur-md sticky top-0 z-50 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            id="brand-logo-nav"
            onClick={() => setActiveSection("landing")}
            className="flex items-center gap-3 cursor-pointer text-left"
          >
            <div className="w-8 h-8 bg-[#00FF41] rounded-sm flex items-center justify-center text-[#08090A] shadow-md">
              <Shield className="w-5 h-5 text-[#08090A] fill-current" />
            </div>
            <div>
              <div className="font-display font-black text-xl italic uppercase tracking-tighter text-[#F3F4F6]">
                UNAS CYBER<span className="text-[#00FF41]"> TECH SECURITY</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-[#9CA3AF] font-bold block">
                UNAS CYBER SECURITY AWARENESS
              </span>
            </div>
          </button>

          {/* Nav List links */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
            <button
              id="nav-landing"
              onClick={() => setActiveSection("landing")}
              className={`px-3 py-1.5 transition-all text-[11px] font-mono tracking-widest ${
                activeSection === "landing" 
                  ? "text-[#00FF41] border-b border-[#00FF41] font-bold" 
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Beranda
            </button>
            <button
              id="nav-belajar"
              onClick={() => setActiveSection("belajar")}
              className={`px-3 py-1.5 transition-all text-[11px] font-mono tracking-widest ${
                activeSection === "belajar" 
                  ? "text-[#00FF41] border-b border-[#00FF41] font-bold" 
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Modul Belajar
            </button>
            <button
              id="nav-phishing"
              onClick={() => setActiveSection("phishing")}
              className={`px-3 py-1.5 transition-all text-[11px] font-mono tracking-widest ${
                activeSection === "phishing" 
                  ? "text-[#00FF41] border-b border-[#00FF41] font-bold" 
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Simulasi Phishing
            </button>
            <button
              id="nav-defender"
              onClick={() => setActiveSection("defender")}
              className={`px-3 py-1.5 transition-all text-[11px] font-mono tracking-widest ${
                activeSection === "defender" 
                  ? "text-[#00FF41] border-b border-[#00FF41] font-bold" 
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              ICT Games
            </button>
            <button
              id="nav-sertifikat"
              onClick={() => setActiveSection("sertifikat")}
              className={`px-3 py-1.5 transition-all text-[11px] font-mono tracking-widest ${
                activeSection === "sertifikat" 
                  ? "text-[#00FF41] border-b border-[#00FF41] font-bold" 
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Sertifikat
            </button>
            <button
              id="nav-startup"
              onClick={() => setActiveSection("startup")}
              className={`px-3 py-1.5 transition-all text-[11px] font-mono tracking-widest ${
                activeSection === "startup" 
                  ? "text-[#00FF41] border-b border-[#00FF41] font-bold" 
                  : "text-[#9CA3AF] hover:text-white"
              }`}
            >
              Profil Startup
            </button>
          </div>

          {/* Right Status Indicator Block */}
          <div className="flex items-center gap-3">
            <div className="bg-[#0A0C12] border border-[#1F2937] rounded-sm px-4 py-1.5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00FF41] rounded-full inline-block animate-pulse shrink-0"></span>
              <div className="text-[11px] font-mono shrink-0 uppercase tracking-wider">
                <span className="text-[#9CA3AF] hidden sm:inline">SKOR SIBER_ </span>
                <strong className="text-[#00FF41] font-bold">{stats.score}</strong>
              </div>
            </div>
          </div>

        </div>
      </nav>

      {/* 2. Primary Layout Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* ==================== A. LANDING HERO SECTION ==================== */}
        {activeSection === "landing" && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* Hero Main Catch */}
            <div className="text-center max-w-4xl mx-auto space-y-6 pt-10">
              <div className="inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-[10px] font-mono mb-2 uppercase tracking-widest rounded-none bg-[#00FF41]/5 animate-pulse">
                ✦ SECURE THE FUTURE GENERATION — UNAS STARTUP CYBER TECH SECURITY ✦
              </div>
              <h1 className="text-[52px] sm:text-[70px] md:text-[84px] leading-[0.85] font-black italic tracking-tighter uppercase mb-6 font-display text-white">
                SHIELD YOUR <br/>DIGITAL <span className="text-[#00FF41]">IDENTITY</span> WITH <span className="text-[#00FF41]">UNAS CYBER TECH SECURITY</span>
              </h1>
              <p className="text-base md:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed mx-auto font-sans">
                The first cyber-education startup dedicated to turning students into digital guardians through interactive defense play. Master real defenses with zero-trust modules.
              </p>

              {/* Call to action tools */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                <button
                  id="cta-belajar-btn"
                  onClick={() => setActiveSection("belajar")}
                  className="px-6 py-3.5 bg-[#00FF41] text-[#08090A] text-xs font-mono font-bold uppercase tracking-widest hover:bg-white transition-colors duration-200 rounded-none flex items-center gap-2 cursor-pointer shadow-lg shadow-[#00FF41]/10"
                >
                  <BookOpen className="w-4 h-4" /> Mulai Belajar
                </button>
                <button
                  id="cta-hacks-game-btn"
                  onClick={() => setActiveSection("defender")}
                  className="px-6 py-3.5 bg-transparent border border-[#1F2937] hover:border-[#00FF41] text-white text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-200 rounded-none flex items-center gap-2 cursor-pointer"
                >
                  <Joystick className="w-4 h-4 text-[#00FF41]" /> ICT GAMES
                </button>
                <button
                  id="cta-phishing-btn"
                  onClick={() => setActiveSection("phishing")}
                  className="px-6 py-3.5 bg-transparent border border-[#1F2937] hover:border-[#00FF41] text-white text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-200 rounded-none flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-red-500" /> Phising Simulator
                </button>
              </div>

              {/* Instant Social indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 text-center">
                <div className="p-4 bg-[#0A0C12] border border-[#1F2937] rounded-none">
                  <div className="font-mono text-xl font-extrabold text-[#00FF41]">100%</div>
                  <div className="text-[10px] text-[#4B5563] font-mono uppercase tracking-wider mt-1">Interaktif Game</div>
                </div>
                <div className="p-4 bg-[#0A0C12] border border-[#1F2937] rounded-none">
                  <div className="font-mono text-xl font-extrabold text-[#00FF41]">CERTIFICATED</div>
                  <div className="text-[10px] text-[#4B5563] font-mono uppercase tracking-wider mt-1 font-semibold">Cetak Sertifikat</div>
                </div>
                <div className="p-4 bg-[#0A0C12] border border-[#1F2937] rounded-none">
                  <div className="font-mono text-xl font-extrabold text-[#00FF41]">4 PILAR</div>
                  <div className="text-[10px] text-[#4B5563] font-mono uppercase tracking-wider mt-1">Kompetensi Inti</div>
                </div>
                <div className="p-4 bg-[#0A0C12] border border-[#1F2937] rounded-none">
                  <div className="font-mono text-xl font-extrabold text-[#00FF41]">CYBER STARTUP</div>
                  <div className="text-[10px] text-[#4B5563] font-mono uppercase tracking-wider mt-1">UNAS CYBER Startup</div>
                </div>
              </div>
            </div>

            {/* 4 Pillars of Learning Icons Grid */}
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono text-[#00FF41] uppercase tracking-widest">Core Competences</span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  Syllabus & 4 Pilar Tameng Siber
                </h3>
                <p className="text-xs text-[#9CA3AF] max-w-lg mx-auto leading-relaxed">
                  Kami mengemas ancaman kejahatan internet yang sering dihadapi oleh para Mahasiswa/sekelompok remaja menjadi modul-modul yang asyik dipelajari.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Pillar 1 */}
                <div className="bg-[#0A0C12] border border-[#1F2937] p-8 rounded-none space-y-5 hover:border-[#00FF41]/40 transition-all duration-300 border-l-4 border-l-[#00FF41]">
                  <div className="w-10 h-10 rounded-none bg-[#00FF41]/10 text-[#00FF41] flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[10px] text-[#4B5563] font-mono uppercase">Pilar 1</span>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">Anti-Phishing & Fraud</h4>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      Waspadai modus manipulasi emosi kurir paket APK fiktif, undian e-wallet palsu, dan login instastory palsu.
                    </p>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="bg-[#0A0C12] border border-[#1F2937] p-8 rounded-none space-y-5 hover:border-[#00FF41]/40 transition-all duration-300 border-l-4 border-l-[#00FF41]">
                  <div className="w-10 h-10 rounded-none bg-[#00FF41]/10 text-[#00FF41] flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[10px] text-[#4B5563] font-mono uppercase">Pilar 2</span>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">Password Kuat & 2FA</h4>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      Metode jitu merangkai kata sandi passphrase panjang yang mudah dihafal, sekaligus tameng Two-Factor Authentication (2FA).
                    </p>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="bg-[#0A0C12] border border-[#1F2937] p-8 rounded-none space-y-5 hover:border-[#00FF41]/40 transition-all duration-300 border-l-4 border-l-[#00FF41]">
                  <div className="w-10 h-10 rounded-none bg-[#00FF41]/10 text-[#00FF41] flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[10px] text-[#4B5563] font-mono uppercase">Pilar 03</span>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">Menjaga Privasi</h4>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      Analisis mengontrol data jejak digital abadi, izin aplikasi Android mencurigakan, dan bahaya malware APK bajakan.
                    </p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="bg-[#0A0C12] border border-[#1F2937] p-8 rounded-none space-y-5 hover:border-[#00FF41]/40 transition-all duration-300 border-l-4 border-l-[#00FF41]">
                  <div className="w-10 h-10 rounded-none bg-[#00FF41]/10 text-[#00FF41] flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <span className="block text-[10px] text-[#4B5563] font-mono uppercase">Pilar 04</span>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">Sosial Media Aman</h4>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      Batasi pembagian data sensitif berlebih (oversharing) tiket konser, rekam jejak, dan manipulasi profil teman fiktif.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Demo Dashboard Section */}
            <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="inline-block px-3 py-1 border border-[#00FF41] text-[#00FF41] text-[10px] font-mono uppercase tracking-widest rounded-none bg-[#00FF41]/5">
                  TECHNOPRENEUR PATH
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight leading-snug">
                  Launch Your Own Security Venture.
                </h3>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  Kami mengusung filosofi <strong className="text-white">Interactive-Defensive ICT GAMES</strong>. Unas Cyber Tech menawarkan solusi bagi sekolah dasar hingga perguruan tinggi guna menekan angka kriminalitas siber nasional yang merugikan kalangan muda. 
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle className="w-4 h-4 text-[#00FF41]" /> B2B Sekolah Integration Dashboard
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle className="w-4 h-4 text-[#00FF41]" /> Kurikulum Edukasi Berstandar Siber Sandi Negara
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle className="w-4 h-4 text-[#00FF41]" /> Verifikasi Barcode Kode Sertifikasi Unik
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    id="cta-startup-plan-learn-btn"
                    onClick={() => setActiveSection("startup")}
                    className="text-[#00FF41] hover:text-white text-xs font-mono font-bold uppercase tracking-widest inline-flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    Pelajari Startup Kit&gt;
                  </button>
                </div>
              </div>

              {/* Interactive Game progress indicators mock */}
              <div className="lg:col-span-7 bg-[#050608] p-6 rounded-none border border-[#1F2937] space-y-4">
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <span className="text-xs font-bold font-mono text-[#00FF41] uppercase tracking-wider">MODUL-PEMBELAJARAN.exe</span>
                  <span className="text-[10px] text-[#08090A] bg-[#00FF41] px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest">
                    Demo Aktif
                  </span>
                </div>
                <div className="space-y-3.5 text-xs text-[#D1D5DB]">
                  <div className="flex items-center justify-between p-3.5 bg-[#0A0C12] rounded-none border border-[#1F2937]">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-[#00FF41]" />
                      <div>
                        <div className="font-semibold text-slate-200">Mempelajari Materi & Kuis</div>
                        <div className="text-[10px] text-[#4B5563] font-mono uppercase">Progress: {stats.completedLessons.length} Pelajaran selesai</div>
                      </div>
                    </div>
                    <span>{stats.completedLessons.length > 0 ? "✓" : "Belum"}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#0A0C12] rounded-none border border-[#1F2937]">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-red-500" />
                      <div>
                        <div className="font-semibold text-slate-200">Simulasi Kotak Masuk Phishing</div>
                        <div className="text-[10px] text-[#4B5563] font-mono uppercase">Status ujian: {stats.phishingCompleted ? "LULUS" : "Belum selesai"}</div>
                      </div>
                    </div>
                    <span>{stats.phishingCompleted ? "✓ LULUS" : "Belum"}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-[#0A0C12] rounded-none border border-[#1F2937]">
                    <div className="flex items-center gap-3">
                      <Joystick className="w-5 h-5 text-[#00FF41] animate-bounce" />
                      <div>
                        <div className="font-semibold text-slate-200">ICT GAMES</div>
                        <div className="text-[10px] text-[#4B5563] font-mono uppercase">Ketinggian Pengamanan: {stats.defenderCompleted ? "Aman" : "Masih Rentan"}</div>
                      </div>
                    </div>
                    <span>{stats.defenderCompleted ? "✓ SELESAI" : "Belum"}</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    id="quick-start-simulator-btn"
                    onClick={() => setActiveSection("belajar")}
                    className="w-full text-center py-2.5 bg-[#00FF41] text-[#08090A] font-mono font-bold uppercase tracking-widest text-xs rounded-none hover:bg-white transition cursor-pointer"
                  >
                    Masuk ke Ruang Simulasi Interaktif_
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ==================== B. MODUL PEMBELAJARAN DAN QUIZ ==================== */}
        {activeSection === "belajar" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Topic Selection Tab Panels */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
              <div className="space-y-1">
                <h2 className="font-display font-black text-2xl uppercase italic text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#00FF41]" />MODUL UNAS CYBER
                </h2>
                <p className="text-xs text-[#9CA3AF]">
                  Pilih modul materi di bawah ini untuk mengawali perjalanan keamanan siber Anda.
                </p>
              </div>

              {/* Buttons grouping */}
              <div className="flex flex-wrap gap-2">
                {SECURITY_MODULES.map((mod) => {
                  const isSelected = mod.id === selectedModuleId;
                  const lessonsCount = mod.lessons.length;
                  const completedLessonsInThisMod = mod.lessons.filter(l => 
                    stats.completedLessons.includes(`${mod.id}-${l.id}`)
                  ).length;

                  return (
                    <button
                      key={mod.id}
                      id={`mod-select-tab-${mod.id}`}
                      onClick={() => handleSelectModule(mod.id)}
                      className={`text-[11px] px-4 py-2.5 font-mono font-bold uppercase tracking-widest transition-all cursor-pointer border rounded-none ${
                        isSelected 
                          ? "bg-[#00FF41] border-[#00FF41] text-[#08090A]" 
                          : "bg-[#0A0C12] border-[#1F2937] hover:bg-[#1F2937] text-[#9CA3AF]"
                      }`}
                    >
                      {mod.title}{" "}
                      <span className={`text-[10px] ml-1 px-1.5 py-0.2 rounded-none font-bold ${isSelected ? "bg-[#08090A] text-[#00FF41]" : "bg-[#050608] text-[#9CA3AF]"}`}>
                        {completedLessonsInThisMod}/{lessonsCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Layout Materi Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left sidebar: Materi indexing (4 Cols) */}
              <div className="lg:col-span-4 bg-[#0A0C12] border border-[#1F2937] rounded-none p-5 space-y-5 shadow-xl">
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-mono font-bold text-[#00FF41] uppercase tracking-widest">Materi Pembelajaran</h4>
                  <h3 className="font-bold text-sm uppercase text-white">{activeModule.title}</h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed mt-1">
                    {activeModule.description}
                  </p>
                </div>

                <div className="w-full h-px bg-[#1F2937]"></div>

                {/* Lessons mapping lists */}
                <div className="space-y-2">
                  {activeModule.lessons.map((lesson, idx) => {
                    const isSelected = idx === selectedLessonIdx;
                    const lessonKey = `${activeModule.id}-${lesson.id}`;
                    const isCompleted = stats.completedLessons.includes(lessonKey);

                    return (
                      <button
                        key={lesson.id}
                        id={`lesson-item-${lesson.id}`}
                        onClick={() => handleSelectLesson(idx)}
                        className={`w-full text-left p-3 rounded-none border transition-all duration-200 flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-[#08090A] border-[#00FF41] text-[#00FF41] font-bold"
                            : "bg-[#050608] border-[#1F2937] hover:bg-[#0A0C12] text-[#9CA3AF]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-6 h-6 rounded-none flex items-center justify-center text-xs shrink-0 font-mono ${
                            isSelected ? "bg-[#00FF41] text-[#08090A] font-bold" : "bg-[#1F2937] text-[#9CA3AF]"
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="truncate text-xs font-mono lowercase tracking-tight">{lesson.title}</span>
                        </div>

                        {/* Complete status */}
                        {isCompleted ? (
                          <span className="text-[#00FF41] shrink-0">
                            <CheckCircle className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-[#4B5563] block text-[10px] font-mono shrink-0">
                            +10 PTS
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Extra CTA Box to redirect next stages */}
                <div className="p-4 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-none space-y-3">
                  <h5 className="text-[10px] font-mono font-bold text-[#00FF41] uppercase tracking-widest">Tantangan Praktis</h5>
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                    Setelah membaca teori dan menjawab kuis pemahaman, uji kecakapan siber Anda di simulator kami.
                  </p>
                  <button
                    id="goto-simulator-from-syllabus"
                    onClick={() => setActiveSection("phishing")}
                    className="w-full text-center py-2 bg-transparent border border-[#00FF41] hover:bg-[#00FF41] hover:text-[#08090A] text-[#00FF41] rounded-none text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Mulai Simulasi Phishing
                  </button>
                </div>
              </div>

              {/* Right panel: Active Lesson Reading Board & Quiz Console (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Reading card */}
                <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-6 md:p-8 space-y-6 shadow-xl">
                  
                  {/* Lesson Meta Header */}
                  <div className="space-y-2 pb-4 border-b border-[#1F2937]">
                    <span className="bg-[#00FF41]/10 border border-[#00FF41]/20 text-[#00FF41] text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-none uppercase">
                      Bagian {selectedLessonIdx + 1}: {activeLesson.subtitle}
                    </span>
                    <h3 className="font-display font-black text-3xl uppercase italic text-white tracking-tight">
                      {activeLesson.title}
                    </h3>
                  </div>

                  {/* Lesson Text Contents */}
                  <div className="space-y-4 text-[#D1D5DB] text-[13.5px] leading-relaxed">
                    {activeLesson.content.map((pText, pIdx) => (
                      <p key={pIdx}>
                        {pText}
                      </p>
                    ))}
                  </div>

                  {/* Checklist Summary */}
                  <div className="bg-[#050608] p-5 rounded-none border border-[#1F2937] space-y-2.5">
                    <h5 className="text-[10px] font-bold text-[#00FF41] tracking-wider uppercase font-mono flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-[#00FF41]" /> Ringkasan Pembelajaran Cepat:
                    </h5>
                    <ul className="text-xs space-y-1.5 text-[#9CA3AF] pl-4 list-disc leading-relaxed">
                      <li>Konfirmasi keabsahan nama domain utama URL sebelum mengisi formulir personal.</li>
                      <li>Selalu periksa ekstensi file berbahaya seperti .apk, dan unduh hanya dari toko resmi.</li>
                      <li>Gunakan teknik "Passphrase" unik beruntun untuk menghalau metode peretasan brute-force kilat.</li>
                    </ul>
                  </div>
                </div>

                {/* Practical Quiz Console */}
                <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-6 md:p-8 space-y-5 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="p-1 bg-[#00FF41]/10 text-[#00FF41] rounded-none">
                      <HelpCircle className="w-5 h-5" />
                    </span>
                    <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
                      Ujian Pemahaman Kuis (+10 Skor)
                    </h4>
                  </div>

                  <p className="text-sm font-semibold text-[#F3F4F6] bg-[#050608] p-4 rounded-none border border-[#1F2937] font-mono lowercase">
                    {activeLesson.quizQuestion}
                  </p>

                  {/* Multiple choices option controls */}
                  <div className="space-y-2.5">
                    {activeLesson.quizOptions.map((opt, optIdx) => {
                      const hasSubmitted = quizScoreFeedback?.submitted === true;
                      const isOptionSelected = quizScoreFeedback?.selectedOptionIdx === optIdx;
                      const isThisCorrectOption = optIdx === activeLesson.quizAnswer;

                      let btnStyle = "bg-[#050608] border-[#1F2937] text-[#D1D5DB] hover:bg-[#0A0C12] hover:border-[#00FF41]/40";
                      
                      if (hasSubmitted) {
                        if (isThisCorrectOption) {
                          // Green highlight for correct choice
                          btnStyle = "bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41]";
                        } else if (isOptionSelected) {
                          // Red highlight for incorrect selected option
                          btnStyle = "bg-red-500/10 border-red-500 text-red-200";
                        } else {
                          // Normal inactive
                          btnStyle = "bg-[#050608] border-[#1F2937] text-[#4B5563] opacity-60";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          id={`quiz-${activeLesson.id}-opt-${optIdx}`}
                          disabled={hasSubmitted}
                          onClick={() => handleSubmitQuiz(optIdx)}
                          className={`w-full text-left p-4 rounded-none border text-xs gap-3 flex items-start transition-all duration-200 cursor-pointer ${btnStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-none flex items-center justify-center shrink-0 font-bold font-mono text-[10px] ${
                            hasSubmitted && isThisCorrectOption
                              ? "bg-[#00FF41] text-[#08090A]"
                              : isOptionSelected 
                                ? "bg-red-500 text-white"
                                : "bg-[#1F2937] text-[#9CA3AF]"
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Quiz Correction Feedback Box */}
                  {quizScoreFeedback && (
                    <div className={`p-4 rounded-none border flex gap-3 ${
                      quizScoreFeedback.isCorrect
                        ? "bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]"
                        : "bg-red-500/10 border-red-500/30 text-red-200"
                    }`}>
                      <span className="mt-0.5 shrink-0">
                        {quizScoreFeedback.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-[#00FF41]" />
                        ) : (
                          <Terminal className="w-5 h-5 text-red-500 animate-pulse" />
                        )}
                      </span>
                      <div className="space-y-1">
                        <h5 className="text-xs font-bold font-mono uppercase tracking-wider">
                          {quizScoreFeedback.isCorrect 
                            ? "Correct Decryption (+10 Skor)" 
                            : "System Compromised — Learn Again"}
                        </h5>
                        <p className="text-xs text-[#9CA3AF] leading-normal">
                          {activeLesson.quizExplanation}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Quiz footer pagination controls */}
                  {selectedLessonIdx < activeModule.lessons.length - 1 && quizScoreFeedback?.submitted && (
                    <div className="pt-2 flex justify-end">
                      <button
                        id="next-lesson-quiz-btn"
                        onClick={() => handleSelectLesson(selectedLessonIdx + 1)}
                        className="text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 bg-[#00FF41] text-[#08090A] hover:bg-white rounded-none flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        Baca Pelajaran Berikutnya &gt;
                      </button>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================== C. INTERACTIVE PHISHING SIMULATOR ==================== */}
        {activeSection === "phishing" && (
          <div className="space-y-6">
            <div className="border-b border-[#1F2937] pb-5">
              <h2 className="font-display font-black text-2xl uppercase italic text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-red-500 animate-pulse" /> SIMULASI PHISHING UNAS CYBER SECURITY
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Kembangkan insting keamanan digital Anda dengan menganalisis pesan inbox fiktif, temukan clues rahasia, dan lakukan pencegahan darurat.
              </p>
            </div>

            <PhishingSimulator stats={stats} onUpdateStats={handleUpdateStats} />
          </div>
        )}

        {/* ==================== D. MINI GAME SECURITY SANDBOX ==================== */}
        {activeSection === "defender" && (
          <div className="space-y-6">
            <div className="border-b border-[#1F2937] pb-5">
              <h2 className="font-display font-black text-2xl uppercase italic text-white flex items-center gap-2">
                <Joystick className="w-5 h-5 text-[#00FF41]" /> ICT GAMES
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Laksanakan audit taktis perangkat, berantas kelemahan enkripsi dan ancaman rekayasa sosial guna menyusun benteng keamanan digital 100%.
              </p>
            </div>

            <MiniGame stats={stats} onUpdateStats={handleUpdateStats} />
          </div>
        )}

        {/* ==================== E. REGISTRATION & PRINT CERTIFICATE ==================== */}
        {activeSection === "sertifikat" && (
          <div className="space-y-6">
            <div className="border-b border-[#1F2937] pb-5">
              <h2 className="font-display font-black text-2xl uppercase italic text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#00FF41] animate-bounce" /> KLAIM SERTIFIKAT KELULUSAN UNAS CYBER SECURITY ANDA!
              </h2>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Isi identitas diri dan sekolah Anda untuk merilis sertifikat kelulusan digital emas berlisensi resmi SiberEdu.
              </p>
            </div>

            <Sertifikat stats={stats} onUpdateStats={handleUpdateStats} />
          </div>
        )}

        {/* ==================== F. TECHNOPRENEURSHIP STARTUPPROFILE ==================== */}
        {activeSection === "startup" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Metas Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-block border border-[#00FF41] text-[#00FF41] text-[10px] font-mono uppercase tracking-widest rounded-none bg-[#00FF41]/5 px-3 py-1">
                ✦ Pitch Deck & Technopreneurship Vision ✦
              </span>
              <h2 className="text-[32px] sm:text-[40px] leading-[0.9] font-black italic tracking-tighter uppercase font-display text-white">
                Platform Edukasi Cyber Security untuk Generasi Digital
              </h2>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Menilik visi kami sebagai Edu-tech Startup Keamanan Siber pertama di Indonesia yang berorientasi mengentaskan risiko siber pelajar secara kolektif.
              </p>
            </div>

            {/* Grid Metrics and stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Box 1 */}
              <div className="bg-[#0A0C12] border border-[#1F2937] p-8 rounded-none space-y-4 border-l-4 border-l-red-500">
                <div className="w-10 h-10 rounded-none bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Masalah Nyata Pelajar</h4>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Lebih dari <strong className="text-white">67% siswa remaja</strong> tidak mampu mendeteksi manipulasi tautan penukaran saldo palsu, dan gampang terpikat menginstal berkas malware .APK kiriman pesan fiktif WA.
                  </p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-[#0A0C12] border border-[#1F2937] p-8 rounded-none space-y-4 border-l-4 border-l-[#00FF41]">
                <div className="w-10 h-10 rounded-none bg-[#00FF41]/10 text-[#00FF41] flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Target Pasar Startup</h4>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    SMP/SMA/SMK Negeri & Swasta di seluruh Indonesia. Terintegrasi ke dalam kurikulum muatan lokal Informatika Dasar berbasis sekolah (B2B SaaS Institutional Dashboard).
                  </p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="bg-[#0A0C12] border border-[#1F2937] p-8 rounded-none space-y-4 border-l-4 border-l-[#00FF41]">
                <div className="w-10 h-10 rounded-none bg-[#00FF41]/10 text-[#00FF41] flex items-center justify-center font-bold">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Model Pendapatan Bisnis</h4>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    Sistem <strong className="text-white">Freemium</strong> dengan lisensi guru berbayar berharga murah guna mengelola raport kemajuan tingkat kesadaran siber (Siber-Report) siswa per angkatan sekolah.
                  </p>
                </div>
              </div>

            </div>

            {/* Comprehensive Detail presentation card */}
            <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-6 md:p-8 space-y-6">
              <h3 className="font-display font-black text-xl text-white uppercase italic tracking-tight flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#00FF41]" /> FITUR UNGGULAN UNAS CYBER SECURITY
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#9CA3AF]">
                <div className="space-y-4">
                  <div className="p-5 bg-[#050608] rounded-none border border-[#1F2937] space-y-1.5">
                    <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">1. Academy Terpusat Bagi Tenaga Pengajar</h5>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Laporan visual menyeluruh untuk kepala sekolah dan guru TI yang mengukur persentase kelemahan siber siswa pada setiap kelas guna memfokuskan pembinaan.
                    </p>
                  </div>

                  <div className="p-5 bg-[#050608] rounded-none border border-[#1F2937] space-y-1.5">
                    <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">2. Algoritma Kloning Simulator Phishing Dinamis</h5>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Sistem kami dapat mengkloning model rilis spam siber termutakhir dalam hitungan beberapa jam saja, guna menjamin kurikulum selalu tanggap terhadap modus kriminal terbaru.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-5 bg-[#050608] rounded-none border border-[#1F2937] space-y-1.5">
                    <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">3. Sertifikasi Resmi Berlisensi</h5>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Membagikan sertifikat kelulusan fisik/digital yang dapat dipajang sebagai poin portofolio prestasi mendaftar beasiswa perguruan tinggi berbasis teknologi informasi.
                    </p>
                  </div>

                  <div className="p-5 bg-[#050608] rounded-none border border-[#1F2937] space-y-1.5">
                    <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">4. Kemitraan Pemerintah & Penyelenggara Layanan</h5>
                    <p className="text-[#9CA3AF] leading-relaxed">
                      Melibatkan para pakar sekuritas, bank umum, dan Bareskrim Siber Indonesia untuk merilis silabus terpercaya penanggulangan korban intimidasi digital.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Pitch end wrap */}
            <div className="p-8 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-none text-center space-y-4">
              <h4 className="font-display font-black text-lg uppercase text-white">TERTARIK MENDUKUNG KELOMPOK 2 UNAS CYBER SECURITY?</h4>
              <p className="text-xs text-[#9CA3AF] max-w-xl mx-auto leading-relaxed">
                Kami siap berdiskusi bersama para Venture Capitalist TI, institusi Dinas Pendidikan Daerah, dan Sekolah Menengah untuk menjalin kolaborasi penataran angsuran literasi siber Mahasiswa Indonesia.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:partner@siberedu.startup"
                  id="partner-contact-mailto"
                  className="inline-flex items-center gap-2 bg-[#00FF41] hover:bg-white text-[#08090A] px-6 py-3.5 rounded-none font-mono font-bold text-xs uppercase tracking-widest transition-colors shadow-lg shadow-[#00FF41]/10 cursor-pointer"
                >
                  Hubungi Tim Kemitraan : kelompok2ict@unas.ac.id
                </a>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* 3. Global Footer element */}
      <footer className="border-t border-[#1F2937] bg-[#0A0C12] py-8 text-center text-xs text-[#4B5563] mt-16 relative z-10">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="font-mono text-[10px] tracking-wide text-[#9CA3AF]">
            © 2026 Kelompok 2 | M. Zidan | M. Fahreza Situmorang | Gibran Hidayat Tullah | Galang Rispa'i | Naufal Falah | Ibrahim Syauqi
          </p>
          <div className="flex justify-center flex-wrap gap-4 text-[#9CA3AF] font-mono text-[11px] uppercase tracking-wider">
            <button id="foot-nav-landing" onClick={() => { setActiveSection("landing"); window.scrollTo(0,0); }} className="hover:text-[#00FF41] cursor-pointer">Beranda</button>
            <span>•</span>
            <button id="foot-nav-belajar" onClick={() => { setActiveSection("belajar"); window.scrollTo(0,0); }} className="hover:text-[#00FF41] cursor-pointer">Kurikulum Teori</button>
            <span>•</span>
            <button id="foot-nav-phishing" onClick={() => { setActiveSection("phishing"); window.scrollTo(0,0); }} className="hover:text-[#00FF41] cursor-pointer">Ujian Phishing</button>
            <span>•</span>
            <button id="foot-nav-defender" onClick={() => { setActiveSection("defender"); window.scrollTo(0,0); }} className="hover:text-[#00FF41] cursor-pointer">ICT GAMES</button>
            <span>•</span>
            <button id="foot-nav-sertifikat" onClick={() => { setActiveSection("sertifikat"); window.scrollTo(0,0); }} className="hover:text-[#00FF41] cursor-pointer font-bold text-[#00FF41]">Cetak Sertifikat</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
