import { Check, Plus, Tag } from "lucide-react-native";
import { Pressable, View } from "react-native";

import AppText from "@/components/ui/AppText";
import WidgetCard from "@/components/widgets/WidgetCard";
import { accentStyles } from "@/lib/accents";
import { tick } from "@/lib/haptics";
import { topics } from "@/lib/mock-data";
import { usePreferences } from "@/state/preferences";
import { makeStyles, useTheme } from "@/theme/theme";

/** Following is stored on this device and listed in the You tab. */
export default function PopularTopics() {
  const { c } = useTheme();
  const s = useStyles();
  const { following, toggleFollowing } = usePreferences();

  return (
    <WidgetCard title="Popular Topics" icon={Tag}>
      <View style={s.list}>
        {topics.map(({ name, count, icon: Icon, accent }) => {
          const accentStyle = accentStyles[accent];
          const isFollowing = following.includes(name);

          return (
            <View key={name} style={s.row}>
              <View style={[s.tile, { backgroundColor: c[accentStyle.soft] }]}>
                <Icon size={14} color={c[accentStyle.text]} />
              </View>
              <View style={s.text}>
                <AppText weight="medium" style={s.name} numberOfLines={1}>
                  {name}
                </AppText>
                <AppText style={s.count}>{count} discussions</AppText>
              </View>

              <Pressable
                onPress={() => {
                  tick();
                  toggleFollowing(name);
                }}
                accessibilityRole="togglebutton"
                accessibilityState={{ checked: isFollowing }}
                accessibilityLabel={`Follow ${name}`}
                style={({ pressed }) => [
                  s.follow,
                  isFollowing ? { backgroundColor: c.softMode, borderColor: c.softMode } : null,
                  pressed && { opacity: 0.8 },
                ]}
              >
                {isFollowing ? <Check size={13} color={c.mode} /> : <Plus size={13} color={c.muted} />}
                <AppText weight="semibold" style={[s.followText, { color: isFollowing ? c.mode : c.muted }]}>
                  {isFollowing ? "Following" : "Follow"}
                </AppText>
              </Pressable>
            </View>
          );
        })}
      </View>
    </WidgetCard>
  );
}

const useStyles = makeStyles((c) => ({
  list: {
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 6,
  },
  tile: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 14,
  },
  count: {
    fontSize: 11,
    color: c.muted,
  },
  follow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: c.line,
  },
  followText: {
    fontSize: 12,
  },
}));
