import React, { useState } from "react";
import { UserStats, DefenderThreat } from "../types";
import { DEFENDER_THREATS } from "../data/modulesData";
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  Laptop, 
  Wifi, 
  FileText, 
  Eye, 
  Check, 
  HelpCircle,
  Clock,
  Unlock,
  Sparkles,
  Lock,
  ArrowRight
} from "lucide-react";

interface MiniGameProps {
  stats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export default function MiniGame({ stats, onUpdateStats }: MiniGameProps) {
  const [threats, setThreats] = useState<DefenderThreat[]>(
    DEFENDER_THREATS.map(t => ({ ...t, status: "vulnerable" }))
  );
  const [activeThreatId, setActiveThreatId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    optionId: string;
    text: string;
    points: number;
    isSecure: boolean;
  } | null>(null);

  const activeThreat = threats.find((t) => t.id === activeThreatId);

  // Helper mapping string to Lucide icons
  const getThreatIcon = (name: string, status: "vulnerable" | "secured") => {
    const colorClass = status === "secured" ? "text-emerald-400" : "text-rose-400";
    switch (name) {
      case "Laptop":
        return <Laptop className={`w-6 h-6 ${colorClass}`} />;
      case "Wifi":
        return <Wifi className={`w-6 h-6 ${colorClass}`} />;
      case "FileText":
        return <FileText className={`w-6 h-6 ${colorClass}`} />;
      default:
        return <ShieldAlert className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  const handleFixSelect = (option: {
    id: string;
    label: string;
    description: string;
    points: number;
    isSecure: boolean;
    feedback: string;
  }) => {
    if (!activeThreat) return;

    setFeedback({
      optionId: option.id,
      text: option.feedback,
      points: option.points,
      isSecure: option.isSecure
    });

    if (option.isSecure) {
      // Update this threat's status to secured
      const updatedThreats = threats.map(t => {
        if (t.id === activeThreat.id) {
          return { ...t, status: "secured" as const };
        }
        return t;
      });
      setThreats(updatedThreats);

      // Check if all are secured now
      const allSecured = updatedThreats.every(t => t.status === "secured");
      
      // Calculate scores
      const wasSecuredAlready = activeThreat.status === "secured";
      if (!wasSecuredAlready) {
        const bonusPoints = option.points;
        const newScore = stats.score + bonusPoints;
        onUpdateStats({
          score: newScore,
          defenderScore: (stats.defenderScore || 0) + bonusPoints,
          defenderCompleted: allSecured || stats.defenderCompleted
        });
      }
    } else {
      // Small penalty or no progress for incorrect decision
      const wasSecuredAlready = activeThreat.status === "secured";
      if (!wasSecuredAlready) {
        onUpdateStats({
          score: Math.max(0, stats.score + option.points)
        });
      }
    }
  };

  const calculateOverallShieldHealth = () => {
    const total = threats.length;
    const secured = threats.filter(t => t.status === "secured").length;
    return Math.round((secured / total) * 100);
  };

  const health = calculateOverallShieldHealth();

  const resetGame = () => {
    setThreats(DEFENDER_THREATS.map(t => ({ ...t, status: "vulnerable" as const })));
    setFeedback(null);
    setActiveThreatId(null);
    onUpdateStats({ defenderScore: 0 });
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Metrics Banner */}
      <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-500/10 text-red-500 text-[9px] font-mono font-black border border-red-500/20 px-2.5 py-1 rounded-none uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-none bg-red-500"></span>
              PUSAT KENDALI KERENTANAN UNAS CYBER
            </span>
          </div>
          <h3 className="font-display font-black text-lg md:text-xl text-white uppercase italic tracking-tight">
            SIBERDEFENDER ICT GAMES: AMANKAN PERANGKAT 
          </h3>
          <p className="text-xs text-[#9CA3AF] max-w-xl leading-relaxed">
            Hacker sedang memindai jaringan sekolah Anda! Audit 4 elemen kerentanan di bawah ini. Ubah status berbahaya (<span className="text-red-500 font-bold">VULNERABLE</span>) menjadi tameng baja (<span className="text-[#00FF41] font-bold">SECURED</span>) dengan mengambil keputusan rekomendasi operasional par excellence.
          </p>
        </div>

        {/* Dynamic Progress Shield Gauge */}
        <div className="w-full md:w-auto shrink-0 bg-[#050608] border border-[#1F2937] rounded-none p-4 flex items-center gap-4 min-w-[210px] justify-center font-mono">
          <div className="relative flex items-center justify-center">
            {/* Simple circular metric */}
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="28" className="text-slate-800" strokeWidth="5" fill="transparent" stroke="currentColor"/>
              <circle cx="32" cy="32" r="28" className={`${health === 100 ? "text-[#00FF41]" : health > 40 ? "text-amber-500" : "text-red-500"}`} strokeWidth="5" strokeDasharray={175} strokeDashoffset={175 - (175 * health) / 100} fill="transparent" strokeLinecap="square" stroke="currentColor"/>
            </svg>
            <span className="absolute text-xs font-bold text-white">{health}%</span>
          </div>
          <div>
            <div className="text-[9px] text-[#4B5563] uppercase tracking-widest">LEVEL KETAHANAN</div>
            <div className={`text-xs font-black mt-0.5 uppercase tracking-wider ${health === 100 ? "text-[#00FF41]" : health > 40 ? "text-amber-400" : "text-red-500"}`}>
              {health === 100 ? "Fortress Secured" : health > 0 ? "Tameng Sebagian" : "Bahaya Kritis_"}
            </div>
            <div className="text-[9px] text-[#9CA3AF] mt-0.5">{threats.filter(t => t.status === "secured").length} / {threats.length} TIANG AMAN</div>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Hand: Threats Checklist Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs font-mono font-black uppercase tracking-widest text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00FF41]" /> PETA AUDIT ENKRIPSI SISTEM
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {threats.map((threat) => {
              const isSecured = threat.status === "secured";
              const isActive = activeThreatId === threat.id;

              return (
                <div
                  key={threat.id}
                  id={`threat-item-${threat.id}`}
                  onClick={() => {
                    setActiveThreatId(threat.id);
                    setFeedback(null); // Reset choice feedback for new selection
                  }}
                  className={`p-4 rounded-none border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? "bg-[#08090A] border-[#00FF41]"
                      : "bg-[#0A0C12] border-[#1F2937] hover:bg-[#050608]"
                  }`}
                >
                  {/* Glowing vertical lines */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                    isSecured ? "bg-[#00FF41]" : "bg-red-500"
                  }`} />

                  <div className="flex items-start justify-between gap-4 pl-2">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-none shrink-0 border ${
                        isSecured ? "bg-[#00FF41]/10 border-[#00FF41]/20" : "bg-red-500/10 border-red-500/20"
                      }`}>
                        {getThreatIcon(threat.iconName, threat.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="text-[9px] text-[#4B5563] flex items-center gap-1 uppercase tracking-wider">
                            <Clock className="w-3 h-3" /> {threat.location}
                          </span>
                        </div>
                        <h4 className="font-display font-black uppercase italic text-white text-sm mt-1 tracking-tight">
                          {threat.name}
                        </h4>
                        <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-1 leading-relaxed">
                          {threat.threatDescription}
                        </p>
                      </div>
                    </div>

                    {/* Badge Status */}
                    <span className={`text-[9px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-none shrink-0 border ${
                      isSecured 
                        ? "bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]" 
                        : "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse"
                    }`}>
                      {isSecured ? "SECURED" : "VULNERABLE"}
                    </span>
                  </div>
                  
                  {/* Interactive Button overlay indicator inside */}
                  <div className="pl-14 pt-3.5 flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00FF41] hover:text-white font-bold inline-flex items-center gap-1">
                      {isSecured ? "Tinjau Solusi_" : "Amankan Titik Ini_"} 
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {health === 100 && (
            <div className="bg-[#00FF41]/5 border-l-4 border-l-[#00FF41] border border-[#1F2937] p-5 rounded-none flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-[#00FF41]/15 text-[#00FF41] rounded-none border border-[#00FF41]/20">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <div>
                  <h5 className="text-[11px] font-mono font-bold uppercase text-white tracking-widest">SISTEM AMAN 100%</h5>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">Semua kerentanan di atas berhasil dieliminasi dengan pertahanan modular berstandar tinggi.</p>
                </div>
              </div>
              <button
                id="reset-sandbox-btn"
                onClick={resetGame}
                className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 bg-[#00FF41] text-[#08090A] hover:bg-white transition rounded-none cursor-pointer border border-[#00FF41]"
              >
                Reset Kembali_
              </button>
            </div>
          )}
        </div>

        {/* Right Hand: Action Decision Workspace (5 Cols) */}
        <div className="lg:col-span-5">
          {activeThreat ? (
            <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-5 md:p-6 space-y-6 shadow-xl sticky top-4">
              
              {/* Threat header inside action box */}
              <div className="space-y-1.5 pb-4 border-b border-[#1F2937] font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-none text-[9px] border font-bold uppercase ${
                    activeThreat.status === "secured" ? "bg-[#0FF141]/5 border-[#00FF41] text-[#00FF41]" : "bg-red-500/5 border-red-500 text-red-400"
                  }`}>
                    {activeThreat.status === "secured" ? "✓ SECURED" : "⚠ THREAT DETECTED"}
                  </span>
                </div>
                <h4 className="font-display font-black text-white text-base uppercase tracking-tight italic mt-1.5">
                  {activeThreat.name}
                </h4>
                <p className="text-[10px] text-[#4B5563] uppercase tracking-wider">
                  OPERATIONAL SITE: {activeThreat.location}
                </p>
              </div>

              {/* Threat Goal */}
              <div className="bg-[#050608] p-4 rounded-none border border-[#1F2937] space-y-2">
                <h5 className="text-[9px] text-[#00FF41] uppercase tracking-wider font-mono font-bold">MISI PENGAMANAN SYSTEM_</h5>
                <p className="text-xs text-white font-bold">{activeThreat.secureGoal}</p>
                <p className="text-xs text-[#9CA3AF] leading-relaxed pt-2 border-t border-[#1F2937] mt-1">
                  {activeThreat.threatDescription}
                </p>
              </div>

              {/* Options to click */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#9CA3AF]">PILIH SOLUSI PERTAHANAN:</h5>
                <div className="space-y-2.5">
                  {activeThreat.options.map((opt) => {
                    const isSelected = feedback?.optionId === opt.id;
                    const isSecuredSuccessfully = activeThreat.status === "secured";

                    return (
                      <button
                        key={opt.id}
                        id={`action-opt-${opt.id}`}
                        disabled={isSecuredSuccessfully && activeThreat.options.find(o => o.id === feedback?.optionId)?.isSecure !== true}
                        onClick={() => handleFixSelect(opt)}
                        className={`w-full text-left p-3.5 rounded-none border text-xs leading-relaxed transition-all duration-200 font-sans block cursor-pointer ${
                          isSelected
                            ? opt.isSecure 
                              ? "bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41] shadow-md"
                              : "bg-red-500/10 border-red-500 text-red-200"
                            : "bg-[#050608]/80 border-[#1F2937] hover:bg-[#0A0C12] text-[#9CA3AF]"
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          <span className={`w-5 h-5 rounded-none border shrink-0 flex items-center justify-center font-mono font-bold text-[10px] ${
                            isSelected
                              ? opt.isSecure ? "bg-[#0FF141]/20 border-[#00FF41] text-[#00FF41]" : "bg-red-500/20 border-red-500 text-red-500"
                              : "bg-[#0A0C12] border-[#1F2937] text-[#9CA3AF]"
                          }`}>
                            {opt.label}
                          </span>
                          <span className="font-bold text-[#E5E7EB]">{opt.description}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback box */}
              {feedback && (
                <div className={`p-4 rounded-none border border-l-4 transition-all duration-300 ${
                  feedback.isSecure 
                    ? "bg-[#00FF41]/5 border-[#00FF41] text-[#00FF41]" 
                    : "bg-red-500/5 border-red-500 text-red-200"
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      {feedback.isSecure ? (
                        <ShieldCheck className="w-5 h-5 text-[#00FF41]" />
                      ) : (
                        <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                      )}
                    </span>
                    <div className="space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider font-bold flex items-center gap-2 flex-wrap">
                        <span>{feedback.isSecure ? "TINDAKAN SEMPURNA" : "SISTEM RENTAN!"}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-none border ${
                          feedback.isSecure ? "bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]" : "bg-red-500/10 border-red-500/30 text-red-400"
                        }`}>
                          {feedback.points > 0 ? `+${feedback.points} POIN` : `${feedback.points} POIN`}
                        </span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] leading-relaxed">
                        {feedback.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-[#0A0C12] border border-[#1F2937] rounded-none p-8 text-center space-y-4 shadow-xl font-mono">
              <div className="mx-auto w-12 h-12 rounded-none bg-[#00FF41]/10 border border-[#00FF41]/20 flex items-center justify-center text-[#00FF41]">
                <Shield className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-xs uppercase tracking-widest">PILIH ELEMEN_</h4>
                <p className="text-xs text-[#9CA3AF] max-w-xs mx-auto leading-relaxed">
                  Silakan klik salah satu titik kerentanan berwarna merah di kiri untuk mulai menjalankan audit taktis dan melindungi sistem.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
