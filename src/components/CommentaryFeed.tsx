import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { EVENT_TYPES, CricketEvent } from "../types/CricketEvent";
import BallEvent from "./EventComponents/BallEvent";
import BoundaryEvent from "./EventComponents/BoundaryEvent";
import SixEvent from "./EventComponents/SixEvent";
import WicketEvent from "./EventComponents/WicketEvent";
import MatchStatusEvent from "./EventComponents/MatchStatusEvent";
import OverCompleteEvent from "./EventComponents/OverCompleteEvent";
import MatchHeader from "./MatchHeader";
import CommentaryHeader from "./CommentaryHeader";
import UnknownEvent from "./EventComponents/UnknownEvent";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setStreaming,
  startStreaming,
  stopStreaming,
} from "../store/slices/commentarySlice";

const CommentaryFeed = () => {
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.commentary);
  const score = useAppSelector((state) => state.score);

  const feedEvents = events.filter(
    (event) => event.type !== EVENT_TYPES.MATCH_STATUS
  );

  const latestMatchStatusEvent = events
    .filter((event) => event.type === EVENT_TYPES.MATCH_STATUS)
    .slice(-1)[0];

  const flatListRef = useRef(null);
  const shouldAutoScroll = useRef(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(startStreaming());
    dispatch(setStreaming(true));
    shouldAutoScroll.current = true;

    return () => {
      dispatch(stopStreaming());
    };
  }, []);

  useEffect(() => {
    if (
      feedEvents.length > 0 &&
      flatListRef.current &&
      shouldAutoScroll.current
    ) {
      setTimeout(() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  }, [feedEvents.length]);

  const renderEvent = ({
    item: event,
    index,
  }: {
    item: CricketEvent;
    index: number;
  }) => {
    const eventComponents = {
      [EVENT_TYPES.BALL]: BallEvent,
      [EVENT_TYPES.BOUNDARY]: BoundaryEvent,
      [EVENT_TYPES.SIX]: SixEvent,
      [EVENT_TYPES.WICKET]: WicketEvent,
      [EVENT_TYPES.OVER_COMPLETE]: OverCompleteEvent,
    };

    const EventComponent = eventComponents[event.type];

    if (EventComponent) {
      return <EventComponent event={event} />;
    } else {
      return <UnknownEvent event={event} />;
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#1a1a2e" />

      <MatchHeader
        totalRuns={score.totalRuns}
        totalWickets={score.totalWickets}
        currentOver={score.currentOver}
        ballsInOver={score.ballsInOver}
        matchStatus={score.matchStatus}
      />

      <View
        style={[
          styles.feedContainer,
          { paddingBottom: Math.max(20, insets.bottom) },
        ]}
      >
        <CommentaryHeader />
        <FlatList
          ref={flatListRef}
          data={feedEvents}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          style={styles.feedList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.feedContent}
          inverted={false}
          onContentSizeChange={() => {
            if (
              feedEvents.length > 0 &&
              flatListRef.current &&
              shouldAutoScroll.current
            ) {
              setTimeout(() => {
                if (flatListRef.current) {
                  flatListRef.current.scrollToEnd({ animated: true });
                }
              }, 100);
            }
          }}
          onScroll={(event) => {
            const { contentOffset, contentSize, layoutMeasurement } =
              event.nativeEvent;
            const isNearBottom =
              contentOffset.y + layoutMeasurement.height >=
              contentSize.height - 100;
            shouldAutoScroll.current = isNearBottom;
          }}
          scrollEventThrottle={16}
          removeClippedSubviews={false}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
      </View>

      {latestMatchStatusEvent && (
        <MatchStatusEvent event={latestMatchStatusEvent} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  feedContainer: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    minHeight: 0,
  },
  feedList: {
    flex: 1,
    minHeight: 0,
  },
  feedContent: {
    paddingBottom: 20,
    paddingTop: 12,
  },
});

export default CommentaryFeed;
