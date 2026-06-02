package com.fiap.ec.backend_missao.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fiap.ec.backend_missao.model.EventoOperacional;
import com.fiap.ec.backend_missao.repository.EventoOperacionalRepository;

@Service
public class EventoOperacionalService {

    private final EventoOperacionalRepository eventoOperacionalRepository;

    public EventoOperacionalService(EventoOperacionalRepository eventoOperacionalRepository) {
        this.eventoOperacionalRepository = eventoOperacionalRepository;
    }

    public List<EventoOperacional> listarTodos() {
        return eventoOperacionalRepository.findAll();
    }

    public EventoOperacional salvar(EventoOperacional eventoOperacional) {
        return eventoOperacionalRepository.save(eventoOperacional);
    }
}