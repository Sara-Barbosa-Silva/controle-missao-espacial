package com.fiap.ec.backend_missao.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.ec.backend_missao.model.SistemaMonitorado;
import com.fiap.ec.backend_missao.service.SistemaMonitoradoService;

@RestController
@RequestMapping("/sistemas")
public class SistemaMonitoradoController {

    private final SistemaMonitoradoService sistemaMonitoradoService;

    public SistemaMonitoradoController(SistemaMonitoradoService sistemaMonitoradoService) {
        this.sistemaMonitoradoService = sistemaMonitoradoService;
    }

    @GetMapping
    public List<SistemaMonitorado> listarTodos() {
        return sistemaMonitoradoService.listarTodos();
    }

    @PostMapping
    public SistemaMonitorado salvar(@RequestBody SistemaMonitorado sistemaMonitorado) {
        return sistemaMonitoradoService.salvar(sistemaMonitorado);
    }
}