import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";

import type { Scheme } from "@/theme/tokens";

export type ThemePreference = "light" | "dark" | "system";

/**
 * Only public-room content can be saved. Gupt-Charcha threads are deliberately
 * not bookmarkable, so nothing on this device lists which anonymous threads
 * you read (web ADR 0008).
 */
export type SavedKind = "discussion" | "vivaad";
export type SavedRef = `${SavedKind}:${string}`;

type Stored = {
  theme: ThemePreference;
  saved: SavedRef[];
  following: string[];
};

type Preferences = Stored & {
  /** False until storage has been read, so the first frame is in the right theme. */
  ready: boolean;
  scheme: Scheme;
  setTheme: (theme: ThemePreference) => void;
  toggleSaved: (ref: SavedRef) => void;
  toggleFollowing: (topic: string) => void;
};

const STORAGE_KEY = "charcha-preferences";

/** Light is the default, not the OS — Charcha's identity is its light theme (web ADR 0012). */
const defaults: Stored = { theme: "light", saved: [], following: [] };

const PreferencesContext = createContext<Preferences | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [stored, setStored] = useState<Stored>(defaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setStored({ ...defaults, ...(JSON.parse(raw) as Partial<Stored>) });
      })
      // Unreadable storage is not fatal; the defaults are a working app.
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  function update(next: (prev: Stored) => Stored) {
    setStored((prev) => {
      const value = next(prev);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value)).catch(() => {});
      return value;
    });
  }

  const scheme: Scheme =
    stored.theme === "system" ? (system === "dark" ? "dark" : "light") : stored.theme;

  const value: Preferences = {
    ...stored,
    ready,
    scheme,
    setTheme: (theme) => update((prev) => ({ ...prev, theme })),
    toggleSaved: (ref) =>
      update((prev) => ({
        ...prev,
        saved: prev.saved.includes(ref)
          ? prev.saved.filter((r) => r !== ref)
          : [ref, ...prev.saved],
      })),
    toggleFollowing: (topic) =>
      update((prev) => ({
        ...prev,
        following: prev.following.includes(topic)
          ? prev.following.filter((t) => t !== topic)
          : [...prev.following, topic],
      })),
  };

  return <PreferencesContext value={value}>{children}</PreferencesContext>;
}

export function usePreferences(): Preferences {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}
