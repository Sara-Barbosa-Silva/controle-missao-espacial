package com.fiap.ec.backend_missao.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.ec.backend_missao.model.AlertaCritico;
import com.fiap.ec.backend_missao.service.AlertaCriticoService;

@RestController
@RequestMapping("/alertas")
public class AlertaCriticoController {

    private final AlertaCriticoService alertaCriticoService;

    public AlertaCriticoController(AlertaCriticoService alertaCriticoService) {
        this.alertaCriticoService = alertaCriticoService;
    }

    @GetMapping
    public List<AlertaCritico> listarTodos() {
        return alertaCriticoService.listarTodos();
    }

    @PostMapping
    public AlertaCritico salvar(@RequestBody AlertaCritico alertaCritico) {
        return alertaCriticoService.salvar(alertaCritico);
    }
}