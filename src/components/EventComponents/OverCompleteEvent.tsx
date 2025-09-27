import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface OverCompleteEventProps {
  event: CricketEvent;
}

const OverCompleteEvent = ({ event }: OverCompleteEventProps) => {
  const { over, runs, wickets, commentary } = event.payload as any;

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#9c27b0",
    shadowColor: "#9c27b0",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
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

