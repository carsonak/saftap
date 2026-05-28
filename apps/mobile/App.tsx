import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { API_VERSION, createHealthResponse } from "@savanna/shared";

const health = createHealthResponse("mobile");

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Savanna</Text>
      <Text style={styles.subtitle}>API {API_VERSION}</Text>
      <Text style={styles.status}>{health.status}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f8fafc",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#0f172a",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#334155",
    fontSize: 18,
    marginBottom: 16,
  },
  status: {
    color: "#047857",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
