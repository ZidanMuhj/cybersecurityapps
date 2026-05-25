import React, { useRef, useState } from "react";
import { UserStats } from "../types";
import { SECURITY_MODULES, PHISHING_SCENARIOS, DEFENDER_THREATS } from "../data/modulesData";
import { 
  Award, 
  Printer, 
  FileCheck, 
  User, 
  School, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  QrCode,
  ArrowRight
} from "lucide-react";

interface SertifikatProps {
  stats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export default function Sertifikat({ stats, onUpdateStats }: SertifikatProps) {
  const [nameInput, setNameInput] = useState<string>(stats.studentName || "");
  const [schoolInput, setSchoolInput] = useState<string>(stats.studentSchool || "");
  const [isSaved, setIsSaved] = useState<boolean>(stats.studentName !== "");
  const [demoBypass, setDemoBypass] = useState<boolean>(false);

  const certRef = useRef<HTMLDivElement>(null);

  // Requirements checks
  const modulesPassed = stats.completedModules.length >= 1; // At least completed 1 mod
  const phishingPassed = stats.phishingCompleted;
  const defenderPassed = stats.defenderCompleted;

  // Fully unlocked or bypassed
  const canClaim = (modulesPassed && phishingPassed && defenderPassed) || demoBypass;

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !schoolInput.trim()) return;

    // Generate random serial number if not exists
    const randomSerial = stats.certificateId || `SE-${Math.floor(100000 + Math.random() * 900000)}-2026`;

