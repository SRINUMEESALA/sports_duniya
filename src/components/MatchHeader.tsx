import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MatchHeaderProps {
  totalRuns: number;
  totalWickets: number;
  currentOver: number;
  ballsInOver: number;
  matchStatus: string;
}

const MatchHeader = ({
  totalRuns,
  totalWickets,
  currentOver,
  ballsInOver,
  matchStatus,
}: MatchHeaderProps) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "match start":
        return styles.statusActive;
      case "innings break":
        return styles.statusBreak;
      case "lunch":
      case "tea":
        return styles.statusMeal;
      case "rain delay":
        return styles.statusDelay;
      case "match end":
        return styles.statusEnd;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerGradient}>
        <View style={styles.scoreContainer}>
          <Text style={styles.matchTitle}>T20 World Cup 2024</Text>
          <View style={[styles.statusContainer, getStatusStyle(matchStatus)]}>
            <Text style={styles.statusText}>{matchStatus}</Text>
          </View>
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
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: "center",
    borderWidth: 1,
  },
  statusDefault: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statusActive: {
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    borderColor: "rgba(76, 175, 80, 0.6)",
  },
  statusBreak: {
    backgroundColor: "rgba(255, 193, 7, 0.3)",
    borderColor: "rgba(255, 193, 7, 0.6)",
  },
  statusMeal: {
    backgroundColor: "rgba(156, 39, 176, 0.3)",
    borderColor: "rgba(156, 39, 176, 0.6)",
  },
  statusDelay: {
    backgroundColor: "rgba(33, 150, 243, 0.3)",
    borderColor: "rgba(33, 150, 243, 0.6)",
  },
  statusEnd: {
    backgroundColor: "rgba(244, 67, 54, 0.3)",
    borderColor: "rgba(244, 67, 54, 0.6)",
  },
  statusText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
