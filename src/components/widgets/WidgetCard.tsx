import type { LucideIcon } from "lucide-react-native";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import Card from "@/components/ui/Card";
import { useTheme } from "@/theme/theme";

type WidgetCardProps = {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  action?: { label: string; onPress: () => void };
  children: ReactNode;
};

/** Shared shell for discovery widgets, which sit inline in the feed on mobile. */
export default function WidgetCard({ title, icon: Icon, iconColor, action, children }: WidgetCardProps) {
  const { c } = useTheme();

  return (
    <Card>
      <View style={styles.head}>
        <Icon size={16} color={iconColor ?? c.accentPurple} />
        <AppText weight="bold" style={styles.title} accessibilityRole="header">
          {title}
        </AppText>
        {action ? (
          <Pressable onPress={action.onPress} hitSlop={10} accessibilityRole="button" style={styles.action}>
            <AppText weight="semibold" style={{ fontSize: 12, color: c.accentPurple }}>
              {action.label}
            </AppText>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.body}>{children}</View>
    </Card>
  );
}

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 14,
    letterSpacing: -0.1,
  },
  action: {
    marginLeft: "auto",
  },
  body: {
    marginTop: 12,
  },
});
