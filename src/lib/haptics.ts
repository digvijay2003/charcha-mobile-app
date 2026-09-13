import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

/** A light tick for toggles. Silent on web, where there is no motor to drive. */
export function tick() {
  if (Platform.OS === "web") return;
  Haptics.selectionAsync().catch(() => {});
}
