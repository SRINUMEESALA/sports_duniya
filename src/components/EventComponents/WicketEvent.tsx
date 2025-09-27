import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface WicketEventProps {
  event: CricketEvent;
}

const WicketEvent = ({ event }: WicketEventProps) => {
  const { playerOut, dismissal, commentary, batsman, bowler, over } =
    event.payload as any;

  return (
    <View style={styles.container}>
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
        <View style={styles.wicketBadge}>
          <Text style={styles.wicketText}>WICKET!</Text>
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
    borderLeftColor: "#f44336",
    shadowColor: "#f44336",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 7,
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
    backgroundColor: "#f44336",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
  },
  wicketText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "bold",
  },
  commentary: {
    fontSize: 15,
    color: "#c62828",
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 8,
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

