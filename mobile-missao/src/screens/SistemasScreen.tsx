import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import { SistemaMonitorado } from "../interfaces";
import { RootStackParamList } from "../navigation/AppNavigator";
import { atualizarSistema, cadastrarAlerta, listarSistemas } from "../services";
import { StatusSistema } from "../types";

type SistemasScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Sistemas">;
};

export function SistemasScreen({ navigation }: SistemasScreenProps) {
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

  function textoStatus(status: StatusSistema) {
    if (status === "critico") {
      return "Crítico";
    }

    if (status === "atencao") {
      return "Atenção";
    }

    if (status === "inativo") {
      return "Inativo";
    }

    return "Operacional";
  }

  function estiloStatus(status: StatusSistema) {
    if (status === "critico") {
      return styles.statusCritico;
    }

    if (status === "atencao") {
      return styles.statusAtencao;
    }

    if (status === "inativo") {
      return styles.statusInativo;
    }

    return styles.statusOperacional;
  }

  async function alterarStatusSistema(
    sistema: SistemaMonitorado,
    novoStatus: StatusSistema
  ) {
    try {
      await atualizarSistema(sistema.id, {
        nome: sistema.nome,
        descricao: sistema.descricao,
        status: novoStatus,
        ativo: novoStatus !== "inativo",
      });

      if (novoStatus === "atencao") {
        await cadastrarAlerta({
          titulo: sistema.nome,
          descricao: `O ${sistema.nome} foi marcado como atenção e precisa de monitoramento.`,
          nivel: "alto",
          status: "aberto",
          dataHora: new Date().toISOString(),
        });

        Alert.alert(
          "Status atualizado",
          "Sistema marcado como atenção. Um alerta foi gerado."
        );
      } else if (novoStatus === "critico") {
        await cadastrarAlerta({
          titulo: sistema.nome,
          descricao: `O ${sistema.nome} foi marcado como crítico e exige ação imediata.`,
          nivel: "critico",
          status: "aberto",
          dataHora: new Date().toISOString(),
        });

        Alert.alert(
          "Status crítico",
          "Sistema marcado como crítico. Um alerta crítico foi gerado."
        );
      } else {
        Alert.alert("Status atualizado", "Sistema atualizado com sucesso.");
      }

      await carregarSistemas();
    } catch {
      Alert.alert("Erro", "Não foi possível atualizar o sistema.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistemas Monitorados</Text>

      <TouchableOpacity
        style={styles.botaoCadastrar}
        onPress={() => navigation.navigate("CadastroSistema")}
      >
        <Text style={styles.textoBotao}>Cadastrar novo sistema</Text>
      </TouchableOpacity>

      {carregando && <ActivityIndicator size="large" color="#2563eb" />}

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      {!carregando && sistemas.length === 0 && erro === "" && (
        <Text style={styles.texto}>Nenhum sistema cadastrado.</Text>
      )}

      <FlatList
        data={sistemas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>

            <Text style={styles.descricao}>{item.descricao}</Text>

            <Text style={styles.label}>Status:</Text>
            <Text style={estiloStatus(item.status)}>
              {textoStatus(item.status)}
            </Text>

            <View style={styles.acoes}>
              <TouchableOpacity
                style={styles.botaoOperacional}
                onPress={() => alterarStatusSistema(item, "operacional")}
              >
                <Text style={styles.textoBotao}>Operacional</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoAtencao}
                onPress={() => alterarStatusSistema(item, "atencao")}
              >
                <Text style={styles.textoBotao}>Atenção</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoCritico}
                onPress={() => alterarStatusSistema(item, "critico")}
              >
                <Text style={styles.textoBotao}>Crítico</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoInativo}
                onPress={() => alterarStatusSistema(item, "inativo")}
              >
                <Text style={styles.textoBotao}>Inativo</Text>
              </TouchableOpacity>
            </View>
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
  botaoCadastrar: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
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
  descricao: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  statusOperacional: {
    fontSize: 16,
    color: "#16a34a",
    fontWeight: "bold",
    marginBottom: 12,
  },
  statusAtencao: {
    fontSize: 16,
    color: "#ca8a04",
    fontWeight: "bold",
    marginBottom: 12,
  },
  statusCritico: {
    fontSize: 16,
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 12,
  },
  statusInativo: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "bold",
    marginBottom: 12,
  },
  acoes: {
    gap: 8,
  },
  botaoOperacional: {
    backgroundColor: "#16a34a",
    padding: 10,
    borderRadius: 8,
  },
  botaoAtencao: {
    backgroundColor: "#ca8a04",
    padding: 10,
    borderRadius: 8,
  },
  botaoCritico: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 8,
  },
  botaoInativo: {
    backgroundColor: "#64748b",
    padding: 10,
    borderRadius: 8,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  erro: {
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 16,
  },
});