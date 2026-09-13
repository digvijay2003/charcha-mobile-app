import { router } from "expo-router";

import type { PendingKey } from "@/lib/mock-data";
import type { Mode } from "@/lib/modes";
import type { Side } from "@/lib/vivaad-data";

/**
 * Everything the prototype cannot do yet, in one place. The web links these to
 * routes that 404; on a phone a dead tap reads as a crash, so each opens a
 * sheet that says plainly what is coming.
 */
export type Pending =
  | PendingKey
  | `compose-${Mode}`
  | `argue-${Side}`
  | "share-perspective"
  | "share-experience";

export function openPending(what: Pending) {
  router.push({ pathname: "/coming-soon", params: { what } });
}

export const pendingCopy: Record<Pending, { title: string; body: string }> = {
  "compose-charcha": {
    title: "Start a Charcha",
    body: "Writing a question needs an account behind it. Composers arrive with sign-in, starting with this room.",
  },
  "compose-vivaad": {
    title: "Open a debate",
    body: "Motions, sides and timed rounds need a server to keep the clock. Opening a debate arrives with accounts.",
  },
  "compose-gupt": {
    title: "Post anonymously",
    body: "The anonymous composer will run the privacy check on your own words before anything is posted — the preview at the end of this room shows exactly what it does.",
  },
  "argue-paksh": {
    title: "Argue for",
    body: "Adding an argument — and pointing it at the specific argument it answers — arrives with accounts.",
  },
  "argue-vipaksh": {
    title: "Argue against",
    body: "Adding an argument — and pointing it at the specific argument it answers — arrives with accounts.",
  },
  "share-perspective": {
    title: "Share perspective",
    body: "Posting a perspective — and challenging someone else's — arrives with accounts.",
  },
  "share-experience": {
    title: "Share what happened to you",
    body: "Replies here are experiences, not advice. Posting one arrives with the anonymous composer and its privacy check.",
  },
  notifications: {
    title: "Notifications",
    body: "Replies, rebuttals to your arguments and debates closing soon will land here once there is a backend to send them.",
  },
  messages: {
    title: "Messages",
    body: "Direct messages are not built yet.",
  },
  "my-discussions": {
    title: "My Discussions",
    body: "Everything you start or join will be listed here once posting exists.",
  },
  explore: {
    title: "Explore",
    body: "Browsing every topic and discussion arrives with search.",
  },
  settings: {
    title: "Settings",
    body: "Account settings arrive with accounts. Appearance already works — it is in the You tab.",
  },
  profile: {
    title: "Profile",
    body: "Public profiles arrive with accounts. Gupt-Charcha will never appear on one.",
  },
  logout: {
    title: "Log out",
    body: "There is no account to sign out of yet — this build runs entirely on sample data.",
  },
  search: {
    title: "Search",
    body: "Search across discussions and debates is not wired up yet.",
  },
};
