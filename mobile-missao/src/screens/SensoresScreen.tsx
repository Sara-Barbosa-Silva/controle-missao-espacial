import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";

import { Sensor } from "../interfaces";
import { RootStackParamList } from "../navigation/AppNavigator";
import { listarSensores } from "../services";

type SensoresScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Sensores">;
};

export function SensoresScreen({ navigation }: SensoresScreenProps) {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarSensores() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarSensores();
      setSensores(dados);
    } catch {
      setErro("Não foi possível carregar os sensores.");
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarSensores();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sensores da Missão</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate("CadastroSensor")}
      >
        <Text style={styles.textoBotao}>Cadastrar novo sensor</Text>
      </TouchableOpacity>

      {carregando && <ActivityIndicator size="large" color="#2563eb" />}

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      {!carregando && sensores.length === 0 && erro === "" && (
        <Text style={styles.texto}>Nenhum sensor cadastrado.</Text>
      )}

      <FlatList
        data={sensores}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>Tipo: {item.tipo}</Text>
            <Text style={styles.info}>
              Leitura atual: {item.valorAtual} {item.unidadeMedida}
            </Text>
            <Text style={item.ativo ? styles.ativo : styles.inativo}>
              {item.ativo ? "Ativo" : "Inativo"}
            </Text>
          </View>
        )}
      />
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
    marginBottom: 16,
  },
  texto: {
    fontSize: 16,
    color: "#475569",
    marginTop: 16,
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4,
  },
  ativo: {
    marginTop: 8,
    color: "#16a34a",
    fontWeight: "bold",
  },
  inativo: {
    marginTop: 8,
    color: "#dc2626",
    fontWeight: "bold",
  },
  erro: {
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 16,
  },
});