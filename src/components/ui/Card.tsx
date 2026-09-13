import type { ReactNode } from "react";
import { Pressable, View, type AccessibilityActionEvent, type AccessibilityActionInfo, type StyleProp, type ViewStyle } from "react-native";

import { makeStyles } from "@/theme/theme";
import { radius } from "@/theme/tokens";

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Makes the whole card the tap target — the native form of the web's stretched link. */
  onPress?: () => void;
  accessibilityLabel?: string;
  /**
   * A card that is one accessible element hides its nested buttons from
   * screen readers, so those buttons are re-exposed as custom actions.
   */
  accessibilityActions?: AccessibilityActionInfo[];
  onAccessibilityAction?: (event: AccessibilityActionEvent) => void;
};

export default function Card({
  children,
  style,
  onPress,
  accessibilityLabel,
  accessibilityActions,
  onAccessibilityAction,
}: CardProps) {
  const s = useStyles();

  if (!onPress) return <View style={[s.card, style]}>{children}</View>;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel}
      accessibilityActions={accessibilityActions}
      onAccessibilityAction={onAccessibilityAction}
      style={({ pressed }) => [s.card, pressed && s.pressed, style]}
    >
      {children}
    </Pressable>
  );
}

const useStyles = makeStyles((c) => ({
  card: {
    backgroundColor: c.surface,
    borderColor: c.line,
    borderWidth: 1,
    borderRadius: radius.xxl,
    padding: 16,
    boxShadow: c.shadowCard,
  },
  pressed: {
    borderColor: c.lineStrong,
    transform: [{ scale: 0.985 }],
  },
}));
