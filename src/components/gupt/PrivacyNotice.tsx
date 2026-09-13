import { ShieldCheck } from "lucide-react-native";
import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import Card from "@/components/ui/Card";
import { makeStyles, useTheme } from "@/theme/theme";

/**
 * Showing the exact redaction instead of a generic warning is the difference
 * between a scary dialog people dismiss and one they act on. This is a worked
 * example of the check; the composer that runs it on your own words is not
 * built yet.
 */
export default function PrivacyNotice() {
  const { c } = useTheme();
  const s = useStyles();

  return (
    <Card>
      <View style={s.head}>
        <ShieldCheck size={17} color={c.gupt} />
        <AppText weight="bold" style={s.heading} accessibilityRole="header">
          Privacy check runs before anything is posted
        </AppText>
      </View>
      <AppText style={s.intro}>
        Names, employers and locations are found and shown to you as an exact redaction. Nothing is
        published until you choose.
      </AppText>

      <View style={s.pane}>
        <AppText weight="semibold" style={s.paneLabel}>
          YOU WROTE
        </AppText>
        <AppText style={s.sample}>
          My manager <AppText style={s.found}> Rahul Sharma </AppText> at{" "}
          <AppText style={s.found}> Vertex Systems, Pune </AppText> keeps taking credit for my work.
        </AppText>
      </View>

      <View style={s.pane}>
        <AppText weight="semibold" style={s.paneLabel}>
          WILL BE POSTED AS
        </AppText>
        <AppText style={s.sample}>
          My manager <AppText style={s.redacted}> [my manager] </AppText> at{" "}
          <AppText style={s.redacted}> [my company] </AppText> keeps taking credit for my work.
        </AppText>
      </View>

      <View style={s.choices} accessible accessibilityLabel="Your choices: post redacted version, edit myself, or post as written.">
        <View style={[s.choice, s.choicePrimary]}>
          <AppText weight="semibold" style={[s.choiceText, { color: c.gupt }]}>
            Post redacted version
          </AppText>
        </View>
        <View style={s.choice}>
          <AppText weight="medium" style={s.choiceText}>
            Edit myself
          </AppText>
        </View>
        <View style={s.choice}>
          <AppText weight="medium" style={s.choiceText}>
            Post as written
          </AppText>
        </View>
      </View>
    </Card>
  );
}

const useStyles = makeStyles((c) => ({
  head: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  heading: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
  },
  intro: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    color: c.muted,
  },
  pane: {
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: c.line,
    backgroundColor: c.canvas,
    padding: 12,
  },
  paneLabel: {
    fontSize: 10,
    letterSpacing: 0.8,
    color: c.muted,
  },
  sample: {
    marginTop: 8,
    lineHeight: 24,
  },
  found: {
    backgroundColor: c.softOrange,
    color: c.accentOrange,
    fontFamily: "Geist_500Medium",
  },
  redacted: {
    backgroundColor: c.softGupt,
    color: c.gupt,
    fontFamily: "Geist_500Medium",
  },
  choices: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  choice: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: c.line,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  choicePrimary: {
    backgroundColor: c.softGupt,
    borderColor: c.softGupt,
  },
  choiceText: {
    fontSize: 12,
    color: c.muted,
  },
}));
