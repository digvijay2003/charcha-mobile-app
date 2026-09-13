import { Text, type TextProps } from "react-native";

import { useTheme } from "@/theme/theme";

/**
 * Custom fonts on Android ignore `fontWeight`, so each weight is its own
 * family. Geist everywhere; Geist Mono only for anonymous handles.
 */
export const fonts = {
  regular: "Geist_400Regular",
  medium: "Geist_500Medium",
  semibold: "Geist_600SemiBold",
  bold: "Geist_700Bold",
  mono: "GeistMono_500Medium",
} as const;

type AppTextProps = TextProps & {
  weight?: keyof typeof fonts;
};

export default function AppText({ weight = "regular", style, ...rest }: AppTextProps) {
  const { c } = useTheme();

  return (
    <Text
      // Respect the user's text size, but stop cards from breaking at the extremes.
      maxFontSizeMultiplier={1.6}
      {...rest}
      style={[{ fontFamily: fonts[weight], color: c.ink, fontSize: 14 }, style]}
    />
  );
}
