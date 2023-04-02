package com.skilldistillery.game.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.game.entities.Game;
import com.skilldistillery.game.repositories.GameRepository;

@Service
public class GameServiceImpl implements GameService {
	@Autowired
	private GameRepository gameRepo;

	@Override
	public List<Game> allGames() {

		return gameRepo.findAll();
	}

	@Override
	public Game getGame(int gameId) {
		Optional<Game> getGame = gameRepo.findById(gameId);
		Game game = null;
		if (getGame.isPresent()) {
			game = getGame.get();
		}
		return game;
	}

	@Override
	public Game create(Game gameNew) {
		return gameRepo.saveAndFlush(gameNew);
	}

	@Override
	public Game update(int id, Game game) {
		Game update = getGame(id);
		update.setName(game.getName());
		update.setPlayerMax(game.getPlayerMax());
		update.setPlayerMin(game.getPlayerMin());
		update.setDescription(game.getDescription());
		return gameRepo.save(update);
	}

	@Override
	public boolean deleteById(int gameId) {
		Game gameToDelete = getGame(gameId);
		if (gameToDelete != null) {
			gameRepo.delete(gameToDelete);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<Game> searchByKeywordInNameOrDescription(String keyword) {
		List<Game> searchName = gameRepo.findByDescriptionContaining(keyword);
		return searchName;
	}

	@Override
	public List<Game> searchByPlayerMin(int min) {
		return gameRepo.findByPlayerMinGreaterThanEqual(min);
	}

}
