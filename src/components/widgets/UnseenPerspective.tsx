import { router } from "expo-router";
import { Eye } from "lucide-react-native";
import { Pressable, View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import AppText from "@/components/ui/AppText";
import WidgetCard from "@/components/widgets/WidgetCard";
import { unseenPerspective } from "@/lib/mock-data";
import { makeStyles, useTheme } from "@/theme/theme";

/**
 * Not "what's trending" — the view you are least likely to have already read.
 * `linkToThread` is off when it is already shown inside that thread.
 */
export default function UnseenPerspective({ linkToThread = true }: { linkToThread?: boolean }) {
  const { c } = useTheme();
  const s = useStyles();
  const { discussionId, topic, stance, share, body, author } = unseenPerspective;

  return (
    <WidgetCard title="A perspective you haven't seen" icon={Eye} iconColor={c.mode}>
      <AppText weight="medium" style={s.on}>
        On <AppText style={s.topic}>{topic}</AppText>
      </AppText>

      <View style={s.stance}>
        <AppText weight="semibold" style={s.stanceText}>
          {stance} · held by {share}%
        </AppText>
      </View>

      <View style={s.quote}>
        <AppText style={s.body}>{body}</AppText>
      </View>

      <View style={s.author}>
        <Avatar name={author} size="xs" />
        <AppText style={s.authorName}>{author}</AppText>
      </View>

      {linkToThread ? (
        <Pressable
          onPress={() => router.push(`/discussion/${discussionId}`)}
          hitSlop={10}
          accessibilityRole="link"
          style={s.link}
        >
          <AppText weight="semibold" style={s.linkText}>
            Read the full thread
          </AppText>
        </Pressable>
      ) : null}
    </WidgetCard>
  );
}

const useStyles = makeStyles((c) => ({
  on: {
    fontSize: 12,
    color: c.muted,
  },
  topic: {
    fontSize: 12,
  },
  stance: {
    marginTop: 8,
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: c.softMode,
  },
  stanceText: {
    fontSize: 12,
    color: c.mode,
  },
  quote: {
    marginTop: 12,
    borderLeftWidth: 2,
    borderLeftColor: c.lineStrong,
    paddingLeft: 12,
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
  },
  author: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  authorName: {
    fontSize: 12,
    color: c.muted,
  },
  link: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  linkText: {
    fontSize: 13,
    color: c.mode,
  },
}));
