import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Game {
  _id: string;
  name: string;
  size: string;
  played: boolean;
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [newGame, setNewGame] = useState({ name: "", size: "", played: false });

  const fetchGames = async () => {
    try {
      const res = await axios.get<Game[]>("/api");
      setGames(res.data);
    } catch (error) {
      console.error("Error fetching games", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const addGame = async () => {
    if (!newGame.name.trim() || !newGame.size.trim()) return;

    try {
      await axios.post("/api", newGame);
      setNewGame({ name: "", size: "", played: false });
      fetchGames();
    } catch (error) {
      console.error("Error adding game", error);
    }
  };

  const deleteGame = async (id: string) => {
    try {
      await axios.delete(`/api/${id}`);
      fetchGames();
    } catch (error) {
      console.error("Error deleting game", error);
    }
  };

  const markAsPlayed = async (id: string) => {
    try {
      await axios.patch(`/api/${id}/play`);
      fetchGames();
    } catch (error) {
      console.error("Error marking as played", error);
    }
  };

  return (
    <div className="container">
      <h1>GamePlay</h1>

      <div className="add-game">
        <input
          placeholder="Game Name"
          value={newGame.name}
          onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
        />
       <input
          type="number"
          step="0.1"
          min="0"
          placeholder="Size"
          value={newGame.size}
          onChange={(e) =>
            setNewGame({ ...newGame, size: e.target.value })}
        />
        <button onClick={addGame}>Add Game</button>
      </div>

      <div className="games-list">
        {games.length === 0 && <p>No games found.</p>}
        {games.map((game) => (
          <div key={game._id} className="game-card">
            <div>
              <strong>{game.name}</strong> Size: {game.size} GB -{" "}
              {game.played ? "Played" : "Not played"}
            </div>
            <div className="buttons">
              {!game.played && (
                <button onClick={() => markAsPlayed(game._id)}>Mark Played</button>
              )}
              <button onClick={() => deleteGame(game._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
