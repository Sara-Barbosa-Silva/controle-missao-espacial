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
}