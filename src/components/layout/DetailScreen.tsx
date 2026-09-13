import { router, Stack } from "expo-router";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import RoomScreen from "@/components/layout/RoomScreen";
import AppText, { fonts } from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import type { Mode } from "@/lib/modes";
import { useTheme } from "@/theme/theme";

type DetailScreenProps = {
  mode: Mode;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

/** A pushed screen: native header and back gesture, painted in the room's palette. */
export default function DetailScreen({ mode, title, children, footer }: DetailScreenProps) {
  return (
    <RoomScreen mode={mode} topBar={false} footer={footer}>
      <Header title={title} />
      {children}
    </RoomScreen>
  );
}

function Header({ title }: { title: string }) {
  const { c } = useTheme();

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title,
        headerStyle: { backgroundColor: c.canvas },
        headerTintColor: c.ink,
        headerTitleStyle: { fontFamily: fonts.semibold, color: c.ink },
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
      }}
    />
  );
}

/** Unknown or expired ids. Gupt threads expire by design, so this is a normal state. */
export function Missing({ mode, title, body }: { mode: Mode; title: string; body: string }) {
  return (
    <DetailScreen mode={mode} title="">
      <View style={styles.missing}>
        <AppText weight="bold" style={styles.missingTitle}>
          {title}
        </AppText>
        <MutedText>{body}</MutedText>
        <Button label="Back" variant="outline" onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))} />
      </View>
    </DetailScreen>
  );
}

function MutedText({ children }: { children: ReactNode }) {
  const { c } = useTheme();
  return <AppText style={{ color: c.muted, lineHeight: 21, textAlign: "center" }}>{children}</AppText>;
}

const styles = StyleSheet.create({
  missing: {
    paddingTop: 48,
    alignItems: "center",
    gap: 12,
  },
  missingTitle: {
    fontSize: 20,
  },
});
