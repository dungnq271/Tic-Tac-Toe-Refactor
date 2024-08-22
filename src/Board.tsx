import { Move } from "./Game";
import classNames from "classnames";

interface PlayerMoveHandler {
  (id: string): void;
}

interface PlayerMoveProps {
  moves: Move[];
  onPlayerMove: PlayerMoveHandler;
}

interface SquareClickProps {
  id: string;
  moves: Move[];
  onSquareClick: PlayerMoveHandler;
}

function Square({ id, moves, onSquareClick }: SquareClickProps) {
  const squareMove = moves.filter((move) => move.squareId === id);
  const player = squareMove[0]?.player;

  function handleClick() {
    onSquareClick(id);
  }

  return (
    <div className="grid-square" id={id} onClick={handleClick}>
      {player && (
        <i
          className={
            /* `fa-solid ${player.iconClass} ${player.colorClass}` */
            classNames("fa-solid", player.iconClass, player.colorClass)
          }
        ></i>
      )}
    </div>
  );
}

export function Board({ moves, onPlayerMove }: PlayerMoveProps) {
  function handleClick(id: string) {
    onPlayerMove(id);
  }

  return (
    <>
      <Square id="1" moves={moves} onSquareClick={handleClick} />
      <Square id="2" moves={moves} onSquareClick={handleClick} />
      <Square id="3" moves={moves} onSquareClick={handleClick} />
      <Square id="4" moves={moves} onSquareClick={handleClick} />
      <Square id="5" moves={moves} onSquareClick={handleClick} />
      <Square id="6" moves={moves} onSquareClick={handleClick} />
      <Square id="7" moves={moves} onSquareClick={handleClick} />
      <Square id="8" moves={moves} onSquareClick={handleClick} />
      <Square id="9" moves={moves} onSquareClick={handleClick} />
    </>
  );
}
