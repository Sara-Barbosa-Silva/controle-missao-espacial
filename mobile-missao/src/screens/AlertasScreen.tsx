import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AlertaCritico } from "../interfaces";
import { StatusAlerta } from "../types/statusAlerta";
import { listarAlertas, atualizarAlerta } from "../services";

export function AlertasScreen() {
  const [alertas, setAlertas] = useState<AlertaCritico[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarAlertas() {
    try {
      setCarregando(true);
      setErro("");

      const dados = await listarAlertas();

      setAlertas(dados);
    } catch (error) {
      console.log(error);
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

  async function handleAlterarStatusAlerta(
    alerta: AlertaCritico,
    novoStatus: StatusAlerta
  ) {
    try {
      const alertaAtualizado: AlertaCritico = {
        ...alerta,
        status: novoStatus,
      };

      await atualizarAlerta(alerta, novoStatus);

      setAlertas((alertasAtuais) =>
        alertasAtuais.map((item) =>
          item.id === alerta.id ? alertaAtualizado : item
        )
      );

      Alert.alert("Sucesso", "Status do alerta atualizado.");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível atualizar o status do alerta.");
    }
  }

  function textoStatusAlerta(status: StatusAlerta) {
    if (status === "aberto") {
      return "Aberto";
    }

    if (status === "analise") {
      return "Em análise";
    }

    return "Resolvido";
  }

  function textoNivelAlerta(nivel: string) {
    if (nivel === "critico") {
      return "Crítico";
    }

    if (nivel === "alto") {
      return "Alto";
    }

    return nivel;
  }

  function formatarData(dataHora: string) {
    return new Date(dataHora).toLocaleString("pt-BR");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alertas</Text>

      {carregando && <ActivityIndicator size="large" color="#dc2626" />}

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      {!carregando && alertas.length === 0 && erro === "" && (
        <Text style={styles.mensagemVazia}>Nenhum alerta cadastrado.</Text>
      )}

      <FlatList
        data={alertas}
        keyExtractor={(item) => String(item.id)}
        refreshing={carregando}
        onRefresh={carregarAlertas}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.titulo}</Text>

            <Text style={styles.descricao}>{item.descricao}</Text>

            <Text style={styles.nivel}>
              Nível: {textoNivelAlerta(item.nivel)}
            </Text>

            <Text style={styles.status}>
              Status: {textoStatusAlerta(item.status)}
            </Text>

            <Text style={styles.data}>
              Data: {formatarData(item.dataHora)}
            </Text>

            {item.status === "aberto" && (
              <TouchableOpacity
                style={styles.botaoAnalise}
                onPress={() => handleAlterarStatusAlerta(item, "analise")}
              >
                <Text style={styles.textoBotao}>Análise</Text>
              </TouchableOpacity>
            )}

            {item.status === "analise" && (
              <TouchableOpacity
                style={styles.botaoResolver}
                onPress={() => handleAlterarStatusAlerta(item, "resolvido")}
              >
                <Text style={styles.textoBotao}>Resolver alerta</Text>
              </TouchableOpacity>
            )}
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

  descricao: {
    fontSize: 15,
    color: "#334155",
    marginBottom: 8,
    lineHeight: 21,
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

  mensagemVazia: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
  },

  botaoAnalise: {
    backgroundColor: "#f59e0b",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },

  botaoResolver: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },

  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});