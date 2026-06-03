import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { AlertaCritico, Sensor, SistemaMonitorado } from "../interfaces";
import { listarAlertas, listarSensores, listarSistemas } from "../services";

export function GerenciamentoMissaoScreen() {
  const [sensores, setSensores] = useState<Sensor[]>([]);
  const [sistemas, setSistemas] = useState<SistemaMonitorado[]>([]);
  const [alertas, setAlertas] = useState<AlertaCritico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarDadosDaMissao() {
    try {
      setCarregando(true);
      setErro("");

      const [dadosSensores, dadosSistemas, dadosAlertas] =
        await Promise.all([
          listarSensores(),
          listarSistemas(),
          listarAlertas(),
        ]);

      setSensores(dadosSensores);
      setSistemas(dadosSistemas);
      setAlertas(dadosAlertas);
    } catch {
      setErro("Não foi possível carregar os dados da missão.");
    } finally {
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarDadosDaMissao();
    }, [])
  );

  const sensoresAtivos = sensores.filter((sensor) => sensor.ativo).length;
  const sistemasEmRisco = sistemas.filter((sistema) => sistema.status === "atencao" || sistema.status === "critico" ).length;
  const alertasAbertos = alertas.filter((alerta) => alerta.status === "aberto").length;
  const alertasCriticos = alertas.filter((alerta) => alerta.nivel === "critico").length;

  function definirStatusMissao() {
    if (alertasCriticos > 0 || sistemasEmRisco > 0) {
      return "Atenção operacional";
    }

    if (alertasAbertos > 0) {
      return "Monitoramento necessário";
    }

    return "Operação estável";
  }

  const statusMissao = definirStatusMissao();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Gerenciamento da Missão</Text>

      {carregando && <ActivityIndicator size="large" color="#7c3aed" />}

      {erro !== "" && <Text style={styles.erro}>{erro}</Text>}

      {!carregando && erro === "" && (
        <>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Estado</Text>
            <Text style={styles.statusTexto}>{statusMissao}</Text>
          </View>

          <View style={styles.grid}>
            <View style={styles.card}>
              <Text style={styles.numero}>{sensoresAtivos}</Text>
              <Text style={styles.label}>Sensores ativos</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.numero}>{sistemasEmRisco}</Text>
              <Text style={styles.label}>Sistemas em risco</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.numero}>{alertasAbertos}</Text>
              <Text style={styles.label}>Alertas abertos</Text>
            </View>

          </View>

          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Resumo</Text>

            <Text style={styles.itemResumo}>
              Sensores cadastrados: {sensores.length}
            </Text>

            <Text style={styles.itemResumo}>
              Sistemas monitorados: {sistemas.length}
            </Text>
          </View>

          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Interpretação</Text>

            <Text style={styles.texto}>
              {statusMissao === "Operação estável"
                ? "Todos os indicadores principais estão dentro do esperado"
                : "Verifique os alertas e sistemas monitorados"}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: "#ede9fe",
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#c4b5fd",
  },
  statusLabel: {
    fontSize: 14,
    color: "#5b21b6",
    fontWeight: "bold",
    marginBottom: 6,
  },
  statusTexto: {
    fontSize: 22,
    color: "#4c1d95",
    fontWeight: "bold",
  },
  grid: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 12,
  marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  numero: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: "#475569",
  },
  secao: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
  },
  itemResumo: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 6,
  },
  texto: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  erro: {
    color: "#dc2626",
    fontWeight: "bold",
    marginBottom: 16,
  },
});