import { useLocalSearchParams } from "expo-router";
import { MessageCircle, Users } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

import DetailScreen, { Missing } from "@/components/layout/DetailScreen";
import AppText from "@/components/ui/AppText";
import BookmarkButton from "@/components/ui/BookmarkButton";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressRing from "@/components/ui/ProgressRing";
import UnseenPerspective from "@/components/widgets/UnseenPerspective";
import { accentStyles } from "@/lib/accents";
import { tick } from "@/lib/haptics";
import { getDiscussion, unseenPerspective, type Discussion } from "@/lib/mock-data";
import { openPending } from "@/lib/pending";
import { makeStyles, useTheme } from "@/theme/theme";

const stances = ["Agree", "Disagree", "Unsure"] as const;
type Stance = (typeof stances)[number];

export default function DiscussionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const discussion = getDiscussion(id);

  if (!discussion) {
    return <Missing mode="charcha" title="Discussion not found" body="It may have been removed, or the link is wrong." />;
  }

  return (
    <DetailScreen mode="charcha" title="Discussion">
      <Header discussion={discussion} />
      <StancePicker discussion={discussion} />
    </DetailScreen>
  );
}

function Header({ discussion }: { discussion: Discussion }) {
  const { c } = useTheme();
  const s = useStyles();
  const { id, title, description, tags, participants, comments, agreePercentage, accent, icon: Icon } = discussion;
  const accentStyle = accentStyles[accent];

  return (
    <Card>
      <View style={s.kicker}>
        <View style={[s.tile, { backgroundColor: c[accentStyle.soft] }]}>
          <Icon size={18} color={c[accentStyle.text]} />
        </View>
        <AppText weight="semibold" style={[s.tags, { color: c[accentStyle.text] }]}>
          {tags.join(" · ")}
        </AppText>
        <View style={{ marginLeft: "auto" }}>
          <BookmarkButton saveRef={`discussion:${id}`} title={title} />
        </View>
      </View>

      <AppText weight="bold" style={s.title} accessibilityRole="header">
        {title}
      </AppText>
      <AppText style={s.description}>{description}</AppText>

      <View style={s.reading}>
        <ProgressRing value={agreePercentage} color={c[accentStyle.text]} size={64} />
        <View style={{ flex: 1, gap: 6 }}>
          <AppText weight="semibold">How the room reads</AppText>
          <AppText style={s.muted}>
            {agreePercentage}% of the people discussing this agree so far.
          </AppText>
        </View>
      </View>

      <View style={s.meta}>
        <View style={s.metaItem}>
          <Users size={14} color={c.muted} />
          <AppText style={s.small}>
            <AppText weight="semibold" style={s.smallStrong}>
              {participants}
            </AppText>{" "}
            people
          </AppText>
        </View>
        <View style={s.metaItem}>
          <MessageCircle size={14} color={c.muted} />
          <AppText style={s.small}>{comments} comments</AppText>
        </View>
      </View>
    </Card>
  );
}

/**
 * Choosing a stance is what unlocks the counter-view: you see the perspective
 * you are least likely to hold, at the moment you have just committed to one.
 */
function StancePicker({ discussion }: { discussion: Discussion }) {
  const { c } = useTheme();
  const s = useStyles();
  const [stance, setStance] = useState<Stance | null>(null);
  const counterView = unseenPerspective.discussionId === discussion.id ? unseenPerspective : null;

  return (
    <>
      <Card>
        <AppText weight="bold" style={s.pickerTitle} accessibilityRole="header">
          Where do you stand?
        </AppText>
        <AppText style={[s.muted, { marginTop: 4 }]}>
          There is no wrong answer, and you can change your mind.
        </AppText>

        <View style={s.stances} accessibilityRole="radiogroup">
          {stances.map((option) => {
            const selected = stance === option;
            return (
              <Pressable
                key={option}
                onPress={() => {
                  tick();
                  setStance(selected ? null : option);
                }}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                style={[s.stance, selected && { backgroundColor: c.softMode, borderColor: c.mode }]}
              >
                <AppText weight="semibold" style={{ color: selected ? c.mode : c.muted }}>
                  {option}
                </AppText>
              </Pressable>
            );
          })}
        </View>

        {stance ? (
          <Button
            label={`Share why you ${stance === "Unsure" ? "are unsure" : stance.toLowerCase()}`}
            onPress={() => openPending("share-perspective")}
            style={{ marginTop: 16 }}
          />
        ) : null}
      </Card>

      {stance && counterView ? (
        stance === counterView.stance ? (
          <AppText style={[s.muted, s.note]}>
            You hold the less common view here — {counterView.share}% of the room shares it.
          </AppText>
        ) : (
          <View style={{ gap: 8 }}>
            <AppText style={[s.muted, s.note]}>Before you share, a view from outside your own.</AppText>
            <UnseenPerspective linkToThread={false} />
          </View>
        )
      ) : null}
    </>
  );
}

const useStyles = makeStyles((c) => ({
  kicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tile: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tags: {
    fontSize: 12,
  },
  title: {
    marginTop: 14,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.3,
  },
  description: {
    marginTop: 8,
    color: c.muted,
    lineHeight: 21,
  },
  reading: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: c.canvas,
  },
  muted: {
    color: c.muted,
    lineHeight: 20,
  },
  meta: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.line,
    flexDirection: "row",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  small: {
    fontSize: 12,
    color: c.muted,
  },
  smallStrong: {
    fontSize: 12,
  },
  pickerTitle: {
    fontSize: 16,
  },
  stances: {
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
  },
  stance: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: c.line,
  },
  note: {
    fontSize: 13,
    textAlign: "center",
  },
}));
