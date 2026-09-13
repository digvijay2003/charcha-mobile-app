import {
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  Geist_700Bold,
  useFonts,
} from "@expo-google-fonts/geist";
import { GeistMono_500Medium } from "@expo-google-fonts/geist-mono";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { PreferencesProvider, usePreferences } from "@/state/preferences";
import { paletteFor } from "@/theme/tokens";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
    GeistMono_500Medium,
  });

  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        {/* A font that fails to load falls back to the system face rather than blocking the app. */}
        <App fontsReady={fontsLoaded || fontError != null} />
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}

/**
 * The splash stays up until both fonts and the saved theme are ready — the
 * native counterpart of the web's pre-paint theme script (web ADR 0012).
 */
function App({ fontsReady }: { fontsReady: boolean }) {
  const { ready, scheme } = usePreferences();
  const show = ready && fontsReady;

  useEffect(() => {
    if (show) SplashScreen.hideAsync().catch(() => {});
  }, [show]);

  if (!show) return null;

  const c = paletteFor(scheme, "charcha");
  const base = scheme === "dark" ? DarkTheme : DefaultTheme;
  // Navigator surfaces use the palette too, so transitions never flash white.
  const navigationTheme = {
    ...base,
    colors: { ...base.colors, primary: c.mode, background: c.canvas, card: c.canvas, text: c.ink, border: c.line },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="coming-soon"
          options={{ presentation: "formSheet", sheetAllowedDetents: "fitToContents", sheetGrabberVisible: true }}
        />
      </Stack>
    </ThemeProvider>
  );
}
