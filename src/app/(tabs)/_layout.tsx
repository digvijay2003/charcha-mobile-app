import { Tabs } from "expo-router";

import TabBar from "@/components/layout/TabBar";

/** The three rooms are the product's structure, so they are the tabs (web ADR 0004). */
export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Charcha" }} />
      <Tabs.Screen name="vaad-vivaad" options={{ title: "Vaad-Vivaad" }} />
      <Tabs.Screen name="gupt-charcha" options={{ title: "Gupt-Charcha" }} />
      <Tabs.Screen name="you" options={{ title: "You" }} />
    </Tabs>
  );
}
