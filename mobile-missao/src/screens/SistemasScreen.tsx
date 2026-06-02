import { StyleSheet, Text, View } from "react-native";

export function SistemasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistemas Monitorados</Text>
      <Text style={styles.texto}>
        Nesta tela serão exibidos os sistemas monitorados da missão.
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
    color: "#0f172a",
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    color: "#475569",
  },
});