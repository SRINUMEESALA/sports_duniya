import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MatchHeaderProps {
  totalRuns: number;
  totalWickets: number;
  currentOver: number;
  ballsInOver: number;
}

const MatchHeader = ({
  totalRuns,
  totalWickets,
  currentOver,
  ballsInOver,
}: MatchHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerGradient}>
        <View style={styles.scoreContainer}>
          <Text style={styles.matchTitle}>T20 World Cup 2024</Text>
          <View style={styles.teamsContainer}>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>🇮🇳 India</Text>
              <Text style={styles.teamScore}>
                {totalRuns > 0 || totalWickets > 0
                  ? `${totalRuns}/${totalWickets}`
                  : "0/0"}
              </Text>
              <Text style={styles.oversText}>
                {currentOver > 0 || ballsInOver > 0
                  ? `(${currentOver}.${ballsInOver} overs)`
                  : "(0.0 overs)"}
              </Text>
            </View>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</Text>
              <Text style={styles.teamScore}>0/0</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1a1a2e",
    paddingBottom: 20,
  },
  headerGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  scoreContainer: {
    flex: 1,
  },
  matchTitle: {
    fontSize: 14,
    color: "#a0a0a0",
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  teamInfo: {
    alignItems: "center",
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  teamScore: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  oversText: {
    fontSize: 12,
    color: "#a0a0a0",
    fontWeight: "500",
    marginTop: 2,
  },
  vsText: {
    fontSize: 12,
    color: "#a0a0a0",
    fontWeight: "600",
    marginHorizontal: 16,
  },
});

export default MatchHeader;
