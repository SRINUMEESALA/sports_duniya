import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface BallEventProps {
  event: CricketEvent;
}

const BallEvent = ({ event }: BallEventProps) => {
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
          <Text style={styles.runsText}>+{runs}</Text>
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
    borderLeftColor: "#6c757d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
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
    backgroundColor: "#d4edda",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 50,
    alignItems: "center",
  },
  runsText: {
    fontSize: 16,
    color: "#28a745",
    fontWeight: "bold",
  },
  commentary: {
    fontSize: 15,
    color: "#2c3e50",
    lineHeight: 22,
    marginBottom: 8,
    fontWeight: "500",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  batsman: {
    fontSize: 13,
    color: "#495057",
    fontWeight: "600",
  },
  separator: {
    fontSize: 12,
    color: "#6c757d",
    marginHorizontal: 8,
  },
  bowler: {
    fontSize: 13,
    color: "#495057",
    fontWeight: "600",
  },
});

export default BallEvent;
