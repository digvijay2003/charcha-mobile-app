import type { LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/theme/theme";
import type { ColorToken } from "@/theme/tokens";

type ButtonProps = {
  label: string;
  onPress: () => void;
  icon?: LucideIcon;
  /** `mode` is the room's solid CTA; `soft` takes a tint and a text-safe accent. */
  variant?: "mode" | "soft" | "outline";
  soft?: { bg: ColorToken; fg: ColorToken };
  size?: "sm" | "md";
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
};

export default function Button({
  label,
  onPress,
  icon: Icon,
  variant = "mode",
  soft,
  size = "md",
  style,
  accessibilityHint,
}: ButtonProps) {
  const { c } = useTheme();

  const bg =
    variant === "mode" ? c.mode : variant === "soft" && soft ? c[soft.bg] : "transparent";
  const fg =
    variant === "mode" ? c.onMode : variant === "soft" && soft ? c[soft.fg] : c.muted;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [
        styles.base,
        size === "sm" ? styles.sm : styles.md,
        { backgroundColor: bg },
        variant === "outline" && { borderWidth: 1, borderColor: c.line },
        pressed && styles.pressed,
        style,
      ]}
    >
      {Icon ? <Icon size={size === "sm" ? 14 : 16} color={fg} /> : null}
      <AppText weight="semibold" style={{ color: fg, fontSize: size === "sm" ? 12 : 14 }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 10,
  },
  // 44pt minimum touch height, Apple HIG / Material both.
  md: {
    minHeight: 44,
    paddingHorizontal: 16,
  },
  sm: {
    minHeight: 36,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.85,
  },
});
