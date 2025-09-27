import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CommentaryHeader = () => {
  return (
    <View style={styles.feedHeader}>
      <Text style={styles.feedTitle}>🏏 Live Commentary</Text>
      <View style={styles.liveIndicator}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
    position: "relative",
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4757",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default CommentaryHeader;
