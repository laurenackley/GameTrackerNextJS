package com.skilldistillery.game.services;

import java.util.List;

import com.skilldistillery.game.entities.Game;

public interface GameService {
	List<Game> allGames();

	Game getGame(int gameId);

	Game create(Game gameNew);

	Game update(int id, Game game);

	boolean deleteById(int gameId);

	List<Game> searchByKeywordInNameOrDescription(String keyword);

	List<Game> searchByPlayerMin(int min);

}
