import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface SixEventProps {
  event: CricketEvent;
}

const SixEvent = ({ event }: SixEventProps) => {
  const { runs, commentary, batsman, bowler, over } = event.payload as any;

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.08,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.7,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "5deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
        },
      ]}
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
          <Text style={styles.runsText}>SIX!</Text>
          <Text style={styles.runsNumber}>+{runs}</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    borderLeftWidth: 6,
    borderLeftColor: "#f57c00",
    borderWidth: 2,
    borderColor: "#fff3e0",
    shadowColor: "#f57c00",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
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
    backgroundColor: "#f57c00",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
    shadowColor: "#f57c00",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  runsText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "900",
    marginBottom: 2,
    letterSpacing: 1,
  },
  runsNumber: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "900",
  },
  commentary: {
    fontSize: 17,
    color: "#e65100",
    lineHeight: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff3e0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  batsman: {
    fontSize: 13,
    color: "#f57c00",
    fontWeight: "600",
  },
  separator: {
    fontSize: 12,
    color: "#f57c00",
    marginHorizontal: 8,
  },
  bowler: {
    fontSize: 13,
    color: "#f57c00",
    fontWeight: "600",
  },
});

export default SixEvent;
