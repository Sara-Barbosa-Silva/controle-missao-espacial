package com.fiap.ec.backend_missao.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.ec.backend_missao.model.EventoOperacional;
import com.fiap.ec.backend_missao.service.EventoOperacionalService;

@RestController
@RequestMapping("/eventos")
public class EventoOperacionalController {

    private final EventoOperacionalService eventoOperacionalService;

    public EventoOperacionalController(EventoOperacionalService eventoOperacionalService) {
        this.eventoOperacionalService = eventoOperacionalService;
    }

    @GetMapping
    public List<EventoOperacional> listarTodos() {
        return eventoOperacionalService.listarTodos();
    }

    @PostMapping
    public EventoOperacional salvar(@RequestBody EventoOperacional eventoOperacional) {
        return eventoOperacionalService.salvar(eventoOperacional);
    }
}