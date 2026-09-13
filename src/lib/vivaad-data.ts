import { formatCount } from "@/lib/format";

/**
 * A vivaad is a motion, not a question: two named sides, timed rounds, and a
 * close.
 */
export type Side = "paksh" | "vipaksh";

export type Stage = "opening" | "rebuttal" | "closing" | "verdict";

export const stageOrder: Stage[] = ["opening", "rebuttal", "closing", "verdict"];

export const stageLabels: Record<Stage, string> = {
  opening: "Opening",
  rebuttal: "Rebuttals",
  closing: "Closing",
  verdict: "Verdict",
};

export const sideLabels: Record<Side, string> = {
  paksh: "For",
  vipaksh: "Against",
};

export type Argument = {
  id: string;
  side: Side;
  author: string;
  body: string;
  /** Persuasion signal: how many readers said this moved them. */
  moved: number;
  /** id of the opposing argument this rebuts, if any. */
  rebuts?: string;
};

export type Vivaad = {
  id: string;
  motion: string;
  context: string;
  tags: string[];
  stage: Stage;
  round: number;
  totalRounds: number;
  /** Pre-formatted to avoid server/client timezone drift. */
  closesIn: string;
  /** % on Paksh's side when the debate opened, and right now. */
  openingSplit: number;
  currentSplit: number;
  participants: number;
  argumentCount: number;
  voices: string[];
  args: Argument[];
};

export const vivaads: Vivaad[] = [
  {
    id: "coaching-culture",
    motion: "Coaching institutes have replaced real learning in India.",
    context:
      "Kota, Kalyan, Chennai — an industry that promises ranks. Does it build understanding, or only exam reflexes?",
    tags: ["Education", "Society"],
    stage: "rebuttal",
    round: 2,
    totalRounds: 3,
    closesIn: "1d 4h left",
    openingSplit: 52,
    currentSplit: 61,
    participants: 2140,
    argumentCount: 89,
    voices: ["Ananya Iyer", "Rohit Shah", "Sana Qureshi", "Vikram Bose"],
    args: [
      {
        id: "a1",
        side: "paksh",
        author: "Ananya Iyer",
        body: "A student who can crack an integral in forty seconds but cannot say why it models anything has been trained, not taught. We optimised for the rank, and the rank stopped meaning learning.",
        moved: 212,
      },
      {
        id: "a2",
        side: "vipaksh",
        author: "Rohit Shah",
        body: "Coaching did not replace schools; it filled a gap schools left. For a first-generation learner in a small town, structured coaching is often the only rigorous teaching available at all.",
        moved: 188,
      },
      {
        id: "a3",
        side: "paksh",
        author: "Sana Qureshi",
        body: "Filling a gap and replacing learning are not exclusive. Once parents pay for the shortcut, the school stops being asked to teach — the gap widens because coaching exists.",
        moved: 164,
        rebuts: "a2",
      },
      {
        id: "a4",
        side: "vipaksh",
        author: "Vikram Bose",
        body: "That blames the symptom. Fix examination design and coaching loses its product overnight. The institute is downstream of a syllabus that rewards recall.",
        moved: 143,
        rebuts: "a1",
      },
    ],
  },
  {
    id: "sarkari-naukri",
    motion: "A government job is still the safest career choice in India.",
    context:
      "Stability and pension against equity and pace. Which one actually compounds over a working life?",
    tags: ["Career", "Work"],
    stage: "opening",
    round: 1,
    totalRounds: 3,
    closesIn: "3d 11h left",
    openingSplit: 50,
    currentSplit: 44,
    participants: 1580,
    argumentCount: 61,
    voices: ["Meera Joshi", "Arun Pillai", "Nikhil Chawla", "Fatima Noor"],
    args: [
      {
        id: "b1",
        side: "paksh",
        author: "Meera Joshi",
        body: "Safety is not the salary, it is the floor. A government job cannot be taken away in a funding winter, and that floor is what lets a family plan ten years ahead.",
        moved: 156,
      },
      {
        id: "b2",
        side: "vipaksh",
        author: "Arun Pillai",
        body: "A floor you wait six years to reach, through an exam with a one percent selection rate, is not safety. The expected value of those six years is the real cost nobody prices in.",
        moved: 201,
      },
    ],
  },
  {
    id: "regional-cinema",
    motion: "Regional cinema now tells better stories than Bollywood.",
    context:
      "Malayalam, Tamil, Marathi and Bengali films keep taking the conversation. Has the centre of gravity actually moved?",
    tags: ["Culture", "Cinema"],
    stage: "closing",
    round: 3,
    totalRounds: 3,
    closesIn: "6h left",
    openingSplit: 58,
    currentSplit: 72,
    participants: 3420,
    argumentCount: 147,
    voices: ["Deepa Menon", "Kabir Sen", "Lakshmi Rao", "Imran Sheikh"],
    args: [
      {
        id: "c1",
        side: "paksh",
        author: "Deepa Menon",
        body: "Malayalam cinema makes films about ordinary people with no stars and no spectacle, and they travel further than hundred-crore vehicles. That is a storytelling gap, not a budget gap.",
        moved: 389,
      },
      {
        id: "c2",
        side: "vipaksh",
        author: "Kabir Sen",
        body: "We are comparing the best of many regional industries against the average of one. Bollywood's top decile holds up fine; survivorship is doing the arguing here.",
        moved: 356,
        rebuts: "c1",
      },
    ],
  },
  {
    id: "cricket-monoculture",
    motion: "Cricket has crowded out every other sport in India.",
    context:
      "One sport takes the sponsorship, the airtime and the childhood afternoons. What does that cost the rest?",
    tags: ["Sports", "Society"],
    stage: "rebuttal",
    round: 2,
    totalRounds: 3,
    closesIn: "2d 8h left",
    openingSplit: 64,
    currentSplit: 59,
    participants: 1890,
    argumentCount: 78,
    voices: ["Tanvi Deshmukh", "Harjit Singh", "Ravi Kumar", "Zoya Iqbal"],
    args: [
      {
        id: "d1",
        side: "paksh",
        author: "Tanvi Deshmukh",
        body: "Ask a ten-year-old to name five hockey players. We won eight Olympic golds in the sport and cannot fill a stadium for it now. Attention is finite and cricket took all of it.",
        moved: 174,
      },
      {
        id: "d2",
        side: "vipaksh",
        author: "Harjit Singh",
        body: "Neeraj Chopra, the badminton run, the wrestling medals — those came after cricket money proved Indian sport could be commercial at all. It raised the ceiling for everyone.",
        moved: 198,
        rebuts: "d1",
      },
    ],
  },
];

export function getVivaad(id: string): Vivaad | undefined {
  return vivaads.find((v) => v.id === id);
}

/** Positive means Paksh gained ground since the debate opened. */
export function shift(v: Vivaad): number {
  return v.currentSplit - v.openingSplit;
}

export function formatParticipants(v: Vivaad): string {
  return formatCount(v.participants);
}
