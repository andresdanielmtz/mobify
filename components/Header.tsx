import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Colors } from "@/constants/Colors";

export default function Header() {
  return (
    <ThemedView style={styles.header}>
      <View style={styles.logoContainer}>
        <ThemedText style={styles.logo}>M</ThemedText>
      </View>
      <ThemedView style={{ flex: 1, backgroundColor: "#f7287b", borderRadius: 10 }}>
        <ThemedText style={styles.headerText}>Mobify</ThemedText>
        <ThemedText style={styles.subtitle}>
          From Mob Records to the world!
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f7287b",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f7287b",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});
