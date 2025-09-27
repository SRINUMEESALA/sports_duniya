import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface SixEventProps {
  event: CricketEvent;
}

const SixEvent = ({ event }: SixEventProps) => {
  const { runs, commentary, batsman, bowler, over } = event.payload as any;

  return (
    <View style={styles.container}>
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
          <Text style={styles.runsText}>SIX!</Text>
          <Text style={styles.runsNumber}>+{runs}</Text>
        </View>
      </View>
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
    borderLeftColor: "#ff9800",
    shadowColor: "#ff9800",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
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
    backgroundColor: "#ff9800",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
  },
  runsText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 2,
  },
  runsNumber: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "bold",
  },
  commentary: {
    fontSize: 15,
    color: "#e65100",
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 8,
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

