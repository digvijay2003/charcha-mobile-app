import { router } from "expo-router";
import { Timer } from "lucide-react-native";
import { Pressable, View } from "react-native";

import AppText from "@/components/ui/AppText";
import WidgetCard from "@/components/widgets/WidgetCard";
import { vivaads } from "@/lib/vivaad-data";
import { makeStyles, useTheme } from "@/theme/theme";
import { brand } from "@/theme/tokens";

/** Time pressure is the point of a debate; surface it instead of vanity counts. */
export default function ClosingSoon() {
  const { c } = useTheme();
  const s = useStyles();
  const soon = vivaads.filter((v) => v.stage !== "verdict").slice(0, 3);

  return (
    <WidgetCard title="Closing soon" icon={Timer} iconColor={c.mode}>
      <View style={s.list}>
        {soon.map((v) => (
          <Pressable
            key={v.id}
            onPress={() => router.push(`/vaad-vivaad/${v.id}`)}
            accessibilityRole="link"
            accessibilityLabel={`${v.motion}. ${v.closesIn}, ${v.argumentCount} arguments.`}
            style={({ pressed }) => pressed && { opacity: 0.7 }}
          >
            <AppText weight="medium" style={s.motion}>
              {v.motion}
            </AppText>
            <View style={s.bar}>
              <View style={[s.for, { width: `${v.currentSplit}%` }]} />
              <View style={s.against} />
            </View>
            <AppText weight="medium" style={s.meta}>
              {v.closesIn} · {v.argumentCount} arguments
            </AppText>
          </Pressable>
        ))}
      </View>
    </WidgetCard>
  );
}

const useStyles = makeStyles((c) => ({
  list: {
    gap: 14,
  },
  motion: {
    fontSize: 14,
    lineHeight: 19,
  },
  bar: {
    marginTop: 6,
    height: 6,
    flexDirection: "row",
    gap: 2,
  },
  for: {
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
    backgroundColor: brand.pink,
  },
  against: {
    flex: 1,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    backgroundColor: brand.mint,
  },
  meta: {
    marginTop: 6,
    fontSize: 11,
    color: c.muted,
  },
}));
