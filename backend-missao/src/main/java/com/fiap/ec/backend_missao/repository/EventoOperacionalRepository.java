package com.fiap.ec.backend_missao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fiap.ec.backend_missao.model.EventoOperacional;

public interface EventoOperacionalRepository extends JpaRepository<EventoOperacional, Long> {
}