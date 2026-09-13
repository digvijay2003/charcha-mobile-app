import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { useTheme } from "@/theme/theme";

/**
 * The indigo end of the mark's gradient measures 1.3:1 on the dark canvas, so
 * it sits on a light plate in dark mode and needs nothing in light mode
 * (web ADR 0011).
 */
export function LogoMark({ size = 32 }: { size?: number }) {
  const { scheme } = useTheme();

  return (
    <View
      style={[
        styles.plate,
        { width: size, height: size },
        scheme === "dark" && styles.darkPlate,
      ]}
    >
      <Image
        source={require("@/assets/images/charcha-mark.png")}
        style={styles.mark}
        contentFit="contain"
        accessible={false}
      />
    </View>
  );
}

export default function Logo() {
  return (
    <View style={styles.row} accessible accessibilityRole="header" accessibilityLabel="Charcha">
      <LogoMark />
      <AppText weight="bold" style={styles.word}>
        CHARCHA
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  plate: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  // Fixed, not a token: it is the colour the mark was drawn for in both themes.
  darkPlate: {
    backgroundColor: "#f4f3fa",
    padding: 3,
  },
  mark: {
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  word: {
    fontSize: 15,
    letterSpacing: 2.4,
  },
});
