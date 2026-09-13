import { router } from "expo-router";
import { Clock, MessagesSquare, Users } from "lucide-react-native";
import { View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import AppText from "@/components/ui/AppText";
import BookmarkButton from "@/components/ui/BookmarkButton";
import Card from "@/components/ui/Card";
import SplitBar from "@/components/vivaad/SplitBar";
import { formatCount } from "@/lib/format";
import { shift, stageLabels, type Vivaad } from "@/lib/vivaad-data";
import { usePreferences } from "@/state/preferences";
import { makeStyles, useTheme } from "@/theme/theme";

/**
 * Deliberately symmetric, where DiscussionCard is asymmetric: the layout
 * itself should say "two sides, equal footing".
 */
export default function VivaadCard({ vivaad }: { vivaad: Vivaad }) {
  const { c } = useTheme();
  const s = useStyles();
  const { saved, toggleSaved } = usePreferences();
  const { id, motion, context, tags, stage, round, totalRounds, closesIn, currentSplit, participants, argumentCount, voices } =
    vivaad;
  const saveRef = `vivaad:${id}` as const;

  return (
    <Card
      onPress={() => router.push(`/vaad-vivaad/${id}`)}
      accessibilityLabel={`Debate: ${motion}. Round ${round} of ${totalRounds}, ${stageLabels[stage]}. ${closesIn}.`}
      accessibilityActions={[{ name: "save", label: saved.includes(saveRef) ? "Remove from saved" : "Save" }]}
      onAccessibilityAction={() => toggleSaved(saveRef)}
    >
      <View style={s.kicker}>
        <AppText weight="semibold" style={[s.kickerText, { color: c.accentPurple }]}>
          Debate
        </AppText>
        <AppText style={s.kickerText}>·</AppText>
        <AppText weight="semibold" style={s.kickerText}>
          Round {round} of {totalRounds}
        </AppText>
        <AppText style={s.kickerText}>·</AppText>
        <AppText weight="semibold" style={[s.kickerText, { color: c.accentPurple }]}>
          {stageLabels[stage]}
        </AppText>
        <View style={s.closes}>
          <Clock size={13} color={c.muted} />
          <AppText weight="semibold" style={s.kickerText}>
            {closesIn}
          </AppText>
        </View>
      </View>

      <AppText weight="semibold" style={s.motion}>
        {motion}
      </AppText>
      <AppText style={s.context}>{context}</AppText>

      <View style={s.tags}>
        {tags.map((tag) => (
          <View key={tag} style={s.tag}>
            <AppText weight="medium" style={s.tagText}>
              {tag}
            </AppText>
          </View>
        ))}
      </View>

      <View style={s.split}>
        <SplitBar paksh={currentSplit} shift={shift(vivaad)} />
      </View>

      <View style={s.footer}>
        <View style={s.voices}>
          {voices.map((name, index) => (
            <Avatar key={name} name={name} size="xs" ring overlap={index > 0} />
          ))}
        </View>
        <View style={s.stat}>
          <Users size={14} color={c.muted} />
          <AppText style={s.meta}>
            <AppText weight="semibold" style={s.metaStrong}>
              {formatCount(participants)}
            </AppText>{" "}
            taking part
          </AppText>
        </View>
        <View style={s.stat}>
          <MessagesSquare size={14} color={c.muted} />
          <AppText style={s.meta}>{argumentCount}</AppText>
        </View>
        <View style={s.end}>
          <BookmarkButton saveRef={saveRef} title={motion} />
        </View>
      </View>
    </Card>
  );
}

const useStyles = makeStyles((c) => ({
  kicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: 6,
    rowGap: 4,
  },
  kickerText: {
    fontSize: 11,
    color: c.muted,
  },
  closes: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  motion: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  context: {
    marginTop: 6,
    color: c.muted,
    lineHeight: 20,
  },
  tags: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.canvas,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
    color: c.muted,
  },
  split: {
    marginTop: 16,
  },
  footer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.line,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  voices: {
    flexDirection: "row",
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  meta: {
    fontSize: 12,
    color: c.muted,
  },
  metaStrong: {
    fontSize: 12,
  },
  end: {
    marginLeft: "auto",
  },
}));
