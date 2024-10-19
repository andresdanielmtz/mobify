import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";

export default function Header() {
  return (
    <ThemedView style={styles.header}>
      <ThemedText style={styles.headerText}>Mobify</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "#f7287b",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "black",
    fontSize: 18,
  },
});
