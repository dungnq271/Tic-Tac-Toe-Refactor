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

const initialState = {
  currentGameMoves: [],
  history: {
    currentRoundGames: [],
    allGames: [],
  },
};

export class Store extends EventTarget {
  constructor(storageKey, players) {
    super();
    this.storageKey = storageKey;
    this.players = players;
  }

  get game() {
    const state = this.#getState();
    console.log(state);
    const currentPlayer = this.#currentPlayer(state);
    let winner = null;
    let tie = null;

    // get moves of each player
    for (const player of this.players) {
      const playerMoves = state.currentGameMoves.filter(
        (move) => move.player.id === player.id
      );
      const playerMoveIds = playerMoves.map((move) => move.squareId);

      // match if moves of any player contain winning pattern
      if (
        winningPatterns.some((pattern) =>
          pattern.every((id) => playerMoveIds.includes(id))
        )
      ) {
        winner = player.id;
        break;
      }
    }

    // check tie
    if (winner === null && state.currentGameMoves.length === 9) {
      tie = true;
    }

    return {
      player: currentPlayer,
      winner,
      tie,
      moves: state.currentGameMoves,
      history: state.history.currentRoundGames,
    };
  }

  playerMove(squareId) {
    const currentState = structuredClone(this.#getState());
    const player = this.#currentPlayer(currentState);
    currentState.currentGameMoves.push({ player, squareId });
    this.#saveState(currentState);
  }

  resetGame() {
    const { _, winner, tie, moves } = this.game;

    const currentState = structuredClone(this.#getState());

    const gameStates = {
      winner,
      tie,
      moves,
    };
    currentState.history.currentRoundGames.push(gameStates);

    currentState.currentGameMoves = [];
    this.#saveState(currentState);
  }

  newRound() {
    this.resetGame();

    const currentState = structuredClone(this.#getState());
    currentState.history.allGames.push(
      ...currentState.history.currentRoundGames
    );
    currentState.history.currentRoundGames = [];
    this.#saveState(currentState);
  }

  #currentPlayer(state) {
    return this.players[state.currentGameMoves.length % 2];
  }

  #getState() {
    const item = localStorage.getItem(this.storageKey);
    return item ? JSON.parse(item) : initialState;
  }

  #saveState(newState) {
    localStorage.setItem(this.storageKey, JSON.stringify(newState));
    this.dispatchEvent(new Event("statechange"));
  }
}
