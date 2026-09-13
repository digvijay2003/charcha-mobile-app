import { EyeOff } from "lucide-react-native";
import { View } from "react-native";

import GuptCard from "@/components/gupt/GuptCard";
import HelplineBar from "@/components/gupt/HelplineBar";
import PrivacyNotice from "@/components/gupt/PrivacyNotice";
import RoomHeader from "@/components/layout/RoomHeader";
import RoomScreen from "@/components/layout/RoomScreen";
import AppText from "@/components/ui/AppText";
import { guptPosts } from "@/lib/gupt-data";
import { makeStyles, useTheme } from "@/theme/theme";

const rules = ["No profiles", "No followers", "New handle every thread", "Threads expire"];

/** No discovery widgets and no brand banner: a room built on not being watched carries no metrics. */
export default function GuptCharchaScreen() {
  return (
    <RoomScreen mode="gupt" footer={<HelplineBar />}>
      <RoomHeader stat="38 threads today · nothing here is linked to your account" />
      <Rules />

      <View style={{ gap: 16 }}>
        {guptPosts.map((post) => (
          <GuptCard key={post.id} post={post} />
        ))}
      </View>

      <PrivacyNotice />
    </RoomScreen>
  );
}

function Rules() {
  const { c } = useTheme();
  const s = useStyles();

  return (
    <View style={s.rules} accessible accessibilityLabel={`Room rules: ${rules.join(", ")}.`}>
      {rules.map((rule) => (
        <View key={rule} style={s.rule}>
          <EyeOff size={12} color={c.gupt} />
          <AppText weight="medium" style={s.ruleText}>
            {rule}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  rules: {
    marginTop: -8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  rule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: c.softGupt,
  },
  ruleText: {
    fontSize: 12,
    color: c.gupt,
  },
}));
