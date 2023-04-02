package com.skilldistillery.game.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Game {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	@Column(name = "player_minimum")
	private int playerMin;
	@Column(name = "player_maximum")
	private int playerMax;

	public Game() {
	}

	public Game(int id, String name, String description, int playerMin, int playerMax) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.playerMin = playerMin;
		this.playerMax = playerMax;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPlayerMin() {
		return playerMin;
	}

	public void setPlayerMin(int playerMin) {
		this.playerMin = playerMin;
	}

	public int getPlayerMax() {
		return playerMax;
	}

	public void setPlayerMax(int playerMax) {
		this.playerMax = playerMax;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Game other = (Game) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return "Game [id=" + id + ", name=" + name + ", description=" + description + ", playerMin=" + playerMin
				+ ", playerMax=" + playerMax + "]";
	}
}
