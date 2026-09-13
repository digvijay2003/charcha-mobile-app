import { Plus } from "lucide-react-native";
import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { modes } from "@/lib/modes";
import { openPending } from "@/lib/pending";
import { makeStyles, useTheme } from "@/theme/theme";

/** Names the room and states its one rule. Not a landing page. */
export default function RoomHeader({ stat }: { stat?: string }) {
  const { mode } = useTheme();
  const s = useStyles();
  const { latin, tagline, contract, ctaLabel } = modes[mode];

  return (
    <View style={s.header}>
      <AppText weight="bold" style={s.title} accessibilityRole="header">
        {latin}{" "}
        <AppText weight="semibold" style={s.tagline}>
          {tagline}
        </AppText>
      </AppText>
      <AppText style={s.contract}>{contract}</AppText>
      {stat ? (
        <AppText weight="medium" style={s.stat}>
          {stat}
        </AppText>
      ) : null}

      <Button
        label={ctaLabel}
        icon={Plus}
        onPress={() => openPending(`compose-${mode}`)}
        style={s.cta}
      />
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: c.line,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  tagline: {
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.4,
    color: c.mode,
  },
  contract: {
    marginTop: 8,
    color: c.muted,
    lineHeight: 21,
  },
  stat: {
    marginTop: 8,
    fontSize: 12,
    color: c.muted,
  },
  cta: {
    marginTop: 16,
    alignSelf: "flex-start",
  },
}));
