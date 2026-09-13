import { useLocalSearchParams } from "expo-router";
import { Clock, Users } from "lucide-react-native";
import { View } from "react-native";

import DetailScreen, { Missing } from "@/components/layout/DetailScreen";
import AppText from "@/components/ui/AppText";
import BookmarkButton from "@/components/ui/BookmarkButton";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ArgumentCard from "@/components/vivaad/ArgumentCard";
import SplitBar from "@/components/vivaad/SplitBar";
import StageIndicator from "@/components/vivaad/StageIndicator";
import { formatCount } from "@/lib/format";
import { openPending } from "@/lib/pending";
import { getVivaad, shift, type Vivaad } from "@/lib/vivaad-data";
import { makeStyles, useTheme } from "@/theme/theme";
import { brand } from "@/theme/tokens";

export default function DebateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const vivaad = getVivaad(id);

  if (!vivaad) {
    return <Missing mode="vivaad" title="Debate not found" body="It may have closed, or the link is wrong." />;
  }

  return (
    <DetailScreen mode="vivaad" title="Debate">
      <Header vivaad={vivaad} />
      <Exchange vivaad={vivaad} />
    </DetailScreen>
  );
}

function Header({ vivaad }: { vivaad: Vivaad }) {
  const { c } = useTheme();
  const s = useStyles();

  return (
    <Card>
      <View style={s.kicker}>
        <AppText weight="semibold" style={[s.small, { color: c.accentPurple }]}>
          Debate · Round {vivaad.round} of {vivaad.totalRounds}
        </AppText>
        <BookmarkButton saveRef={`vivaad:${vivaad.id}`} title={vivaad.motion} />
      </View>
      <StageIndicator stage={vivaad.stage} />

      <AppText weight="bold" style={s.motion} accessibilityRole="header">
        {vivaad.motion}
      </AppText>
      <AppText style={s.context}>{vivaad.context}</AppText>

      <View style={{ marginTop: 18 }}>
        <SplitBar paksh={vivaad.currentSplit} shift={shift(vivaad)} size="lg" />
      </View>

      <View style={s.meta}>
        <View style={s.metaItem}>
          <Users size={14} color={c.muted} />
          <AppText style={s.small}>
            <AppText weight="semibold" style={[s.small, { color: c.ink }]}>
              {formatCount(vivaad.participants)}
            </AppText>{" "}
            taking part
          </AppText>
        </View>
        <View style={s.metaItem}>
          <Clock size={14} color={c.muted} />
          <AppText style={s.small}>{vivaad.closesIn}</AppText>
        </View>
      </View>

      <View style={s.argue}>
        <Button
          label="Argue for"
          variant="soft"
          soft={{ bg: "softPink", fg: "accentPink" }}
          onPress={() => openPending("argue-paksh")}
          style={{ flex: 1 }}
        />
        <Button
          label="Argue against"
          variant="soft"
          soft={{ bg: "softMint", fg: "accentMint" }}
          onPress={() => openPending("argue-vipaksh")}
          style={{ flex: 1 }}
        />
      </View>
    </Card>
  );
}

/** In posting order, so each rebuttal appears after the argument it answers. */
function Exchange({ vivaad }: { vivaad: Vivaad }) {
  const s = useStyles();
  const byId = new Map(vivaad.args.map((a) => [a.id, a]));

  return (
    <View>
      <AppText weight="bold" style={s.heading} accessibilityRole="header">
        The exchange
      </AppText>
      <View style={s.legend}>
        <Legend color={brand.pink} label="For, on the left" />
        <Legend color={brand.mint} label="Against, on the right" />
      </View>

      <View style={{ gap: 12 }}>
        {vivaad.args.map((argument) => (
          <ArgumentCard
            key={argument.id}
            argument={argument}
            rebutted={argument.rebuts ? byId.get(argument.rebuts) : undefined}
          />
        ))}
      </View>

      <AppText style={s.more}>
        Showing {vivaad.args.length} of {vivaad.argumentCount} arguments
      </AppText>
    </View>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  const s = useStyles();
  return (
    <View style={s.legendItem}>
      <View style={[s.swatch, { backgroundColor: color }]} />
      <AppText weight="medium" style={s.small}>
        {label}
      </AppText>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  kicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -6,
    marginBottom: 6,
  },
  small: {
    fontSize: 12,
    color: c.muted,
  },
  motion: {
    marginTop: 14,
    fontSize: 21,
    lineHeight: 27,
    letterSpacing: -0.3,
  },
  context: {
    marginTop: 8,
    color: c.muted,
    lineHeight: 21,
  },
  meta: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.line,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  argue: {
    marginTop: 14,
    flexDirection: "row",
    gap: 8,
  },
  heading: {
    fontSize: 16,
  },
  legend: {
    marginTop: 6,
    marginBottom: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  swatch: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  more: {
    marginTop: 14,
    textAlign: "center",
    fontSize: 12,
    color: c.muted,
  },
}));
