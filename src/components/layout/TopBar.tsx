import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import Logo from "@/components/ui/Logo";
import { currentUser, utilityNav } from "@/lib/mock-data";
import { openPending } from "@/lib/pending";
import { makeStyles, useTheme } from "@/theme/theme";

/** Logo left; search and your avatar right. Rooms live in the tab bar. */
export default function TopBar() {
  const { c } = useTheme();
  const s = useStyles();
  const unread = utilityNav.find((item) => item.badge)?.badge ?? 0;

  return (
    <View style={s.bar}>
      <Logo />

      <View style={s.actions}>
        <Pressable
          onPress={() => openPending("search")}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel="Search Charcha"
          style={({ pressed }) => [s.iconButton, pressed && { backgroundColor: c.surface }]}
        >
          <Search size={20} color={c.muted} />
        </Pressable>

        <Pressable
          onPress={() => router.navigate("/you")}
          accessibilityRole="button"
          accessibilityLabel={`Your account${unread ? `, ${unread} unread notifications` : ""}`}
        >
          <Avatar name={currentUser.name} size="md" />
          {unread ? <View style={s.dot} /> : null}
        </Pressable>
      </View>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  bar: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: c.line,
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: -1,
    right: -1,
    width: 11,
    height: 11,
    borderRadius: 999,
    backgroundColor: c.mode,
    borderWidth: 2,
    borderColor: c.canvas,
  },
}));
