import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CricketEvent } from "../../types/CricketEvent";

interface UnknownEventProps {
  event: CricketEvent;
}

const UnknownEvent = ({ event }: UnknownEventProps) => {
  return (
    <View style={styles.unknownEventContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>⏳</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.unknownEventText}>
            Extraordinary things happen unexpectedly!
          </Text>
          <Text style={styles.subtitleText}>
            seems like something is going away...
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.footerText}>Stay tuned for on-air updates...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  unknownEventContainer: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff3cd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#ffc107",
  },
  icon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  unknownEventText: {
    fontSize: 18,
    color: "#2c3e50",
    fontWeight: "700",
    marginBottom: 4,
    lineHeight: 24,
  },
  subtitleText: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
    fontStyle: "italic",
  },
  contentContainer: {
    paddingLeft: 66,
  },
  unknownEventSubtext: {
    fontSize: 15,
    color: "#495057",
    lineHeight: 22,
    textAlign: "left",
    marginBottom: 12,
  },
  footerText: {
    fontSize: 13,
    color: "#6c757d",
    fontStyle: "italic",
    textAlign: "left",
  },
});

export default UnknownEvent;
