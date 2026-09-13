import type { BottomTabBarProps } from "expo-router/tabs";
import { EyeOff, MessagesSquare, Scale, UserRound, type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { tick } from "@/lib/haptics";
import { utilityNav } from "@/lib/mock-data";
import { modes, type Mode } from "@/lib/modes";
import { usePreferences } from "@/state/preferences";
import { paletteFor } from "@/theme/tokens";

type TabDef = { label: string; icon: LucideIcon; mode: Mode; badge?: number };

/** Route name → tab. The three rooms are primary; everything personal is "You". */
const tabs: Record<string, TabDef> = {
  index: { label: modes.charcha.latin, icon: MessagesSquare, mode: "charcha" },
  // Scales, not swords: the debate room is about weighing, not fighting (web ADR 0007).
  "vaad-vivaad": { label: modes.vivaad.latin, icon: Scale, mode: "vivaad" },
  "gupt-charcha": { label: modes.gupt.latin, icon: EyeOff, mode: "gupt" },
  you: {
    label: "You",
    icon: UserRound,
    mode: "charcha",
    badge: utilityNav.find((item) => item.badge)?.badge,
  },
};

/**
 * The bar takes the *active* room's palette, so stepping into Gupt-Charcha
 * dims the whole chrome, tab bar included, not just the page.
 */
export default function TabBar({ state, navigation, insets }: BottomTabBarProps) {
  const { scheme } = usePreferences();
  const active = tabs[state.routes[state.index].name] ?? tabs.index;
  const c = paletteFor(scheme, active.mode);

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.bar,
        { backgroundColor: c.canvas, borderTopColor: c.line, paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {state.routes.map((route, index) => {
        const tab = tabs[route.name];
        if (!tab) return null;

        const focused = state.index === index;
        const color = focused ? c.mode : c.muted;
        const Icon = tab.icon;

        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) {
            tick();
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={tab.badge ? `${tab.label}, ${tab.badge} unread` : tab.label}
            style={styles.item}
          >
            <View style={[styles.pill, focused && { backgroundColor: c.softMode }]}>
              <Icon size={20} color={color} strokeWidth={focused ? 2.25 : 2} />
              {tab.badge ? (
                <View style={[styles.badge, { backgroundColor: c.mode, borderColor: c.canvas }]}>
                  <AppText weight="bold" style={[styles.badgeText, { color: c.onMode }]}>
                    {tab.badge}
                  </AppText>
                </View>
              ) : null}
            </View>
            <AppText
              weight={focused ? "semibold" : "medium"}
              numberOfLines={1}
              maxFontSizeMultiplier={1.2}
              style={[styles.label, { color: focused ? c.ink : c.muted }]}
            >
              {tab.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    minHeight: 48,
  },
  pill: {
    width: 56,
    height: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: 8,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 9,
    lineHeight: 11,
  },
  label: {
    fontSize: 11,
  },
});
