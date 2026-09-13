import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import { sideLabels } from "@/lib/vivaad-data";
import { makeStyles, useTheme } from "@/theme/theme";
import { brand } from "@/theme/tokens";

type SplitBarProps = {
  /** Percentage currently on the For side; Against gets the remainder. */
  paksh: number;
  /** Points gained by For since opening. Negative means Against gained. */
  shift: number;
  size?: "sm" | "lg";
};

/**
 * A charcha has one number, so it gets a ring. A vivaad has two sides plus the
 * movement between them, which a ring cannot express — hence a split bar.
 */
export default function SplitBar({ paksh, shift, size = "sm" }: SplitBarProps) {
  const { c } = useTheme();
  const s = useStyles();
  const clamped = Math.max(0, Math.min(100, paksh));
  const vipaksh = 100 - clamped;
  const gainer = shift > 0 ? "paksh" : "vipaksh";
  const labelSize = size === "lg" ? 14 : 12;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`For ${clamped} percent, Against ${vipaksh} percent. ${
        shift === 0 ? "No movement since opening." : `${Math.abs(shift)} points to ${sideLabels[gainer]} since opening.`
      }`}
    >
      <View style={s.labels}>
        <AppText weight="semibold" style={{ fontSize: labelSize, color: c.accentPink }}>
          {sideLabels.paksh} {clamped}%
        </AppText>
        <AppText weight="semibold" style={{ fontSize: labelSize, color: c.accentMint }}>
          {vipaksh}% {sideLabels.vipaksh}
        </AppText>
      </View>

      <View style={[s.bar, { height: size === "lg" ? 12 : 10 }]}>
        <View style={[s.for, { width: `${clamped}%` }]} />
        <View style={s.against} />
      </View>

      {/* The movement is the headline: persuasion, not popularity. */}
      <AppText weight="medium" style={s.shift}>
        {shift === 0 ? (
          "No movement since opening"
        ) : (
          <>
            <AppText
              weight="semibold"
              style={[s.shift, { color: gainer === "paksh" ? c.accentPink : c.accentMint }]}
            >
              ▲ {Math.abs(shift)} pts to {sideLabels[gainer]}
            </AppText>{" "}
            since opening
          </>
        )}
      </AppText>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  bar: {
    marginTop: 8,
    flexDirection: "row",
    gap: 2,
  },
  for: {
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
    backgroundColor: brand.pink,
  },
  against: {
    flex: 1,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    backgroundColor: brand.mint,
  },
  shift: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 11,
    color: c.muted,
  },
}));
