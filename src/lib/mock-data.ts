import {
  Bell,
  Briefcase,
  Compass,
  Cpu,
  GraduationCap,
  Heart,
  Landmark,
  Mail,
  MessageCircle,
  MessagesSquare,
  Sprout,
  type LucideIcon,
} from "lucide-react-native";

/** Accent families used across cards, rings and topic chips. */
export type Accent = "purple" | "mint" | "orange" | "pink";

/**
 * Destinations that exist on neither web nor mobile yet. They open the
 * not-built sheet instead of a dead route; the key says which message to show.
 */
export type PendingKey =
  | "notifications"
  | "messages"
  | "my-discussions"
  | "explore"
  | "settings"
  | "profile"
  | "logout"
  | "search";

export type NavItem = {
  label: string;
  pending: PendingKey;
  icon: LucideIcon;
  badge?: number;
};

/**
 * Your own activity. Bookmarks and Following are not here because they are
 * real on mobile — the You tab renders them from local state.
 */
export const utilityNav: NavItem[] = [
  { label: "Notifications", pending: "notifications", icon: Bell, badge: 3 },
  { label: "Messages", pending: "messages", icon: Mail },
  { label: "My Discussions", pending: "my-discussions", icon: MessagesSquare },
  { label: "Explore", pending: "explore", icon: Compass },
];

export type Discussion = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  participants: string;
  comments: number;
  agreePercentage: number;
  accent: Accent;
  icon: LucideIcon;
  /** Names used to render the initials avatar stack. */
  voices: string[];
};

export const discussions: Discussion[] = [
  {
    id: "1",
    title: "Will AI replace human jobs in the next 10 years?",
    description:
      "Exploring the impact of AI on employment and the future of work.",
    tags: ["Technology", "Future"],
    participants: "1.2K",
    comments: 342,
    agreePercentage: 62,
    accent: "purple",
    icon: Cpu,
    voices: ["Neha Rao", "Ibrahim Khan", "Sara Mehta", "Dev Patel"],
  },
  {
    id: "2",
    title: "Is a 4-day work week better for productivity?",
    description: "Balancing work-life integration and economic outcomes.",
    tags: ["Work", "Productivity"],
    participants: "856",
    comments: 289,
    agreePercentage: 71,
    accent: "mint",
    icon: Briefcase,
    voices: ["Priya Nair", "Tom Alvarez", "Kabir Sen", "Lena Fischer"],
  },
  {
    id: "3",
    title: "Do college degrees still matter?",
    description:
      "Are degrees essential or are skills becoming the new currency?",
    tags: ["Education", "Career"],
    participants: "1.5K",
    comments: 512,
    agreePercentage: 48,
    accent: "orange",
    icon: GraduationCap,
    voices: ["Ana Duarte", "Rohit Shah", "Mei Lin", "Yusuf Ali"],
  },
  {
    id: "4",
    title: "Is social media doing more harm than good?",
    description: "Exploring the impact of social platforms on modern society.",
    tags: ["Society", "Technology"],
    participants: "2.3K",
    comments: 731,
    agreePercentage: 33,
    accent: "pink",
    icon: MessageCircle,
    voices: ["Zoya Iqbal", "Marco Rossi", "Aditi Rane", "Sam Okafor"],
  },
];

export function getDiscussion(id: string): Discussion | undefined {
  return discussions.find((d) => d.id === id);
}

export type Topic = {
  name: string;
  count: string;
  icon: LucideIcon;
  accent: Accent;
};

export const topics: Topic[] = [
  { name: "Technology", count: "2.1K", icon: Cpu, accent: "purple" },
  { name: "Work", count: "1.8K", icon: Briefcase, accent: "mint" },
  { name: "Politics", count: "1.5K", icon: Landmark, accent: "orange" },
  { name: "Society", count: "1.2K", icon: Heart, accent: "pink" },
  { name: "Education", count: "1.1K", icon: GraduationCap, accent: "purple" },
  { name: "Lifestyle", count: "980", icon: Sprout, accent: "mint" },
];

export const currentUser = {
  name: "Arjun Singh",
  handle: "@arjun.charcha",
};

export const streakDays = 7;

/** Deliberately surfaced counter-view — blueprint §8.2, not an engagement bait feed. */
export const unseenPerspective = {
  discussionId: "1",
  topic: "Will AI replace human jobs?",
  stance: "Disagree",
  share: 38,
  body: "Every automation wave since the loom was predicted to end work. Each one moved it. The question is not whether jobs vanish but who pays for the transition.",
  author: "Ibrahim Khan",
};
