import { Briefcase, GraduationCap, Heart, Users, Wallet, type LucideIcon } from "lucide-react-native";

/**
 * Gupt-Charcha identities are scoped to a single thread. The same person in
 * two threads gets two unrelated handles, so nothing can be stitched together
 * across the platform. Handles are seeded per thread, never per user.
 */
export type GuptCategory = "career" | "money" | "relationships" | "social" | "education";

export const guptCategories: Record<
  GuptCategory,
  { label: string; icon: LucideIcon }
> = {
  career: { label: "Career", icon: Briefcase },
  money: { label: "Money", icon: Wallet },
  relationships: { label: "Relationships", icon: Heart },
  social: { label: "Social Life", icon: Users },
  education: { label: "Education", icon: GraduationCap },
};

export type Perspective = {
  id: string;
  handle: string;
  /** What happened to them, not what the poster should do. */
  body: string;
  beenThere: number;
};

export type GuptPost = {
  id: string;
  handle: string;
  category: GuptCategory;
  title: string;
  body: string;
  beenThere: number;
  perspectiveCount: number;
  postedAgo: string;
  /** Threads expire; the countdown is part of why people feel safe posting. */
  expiresIn: string;
  perspectives: Perspective[];
};

export const guptPosts: GuptPost[] = [
  {
    id: "leaving-a-stable-job",
    handle: "A81F",
    category: "career",
    title: "I want to leave my job, but I am scared.",
    body: "Six years at the same company. Decent pay, no growth, and I dread Monday by Saturday evening. Everyone at home thinks I have made it. I do not know how to explain that I feel stuck without sounding ungrateful.",
    beenThere: 412,
    perspectiveCount: 38,
    postedAgo: "5h ago",
    expiresIn: "expires in 2 days",
    perspectives: [
      {
        id: "p1",
        handle: "C34D",
        body: "I left a similar job at 29 with four months of savings. The first year was genuinely hard and I will not pretend otherwise. But the dread went away in the first week and never came back.",
        beenThere: 96,
      },
      {
        id: "p2",
        handle: "7E20",
        body: "I stayed. I negotiated an internal transfer instead and it fixed about seventy percent of it. Leaving is not the only exit — I did not realise that for two years.",
        beenThere: 141,
      },
      {
        id: "p3",
        handle: "B9C1",
        body: "The part nobody told me: telling my parents was harder than the resignation itself. It took them about eight months to stop asking when I would go back.",
        beenThere: 203,
      },
    ],
  },
  {
    id: "everyone-moved-abroad",
    handle: "5D77",
    category: "social",
    title: "Everyone from my batch is abroad and I am still here.",
    body: "Instagram is a highlight reel, I know that. I still open it and feel like I missed a train that left in 2022. I like my life most days. Then someone posts a graduation photo and I do not.",
    beenThere: 897,
    perspectiveCount: 64,
    postedAgo: "1d ago",
    expiresIn: "expires in 6 days",
    perspectives: [
      {
        id: "q1",
        handle: "F102",
        body: "I am one of the people posting those photos. I have not told anyone back home how lonely the first eighteen months were. The reel is not the life.",
        beenThere: 318,
      },
      {
        id: "q2",
        handle: "2A8E",
        body: "I stayed, and at 34 I have a house and my parents nearby. My friends abroad have neither. Different trains, not a missed one.",
        beenThere: 187,
      },
    ],
  },
  {
    id: "course-loan-regret",
    handle: "E4B0",
    category: "money",
    title: "I took a loan for a course that got me nothing.",
    body: "Eleven months of EMIs left on something that taught me less than free videos would have. I am angry at the marketing, but mostly at myself for believing it.",
    beenThere: 534,
    perspectiveCount: 47,
    postedAgo: "2d ago",
    expiresIn: "expires in 5 days",
    perspectives: [
      {
        id: "r1",
        handle: "9C15",
        body: "Same, in 2021. What helped was separating the money from the shame. The money is a fixed number that ends on a known date. The shame was open-ended until I decided it was not.",
        beenThere: 271,
      },
    ],
  },
  {
    id: "promoted-and-fraud",
    handle: "3F9A",
    category: "career",
    title: "I got promoted and I feel like a fraud.",
    body: "I now review work I do not fully understand. I keep waiting for someone to notice. The promotion was supposed to feel good and mostly it feels like being watched.",
    beenThere: 726,
    perspectiveCount: 52,
    postedAgo: "3d ago",
    expiresIn: "expires in 4 days",
    perspectives: [
      {
        id: "s1",
        handle: "D620",
        body: "Eight years into managing and I still have this some weeks. What changed is that I started saying I do not know this yet out loud. Nobody left the room.",
        beenThere: 389,
      },
      {
        id: "s2",
        handle: "A047",
        body: "I asked my own manager if the promotion was a mistake. She said everyone at this level asks that in year one, and the ones who never ask are the actual problem.",
        beenThere: 256,
      },
    ],
  },
];

export function getGuptPost(id: string): GuptPost | undefined {
  return guptPosts.find((p) => p.id === id);
}
