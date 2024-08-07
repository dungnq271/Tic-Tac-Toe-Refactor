import { View } from "./view.js";
import { Store } from "./store.js";

const players = [
  {
    id: 1,
    name: "player1",
    colorClass: "blue",
    iconClass: "fa-x",
  },
  {
    id: 2,
    name: "player2",
    colorClass: "green",
    iconClass: "fa-o",
  },
];

function init() {
  const store = new Store("live-t3-storage-key", players);
  const view = new View();

  // Current tab state changes
  store.addEventListener("statechange", () => {
    view.render(store.game);
  });

  // A different tab changes
  window.addEventListener("storage", () => {
    view.render(store.game);
  });

  // The first load of the document
  view.render(store.game);

  view.bindGameResetEvent((event) => {
    store.resetGame();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // Advance to the next state by pushing a move to the moves array
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
