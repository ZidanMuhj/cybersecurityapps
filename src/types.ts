export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  illustration?: string;
  quizQuestion: string;
  quizOptions: string[];
  quizAnswer: number; // Index of correct option
  quizExplanation: string;
}

export interface SecurityModule {
  id: string;
  category: "phishing" | "password" | "privacy" | "social";
  title: string;
  description: string;
  difficulty: "Pemula" | "Menengah" | "Ahli";
  lessons: Lesson[];
}

export interface PhishingClue {
  id: string;
  targetText: string;
  label: string;
  type: "warning" | "safe";
  reason: string;
}

export interface PhishingScenario {
  id: string;
  senderName: string;
  senderAddress: string;
  recipient: string;
  subject: string;
  dateStr: string;
  isPhishing: boolean;
  avatarLetter: string;
  avatarBg: string; // Tailwind bg class
  emailBody: string; // Plain/HTML formatted text
  clues: PhishingClue[];
  difficulty: "Mudah" | "Sedang" | "Sulit";
  explanation: string;
}

export interface DefenderThreat {
  id: string;
  name: string;
  location: string;
  status: "vulnerable" | "secured";
  iconName: string;
  threatDescription: string;
  secureGoal: string;
  options: {
    id: string;
    label: string;
    description: string;
    points: number;
    isSecure: boolean;
    feedback: string;
  }[];
}

export interface UserStats {
  score: number;
  completedLessons: string[]; // lessonIds
  completedModules: string[]; // moduleIds
  phishingCompleted: boolean;
  phishingScore: number;
  defenderCompleted: boolean;
  defenderScore: number;
  studentName: string;
  studentSchool: string;
  certificateClaimed: boolean;
  certificateId: string;
}
