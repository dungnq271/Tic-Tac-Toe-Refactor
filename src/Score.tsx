import { Game } from "./Game";

interface ScoreProps {
  currentRoundGames: Game[];
}

export function Score({ currentRoundGames }: ScoreProps) {
  return (
    <>
      <div className="stat-bar" id="player-1">
        <p className="header">Player 1</p>
        <p className="stat">
          {
            currentRoundGames.filter((game) => game.status.winner?.id === 1)
              .length
          }{" "}
          wins
        </p>
      </div>
      <div className="stat-bar" id="ties">
        <p className="header">Ties</p>
        <p className="stat">
          {
            currentRoundGames.filter(
              (game) => !game.status.winner && game.status.finished,
            ).length
          }{" "}
          ties
        </p>
      </div>
      <div className="stat-bar" id="player-2">
        <p className="header">Player 2</p>
        <p className="stat">
          {
            currentRoundGames.filter((game) => game.status.winner?.id === 2)
              .length
          }{" "}
          wins
        </p>
      </div>
    </>
  );
}
