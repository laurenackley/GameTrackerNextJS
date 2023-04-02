package com.skilldistillery.game.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.game.entities.Game;
import com.skilldistillery.game.services.GameService;
@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class GameController {

	@Autowired
	private GameService gameService;

	@GetMapping("games")
	public List<Game> listAllGames() {
		return gameService.allGames();
	}

	@GetMapping("games/{id}")
	public Game findById(@PathVariable("id") int id, HttpServletRequest req, HttpServletResponse res) {
		Game game = gameService.getGame(id);
		if (game == null) {
			res.setStatus(404);
		}
		return game;
	}

	@PostMapping("games")
	public Game createNew(@RequestBody Game game, HttpServletRequest req, HttpServletResponse res) {
		Game newGame = null;
		try {
			newGame = gameService.create(game);
			res.setStatus(201);
		} catch (Exception e) {
			System.err.println(e);
			res.setStatus(404);
		}
		return newGame;
	}

	@PutMapping("games/{id}")
	public Game updateGame(@PathVariable("id") int id, @RequestBody Game game, HttpServletRequest req,
			HttpServletResponse res) {
		Game update = null;
		try {
			update = gameService.update(id, game);
		} catch (Exception e) {
			// TODO: handle exception
			System.err.println(e);
			res.setStatus(404);
		}
		return update;
	}

	@DeleteMapping("games/{id}")
	public void deleteGame(@PathVariable("id") int id, HttpServletRequest req, HttpServletResponse res) {
		System.out.println("********"+id);
		try {
			if (gameService.deleteById(id)) {
				res.setStatus(204);
			} else {
				res.setStatus(404);
			}
		} catch (Exception e) {
			System.err.println(e);
			res.setStatus(400);
		}

	}

	@GetMapping("games/search/{keyword}")
	public List<Game> findByKeyword(@PathVariable("keyword") String keyword, HttpServletRequest req,
			HttpServletResponse res) {
		try {
			List<Game> keywordFind = gameService.searchByKeywordInNameOrDescription(keyword);
			if (keywordFind.isEmpty()) {
				res.setStatus(404);
			} else {
				res.setStatus(200);
			}
			return keywordFind;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);

		}

		return null;
	}

	@GetMapping("games/search/player/min/{min}")
	public List<Game> findGamesByPlayerMin(@PathVariable("min") int min, HttpServletRequest req,
			HttpServletResponse res) {
		try {
			List<Game> minPlayer = gameService.searchByPlayerMin(min);
			if (!minPlayer.isEmpty()) {
				res.setStatus(200);
			} else if (minPlayer.isEmpty()) {
				res.setStatus(404);
			}
			return minPlayer;
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
		return null;
	}

}
