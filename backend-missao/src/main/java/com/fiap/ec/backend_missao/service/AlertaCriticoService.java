package com.fiap.ec.backend_missao.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fiap.ec.backend_missao.model.AlertaCritico;
import com.fiap.ec.backend_missao.repository.AlertaCriticoRepository;

@Service
public class AlertaCriticoService {

    private final AlertaCriticoRepository alertaCriticoRepository;

    public AlertaCriticoService(AlertaCriticoRepository alertaCriticoRepository) {
        this.alertaCriticoRepository = alertaCriticoRepository;
    }

    public List<AlertaCritico> listarTodos() {
        return alertaCriticoRepository.findAll();
    }

    public AlertaCritico salvar(AlertaCritico alertaCritico) {
        return alertaCriticoRepository.save(alertaCritico);
    }
}