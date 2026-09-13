import { router } from "expo-router";
import { Clock, MessagesSquare } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

import AnonHandle from "@/components/gupt/AnonHandle";
import BeenThereButton from "@/components/gupt/BeenThereButton";
import AppText from "@/components/ui/AppText";
import Card from "@/components/ui/Card";
import { guptCategories, type GuptPost } from "@/lib/gupt-data";
import { makeStyles, useTheme } from "@/theme/theme";

export default function GuptCard({ post }: { post: GuptPost }) {
  const { c } = useTheme();
  const s = useStyles();
  const [beenThere, setBeenThere] = useState(false);
  const { id, handle, category, title, body, perspectiveCount, postedAgo, expiresIn } = post;
  const { label, icon: Icon } = guptCategories[category];

  return (
    <Card
      onPress={() => router.push(`/gupt-charcha/${id}`)}
      accessibilityLabel={`${label}. ${title}. ${expiresIn}.`}
      accessibilityActions={[{ name: "beenThere", label: beenThere ? "Undo I have been here" : "I have been here" }]}
      onAccessibilityAction={() => setBeenThere((value) => !value)}
    >
      <View style={s.head}>
        <AnonHandle handle={handle} />
        <View style={s.category}>
          <Icon size={12} color={c.gupt} />
          <AppText weight="semibold" style={s.categoryText}>
            {label}
          </AppText>
        </View>
      </View>

      <AppText weight="semibold" style={s.title}>
        {title}
      </AppText>
      <AppText style={s.body}>{body}</AppText>

      <View style={s.expiry}>
        <Clock size={12} color={c.muted} />
        <AppText style={s.small}>
          {expiresIn} · posted {postedAgo}
        </AppText>
      </View>

      <View style={s.footer}>
        <BeenThereButton
          count={post.beenThere}
          marked={beenThere}
          onToggle={() => setBeenThere((value) => !value)}
          compact
        />
        <View style={s.perspectives}>
          <MessagesSquare size={14} color={c.muted} />
          <AppText style={s.small}>{perspectiveCount} shared what happened to them</AppText>
        </View>
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
  title: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  body: {
    marginTop: 6,
    color: c.muted,
    lineHeight: 20,
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
    flexShrink: 1,
  },
  footer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: c.line,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10,
  },
  perspectives: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexShrink: 1,
  },
}));
