import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface MatchStatusEventProps {
  event: CricketEvent;
}

const MatchStatusEvent = ({ event }: MatchStatusEventProps) => {
  const { status, summary } = event.payload as any;

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 16,
    borderLeftWidth: 5,
    borderLeftColor: "#4caf50",
    shadowColor: "#4caf50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  statusContainer: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  statusText: {
    fontSize: 13,
    color: "#ffffff",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summary: {
    fontSize: 16,
    color: "#2e7d32",
    lineHeight: 24,
    fontWeight: "600",
  },
});

export default MatchStatusEvent;