    onUpdateStats({
      studentName: nameInput,
      studentSchool: schoolInput,
      certificateClaimed: true,
      certificateId: randomSerial
    });
    setIsSaved(true);
  };

  const triggerPrint = () => {
    window.print();
  };

  const handleResetInputs = () => {
    setIsSaved(false);
  };

  // Get current date string in dynamic Indonesian style
  const getCurrentIndonesianDate = () => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    // Use simulated year from UTC 2026-05-25
    const d = new Date("2026-05-25");
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Certification Criteria and Input Form (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Criteria Checklist */}
          <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-[#00FF41]">STATUS KELULUSAN AKADEMIK</h4>
            
            <div className="space-y-3 font-mono text-xs text-[#9CA3AF]">
              {/* Requirement 1: Modules quiz */}
              <div className="flex items-start gap-2.5">
                {modulesPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#00FF41] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#4B5563] shrink-0 mt-0.5" />
                )}
                <div>
                  <h5 className="font-bold text-white uppercase">Menyelesaikan Modul Belajar</h5>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                    Selesaikan minimal 1 modul pembelajaran siber. ({stats.completedLessons.length} Pelajaran terbaca)
                  </p>
                </div>
              </div>

              {/* Requirement 2: Phishing simulation completed */}
              <div className="flex items-start gap-2.5">
                {phishingPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#00FF41] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#4B5563] shrink-0 mt-0.5" />
                )}
                <div>
                  <h5 className="font-bold text-white uppercase">Ujian Simulasi Phishing</h5>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                    Selesaikan audit deteksi manipulasi di Kotak Masuk SiberEdu.
                  </p>
                </div>
              </div>

              {/* Requirement 3: Defender sandbox secured */}
              <div className="flex items-start gap-2.5">
                {defenderPassed ? (
                  <CheckCircle2 className="w-5 h-5 text-[#00FF41] shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#4B5563] shrink-0 mt-0.5" />
                )}
                <div>
                  <h5 className="font-bold text-white uppercase">SiberDefender Game Clear</h5>
                  <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                    Ganti status 4 ancaman dari 'Vulnerable' menjadi 'Secured' di sandbox.
                  </p>
                </div>
              </div>
            </div>

            {/* Warning or Success Statement */}
            {!canClaim ? (
              <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-none space-y-2">
                <p className="text-[10px] text-white leading-relaxed font-mono">
                  ✦ Belum memenuhi kriteria? Jangan khawatir! Anda bisa mengaktifkan mode uji coba ("Demo Bypass") untuk mencetak hasil visual sertifikasi secara instan_
                </p>
                <button
                  id="activate-bypass-btn"
                  onClick={() => setDemoBypass(true)}
                  className="text-[10px] font-mono uppercase tracking-widest text-[#00FF41] font-bold hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  Aktifkan Demo Bypass <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="p-4 bg-[#00FF41]/5 border border-[#00FF41]/20 rounded-none">
                <p className="text-[11px] text-[#00FF41] font-mono">
                  🎉 Keren sekali! Semua kriteria kelulusan akademik telah terpenuhi. Anda berhak mengklaim sertifikat kelulusan emas Anda.
                </p>
                {demoBypass && (
                  <span className="block text-[9px] text-amber-400 mt-1 font-mono uppercase tracking-widest">[Bypass Mode Active]</span>
                )}
              </div>
            )}
          </div>

          {/* Form to Input Student Identity */}
          <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-5 shadow-xl space-y-4">
            <h4 className="text-xs font-mono font-black uppercase text-[#00FF41] flex items-center gap-2">
              <User className="w-4 h-4" /> IDENTITAS SERTIFIKAT
            </h4>
            
            {!isSaved ? (
              <form onSubmit={handleSaveInfo} id="identitas-sertifikat-form" className="space-y-4 font-mono">
                <div className="space-y-1.5">
                  <label htmlFor="student-name-input" className="text-[10px] uppercase font-bold text-[#9CA3AF] flex items-center gap-1.5">
                    Nama Lengkap Pelajar:
                  </label>
                  <input
                    id="student-name-input"
                    type="text"
                    required
                    placeholder="Contoh: Asep Mutoha Ginanjar Silalahi., S.Kom"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full text-xs bg-[#050608] border border-[#1F2937] focus:border-[#00FF41] text-white px-3 py-2.5 rounded-none outline-none font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="student-school-input" className="text-[10px] uppercase font-bold text-[#9CA3AF] flex items-center gap-1.5">
                    Nama Sekolah / Institusi:
                  </label>
                  <input
                    id="student-school-input"
                    type="text"
                    required
                    placeholder="Contoh: Universitas Paralayang Mangkunegoro"
                    value={schoolInput}
                    onChange={(e) => setSchoolInput(e.target.value)}
                    className="w-full text-xs bg-[#050608] border border-[#1F2937] focus:border-[#00FF41] text-white px-3 py-2.5 rounded-none outline-none font-sans"
                  />
                </div>

                <button
                  id="terbitkan-identity-btn"
                  type="submit"
                  disabled={!canClaim}
                  className={`w-full text-[10px] font-mono font-bold uppercase tracking-widest py-3 rounded-none transition-all shadow-md cursor-pointer border ${
                    canClaim 
                      ? "bg-[#00FF41] hover:bg-white text-[#08090A] border-[#00FF41]" 
                      : "bg-[#1F2937] text-[#4B5563] border-[#1F2937] cursor-not-allowed"
                  }`}
                >
                  Patenkan & Terbitkan_
                </button>
              </form>
            ) : (
              <div className="space-y-3 font-mono">
                <div className="p-3 bg-[#050608] rounded-none space-y-2.5 border border-[#1F2937] text-xs">
                  <div>
                    <span className="text-[9px] text-[#4B5563] uppercase block">Nama Dicetak:</span>
                    <strong className="text-white text-sm font-sans">{stats.studentName || nameInput}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#4B5563] uppercase block">Sekolah:</span>
                    <strong className="text-white font-sans">{stats.studentSchool || schoolInput}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-[#4B5563] uppercase block">Nomor Lisensi:</span>
                    <strong className="text-[#00FF41] font-mono">{stats.certificateId}</strong>
                  </div>
                </div>

                <div className="flex gap-2 text-[10px] font-mono uppercase tracking-widest font-bold">
                  <button
                    id="ubah-nama-cert-btn"
                    onClick={handleResetInputs}
                    className="flex-1 py-2 bg-[#050608] hover:bg-red-950 hover:text-red-400 text-[#9CA3AF] rounded-none border border-[#1F2937] cursor-pointer transition-colors"
                  >
                    Ubah Data
                  </button>
                  <button
                    id="print-sys-btn"
                    onClick={triggerPrint}
                    className="flex-1 py-2 bg-[#00FF41] hover:bg-white text-[#08090A] rounded-none flex items-center justify-center gap-1.5 cursor-pointer border border-[#00FF41] transition-colors gap-2"
                  >
                    <Printer className="w-3.5 h-3.5" /> CETAK
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right column: Interactive Visual Certificate Board (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          
          {/* Certificate Board itself */}
          <div className="border border-[#1F2937] rounded-none overflow-hidden shadow-2xl bg-[#0A0C12] relative">
            <div className="p-4 bg-[#050608] border-b border-[#1F2937] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#00FF41] font-mono flex items-center gap-1.5 uppercase tracking-wider">
                <Award className="w-4 h-4" /> PRATINJAU SERTIFIKAT KELULUSAN
              </span>
              <span className="text-[10px] text-[#6B7280] font-mono">MODEL: PDF CETAK A4 LANSKAP</span>
            </div>

            {/* Certificate visual container */}
            <div className="p-4 md:p-8 bg-[#000000] overflow-x-auto">
              
              <div 
                ref={certRef}
                id="print-certificate"
                className="w-full min-w-[620px] max-w-[800px] mx-auto aspect-[1.414/1] bg-[#050608] border-4 border-double border-[#1F2937] p-6 md:p-10 text-slate-100 relative rounded-none flex flex-col justify-between overflow-hidden cyber-grid"
                style={{ boxShadow: "inset 0 0 40px rgba(0, 255, 65, 0.05)" }}
              >
                
                {/* Visual design elements for cyber certification */}
                {/* 1. Corner frames */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#00FF41]/40" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#00FF41]/40" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#00FF41]/40" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00FF41]/40" />
                
                {/* 2. Watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                  <Award className="w-96 h-96 text-[#00FF41]" />
                </div>

                {/* Main Header */}
                <div className="text-center relative z-10 space-y-1 md:space-y-2 mt-2 font-mono">
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-block px-3 py-1 bg-[#00FF41]/10 text-[#00FF41] text-[9.5px] tracking-[0.2em] font-bold border border-[#00FF41]/20">
                      PLATFORM EDUKASI CYBER SECURITY UNTUK GENERASI DIGITAL
                    </span>
                  </div>
                  <h1 className="font-display font-black text-xl md:text-3xl text-white uppercase italic tracking-tight mt-1">
                    Sertifikat Kelulusan Siber
                  </h1>
                  <p className="text-[9px] md:text-xs text-[#00FF41] font-bold tracking-[0.15em] uppercase">
                    CERTIFICATE OF OUTSTANDING CYBER SECURITY LITERACY
                  </p>
                  <div className="w-24 h-0.5 bg-[#00FF41]/60 mx-auto mt-2"></div>
                </div>

                {/* Given To text */}
                <div className="text-center relative z-10 my-4 md:my-6 space-y-2">
                  <span className="text-[10px] md:text-xs font-mono text-[#9CA3AF] uppercase block tracking-wider">Diberikan dengan hormat kepada:</span>
                  <h2 className="font-display font-black text-xl md:text-3xl text-white tracking-tight uppercase block italic">
                    {isSaved ? (stats.studentName || nameInput) : "MASUKKAN NAMA DI PANEL KIRI"}
                  </h2>
                  <p className="font-mono text-[10px] md:text-xs text-[#9CA3AF] uppercase tracking-wide">
                    Mahasiswa dari: <span className="text-[#00FF41] underline underline-offset-4 decoration-[#00FF41]/40 font-bold">{isSaved ? (stats.studentSchool || schoolInput) : "MASUKKAN INSTITUSI"}</span>
                  </p>
                </div>

                {/* Achievment Description */}
                <div className="text-center max-w-xl mx-auto relative z-10">
                  <p className="text-[10px] md:text-[11px] text-slate-300 leading-relaxed font-sans">
                    Dinyatakan LULUS dengan predikat premium <strong className="text-white">Ksatria Cyber Tech Handal</strong> pada program pelatihan kesadaran keamanan digital komprehensif, mencakup modul deteksi rekayasa sosial phishing, orkestrasi sandi tangguh, serta ketangkasan menutup kerentanan keamanan perangkat pintar.
                  </p>
                </div>

                {/* Footer block: Signature and QR Verification Code */}
                <div className="border-t border-[#1F2937]/80 pt-4 flex items-end justify-between relative z-10 mt-4 md:mt-6">
                  
                  {/* Left: Stamp details */}
                  <div className="text-left space-y-1 font-mono">
                    <span className="text-[9px] text-[#4B5563] uppercase block font-bold">Dikeluarkan Oleh</span>
                    <div className="relative">
                      {/* Fake stamp badge overlay */}
                      <div className="absolute -top-7 left-1 opacity-90 pointer-events-none transform -rotate-12 border border-[#00FF41] rounded-none px-2 py-0.5 text-[8px] font-bold text-[#00FF41] bg-[#050608]">
                        STAFF VERIFIED SECURE
                      </div>
                      <span className="text-[11px] font-bold text-white block font-sans tracking-tight">Klmpk 2 Cyber Unas Security</span>
                    </div>
                    <span className="text-[9px] text-[#9CA3AF] block font-sans">Edukasi Keamanan Siber Edukatif</span>
                  </div>

                  {/* Center: Stamp Date stamp */}
                  <div className="text-center space-y-1 font-mono">
                    <span className="text-[9px] text-[#4B5563] uppercase block font-bold">Tanggal Terbit</span>
                    <span className="text-[11px] text-white block font-bold font-mono">{getCurrentIndonesianDate()}</span>
                  </div>

                  {/* Right: ID code verification */}
                  <div className="text-right flex items-center gap-3 font-mono">
                    <div className="hidden md:block">
                      <span className="text-[9px] text-[#4B5563] uppercase block font-bold">Kode Lisensi Siber</span>
                      <span className="text-[10px] text-[#00FF41] block font-bold">
                        {isSaved ? stats.certificateId : "ID-KLMPK2-UNASCYBER-2026"}
                      </span>
                    </div>
                    {/* Tiny QR block */}
                    <div className="p-1.5 bg-white rounded-none shrink-0 w-8 h-8 flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-slate-950" />
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Instruction Footer element */}
            <div className="p-4 bg-[#050608]/80 border-t border-[#1F2937] text-center font-mono">
              <p className="text-[11px] text-[#9CA3AF]">
                Tips: Simpan sertifikat sebagai file PDF dengan menekan tombol <strong className="text-white">CETAK</strong> di kiri, lalu atur opsi tujuan cetak browser Anda ke <strong className="text-white">"Save as PDF"</strong> dalam mode Lanskap.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
