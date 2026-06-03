import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { EventoOperacional } from "../interfaces";
import { listarEventos } from "../services";

export function EventosScreen() {
  const [eventos, setEventos] = useState<EventoOperacional[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarEventos() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarEventos();
      setEventos(dados);
    } catch {
      setErro("Não foi possível carregar os eventos.");
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarEventos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Eventos Operacionais</Text>

      {carregando && <ActivityIndicator size="large" color="#2563eb" />}

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      <FlatList
        data={eventos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.titulo}</Text>
            <Text style={styles.info}>{item.descricao}</Text>
            <Text style={styles.info}>Tipo: {item.tipo}</Text>
            <Text style={styles.nivel}>Nível: {item.nivel}</Text>
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
    color: "#0f172a",
    marginBottom: 16,
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
  nivel: {
    fontSize: 14,
    color: "#2563eb",
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