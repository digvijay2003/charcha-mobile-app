import { LinearGradient } from "expo-linear-gradient";
import { Sparkles } from "lucide-react-native";
import { StyleSheet } from "react-native";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/theme/theme";

/** The brand line. Charcha room only — never over anonymous posts. */
export default function BottomBanner() {
  const { c } = useTheme();

  return (
    <LinearGradient
      colors={[c.softPurple, c.softPink, c.softOrange]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[styles.banner, { borderColor: c.line }]}
    >
      <Sparkles size={20} color={c.accentPurple} />
      <AppText weight="bold" style={[styles.line, { color: c.accentPurple }]}>
        Different opinions. Better understanding. Stronger minds.
      </AppText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: "center",
    gap: 12,
    overflow: "hidden",
  },
  line: {
    fontSize: 20,
    lineHeight: 27,
    textAlign: "center",
    letterSpacing: -0.3,
  },
});
