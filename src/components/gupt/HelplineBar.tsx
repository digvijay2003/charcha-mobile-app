import { LifeBuoy, Phone } from "lucide-react-native";
import { Linking, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/ui/AppText";
import { makeStyles, useTheme } from "@/theme/theme";

const HELPLINE = "14416";

/**
 * Pinned to every Gupt-Charcha screen. Always present rather than triggered by
 * scanning what people write, which would both miss cases and feel like
 * surveillance when it fires.
 */
export default function HelplineBar({ edgeToEdge = false }: { edgeToEdge?: boolean }) {
  const { c } = useTheme();
  const s = useStyles();
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.bar, { paddingBottom: edgeToEdge ? Math.max(insets.bottom, 10) : 10 }]}>
      <View style={s.inner}>
        <LifeBuoy size={18} color={c.gupt} />
        <View style={s.text}>
          <AppText weight="semibold" style={s.title}>
            Tele-MANAS {HELPLINE}
          </AppText>
          <AppText style={s.subtitle} numberOfLines={1}>
            Free, 24×7 mental health helpline
          </AppText>
        </View>
        <Pressable
          onPress={() => Linking.openURL(`tel:${HELPLINE}`).catch(() => {})}
          accessibilityRole="button"
          accessibilityLabel={`Call Tele-MANAS, ${HELPLINE.split("").join(" ")}`}
          style={({ pressed }) => [s.call, pressed && { opacity: 0.85 }]}
        >
          <Phone size={14} color={c.onMode} />
          <AppText weight="semibold" style={s.callText}>
            Call
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  bar: {
    borderTopWidth: 1,
    borderTopColor: c.line,
    backgroundColor: c.surface,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  inner: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  text: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 13,
  },
  subtitle: {
    fontSize: 11,
    color: c.muted,
  },
  call: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    minHeight: 38,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: c.mode,
  },
  callText: {
    fontSize: 13,
    color: c.onMode,
  },
}));
