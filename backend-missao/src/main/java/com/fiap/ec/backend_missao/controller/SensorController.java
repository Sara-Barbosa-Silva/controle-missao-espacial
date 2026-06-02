package com.fiap.ec.backend_missao.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.ec.backend_missao.model.Sensor;
import com.fiap.ec.backend_missao.service.SensorService;

@RestController
@RequestMapping("/sensores")
public class SensorController {

    private final SensorService sensorService;

    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @GetMapping
    public List<Sensor> listarTodos() {
        return sensorService.listarTodos();
    }

    @PostMapping
    public Sensor salvar(@RequestBody Sensor sensor) {
        return sensorService.salvar(sensor);
    }
}