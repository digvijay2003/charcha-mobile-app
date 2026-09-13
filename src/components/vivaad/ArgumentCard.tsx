import { CornerDownRight, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import AppText from "@/components/ui/AppText";
import { tick } from "@/lib/haptics";
import { sideLabels, type Argument } from "@/lib/vivaad-data";
import { makeStyles, useTheme } from "@/theme/theme";
import { brand } from "@/theme/tokens";

/**
 * One turn in the exchange. For sits left and Against sits right, offset by
 * the same amount, so a single phone-width column still reads as two sides on
 * equal footing rather than one feed.
 */
export default function ArgumentCard({
  argument,
  rebutted,
}: {
  argument: Argument;
  /** The opposing argument this one answers, if any. */
  rebutted?: Argument;
}) {
  const { c } = useTheme();
  const s = useStyles();
  const { side, author, body, moved } = argument;
  const [movedMe, setMovedMe] = useState(false);
  const isFor = side === "paksh";
  const sideColor = isFor ? c.accentPink : c.accentMint;

  return (
    <View style={[s.card, isFor ? s.forCard : s.againstCard]}>
      <View style={s.head}>
        <Avatar name={author} size="sm" />
        <View style={s.who}>
          <AppText weight="semibold" numberOfLines={1}>
            {author}
          </AppText>
          <AppText weight="semibold" style={[s.side, { color: sideColor }]}>
            {sideLabels[side]}
          </AppText>
        </View>
      </View>

      {/* Rebuttal linkage is what turns parallel monologues into a debate. */}
      {rebutted ? (
        <View style={s.rebuttal} accessible accessibilityLabel={`Replying to ${rebutted.author}: ${rebutted.body}`}>
          <View style={s.rebuttalHead}>
            <CornerDownRight size={12} color={c.muted} />
            <AppText weight="semibold" style={s.rebuttalLabel}>
              Replying to {rebutted.author}
            </AppText>
          </View>
          <AppText style={s.rebuttalBody} numberOfLines={2}>
            {rebutted.body}
          </AppText>
        </View>
      ) : null}

      <AppText style={s.body}>{body}</AppText>

      <View style={s.footer}>
        <AppText weight="medium" style={s.count}>
          {moved + (movedMe ? 1 : 0)} said this moved them
        </AppText>
        <Pressable
          onPress={() => {
            tick();
            setMovedMe((value) => !value);
          }}
          accessibilityRole="togglebutton"
          accessibilityState={{ checked: movedMe }}
          accessibilityLabel="This moved me"
          style={({ pressed }) => [
            s.moved,
            movedMe && { backgroundColor: c.softPurple, borderColor: c.softPurple },
            pressed && { opacity: 0.8 },
          ]}
        >
          <Sparkles size={13} color={movedMe ? c.accentPurple : c.muted} />
          <AppText weight="semibold" style={[s.movedText, { color: movedMe ? c.accentPurple : c.muted }]}>
            {movedMe ? "Moved you" : "This moved me"}
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  card: {
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.line,
    borderRadius: 16,
    padding: 14,
    boxShadow: c.shadowCard,
  },
  forCard: {
    marginRight: 20,
    borderLeftWidth: 4,
    borderLeftColor: brand.pink,
  },
  againstCard: {
    marginLeft: 20,
    borderRightWidth: 4,
    borderRightColor: brand.mint,
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  who: {
    flex: 1,
    minWidth: 0,
  },
  side: {
    fontSize: 11,
  },
  rebuttal: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.canvas,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  rebuttalHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rebuttalLabel: {
    fontSize: 11,
    color: c.muted,
  },
  rebuttalBody: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
    color: c.muted,
  },
  body: {
    marginTop: 12,
    lineHeight: 21,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  count: {
    fontSize: 11,
    color: c.muted,
  },
  moved: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    minHeight: 34,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: c.line,
  },
  movedText: {
    fontSize: 12,
  },
}));
