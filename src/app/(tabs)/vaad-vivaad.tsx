import { View } from "react-native";

import RoomHeader from "@/components/layout/RoomHeader";
import RoomScreen from "@/components/layout/RoomScreen";
import VivaadCard from "@/components/vivaad/VivaadCard";
import ClosingSoon from "@/components/widgets/ClosingSoon";
import PopularTopics from "@/components/widgets/PopularTopics";
import { vivaads } from "@/lib/vivaad-data";

export default function VaadVivaadScreen() {
  return (
    <RoomScreen mode="vivaad">
      <RoomHeader stat={`${vivaads.length} debates open · pick a side, then make your case`} />

      <View style={{ gap: 16 }}>
        {vivaads.map((vivaad) => (
          <VivaadCard key={vivaad.id} vivaad={vivaad} />
        ))}
      </View>

      <ClosingSoon />
      <PopularTopics />
    </RoomScreen>
  );
}
