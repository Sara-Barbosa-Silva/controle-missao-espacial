import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { GalaxyBackground } from "./GalaxyBackground";

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <GalaxyBackground />

      <View style={styles.card}>
        <Text style={styles.icone}>🚀</Text>
        <Text style={styles.titulo}>Controle de Missão Espacial</Text>
        <Text style={styles.subtitulo}>
          Sistema para monitoramento de sensores, sistemas e alertas
        </Text>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("GerenciamentoMissao")}
        > 
          <Text style={styles.textoBotao}>Central de Comando</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Sensores")}
        >
          <Text style={styles.textoBotao}> Sensores</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Sistemas")}
        >
          <Text style={styles.textoBotao}> Sistemas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoAlerta}
          onPress={() => navigation.navigate("Alertas")}
        >
          <Text style={styles.textoBotao}>🚨 Alertas </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#050816",
    overflow: "hidden",
  },

  card: {
    backgroundColor: "rgba(10, 15, 30, 0.82)",
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(139, 92, 246, 0.45)",
    zIndex: 10,
  },

  icone: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 12,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 16,
    color: "#cbd5e1",
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 22,
  },

  botao: {
    backgroundColor: "#312e81",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#818cf8",
  },

  botaoAlerta: {
    backgroundColor: "#7f1d1d",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#f87171",
  },
  
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  
});