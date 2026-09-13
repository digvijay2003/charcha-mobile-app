import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TopBar from "@/components/layout/TopBar";
import type { Mode } from "@/lib/modes";
import { Room, useTheme } from "@/theme/theme";

type RoomScreenProps = {
  mode: Mode;
  children: ReactNode;
  /** Tab screens carry the brand bar; stack screens use the native header instead. */
  topBar?: boolean;
  /** Pinned below the scroll area, e.g. the Gupt-Charcha helpline. */
  footer?: ReactNode;
};

/**
 * The mobile AppShell: sets the room, paints its canvas, and caps the column
 * width so tablets and the web preview do not stretch cards edge to edge.
 */
export default function RoomScreen({ mode, children, topBar = true, footer }: RoomScreenProps) {
  return (
    <Room mode={mode}>
      <Shell topBar={topBar} footer={footer}>
        {children}
      </Shell>
    </Room>
  );
}

function Shell({ children, topBar, footer }: Omit<RoomScreenProps, "mode">) {
  const { c } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: c.canvas }]}>
      <ScrollView
        stickyHeaderIndices={topBar ? [0] : undefined}
        contentContainerStyle={[styles.content, { paddingTop: topBar ? 0 : 20 }]}
      >
        {topBar ? (
          <View style={{ paddingTop: insets.top, backgroundColor: c.canvas }}>
            <TopBar />
          </View>
        ) : null}
        <View style={styles.column}>{children}</View>
      </ScrollView>
      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  column: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 16,
    gap: 24,
  },
});
