import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

export default function AddGame() {
  // const [games, setGames] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [playerMinimum, setPlayerMinimum] = useState("");
  const [playerMaximum, setPlayerMaximum] = useState("");

  const [isPending, setIsPending] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const game = { name, description, playerMinimum, playerMaximum };
    setIsPending(true);
    fetch("http://localhost:8085/api/games/", {
      method: "POST",
      headers: {
        "Content-type": "application/json"},
      body: JSON.stringify(game)
      // {
      //   name: "name",
      //   description: "description",
      //   player_minimum: "playerMinimum",
      //   player_maximum: "playerMaximum",
      // }
      ,
    })
      .then((res) => res.json())
      .then(() => {
        // setGames((games) => [game, ...games]);
        // setName("");
        // setDescription("");
        // setPlayerMinimum("");
        // setPlayerMaximum("");
        console.log("added new game");
        setIsPending(false);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="add-game-container">
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" 
        required 
        value={name}
        onChange={(e) => setName(e.target.value)} />
        <label>Description:</label>
        <input type="text"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
         />
        <label>Player Minimum:</label>
        <input type="number" 
        required
        value={playerMinimum}
        onChange={(e) => setPlayerMinimum(e.target.value)}
        />
        <label>Player Maximum:</label>
        <input type="number" 
        required
        value={playerMaximum}
        onChange={(e) => setPlayerMaximum(e.target.value)}
        />
        {/* <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button> */}
        {!isPending && <button>Add Game</button>}
        {isPending && <button disabled>Adding Game...</button>}
      </form>
    </div>
  );
}
