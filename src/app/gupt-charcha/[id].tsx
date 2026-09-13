import { useLocalSearchParams } from "expo-router";
import { Clock } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import AnonHandle from "@/components/gupt/AnonHandle";
import BeenThereButton from "@/components/gupt/BeenThereButton";
import HelplineBar from "@/components/gupt/HelplineBar";
import SupportNote from "@/components/gupt/SupportNote";
import DetailScreen, { Missing } from "@/components/layout/DetailScreen";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getGuptPost, guptCategories, type GuptPost, type Perspective } from "@/lib/gupt-data";
import { openPending } from "@/lib/pending";
import { makeStyles, useTheme } from "@/theme/theme";

export default function GuptThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const post = getGuptPost(id);

  if (!post) {
    return <Missing mode="gupt" title="This thread is gone" body="Threads here expire and are deleted. This one may have." />;
  }

  return (
    <DetailScreen mode="gupt" title="Thread" footer={<HelplineBar edgeToEdge />}>
      <Header post={post} />
      <Perspectives post={post} />
      <SupportNote />
    </DetailScreen>
  );
}

function Header({ post }: { post: GuptPost }) {
  const { c } = useTheme();
  const s = useStyles();
  const [beenThere, setBeenThere] = useState(false);
  const { label, icon: Icon } = guptCategories[post.category];

  return (
    <Card>
      <View style={s.head}>
        <AnonHandle handle={post.handle} size="md" />
        <View style={s.category}>
          <Icon size={12} color={c.gupt} />
          <AppText weight="semibold" style={s.categoryText}>
            {label}
          </AppText>
        </View>
      </View>
      <View style={s.expiry}>
        <Clock size={12} color={c.muted} />
        <AppText style={s.small}>{post.expiresIn}</AppText>
      </View>

      <AppText weight="bold" style={s.title} accessibilityRole="header">
        {post.title}
      </AppText>
      <AppText style={s.body}>{post.body}</AppText>

      <View style={s.divider}>
        <BeenThereButton count={post.beenThere} marked={beenThere} onToggle={() => setBeenThere((v) => !v)} />
      </View>
    </Card>
  );
}

/** Replies are experiences, not advice. The heading sets that norm before anyone starts typing. */
function Perspectives({ post }: { post: GuptPost }) {
  const s = useStyles();

  return (
    <View>
      <AppText weight="bold" style={s.heading} accessibilityRole="header">
        What happened to other people
      </AppText>
      <AppText style={[s.small, { marginTop: 4 }]}>
        Not advice. {post.perspectiveCount} people shared their own experience.
      </AppText>

      <View style={{ marginTop: 14, gap: 12 }}>
        {post.perspectives.map((perspective) => (
          <PerspectiveCard key={perspective.id} perspective={perspective} />
        ))}
      </View>

      <Button
        label="Share what happened to you"
        variant="soft"
        soft={{ bg: "softGupt", fg: "gupt" }}
        onPress={() => openPending("share-experience")}
        style={{ marginTop: 14 }}
      />
    </View>
  );
}

function PerspectiveCard({ perspective }: { perspective: Perspective }) {
  const s = useStyles();
  const [beenThere, setBeenThere] = useState(false);

  return (
    <Card>
      <AnonHandle handle={perspective.handle} />
      <AppText style={s.perspective}>{perspective.body}</AppText>
      <View style={{ marginTop: 12 }}>
        <BeenThereButton
          count={perspective.beenThere}
          marked={beenThere}
          onToggle={() => setBeenThere((v) => !v)}
          compact
        />
      </View>
    </Card>
  );
}

const useStyles = makeStyles((c) => ({
  head: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: c.softGupt,
  },
  categoryText: {
    fontSize: 11,
    color: c.gupt,
  },
  expiry: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  small: {
    fontSize: 12,
    color: c.muted,
  },
  title: {
    marginTop: 12,
    fontSize: 21,
    lineHeight: 27,
    letterSpacing: -0.3,
  },
  body: {
    marginTop: 10,
    lineHeight: 22,
  },
  divider: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: c.line,
  },
  heading: {
    fontSize: 16,
  },
  perspective: {
    marginTop: 12,
    lineHeight: 21,
  },
}));
