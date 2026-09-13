import type { LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/theme/theme";
import type { ColorToken } from "@/theme/tokens";

type SectionHeadingProps = {
  title: string;
  icon?: LucideIcon;
  /** A token, not a colour, so it resolves against the room it renders in. */
  iconColor?: ColorToken;
  action?: { label: string; onPress: () => void };
};

export default function SectionHeading({ title, icon: Icon, iconColor = "accentPurple", action }: SectionHeadingProps) {
  const { c } = useTheme();

  return (
    <View style={styles.row}>
      {Icon ? <Icon size={18} color={c[iconColor]} /> : null}
      <AppText weight="bold" style={styles.title} accessibilityRole="header">
        {title}
      </AppText>
      {action ? (
        <Pressable onPress={action.onPress} hitSlop={10} accessibilityRole="button" style={styles.action}>
          <AppText weight="semibold" style={{ color: c.accentPurple, fontSize: 13 }}>
            {action.label}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    letterSpacing: -0.2,
  },
  action: {
    marginLeft: "auto",
  },
});
