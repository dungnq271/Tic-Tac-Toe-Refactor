import { useState } from "react";
import { Turn } from "./Turn";
import { Button } from "./Button";
import { Board } from "./Board";
import { Score } from "./Score";
import { Modal } from "./Modal";
import { Attribution } from "./Attribution";
import { useLocalStorage } from "./useLocalStorage";

export interface Player {
  id: number;
  name: string;
  colorClass: string;
  iconClass: string;
}

export interface Move {
  player: Player;
  squareId: string;
}

export interface GameStatus {
  winner: Player | null;
  finished: boolean;
}

export interface Game {
  moves: Move[];
  status: GameStatus;
}

export interface GameHistory {
  currentMoves: Move[];
  currentRoundGames: Game[];
  allGames: Game[];
}

function App() {
  const storageKey: string = "live-t3-storage-key";

  const players: Player[] = [
    {
      id: 1,
      name: "Player 1",
      colorClass: "blue",
      iconClass: "fa-x",
    },
    {
      id: 2,
      name: "Player 2",
      colorClass: "green",
      iconClass: "fa-o",
    },
  ];

  const initialGameHistory: GameHistory = {
    currentMoves: [],
    currentRoundGames: [],
    allGames: [],
  };

  const winningPatterns = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];

  /* const [gameHistory, setGameHistory] = useState(initialGameHistory); */
  const [gameHistory, setGameHistory] = useLocalStorage(
    storageKey,
    initialGameHistory,
  );
  const [displayBtn, setDisplayBtn] = useState(false);
  const currentPlayer: Player = players[gameHistory.currentMoves.length % 2];

  /* window.addEventListener("storage", (event: StorageEvent) => {
   *   const { key, newValue } = event;
   *   // Only update state for other instance tabs
   *   if (key === storageKey)
   *     setGameHistory(newValue ? JSON.parse(newValue) : initialGameHistory);
   * }); */

  /* function getGameHistory() {
   *   const item = localStorage.getItem(storageKey);
   *   return item ? JSON.parse(item) : initialGameHistory;
   * } */

  function saveGameHistory(newGameHistory: GameHistory) {
    setGameHistory(newGameHistory);
    localStorage.setItem(storageKey, JSON.stringify(newGameHistory));
    setDisplayBtn(false);
  }

  function toggleMenu() {
    setDisplayBtn(!displayBtn);
  }

  function getStatus(currentMoves: Move[]) {
    let winner: Player | null = null;
    let finished: boolean = false;

    for (const player of players) {
      const playerMoves = currentMoves.filter(
        (move) => move.player.id === player.id,
      );
      const playerMoveIds = playerMoves.map((move) => move.squareId);

      // match if moves of any player contain winning pattern
      if (
        winningPatterns.some((pattern) =>
          pattern.every((id) => playerMoveIds.includes(String(id))),
        )
      ) {
        winner = player;
        break;
      }
    }

    // check tie
    if (currentMoves.length === 9) {
      finished = true;
    }

    return { winner: winner, finished: finished };
  }

  function onPlayerMove(squareId: string) {
    /* let newGameHistory: GameHistory = getGameHistory(); */
    let newGameHistory: GameHistory = structuredClone(gameHistory);
    const squareMove = newGameHistory.currentMoves.filter(
      (move) => move.squareId === squareId,
    );
    if (squareMove[0]) return;
    const newMove: Move = {
      player: currentPlayer,
      squareId: squareId,
    };
    newGameHistory.currentMoves.push(newMove);
    saveGameHistory(newGameHistory);
  }

  function resetGame() {
    /* let newGameHistory: GameHistory = getGameHistory(); */
    let newGameHistory: GameHistory = structuredClone(gameHistory);
    const currentGame: Game = {
      moves: newGameHistory.currentMoves,
      status: getStatus(newGameHistory.currentMoves),
    };
    newGameHistory.currentRoundGames.push(currentGame);
    newGameHistory.currentMoves = [];
    return newGameHistory;
  }

  function newRoundGame() {
    let newGameHistory = resetGame();
    newGameHistory.allGames.push(...newGameHistory.currentRoundGames);
    newGameHistory.currentRoundGames = [];
    return newGameHistory;
  }

  return (
    <>
      <div className="grid-container">
        <Turn player={currentPlayer} />
        <Button
          isDisplay={displayBtn}
          handleMenuBtnClick={toggleMenu}
          handleResetBtnClick={() => {
            const newGameHistory: GameHistory = resetGame();
            saveGameHistory(newGameHistory);
          }}
          handleNewRoundBtnClick={() => {
            const newGameHistory: GameHistory = newRoundGame();
            saveGameHistory(newGameHistory);
          }}
        />
        <Board moves={gameHistory.currentMoves} onPlayerMove={onPlayerMove} />
        <Score currentRoundGames={gameHistory.currentRoundGames} />
      </div>
      <Modal
        status={getStatus(gameHistory.currentMoves)}
        onModalBtnClick={() => {
          const newGameHistory: GameHistory = resetGame();
          saveGameHistory(newGameHistory);
        }}
      />
      <Attribution />
    </>
  );
}

export default App;
