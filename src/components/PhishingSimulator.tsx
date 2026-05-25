import React, { useState } from "react";
import { PhishingScenario, UserStats } from "../types";
import { PHISHING_SCENARIOS } from "../data/modulesData";
import { 
  Mail, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  Eye,
  HelpCircle
} from "lucide-react";

interface PhishingSimulatorProps {
  stats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export default function PhishingSimulator({ stats, onUpdateStats }: PhishingSimulatorProps) {
  const [selectedId, setSelectedId] = useState<string>(PHISHING_SCENARIOS[0].id);
  const [revealedClues, setRevealedClues] = useState<boolean>(false);
  const [userDecisions, setUserDecisions] = useState<Record<string, { choice: boolean; correct: boolean }>>({});
  const [activeTab, setActiveTab] = useState<"inbox" | "petunjuk">("inbox");

  const currentScenario = PHISHING_SCENARIOS.find((s) => s.id === selectedId) || PHISHING_SCENARIOS[0];

  const handleDecision = (isPhishingSelected: boolean) => {
    const isCorrect = isPhishingSelected === currentScenario.isPhishing;
    
    // Save decision
    const updatedDecisions = {
      ...userDecisions,
      [currentScenario.id]: { choice: isPhishingSelected, correct: isCorrect }
    };
    setUserDecisions(updatedDecisions);
    setRevealedClues(true); // Automatically show clues/explanations once they make a choice

    // Calculate score change
    const wasAlreadyAnswered = userDecisions[currentScenario.id] !== undefined;
    if (!wasAlreadyAnswered) {
      const pointValue = isCorrect ? 25 : 0;
      const newScore = stats.score + pointValue;
      
      // Check if all scenarios have been completed
      const allScenarios = PHISHING_SCENARIOS;
      const answeredCount = Object.keys(updatedDecisions).length;
      const isCompleted = answeredCount === allScenarios.length;

      onUpdateStats({
        score: newScore,
        phishingScore: (stats.phishingScore || 0) + pointValue,
        phishingCompleted: isCompleted || stats.phishingCompleted
      });
    }
  };

  const resetAll = () => {
    setUserDecisions({});
    setRevealedClues(false);
    onUpdateStats({ phishingScore: 0 });
  };

  const getAccuracy = () => {
    const total = Object.keys(userDecisions).length;
    if (total === 0) return 0;
    const correct = Object.keys(userDecisions).filter(key => userDecisions[key].correct).length;
    return Math.round((correct / total) * 100);
  };

  return (
    <div id="simulasi-phishing-dashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Column: Inbox List (4 Cols on LGA) */}
      <div className="lg:col-span-4 bg-[#0A0C12] border border-[#1F2937] rounded-none overflow-hidden flex flex-col shadow-xl">
        <div className="p-4 bg-[#050608] border-b border-[#1F2937] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#00FF41]/10 text-[#00FF41] rounded-none border border-[#00FF41]/20">
              <Mail className="w-5 h-5" />
            </span>
            <span className="font-display font-black text-white text-sm uppercase tracking-wider">KOTAK MASUK CYBER</span>
          </div>
          <span className="bg-[#1F2937] text-[#9CA3AF] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-none">
            {PHISHING_SCENARIOS.length} ITEMS
          </span>
        </div>

        {/* Stats Summary Panel */}
        <div className="p-4 bg-[#050608] border border-[#1F2937] m-4 rounded-none flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono text-[#4B5563]">PROGRES UJIAN</div>
            <div className="font-bold text-xs text-[#00FF41] mt-0.5 font-mono">
              {Object.keys(userDecisions).length} / {PHISHING_SCENARIOS.length} EXAMINED
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-[#4B5563]">AKURASI SISTEM</div>
            <div className="font-bold text-xs text-[#00FF41] mt-0.5 font-mono">
              {getAccuracy()}%
            </div>
          </div>
        </div>

        {/* Email Inbox Scroll list */}
        <div className="flex-1 overflow-y-auto max-h-[480px] space-y-2 p-3">
          {PHISHING_SCENARIOS.map((scen) => {
            const answered = userDecisions[scen.id];
            const isSelected = scen.id === selectedId;

            return (
              <button
                key={scen.id}
                id={`inbox-item-${scen.id}`}
                onClick={() => {
                  setSelectedId(scen.id);
                  // Don't auto reset reveal clue if it has already been answered
                  setRevealedClues(answered !== undefined);
                }}
                className={`w-full text-left p-3.5 rounded-none transition-all duration-200 border flex gap-3 cursor-pointer ${
                  isSelected
                    ? "bg-[#08090A] border-[#00FF41] text-[#00FF41]"
                    : "bg-[#050608]/60 border-[#1F2937] hover:bg-[#0A0C12] text-[#9CA3AF]"
                }`}
              >
                {/* Avatar Icon placeholder */}
                <div className={`w-10 h-10 rounded-none flex items-center justify-center font-mono font-bold shrink-0 text-white ${scen.avatarBg}`}>
                  {scen.avatarLetter}
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0 font-mono text-xs">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="font-bold text-white truncate lowercase">
                      {scen.senderName}
                    </span>
                    <span className="text-[9px] text-[#4B5563] uppercase shrink-0">
                      [{scen.difficulty}]
                    </span>
                  </div>
                  <div className="text-[11px] text-[#9CA3AF] truncate mt-0.5">
                    {scen.subject}
                  </div>
                  <div className="text-[9px] text-[#4B5563] mt-1.5 flex items-center justify-between uppercase">
                    <span>{scen.dateStr}</span>
                    <div className="flex gap-1.5 items-center">
                      {answered ? (
                        answered.correct ? (
                          <span className="text-[9px] text-[#00FF41] font-bold flex items-center gap-1">
                            ✓ PASSED
                          </span>
                        ) : (
                          <span className="text-[9px] text-red-500 font-bold flex items-center gap-1">
                            ✗ FAILED
                          </span>
                        )
                      ) : (
                        <span className="text-[9px] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded-none font-bold">
                          PENDING
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {userDecisions && Object.keys(userDecisions).length > 0 && (
          <div className="p-3 bg-[#050608] border-t border-[#1F2937] text-center">
            <button
              id="reset-simulation-btn"
              onClick={resetAll}
              className="text-[10px] font-mono text-[#00FF41] hover:text-white font-bold uppercase tracking-widest cursor-pointer"
            >
              Mulai Ulang Semua Simulasi
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Active Simulation Workspace (8 Cols on LGA) */}
      <div className="lg:col-span-8 flex flex-col gap-6">

        {/* Email Device Canvas */}
        <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none shadow-xl flex flex-col overflow-hidden">
          
          {/* Email Client Header Bar */}
          <div className="px-5 py-4 bg-[#050608] border-b border-[#1F2937] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-none inline-block"></span>
                <span className="w-2.5 h-2.5 bg-yellow-500 rounded-none inline-block"></span>
                <span className="w-2.5 h-2.5 bg-[#00FF41] rounded-none inline-block"></span>
              </div>
              <span className="text-[10px] text-[#4B5563] font-bold ml-2 font-mono uppercase tracking-widest hidden sm:inline-block">INSPECTOR.EXE PROTOCOL</span>
            </div>
            <div className="flex gap-2">
              <button
                id="view-email-tab"
                onClick={() => setActiveTab("inbox")}
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-none transition-all cursor-pointer font-bold ${
                  activeTab === "inbox" ? "bg-[#00FF41] text-[#08090A]" : "text-[#9CA3AF] hover:text-white border border-[#1F2937]"
                }`}
              >
                Tinjauan Surel_
              </button>
              <button
                id="view-clues-tab"
                onClick={() => {
                  setActiveTab("petunjuk");
                  setRevealedClues(true);
                }}
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-none transition-all flex items-center gap-1 cursor-pointer font-bold ${
                  activeTab === "petunjuk" ? "bg-[#00FF41] text-[#08090A]" : "text-[#9CA3AF] hover:text-white border border-[#1F2937]"
                }`}
              >
                <Eye className="w-3 h-3" /> Clues ({currentScenario.clues.length})
              </button>
            </div>
          </div>

          {/* Email Metadata Headers */}
          <div className="p-5 border-b border-[#1F2937] bg-[#050608]/40 space-y-3 font-mono text-[11px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[#4B5563] font-bold inline-block w-20">FROM:</span>
                <span className="font-bold text-white text-[12px]">{currentScenario.senderName}</span>{" "}
                <span className="text-[10px] font-mono text-[#00FF41] bg-[#00FF41]/10 px-2.5 py-1 rounded-none border border-[#00FF41]/20 break-all ml-1 inline-block">
                  &lt;{currentScenario.senderAddress}&gt;
                </span>
              </div>
              <span className="text-[#4B5563] font-mono self-end sm:self-center">{currentScenario.dateStr}</span>
            </div>
            <div>
              <span className="text-[#4B5563] font-bold inline-block w-20">TO:</span>
              <span className="text-[#9CA3AF] font-mono">{currentScenario.recipient}</span>
            </div>
            <div>
              <span className="text-[#4B5563] font-bold inline-block w-20">SUBJECT:</span>
              <span className="text-xs font-bold text-white uppercase">{currentScenario.subject}</span>
            </div>
          </div>

          {/* Email Body Content Container */}
          <div className="p-6 bg-slate-900/10 min-h-[220px] relative text-[#D1D5DB] leading-relaxed text-[13px] whitespace-pre-wrap select-text border-b border-[#1F2937]">
            {activeTab === "inbox" ? (
              <div>
                {revealedClues ? (
                  // If clues are revealed, we highlight specific trigger texts in the mail body
                  <div>
                    {getHighlightedBody(currentScenario.emailBody, currentScenario.clues)}
                  </div>
                ) : (
                  // Plain output
                  <div className="text-[#E5E7EB] font-sans">{currentScenario.emailBody}</div>
                )}
              </div>
            ) : (
              // Clues list tab
              <div className="space-y-4 font-sans">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00FF41] flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#00FF41]" />
                  ANALISIS KOMPONEN & KODE KERENTANAN
                </h4>
                {currentScenario.clues.map((clue, idx) => (
                  <div key={clue.id} className={`p-4 rounded-none border ${
                    clue.type === "warning" ? "bg-amber-500/5 border-amber-500/20" : "bg-[#00FF41]/5 border-[#00FF41]/20"
                  }`}>
                    <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
                      <span className="text-[10px] font-mono font-bold text-white bg-[#050608] border border-[#1F2937] px-2.5 py-1">
                        "{clue.targetText}"
                      </span>
                      <span className={`text-[9px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-none border ${
                        clue.type === "warning" ? "bg-amber-700/10 border-amber-500/30 text-amber-400" : "bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]"
                      }`}>
                        {clue.label}
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      {clue.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Choice Panel or Feedback Overlay */}
          <div className="p-6 bg-[#050608] flex flex-col md:flex-row items-center justify-between gap-4">
            {userDecisions[currentScenario.id] === undefined ? (
              // Student hasn't chosen yet
              <>
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-8 h-8 text-[#00FF41] shrink-0" />
                  <div>
                    <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Keputusan Pengetesan</h4>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">Apakah surel di atas termasuk serangan Phishing bermotivasi fraud atau Aman?</p>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto shrink-0">
                  <button
                    id="mark-phishing-confirm-btn"
                    onClick={() => handleDecision(true)}
                    className="flex-1 md:flex-none bg-red-600 hover:bg-white hover:text-red-600 text-white font-mono font-bold text-[11px] uppercase tracking-widest px-5 py-3 rounded-none transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-red-500"
                  >
                    <ShieldAlert className="w-4 h-4" /> BAHAYA: PHISHING
                  </button>
                  <button
                    id="mark-safe-confirm-btn"
                    onClick={() => handleDecision(false)}
                    className="flex-1 md:flex-none bg-[#00FF41] hover:bg-white text-[#08090A] font-mono font-bold text-[11px] uppercase tracking-widest px-5 py-3 rounded-none transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#00FF41]"
                  >
                    <ShieldCheck className="w-4 h-4" /> AMAN: SECURE
                  </button>
                </div>
              </>
            ) : (
              // Student completed check
              <div className="w-full space-y-4">
                <div className={`p-5 rounded-none border border-l-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full ${
                  userDecisions[currentScenario.id].correct 
                    ? "bg-[#0FF141]/5 border-[#00FF41] text-[#00FF41]" 
                    : "bg-red-500/5 border-red-500 text-red-200"
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-8 w-8 rounded-none border border-[#1F2937] flex items-center justify-center bg-[#050608] shrink-0">
                      {userDecisions[currentScenario.id].correct ? (
                        <CheckCircle className="w-5 h-5 text-[#00FF41]" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </span>
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider">
                        {userDecisions[currentScenario.id].correct 
                          ? "ANALISIS BERHASIL — AMAN (+25 SKOR)" 
                          : "PERTAHANAN JEBOL — TERMINATED."}
                      </h4>
                      <p className="text-xs text-[#9CA3AF] mt-1 font-mono">
                        Keputusan Anda: <span className="font-bold underline text-white">{userDecisions[currentScenario.id].choice ? "Phishing" : "Legit/Aman"}</span> | Status Sebenarnya: <span className="font-bold text-white">{currentScenario.isPhishing ? "PHISHING (Berbahaya)" : "AMAN (Normal)"}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    id="view-explanation-btn"
                    onClick={() => setRevealedClues(true)}
                    className="text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-2 bg-[#050608] border border-[#1F2937] rounded-none hover:bg-[#1F2937] text-white cursor-pointer shrink-0"
                  >
                    {!revealedClues ? "Lihat Kupasan_" : "Tampilkan Clues_"}
                  </button>
                </div>

                {/* Cyber Startup Lesson takeaway */}
                <div className="bg-[#050608] border border-[#1F2937] p-5 rounded-none space-y-3">
                  <h5 className="text-[10px] font-mono font-bold text-[#00FF41] tracking-wide uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> EDUKASI PEJARAKAN KEAMANAN
                  </h5>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    {currentScenario.explanation}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-mono text-[#9CA3AF] bg-[#0A0C12] px-2.5 py-1 rounded-none border border-[#1F2937]">
                      TAKTIK: {currentScenario.isPhishing ? "SCAREWARE / URGENT ACTION" : "KREDENSIAL ASLI"}
                    </span>
                    <span className="text-[9px] font-mono text-[#9CA3AF] bg-[#0A0C12] px-2.5 py-1 rounded-none border border-[#1F2937]">
                      PLATFORM: {currentScenario.id.includes("whatsapp") ? "WHATSAPP MESSENGER" : currentScenario.id.includes("insta") ? "INSTAGRAM SEC" : "EMAIL GATEWAY"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tip of Awareness Card */}
        <div className="bg-[#0A0C12] border border-[#1F2937] p-6 rounded-none flex items-start gap-4 shadow-md">
          <div className="p-2.5 bg-[#00FF41]/10 text-[#00FF41] rounded-none border border-[#00FF41]/20 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Startup Insight: Teknik SPF, DKIM, DMARC</h4>
            <p className="text-xs text-[#9CA3AF] mt-1 leading-relaxed">
              Sebagai pelopor <strong>UNAS CYBER SECURITY</strong>, platform Unas Cyber mendesak para siswa kelas digital untuk rajin menilik metadata header surel asli. Institusi terverifikasi menggunakan verifikasi SPF (Sender Policy Framework) dan DKIM (DomainKeys Identified Mail) untuk mencegah penipu mencatut nama domain utama mereka.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helper to replace text on-screen to make them clickable/highlightable clues in style
function getHighlightedBody(body: string, clues: PhishingScenario["clues"]) {
  let parts: { text: string; clue?: typeof clues[0] }[] = [{ text: body }];

  // Iterate over each clue targets to cut parts and match them
  clues.forEach((clue) => {
    const updatedParts: typeof parts = [];

    parts.forEach((part) => {
      if (part.clue) {
        // Already processed
        updatedParts.push(part);
        return;
      }

      const index = part.text.indexOf(clue.targetText);
      if (index !== -1) {
        // Cut before, match, cut after
        const before = part.text.substring(0, index);
        const match = part.text.substring(index, index + clue.targetText.length);
        const after = part.text.substring(index + clue.targetText.length);

        if (before) updatedParts.push({ text: before });
        updatedParts.push({ text: match, clue });
        if (after) updatedParts.push({ text: after });
      } else {
        updatedParts.push(part);
      }
    });

    parts = updatedParts;
  });

  return (
    <span className="font-sans leading-relaxed text-[#D1D5DB] break-normal whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.clue) {
          const isWarning = part.clue.type === "warning";
          return (
            <span
              key={index}
              className={`px-1 rounded-none font-bold cursor-help relative group transition-all duration-300 ${
                isWarning 
                  ? "bg-amber-500/10 hover:bg-amber-500/30 border-b-2 border-amber-500 text-amber-300" 
                  : "bg-[#00FF41]/10 hover:bg-[#00FF41]/30 border-b-2 border-[#00FF41] text-[#00FF41]"
              }`}
            >
              {part.text}
              
              {/* Tooltip bubble inside */}
              <span className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-64 p-3 bg-[#050608] text-[#9CA3AF] text-[11px] leading-relaxed rounded-none border border-[#1F2937] shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                <span className={`block text-[10px] font-mono uppercase font-bold tracking-wider mb-1 ${
                  isWarning ? "text-amber-400" : "text-[#00FF41]"
                }`}>
                  ★ {part.clue.label}
                </span>
                {part.clue.reason}
                <span className="block border-t border-[#1F2937] mt-1.5 pt-1.5 text-[9px] text-[#4B5563] italic">
                  Klik tab Clues untuk melihat berkas kode lengkap
                </span>
              </span>
            </span>
          );
        }
        return <span key={index}>{part.text}</span>;
      })}
    </span>
  );
}
