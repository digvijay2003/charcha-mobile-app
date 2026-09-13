import { View } from "react-native";

import AppText from "@/components/ui/AppText";
import { stageLabels, stageOrder, type Stage } from "@/lib/vivaad-data";
import { makeStyles, useTheme } from "@/theme/theme";

/** Timed rounds are what make this a debate rather than a comment thread. */
export default function StageIndicator({ stage }: { stage: Stage }) {
  const { c } = useTheme();
  const s = useStyles();
  const currentIndex = stageOrder.indexOf(stage);

  return (
    <View
      style={s.row}
      accessible
      accessibilityLabel={`Stage ${currentIndex + 1} of ${stageOrder.length}: ${stageLabels[stage]}`}
    >
      {stageOrder.map((item, index) => {
        const isCurrent = index === currentIndex;
        const isDone = index < currentIndex;

        return (
          <View key={item} style={s.step}>
            <View style={[s.pill, isCurrent && { backgroundColor: c.softPurple }]}>
              <AppText
                weight="semibold"
                style={[
                  s.label,
                  { color: isCurrent ? c.accentPurple : c.muted },
                  !isCurrent && !isDone && s.upcoming,
                ]}
              >
                {stageLabels[item]}
              </AppText>
            </View>
            {index < stageOrder.length - 1 ? <AppText style={s.chevron}>›</AppText> : null}
          </View>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    rowGap: 4,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  label: {
    fontSize: 11,
  },
  // Upcoming stages recede but stay legible; web uses 60% muted.
  upcoming: {
    opacity: 0.7,
  },
  chevron: {
    marginHorizontal: 2,
    color: c.lineStrong,
    fontSize: 13,
  },
}));
