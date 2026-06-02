package com.fiap.ec.backend_missao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fiap.ec.backend_missao.model.AlertaCritico;

public interface AlertaCriticoRepository extends JpaRepository<AlertaCritico, Long> {
}