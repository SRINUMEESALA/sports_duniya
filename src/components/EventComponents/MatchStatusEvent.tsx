import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface MatchStatusEventProps {
  event: CricketEvent;
}

const MatchStatusEvent = ({ event }: MatchStatusEventProps) => {
  const { status, summary } = event.payload as any;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
        <Text style={styles.summary}>{summary}</Text>
        <View style={styles.indicator}>
          <Text style={styles.indicatorText}>Match Status Update</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    backgroundColor: "#ffffff",
    padding: 30,
    marginHorizontal: 20,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#4caf50",
    shadowColor: "#4caf50",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
    maxWidth: screenWidth - 40,
    alignItems: "center",
  },
  statusContainer: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#4caf50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statusText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 2,
    textAlign: "center",
  },
  summary: {
    fontSize: 18,
    color: "#2e7d32",
    lineHeight: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  indicator: {
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4caf50",
  },
  indicatorText: {
    fontSize: 12,
    color: "#2e7d32",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default MatchStatusEvent;
