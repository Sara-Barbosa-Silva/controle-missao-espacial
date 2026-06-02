import { StyleSheet, Text, View } from "react-native";

export function CadastroSensorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Sensor</Text>
      <Text style={styles.texto}>
        Nesta tela será criado o formulário para cadastrar sensores via POST.
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