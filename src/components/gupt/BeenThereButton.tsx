import { Footprints } from "lucide-react-native";
import { Pressable } from "react-native";

import AppText from "@/components/ui/AppText";
import { tick } from "@/lib/haptics";
import { makeStyles, useTheme } from "@/theme/theme";

type BeenThereButtonProps = {
  count: number;
  marked: boolean;
  onToggle: () => void;
  compact?: boolean;
};

/**
 * Replaces the like. Saying "I have been there too" costs nothing to the
 * person saying it and is the single most useful signal to the person posting.
 *
 * Deliberately not persisted: this device keeps no list of which anonymous
 * threads you responded to.
 */
export default function BeenThereButton({ count, marked, onToggle, compact = false }: BeenThereButtonProps) {
  const { c } = useTheme();
  const s = useStyles();
  const total = count + (marked ? 1 : 0);
  const color = marked ? c.gupt : c.muted;

  return (
    <Pressable
      onPress={() => {
        tick();
        onToggle();
      }}
      accessibilityRole="togglebutton"
      accessibilityState={{ checked: marked }}
      accessibilityLabel={`I have been here. ${total} people have.`}
      style={({ pressed }) => [
        s.button,
        compact ? s.compact : s.regular,
        marked && { backgroundColor: c.softGupt, borderColor: c.softGupt },
        pressed && { opacity: 0.8 },
      ]}
    >
      <Footprints size={compact ? 15 : 17} color={color} />
      <AppText weight="semibold" style={[s.text, { color, fontSize: compact ? 12 : 14 }]}>
        {total}
      </AppText>
      <AppText weight="medium" style={[s.text, { color, fontSize: compact ? 12 : 14 }]}>
        {marked ? "you have been here" : "have been here"}
      </AppText>
    </Pressable>
  );
}

const useStyles = makeStyles((c) => ({
  button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: c.line,
  },
  compact: {
    minHeight: 34,
    paddingHorizontal: 12,
  },
  regular: {
    minHeight: 44,
    paddingHorizontal: 16,
  },
  text: {
    fontVariant: ["tabular-nums"],
  },
}));
