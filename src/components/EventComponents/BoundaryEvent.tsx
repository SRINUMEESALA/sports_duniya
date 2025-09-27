import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface BoundaryEventProps {
  event: CricketEvent;
}

const BoundaryEvent = ({ event }: BoundaryEventProps) => {
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
          <Text style={styles.runsText}>FOUR!</Text>
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
    borderLeftColor: "#2196f3",
    shadowColor: "#2196f3",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
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
    backgroundColor: "#2196f3",
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
    color: "#1565c0",
    lineHeight: 22,
    fontWeight: "600",
    marginBottom: 8,
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
