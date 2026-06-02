package com.fiap.ec.backend_missao.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fiap.ec.backend_missao.model.SistemaMonitorado;
import com.fiap.ec.backend_missao.repository.SistemaMonitoradoRepository;

@Service
public class SistemaMonitoradoService {

    private final SistemaMonitoradoRepository sistemaMonitoradoRepository;

    public SistemaMonitoradoService(SistemaMonitoradoRepository sistemaMonitoradoRepository) {
        this.sistemaMonitoradoRepository = sistemaMonitoradoRepository;
    }

    public List<SistemaMonitorado> listarTodos() {
        return sistemaMonitoradoRepository.findAll();
    }

    public SistemaMonitorado salvar(SistemaMonitorado sistemaMonitorado) {
        return sistemaMonitoradoRepository.save(sistemaMonitorado);
    }
}