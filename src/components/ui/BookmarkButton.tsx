import { Bookmark } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";

import { tick } from "@/lib/haptics";
import { usePreferences, type SavedRef } from "@/state/preferences";
import { useTheme } from "@/theme/theme";

/** Saved on this device and listed in the You tab. */
export default function BookmarkButton({ saveRef, title }: { saveRef: SavedRef; title: string }) {
  const { c } = useTheme();
  const { saved, toggleSaved } = usePreferences();
  const isSaved = saved.includes(saveRef);

  return (
    <Pressable
      onPress={() => {
        tick();
        toggleSaved(saveRef);
      }}
      hitSlop={8}
      accessibilityRole="togglebutton"
      accessibilityState={{ checked: isSaved }}
      accessibilityLabel={isSaved ? `Remove "${title}" from saved` : `Save "${title}"`}
      style={({ pressed }) => [
        styles.button,
        (isSaved || pressed) && { backgroundColor: c.softPurple },
      ]}
    >
      <Bookmark
        size={17}
        color={isSaved ? c.accentPurple : c.muted}
        fill={isSaved ? c.accentPurple : "none"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
