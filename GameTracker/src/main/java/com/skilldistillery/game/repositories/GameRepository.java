package com.skilldistillery.game.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.game.entities.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
	List<Game> findByNameContaining(String keyword);
	List<Game> findByDescriptionContaining(String keyword);
	List<Game> findByPlayerMinGreaterThanEqual(int min);
	}
