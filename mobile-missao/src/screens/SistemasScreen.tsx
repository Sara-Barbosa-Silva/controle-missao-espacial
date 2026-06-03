import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import { SistemaMonitorado } from "../interfaces";
import { listarSistemas } from "../services";

export function SistemasScreen() {
  const [sistemas, setSistemas] = useState<SistemaMonitorado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarSistemas() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarSistemas();
      setSistemas(dados);
    } catch {
      setErro("Não foi possível carregar os sistemas.");
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarSistemas();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistemas Monitorados</Text>

      {carregando && <ActivityIndicator size="large" color="#2563eb" />}

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      <FlatList
        data={sistemas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>{item.descricao}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
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
  status: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "bold",
    marginTop: 4,
  },
  ativo: {
    marginTop: 6,
    color: "#16a34a",
    fontWeight: "bold",
  },
  inativo: {
    marginTop: 6,
    color: "#dc2626",
    fontWeight: "bold",
  },
  erro: {
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 16,
  },
});