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

    public SistemaMonitorado atualizar(Long id, SistemaMonitorado sistemaAtualizado) {
        SistemaMonitorado sistema = sistemaMonitoradoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sistema monitorado não encontrado"));

        sistema.setNome(sistemaAtualizado.getNome());
        sistema.setDescricao(sistemaAtualizado.getDescricao());
        sistema.setStatus(sistemaAtualizado.getStatus());
        sistema.setAtivo(sistemaAtualizado.getAtivo());

        return sistemaMonitoradoRepository.save(sistema);
    }
}