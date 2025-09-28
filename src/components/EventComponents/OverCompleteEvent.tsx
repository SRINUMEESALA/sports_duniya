import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface OverCompleteEventProps {
  event: CricketEvent;
}

const OverCompleteEvent = ({ event }: OverCompleteEventProps) => {
  const { over, runs, wickets, commentary } = event.payload as any;

  const slideAnim = useRef(new Animated.Value(-20)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.overText}>Over {over} Complete</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.runsText}>{runs} runs</Text>
          {wickets > 0 && (
            <Text style={styles.wicketsText}>{wickets} wicket</Text>
          )}
        </View>
      </View>
      <Text style={styles.commentary}>{commentary}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginVertical: 6,
    marginHorizontal: 20,
    borderRadius: 14,
    borderLeftWidth: 5,
    borderLeftColor: "#9c27b0",
    borderWidth: 1,
    borderColor: "#f3e5f5",
    shadowColor: "#9c27b0",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  overText: {
    fontSize: 14,
    color: "#7b1fa2",
    fontWeight: "bold",
    backgroundColor: "#f3e5f5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9c27b0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  runsText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "600",
    marginRight: 8,
  },
  wicketsText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "600",
  },
  commentary: {
    fontSize: 14,
    color: "#6a1b9a",
    lineHeight: 20,
    fontStyle: "italic",
    fontWeight: "500",
  },
});

export default OverCompleteEvent;
