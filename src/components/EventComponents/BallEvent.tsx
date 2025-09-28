import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface BallEventProps {
  event: CricketEvent;
}

const BallEvent = ({ event }: BallEventProps) => {
  const { runs, commentary, batsman, bowler, over } = event.payload as any;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.contentRow}>
        <View style={styles.commentarySection}>
          <Text style={styles.commentary}>{commentary}</Text>
          <View style={styles.details}>
            <Text style={styles.batsman}>{batsman}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.bowler}>{bowler}</Text>
          </View>
        </View>
        <View style={styles.runsBadge}>
          <Text style={styles.runsText}>+{runs}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 14,
    marginVertical: 4,
    marginHorizontal: 22,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#6c757d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  commentarySection: {
    flex: 1,
    marginRight: 12,
  },
  runsBadge: {
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 45,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  runsText: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "600",
  },
  commentary: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
    marginBottom: 6,
    fontWeight: "400",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  batsman: {
    fontSize: 12,
    color: "#6c757d",
    fontWeight: "500",
  },
  separator: {
    fontSize: 10,
    color: "#adb5bd",
    marginHorizontal: 6,
  },
  bowler: {
    fontSize: 12,
    color: "#6c757d",
    fontWeight: "500",
  },
});

export default BallEvent;
