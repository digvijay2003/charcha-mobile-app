import { LifeBuoy } from "lucide-react-native";
import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import { makeStyles, useTheme } from "@/theme/theme";

/** The full note, at the end of a thread. The pinned HelplineBar is the short form. */
export default function SupportNote() {
  const { c } = useTheme();
  const s = useStyles();

  return (
    <View style={s.note}>
      <LifeBuoy size={16} color={c.gupt} style={s.icon} />
      <AppText style={s.text}>
        If you are going through a difficult time, talking to someone trained helps.{" "}
        <AppText weight="semibold" style={s.strong}>
          Tele-MANAS: 14416
        </AppText>{" "}
        is a free, 24×7 mental health helpline in India. Charcha is a community, not a substitute for
        professional support.
      </AppText>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  note: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  icon: {
    marginTop: 2,
  },
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: c.muted,
  },
  strong: {
    fontSize: 12,
  },
}));
