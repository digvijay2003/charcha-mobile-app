import { router, useLocalSearchParams } from "expo-router";
import { Hourglass } from "lucide-react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import type { Mode } from "@/lib/modes";
import { pendingCopy, type Pending } from "@/lib/pending";
import { makeStyles, Room, useTheme } from "@/theme/theme";

function isPending(value: string | undefined): value is Pending {
  return value != null && value in pendingCopy;
}

/** The sheet takes the palette of the room it was opened from. */
function roomOf(what: Pending): Mode {
  if (what === "compose-gupt" || what === "share-experience") return "gupt";
  if (what === "compose-vivaad" || what.startsWith("argue-")) return "vivaad";
  return "charcha";
}

export default function ComingSoonSheet() {
  const { what } = useLocalSearchParams<{ what?: string }>();
  const key = isPending(what) ? what : null;

  return (
    <Room mode={key ? roomOf(key) : "charcha"}>
      <Sheet
        copy={key ? pendingCopy[key] : { title: "Not built yet", body: "This part of Charcha is still being built." }}
      />
    </Room>
  );
}

function Sheet({ copy }: { copy: { title: string; body: string } }) {
  const { c } = useTheme();
  const s = useStyles();
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.sheet, { paddingBottom: Math.max(insets.bottom, 20) + 8 }]}>
      <View style={s.tile}>
        <Hourglass size={20} color={c.mode} />
      </View>
      <AppText weight="bold" style={s.title} accessibilityRole="header">
        {copy.title}
      </AppText>
      <AppText style={s.body}>{copy.body}</AppText>
      <AppText weight="medium" style={s.note}>
        Not in this build yet
      </AppText>
      <Button label="Got it" onPress={() => router.back()} style={s.button} />
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  sheet: {
    backgroundColor: c.canvas,
    paddingHorizontal: 24,
    paddingTop: 28,
    gap: 10,
  },
  tile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.softMode,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.2,
  },
  body: {
    color: c.muted,
    lineHeight: 21,
  },
  note: {
    fontSize: 12,
    color: c.muted,
  },
  button: {
    marginTop: 8,
  },
}));
