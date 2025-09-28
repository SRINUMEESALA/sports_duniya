import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface WicketEventProps {
  event: CricketEvent;
}

const WicketEvent = ({ event }: WicketEventProps) => {
  const { playerOut, dismissal, commentary, batsman, bowler, over } =
    event.payload as any;

  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <View style={styles.contentRow}>
        <View style={styles.commentarySection}>
          <Text style={styles.commentary}>{commentary}</Text>
          <View style={styles.dismissalInfo}>
            <Text style={styles.playerOut}>{playerOut}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.dismissal}>{dismissal}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.batsman}>{batsman}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.bowler}>{bowler}</Text>
          </View>
        </View>
        <Animated.View
          style={[styles.wicketBadge, { transform: [{ scale: pulseAnim }] }]}
        >
          <Text style={styles.wicketText}>WICKET!</Text>
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
    borderLeftColor: "#d32f2f",
    borderWidth: 2,
    borderColor: "#ffebee",
    shadowColor: "#d32f2f",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 12,
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
  wicketBadge: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 80,
    alignItems: "center",
    shadowColor: "#d32f2f",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  wicketText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "900",
    letterSpacing: 1,
  },
  commentary: {
    fontSize: 16,
    color: "#c62828",
    lineHeight: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  dismissalInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#ffebee",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  playerOut: {
    fontSize: 14,
    color: "#d32f2f",
    fontWeight: "bold",
  },
  dismissal: {
    fontSize: 13,
    color: "#d32f2f",
    fontWeight: "600",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffebee",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  batsman: {
    fontSize: 13,
    color: "#d32f2f",
    fontWeight: "600",
  },
  separator: {
    fontSize: 12,
    color: "#d32f2f",
    marginHorizontal: 8,
  },
  bowler: {
    fontSize: 13,
    color: "#d32f2f",
    fontWeight: "600",
  },
});

export default WicketEvent;
