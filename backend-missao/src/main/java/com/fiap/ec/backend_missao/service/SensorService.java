package com.fiap.ec.backend_missao.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fiap.ec.backend_missao.model.Sensor;
import com.fiap.ec.backend_missao.repository.SensorRepository;

@Service
public class SensorService {

    private final SensorRepository sensorRepository;

    public SensorService(SensorRepository sensorRepository) {
        this.sensorRepository = sensorRepository;
    }

    public List<Sensor> listarTodos() {
        return sensorRepository.findAll();
    }

    public Sensor salvar(Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    public Sensor atualizar(Long id, Sensor sensorAtualizado) {
        Sensor sensor = sensorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sensor não encontrado"));

        sensor.setNome(sensorAtualizado.getNome());
        sensor.setTipo(sensorAtualizado.getTipo());
        sensor.setUnidadeMedida(sensorAtualizado.getUnidadeMedida());
        sensor.setValorAtual(sensorAtualizado.getValorAtual());
        sensor.setLimiteAtencao(sensorAtualizado.getLimiteAtencao());
        sensor.setLimiteCritico(sensorAtualizado.getLimiteCritico());
        sensor.setAtivo(sensorAtualizado.getAtivo());

        return sensorRepository.save(sensor);
    }
}