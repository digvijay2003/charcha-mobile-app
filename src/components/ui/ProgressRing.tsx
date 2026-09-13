import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/theme/theme";

type ProgressRingProps = {
  /** 0–100. */
  value: number;
  /** Arc colour — a text-safe accent, never a vivid brand colour. */
  color: string;
  label?: string;
  size?: number;
};

/** A charcha has one number — how many agree — so it gets a ring. */
export default function ProgressRing({ value, color, label = "Agree", size = 48 }: ProgressRingProps) {
  const { c } = useTheme();
  const clamped = Math.max(0, Math.min(100, value));
  const stroke = size / 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const centre = size / 2;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={`${clamped}% of participants agree`}
      style={styles.root}
    >
      <View style={{ width: size, height: size }}>
        {/* Rotated with a view transform, not SVG `origin`: on web that prop
            becomes an invalid `transform-origin` DOM attribute. */}
        <View style={styles.startAtTop}>
          <Svg width={size} height={size}>
            <Circle cx={centre} cy={centre} r={r} fill="none" strokeWidth={stroke} stroke={c.line} />
            <Circle
              cx={centre}
              cy={centre}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={circumference * (1 - clamped / 100)}
            />
          </Svg>
        </View>
        <View style={styles.centre}>
          <AppText weight="bold" style={{ fontSize: size / 4 }}>
            {clamped}%
          </AppText>
        </View>
      </View>
      <AppText weight="medium" style={[styles.label, { color: c.muted }]}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    gap: 4,
  },
  // SVG arcs begin at 3 o'clock; a quarter turn back starts the fill at 12.
  startAtTop: {
    transform: [{ rotate: "-90deg" }],
  },
  centre: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
});
