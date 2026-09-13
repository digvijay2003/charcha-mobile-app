import { Flame } from "lucide-react-native";
import { Fragment } from "react";
import { View } from "react-native";

import DiscussionCard from "@/components/home/DiscussionCard";
import BottomBanner from "@/components/home/BottomBanner";
import RoomHeader from "@/components/layout/RoomHeader";
import RoomScreen from "@/components/layout/RoomScreen";
import SectionHeading from "@/components/layout/SectionHeading";
import PopularTopics from "@/components/widgets/PopularTopics";
import UnseenPerspective from "@/components/widgets/UnseenPerspective";
import { discussions } from "@/lib/mock-data";
import { openPending } from "@/lib/pending";

/**
 * The counter-view sits inside the feed, after the second card, rather than
 * in a rail below it: on a phone, below the fold is where a nudge goes unread.
 */
const UNSEEN_AFTER = 2;

export default function CharchaScreen() {
  return (
    <RoomScreen mode="charcha">
      <RoomHeader stat="245 charchas started today · 12.4K people sharing perspectives this week" />

      <View>
        <SectionHeading
          title="Trending Discussions"
          icon={Flame}
          iconColor="accentOrange"
          action={{ label: "View all", onPress: () => openPending("explore") }}
        />
        <View style={{ gap: 16 }}>
          {discussions.map((discussion, index) => (
            <Fragment key={discussion.id}>
              {index === UNSEEN_AFTER ? <UnseenPerspective /> : null}
              <DiscussionCard discussion={discussion} />
            </Fragment>
          ))}
        </View>
      </View>

      <PopularTopics />
      <BottomBanner />
    </RoomScreen>
  );
}
