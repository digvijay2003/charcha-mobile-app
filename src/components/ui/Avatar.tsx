import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/theme/theme";
import { brand } from "@/theme/tokens";

const gradients = [
  [brand.brand, brand.brand2],
  [brand.pink, brand.brand2],
  [brand.orange, brand.pink],
  [brand.mint, brand.brand],
  [brand.brand2, brand.pink],
  [brand.brand, brand.mint],
] as const;

const sizes = {
  xs: { box: 24, font: 9 },
  sm: { box: 32, font: 10 },
  md: { box: 36, font: 11 },
  lg: { box: 40, font: 12 },
  xl: { box: 56, font: 18 },
} as const;

/** Deterministic, so a name always gets the same colour on every device. */
function hashName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** Overlapping stacks only have room for one letter. */
function initials(name: string, count: number) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, count)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

type AvatarProps = {
  name: string;
  size?: keyof typeof sizes;
  /** Adds a ring so overlapping avatars stay separable. */
  ring?: boolean;
  /** Offset for overlapping stacks. */
  overlap?: boolean;
};

/** Always decorative: the name it represents is printed next to it. */
export default function Avatar({ name, size = "md", ring = false, overlap = false }: AvatarProps) {
  const { c } = useTheme();
  const { box, font } = sizes[size];
  const letters = initials(name, size === "xs" || size === "sm" ? 1 : 2);

  return (
    <LinearGradient
      colors={gradients[hashName(name) % gradients.length]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.base,
        { width: box, height: box },
        ring && { borderWidth: 2, borderColor: c.surface },
        overlap && styles.overlap,
      ]}
    >
      <AppText weight="semibold" style={[styles.letters, { fontSize: font }]}>
        {letters}
      </AppText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  overlap: {
    marginLeft: -6,
  },
  letters: {
    color: "#ffffff",
    letterSpacing: 0.4,
  },
});
