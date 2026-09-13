import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import { makeStyles } from "@/theme/theme";

/**
 * A thread-scoped identity. The pattern is derived from the handle, which is
 * seeded per thread — so the same person carries a different mark in every
 * thread and nothing links across the platform.
 */
function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function AnonHandle({ handle, size = "sm" }: { handle: string; size?: "sm" | "md" }) {
  const s = useStyles();
  const bits = hash(handle);
  // Mirrored 3x3 so the mark reads as a deliberate shape, not noise.
  const cells = Array.from({ length: 9 }, (_, i) => {
    const column = i % 3;
    const source = column === 2 ? i - 2 : i;
    return ((bits >> source) & 1) === 1;
  });
  const box = size === "md" ? 36 : 28;
  const cell = (box - 12 - 2) / 3;

  return (
    <View style={s.row} accessible accessibilityLabel={`Anonymous, Gupt number ${handle.split("").join(" ")}`}>
      <View style={[s.grid, { width: box, height: box }]}>
        {cells.map((on, i) => (
          <View key={i} style={[s.cell, { width: cell, height: cell }, on && s.on]} />
        ))}
      </View>
      <AppText weight="mono" style={s.label}>
        Gupt #{handle}
      </AppText>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    padding: 6,
    borderRadius: 8,
    backgroundColor: c.softGupt,
  },
  cell: {
    borderRadius: 1,
  },
  on: {
    backgroundColor: c.gupt,
  },
  label: {
    fontSize: 12,
    color: c.muted,
  },
}));
