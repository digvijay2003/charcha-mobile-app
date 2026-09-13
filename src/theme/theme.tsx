import { createContext, useContext, type ReactNode } from "react";
import { StyleSheet } from "react-native";

import type { Mode } from "@/lib/modes";
import { usePreferences } from "@/state/preferences";
import { paletteFor, type Palette, type Scheme } from "@/theme/tokens";

const RoomContext = createContext<Mode>("charcha");

/**
 * The native equivalent of the web's `.mode-{room}` class: everything below
 * this reads the room's palette, so a card written once looks native in all
 * three rooms.
 */
export function Room({ mode, children }: { mode: Mode; children: ReactNode }) {
  return <RoomContext value={mode}>{children}</RoomContext>;
}

export function useTheme(): { c: Palette; scheme: Scheme; mode: Mode } {
  const { scheme } = usePreferences();
  const mode = useContext(RoomContext);
  return { c: paletteFor(scheme, mode), scheme, mode };
}

/**
 * Themed StyleSheet factory. Palettes are stable objects, so each of the six
 * scheme × room combinations builds its styles exactly once.
 */
export function makeStyles<T extends StyleSheet.NamedStyles<T>>(factory: (c: Palette) => T) {
  const cache = new WeakMap<Palette, T>();

  return function useStyles(): T {
    const { c } = useTheme();
    let styles = cache.get(c);
    if (!styles) {
      styles = StyleSheet.create(factory(c));
      cache.set(c, styles);
    }
    return styles;
  };
}
