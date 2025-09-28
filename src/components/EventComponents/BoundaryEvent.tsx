import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface BoundaryEventProps {
  event: CricketEvent;
}

const BoundaryEvent = ({ event }: BoundaryEventProps) => {
  const { runs, commentary, batsman, bowler, over } = event.payload as any;

  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.02,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <View style={styles.contentRow}>
        <View style={styles.commentarySection}>
          <Text style={styles.commentary}>{commentary}</Text>
          <View style={styles.details}>
            <Text style={styles.batsman}>{batsman}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.bowler}>{bowler}</Text>
          </View>
        </View>
        <Animated.View style={[styles.runsBadge, { shadowOpacity: glowAnim }]}>
          <Text style={styles.runsText}>FOUR!</Text>
          <Text style={styles.runsNumber}>+{runs}</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginVertical: 7,
    marginHorizontal: 18,
    borderRadius: 14,
    borderLeftWidth: 5,
    borderLeftColor: "#1976d2",
    borderWidth: 1,
    borderColor: "#e3f2fd",
    shadowColor: "#1976d2",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
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
    backgroundColor: "#1976d2",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 70,
    alignItems: "center",
    shadowColor: "#1976d2",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  runsText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "900",
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  runsNumber: {
    fontSize: 15,
    color: "#ffffff",
    fontWeight: "900",
  },
  commentary: {
    fontSize: 16,
    color: "#1565c0",
    lineHeight: 23,
    fontWeight: "700",
    marginBottom: 9,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  batsman: {
    fontSize: 13,
    color: "#1976d2",
    fontWeight: "600",
  },
  separator: {
    fontSize: 12,
    color: "#1976d2",
    marginHorizontal: 8,
  },
  bowler: {
    fontSize: 13,
    color: "#1976d2",
    fontWeight: "600",
  },
});

export default BoundaryEvent;
