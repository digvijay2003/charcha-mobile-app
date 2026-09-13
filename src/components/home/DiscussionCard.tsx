import { router } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import { View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import AppText from "@/components/ui/AppText";
import BookmarkButton from "@/components/ui/BookmarkButton";
import Card from "@/components/ui/Card";
import ProgressRing from "@/components/ui/ProgressRing";
import { accentStyles } from "@/lib/accents";
import type { Discussion } from "@/lib/mock-data";
import { usePreferences } from "@/state/preferences";
import { makeStyles, useTheme } from "@/theme/theme";

export default function DiscussionCard({ discussion }: { discussion: Discussion }) {
  const { c } = useTheme();
  const s = useStyles();
  const { toggleSaved, saved } = usePreferences();
  const { id, title, description, tags, participants, comments, agreePercentage, accent, icon: Icon, voices } =
    discussion;
  const accentStyle = accentStyles[accent];
  const saveRef = `discussion:${id}` as const;

  return (
    <Card
      onPress={() => router.push(`/discussion/${id}`)}
      accessibilityLabel={`${title}. ${agreePercentage}% agree. ${participants} people, ${comments} comments.`}
      accessibilityActions={[{ name: "save", label: saved.includes(saveRef) ? "Remove from saved" : "Save" }]}
      onAccessibilityAction={() => toggleSaved(saveRef)}
    >
      <View style={s.top}>
        <View style={[s.tile, { backgroundColor: c[accentStyle.soft] }]}>
          <Icon size={20} color={c[accentStyle.text]} />
        </View>

        <View style={s.body}>
          <AppText weight="semibold" style={s.title}>
            {title}
          </AppText>
          <AppText style={s.description}>{description}</AppText>

          <View style={s.tags}>
            {tags.map((tag, index) => (
              <View
                key={tag}
                style={[s.tag, index === 0 ? { backgroundColor: c[accentStyle.soft] } : s.tagQuiet]}
              >
                <AppText
                  weight="medium"
                  style={[s.tagText, { color: index === 0 ? c[accentStyle.text] : c.muted }]}
                >
                  {tag}
                </AppText>
              </View>
            ))}
          </View>
        </View>

        <ProgressRing value={agreePercentage} color={c[accentStyle.text]} />
      </View>

      <View style={s.footer}>
        <View style={s.voices}>
          {voices.map((name, index) => (
            <Avatar key={name} name={name} size="xs" ring overlap={index > 0} />
          ))}
        </View>
        <AppText style={s.meta} numberOfLines={1}>
          <AppText weight="semibold" style={s.metaStrong}>
            {participants}
          </AppText>{" "}
          people discussing
        </AppText>

        <View style={s.end}>
          <View style={s.comments}>
            <MessageCircle size={16} color={c.muted} />
            <AppText weight="medium" style={s.meta}>
              {comments}
            </AppText>
          </View>
          <BookmarkButton saveRef={saveRef} title={title} />
        </View>
      </View>
    </Card>
  );
}

const useStyles = makeStyles((c) => ({
  top: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  tile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
  },
  description: {
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
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagQuiet: {
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.canvas,
  },
  tagText: {
    fontSize: 12,
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
  meta: {
    fontSize: 12,
    color: c.muted,
    flexShrink: 1,
  },
  metaStrong: {
    fontSize: 12,
  },
  end: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 4,
  },
}));
