import { Player } from "./Game";

interface TurnProps {
  player: Player;
}

export function Turn({ player }: TurnProps) {
  return (
    <div className="turn">
      <i className={`fa-solid ${player.iconClass} ${player.colorClass}`}></i>
      <p className={player.colorClass}>{player.name}, you are up</p>
    </div>
  );
}
