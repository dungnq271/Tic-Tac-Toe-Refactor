import { GameStatus } from "./Game";

interface ModalProps {
  status: GameStatus;
  onModalBtnClick: { (): void };
}

export function Modal({ status, onModalBtnClick }: ModalProps) {
  return (
    <div
      className={`result-modal ${!(status.finished || status.winner) && "hidden"}`}
    >
      <div className="modal-body">
        <p>{status.winner ? `${status.winner.name} wins!` : "Tie!"}</p>
        <button onClick={onModalBtnClick}>Play again</button>
      </div>
    </div>
  );
}
