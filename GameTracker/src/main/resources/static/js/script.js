let gameList;
let updateGame;


window.addEventListener("load", function(evt) {
	init();
});

function init() {
	loadGames();

	document.createGame.create.addEventListener("click", function(event) {
		event.preventDefault();
		let passedName = document.createGame.name.value;
		let passedDescription = document.createGame.description.value;
		let passedPlayerMin = document.createGame.playerMin.value;
		let passedPlayerMax = document.createGame.playerMax.value;
		if (
			passedName !== "" &&
			passedDescription !== "" &&
			!isNaN(passedPlayerMin) &&
			!isNaN(passedPlayerMax)
		) {
			let newGame = {
				name: passedName,
				description: passedDescription,
				playerMin: passedPlayerMin,
				playerMax: passedPlayerMax
			};
			createGame(newGame);
		}
		document.createGame.reset();
	});

	document.searchKeyword.search.addEventListener('click', function(event) {
		event.preventDefault();
		let keyword = document.searchKeyword.keyword.value;
		console.log("keyword passed: " + keyword);
		searchKeyword(keyword);
	});
}







function addFoundResults(gameResults) {
	for( let game of gameResults){
	let searchDiv = document.getElementById("searchKeywordDiv");
	let name = document.getElementById('name');
	name.textContent = game.name;
	searchDiv.appendChild(name);
	let description = document.getElementById('description');
	description.textContent = "Description: "+ game.description;
	searchDiv.appendChild(description);
	let playerMin = document.getElementById('playerMin');
	playerMin.textContent = "Player Minimum: " +game.playerMin;
	searchDiv.appendChild(playerMin);
	let playerMax = document.getElementById('playerMax');
	playerMax.textContent = "Player Maximum: "+game.playerMax;
	searchDiv.appendChild(playerMax);
	}
}



function searchKeyword(keyword) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/games/search/" + keyword);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status >= 200 && xhr.status < 300) {
				gameResults = JSON.parse(xhr.responseText);
				console.log(gameResults)
				addFoundResults(gameResults)
			console.log("Successful");
			} else {
				gameResults = JSON.parse(xhr.responseText);
				console.log(gameResults);
			}
		}
	}
	xhr.send();
}

function organize(gameList){
//iterate over list but keep the game with the longest description 
//	for(let game of gameList){
//		let previous = 0;
//		if(game.description.length > previous){
//			previous = game.description.length;
//		}
//		
//	console.log(previous);
//	}
	let largest = 0;
	let game;
for(let i = 0; i < gameList.length; i++){
	if(largest < gameList[i].description.length){
		largest = gameList[i].description.length;
		game = gameList[i];
	}
}
console.log(game);

	let dataAgg = document.getElementById('organize');
	dataAgg.innerHTML = '';
	let winner = document.createElement('h1');
	winner.textContent = game.name;
	dataAgg.appendChild(winner);
	let winnerLength = document.createElement('h3');
	winnerLength.textContent = "Character count: "+game.description.length;
	dataAgg.appendChild(winnerLength);

}

function loadGames() {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "api/games");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				gameList = JSON.parse(xhr.responseText);
				displayGames(gameList);
				organize(gameList);
			} else {
				//TODO - display an error somehwere ?
			}
		}
	};
	xhr.send();
}

function deleteGame(gameId) {
	let xhr = new XMLHttpRequest();
	xhr.open("DELETE", "api/games/" + gameId, true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 204) {
				gameList = document.getElementById("gameList");
				gameList.style.display = "none";
				loadGames();
			} else {
				console.log("Couldn't delete");
			}
		}
	};
	xhr.send();
}

function createGame(game) {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "api/games", true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				let data = JSON.parse(xhr.responseText);
				loadGames();
			} else if (xhr.status === 404) {
				displayError("Game not created");
			}
		}
	};
	let userObjectJson = JSON.stringify(game);
	xhr.send(userObjectJson);
}

function addUpdatedGame(gameId, game) {
	let passedName = document.updateGame.name.value;
	let passedDescription = document.updateGame.description.value;
	let passedPlayerMin = document.updateGame.playerMin.value;
	let passedPlayerMax = document.updateGame.playerMax.value;


	game.name = passedName;
	game.description = passedDescription;
	game.playerMin = passedPlayerMin;
	game.playerMax = passedPlayerMax;
	editGame(gameId, game);
}

function editGame(gameId, game) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/games/' + gameId, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200 || xhr.status === 201) {
				data = JSON.parse(xhr.responseText);
				gameList = document.getElementById("gameList");
				gameList.style.display = "none";
				loadGames();
			let updateButtonDiv = document.getElementById('updateButton');
				updateButtonDiv.innerHTML = '';
			}
		}
	}
	let userObjectJson = JSON.stringify(game);
	xhr.send(userObjectJson);
}



function displayGames(allGames) {
	//DOM - show
	let gameNameDiv = document.getElementById("gameName");
	gameNameDiv.textContent = '';



	for (let i = 0; i < allGames.length; i++) {
		let name = document.createElement("h1");
		name.id = i;
		name.addEventListener("click", function() {
			displayGameInfo(allGames[i]);
		});
		name.textContent = allGames[i].name;
		gameNameDiv.appendChild(name);
	}
}
function displayGameInfo(game) {
	if (typeof game !== 'undefined') {
		gameList = document.getElementById("gameList");
		gameList.style.display = "inline";
		let name = document.getElementById("name");
		name.textContent = game.name;
		let description = document.getElementById("description");
		description.textContent = game.description;
		let playerMin = document.getElementById("playerMin");
		playerMin.textContent = "Player Minimum: " + game.playerMin;
		let playerMax = document.getElementById("playerMax");
		playerMax.textContent = "Player Maximum: " + game.playerMax;

		let deleteDiv = document.getElementById('deleteButton');
		deleteDiv.innerHTML = '';


		let deleteButton = document.createElement('button');
		deleteButton.textContent = "Delete Game"
		deleteDiv.appendChild(deleteButton);
		deleteButton.addEventListener('click', function(e) {
			e.preventDefault();
			let id = game.id;
			deleteGame(id);
		});

		let updateButtonDiv = document.getElementById('updateButton');
		let updateButton = document.createElement('button');
		updateButton.textContent = "Update Game";
		updateButtonDiv.appendChild(updateButton);
		updateButton.addEventListener('click', function(e) {
			e.preventDefault();
			let id = game.id;
			addUpdatedGame(id, game);
			document.updateGame.reset();
			updateButton.remove();
		});
	}
}