import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { AlertaCritico } from "../interfaces";
import { listarAlertas } from "../services";

export function AlertasScreen() {
  const [alertas, setAlertas] = useState<AlertaCritico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarAlertas() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarAlertas();
      setAlertas(dados);
    } catch {
      setErro("Não foi possível carregar os alertas.");
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarAlertas();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alertas</Text>

      {carregando && <ActivityIndicator size="large" color="#dc2626" />}

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      <FlatList
        data={alertas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.titulo}</Text>
            <Text style={styles.info}>{item.descricao}</Text>
            <Text style={styles.nivel}>Nível: {item.nivel}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Text style={styles.data}>Data: {item.dataHora}</Text>
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
    color: "#991b1b",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#991b1b",
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 4,
  },
  nivel: {
    fontSize: 14,
    color: "#dc2626",
    fontWeight: "bold",
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    color: "#92400e",
    fontWeight: "bold",
    marginTop: 4,
  },
  data: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },
  erro: {
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 16,
  },
});