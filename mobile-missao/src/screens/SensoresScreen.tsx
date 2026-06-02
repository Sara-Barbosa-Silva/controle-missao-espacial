import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { RootStackParamList } from "../navigation/AppNavigator";

type SensoresScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Sensores">;
};

export function SensoresScreen({ navigation }: SensoresScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensores da Missão</Text>
      <Text style={styles.texto}>
        Nesta tela serão exibidos os sensores cadastrados na API.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("CadastroSensor")}
      >
        <Text style={styles.textoBotao}>Cadastrar novo sensor</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});