import { router } from "expo-router";
import { ChevronRight, Flame, LogOut, Monitor, Moon, Settings, Sun, UserRound, type LucideIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";

import RoomScreen from "@/components/layout/RoomScreen";
import Avatar from "@/components/ui/Avatar";
import AppText from "@/components/ui/AppText";
import Card from "@/components/ui/Card";
import { tick } from "@/lib/haptics";
import { currentUser, getDiscussion, streakDays, utilityNav } from "@/lib/mock-data";
import { openPending, type Pending } from "@/lib/pending";
import { getVivaad } from "@/lib/vivaad-data";
import { usePreferences, type SavedRef, type ThemePreference } from "@/state/preferences";
import { makeStyles, useTheme } from "@/theme/theme";

/** The web's account popover and right-column activity nav, as one native tab. */
export default function YouScreen() {
  return (
    <RoomScreen mode="charcha">
      <Profile />
      <Appearance />
      <Saved />
      <Following />
      <Links title="Activity" items={utilityNav.map(({ label, icon, badge, pending }) => ({ label, icon, badge, pending }))} />
      <Links
        title="Account"
        items={[
          { label: "View profile", icon: UserRound, pending: "profile" },
          { label: "Settings", icon: Settings, pending: "settings" },
          { label: "Log out", icon: LogOut, pending: "logout" },
        ]}
      />
      <PrivacyFootnote />
    </RoomScreen>
  );
}

function Profile() {
  const { c } = useTheme();
  const s = useStyles();

  return (
    <View style={s.profile}>
      <Avatar name={currentUser.name} size="xl" />
      <View style={{ flex: 1 }}>
        <AppText weight="bold" style={s.name} accessibilityRole="header">
          {currentUser.name}
        </AppText>
        <AppText style={s.muted}>{currentUser.handle}</AppText>
        <View style={s.streak}>
          <Flame size={12} color={c.accentOrange} />
          <AppText weight="semibold" style={s.streakText}>
            {streakDays}-day streak
          </AppText>
        </View>
      </View>
    </View>
  );
}

const themeOptions: { value: ThemePreference; label: string; icon: LucideIcon }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

function Appearance() {
  const { c } = useTheme();
  const s = useStyles();
  const { theme, setTheme } = usePreferences();

  return (
    <Section title="Appearance">
      <View style={s.segmented} accessibilityRole="radiogroup">
        {themeOptions.map(({ value, label, icon: Icon }) => {
          const selected = theme === value;
          return (
            <Pressable
              key={value}
              onPress={() => {
                tick();
                setTheme(value);
              }}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              style={[s.segment, selected && s.segmentOn]}
            >
              <Icon size={15} color={selected ? c.ink : c.muted} />
              <AppText weight={selected ? "semibold" : "medium"} style={{ color: selected ? c.ink : c.muted }}>
                {label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </Section>
  );
}

function resolveSaved(ref: SavedRef) {
  const [kind, id] = ref.split(":") as [string, string];
  if (kind === "discussion") {
    const d = getDiscussion(id);
    return d ? { title: d.title, room: "Charcha", href: `/discussion/${id}` as const } : null;
  }
  const v = getVivaad(id);
  return v ? { title: v.motion, room: "Vaad-Vivaad", href: `/vaad-vivaad/${id}` as const } : null;
}

function Saved() {
  const { c } = useTheme();
  const s = useStyles();
  const { saved } = usePreferences();
  const items = saved.map(resolveSaved).filter((item) => item !== null);

  return (
    <Section title="Saved">
      {items.length === 0 ? (
        <AppText style={s.empty}>Tap the bookmark on any discussion or debate to keep it here.</AppText>
      ) : (
        items.map((item) => (
          <Pressable
            key={item.href}
            onPress={() => router.push(item.href)}
            accessibilityRole="link"
            style={({ pressed }) => [s.row, pressed && { backgroundColor: c.canvas }]}
          >
            <View style={{ flex: 1 }}>
              <AppText weight="medium" numberOfLines={2}>
                {item.title}
              </AppText>
              <AppText style={s.rowMeta}>{item.room}</AppText>
            </View>
            <ChevronRight size={16} color={c.muted} />
          </Pressable>
        ))
      )}
    </Section>
  );
}

function Following() {
  const s = useStyles();
  const { following, toggleFollowing } = usePreferences();

  return (
    <Section title="Following">
      {following.length === 0 ? (
        <AppText style={s.empty}>Follow topics from Popular Topics in Charcha or Vaad-Vivaad.</AppText>
      ) : (
        <View style={s.chips}>
          {following.map((topic) => (
            <Pressable
              key={topic}
              onPress={() => toggleFollowing(topic)}
              accessibilityRole="button"
              accessibilityLabel={`Unfollow ${topic}`}
              style={s.chip}
            >
              <AppText weight="semibold" style={s.chipText}>
                {topic} ×
              </AppText>
            </Pressable>
          ))}
        </View>
      )}
    </Section>
  );
}

type LinkItem = { label: string; icon: LucideIcon; pending: Pending; badge?: number };

function Links({ title, items }: { title: string; items: LinkItem[] }) {
  const { c } = useTheme();
  const s = useStyles();

  return (
    <Section title={title}>
      {items.map(({ label, icon: Icon, pending, badge }) => (
        <Pressable
          key={label}
          onPress={() => openPending(pending)}
          accessibilityRole="button"
          accessibilityLabel={badge ? `${label}, ${badge} unread` : label}
          style={({ pressed }) => [s.row, pressed && { backgroundColor: c.canvas }]}
        >
          <Icon size={18} color={c.muted} />
          <AppText weight="medium" style={{ flex: 1 }}>
            {label}
          </AppText>
          {badge ? (
            <View style={s.badge}>
              <AppText weight="semibold" style={s.badgeText}>
                {badge}
              </AppText>
            </View>
          ) : null}
          <ChevronRight size={16} color={c.muted} />
        </Pressable>
      ))}
    </Section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const s = useStyles();
  return (
    <View>
      <AppText weight="semibold" style={s.sectionTitle} accessibilityRole="header">
        {title.toUpperCase()}
      </AppText>
      <Card style={s.sectionCard}>{children}</Card>
    </View>
  );
}

function PrivacyFootnote() {
  const s = useStyles();
  return (
    <AppText style={s.footnote}>
      Nothing from Gupt-Charcha is saved on this device or shown here. Saved items and followed topics stay on
      this phone until accounts exist.
    </AppText>
  );
}

const useStyles = makeStyles((c) => ({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  name: {
    fontSize: 22,
    letterSpacing: -0.3,
  },
  muted: {
    color: c.muted,
  },
  streak: {
    marginTop: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: c.softOrange,
  },
  streakText: {
    fontSize: 11,
    color: c.accentOrange,
  },
  sectionTitle: {
    fontSize: 11,
    letterSpacing: 0.8,
    color: c.muted,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    padding: 6,
  },
  segmented: {
    flexDirection: "row",
    gap: 4,
    padding: 2,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 40,
    borderRadius: 10,
  },
  segmentOn: {
    backgroundColor: c.canvas,
    borderWidth: 1,
    borderColor: c.lineStrong,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 48,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  rowMeta: {
    marginTop: 2,
    fontSize: 12,
    color: c.muted,
  },
  empty: {
    padding: 10,
    color: c.muted,
    lineHeight: 20,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 6,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: c.softMode,
  },
  chipText: {
    fontSize: 13,
    color: c.mode,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 999,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.mode,
  },
  badgeText: {
    fontSize: 11,
    color: c.onMode,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
    color: c.muted,
    textAlign: "center",
    paddingHorizontal: 8,
  },
}));
