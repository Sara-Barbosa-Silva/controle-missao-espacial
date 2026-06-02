import { useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function GalaxyBackground() {
  const { width, height } = useWindowDimensions();

  const estrelas = useMemo(() => {
    return Array.from({ length: 140 }, (_, index) => ({
      id: index,
      top: Math.random() * height,
      left: Math.random() * width,
      size: Math.random() * 2.2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }));
  }, [width, height]);

  const estrelasBrilhantes = useMemo(() => {
    return Array.from({ length: 18 }, (_, index) => ({
      id: index,
      top: Math.random() * height,
      left: Math.random() * width,
      size: Math.random() * 10 + 6,
      opacity: Math.random() * 0.4 + 0.6,
    }));
  }, [width, height]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={["#02030a", "#050816", "#0b1026", "#140b2d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Nebulosas */}
      <View style={[styles.nebulosa, styles.nebulosaRoxa1]} />
      <View style={[styles.nebulosa, styles.nebulosaAzul]} />
      <View style={[styles.nebulosa, styles.nebulosaRosa]} />
      <View style={[styles.nebulosa, styles.nebulosaRoxa2]} />

      {/* Estrelas pequenas */}
      {estrelas.map((estrela) => (
        <View
          key={`estrela-${estrela.id}`}
          style={[
            styles.estrela,
            {
              top: estrela.top,
              left: estrela.left,
              width: estrela.size,
              height: estrela.size,
              borderRadius: estrela.size / 2,
              opacity: estrela.opacity,
            },
          ]}
        />
      ))}

      {/* Estrelas brilhantes */}
      {estrelasBrilhantes.map((estrela) => (
        <View
          key={`estrela-brilhante-${estrela.id}`}
          style={[
            styles.estrelaBrilhante,
            {
              top: estrela.top,
              left: estrela.left,
              width: estrela.size,
              height: estrela.size,
              opacity: estrela.opacity,
            },
          ]}
        >
          <View style={styles.pontoCentral} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  nebulosa: {
    position: "absolute",
    borderRadius: 999,
  },

  nebulosaRoxa1: {
    width: 260,
    height: 260,
    backgroundColor: "rgba(124, 58, 237, 0.18)",
    top: 60,
    left: -40,
  },

  nebulosaAzul: {
    width: 320,
    height: 320,
    backgroundColor: "rgba(59, 130, 246, 0.14)",
    top: 220,
    right: -80,
  },

  nebulosaRosa: {
    width: 220,
    height: 220,
    backgroundColor: "rgba(236, 72, 153, 0.10)",
    bottom: 140,
    left: 10,
  },

  nebulosaRoxa2: {
    width: 280,
    height: 280,
    backgroundColor: "rgba(168, 85, 247, 0.10)",
    bottom: -30,
    right: 20,
  },

  estrela: {
    position: "absolute",
    backgroundColor: "#ffffff",
  },

  estrelaBrilhante: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  pontoCentral: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#ffffff",
  },
});