import { StyleSheet, Text, View } from "react-native";

export function AlertasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alertas Críticos</Text>
      <Text style={styles.texto}>
        Nesta tela serão exibidos os alertas críticos da missão.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#991b1b",
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    color: "#475569",
  },
});