export class View {
  $ = {
    menuBtn: this.#qs(".menu-btn"),
    menuIcon: this.#qs(".fa-angle-down"),
    actionModal: this.#qs(".action-modal"),
    resetBtn: this.#qs("#reset-btn"),
    newRoundBtn: this.#qs("#new-round-btn"),
    gridSquares: this.#qsAll(".grid-square"),
    turnIndicator: this.#qs(".turn"),
    modal: this.#qs(".result-modal"),
    modalResult: this.#qs(".modal-body p"),
    modalButton: this.#qs(".modal-body button"),
    player1Wins: this.#qs("#player-1 p.stat"),
    player2Wins: this.#qs("#player-2 p.stat"),
    ties: this.#qs("#ties p.stat"),
  };

  constructor(store, players) {
    this.store = store;
    this.players = players;
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu(event);
    });
  }

  render(game) {
    const { player, winner, tie, moves, history } = game;

    this.#toggleMenu();
    this.#initializeMoves(moves);
    this.#updateTurnIndicator(player);
    this.#renderResultModal(winner, tie);
    this.#renderScore(history);
  }

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalButton.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$.gridSquares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  #toggleMenu(event = null) {
    if (event) {
      this.$.actionModal.classList.toggle("hidden");
      this.$.menuBtn.classList.toggle("border-expanded");
      this.$.actionModal.classList.toggle("border-expanded");
      this.$.menuIcon.classList.toggle("reverse-direction");
    } else {
      this.$.actionModal.classList.add("hidden");
      this.$.menuBtn.classList.remove("border-expanded");
      this.$.actionModal.classList.remove("border-expanded");
      this.$.menuIcon.classList.remove("reverse-direction");
    }
  }

  #initializeMoves(moves) {
    this.$.gridSquares.forEach((square) => {
      this.#clearSquare(square);
    });
    moves.forEach((move) => {
      this.#handlePlayerMove(move);
    });
  }

  #clearSquare(square) {
    if (square.hasChildNodes()) {
      square.removeChild(square.firstChild);
    }
  }

  #handlePlayerMove(move) {
    const { player, squareId } = move;
    const squareTarget = this.$.gridSquares[squareId - 1];

    const moveRender = document.createElement("i");
    moveRender.setAttribute(
      "class",
      "fa-solid" + " " + player.iconClass + " " + player.colorClass
    );
    squareTarget.appendChild(moveRender);
  }

  #updateTurnIndicator(currentPlayer) {
    const turnI = document.createElement("i");
    turnI.setAttribute(
      "class",
      "fa-solid" +
        " " +
        currentPlayer.iconClass +
        " " +
        currentPlayer.colorClass
    );

    const turnP = document.createElement("p");
    turnP.setAttribute("class", currentPlayer.colorClass);
    turnP.textContent = `Player ${currentPlayer.id}, you are up!`;
    this.$.turnIndicator.replaceChildren(turnI, turnP);
  }

  #renderResultModal(winner, tie) {
    // show when there is a winner or tie
    if (winner || tie) {
      this.$.modalResult.textContent = winner
        ? `Player ${winner} wins!`
        : tie
        ? "Tie!"
        : null;
      this.$.modal.classList.remove("hidden");
    }
    // hide as normal
    else {
      this.$.modal.classList.add("hidden");
    }
  }

  #renderScore(gamesHistory) {
    this.$.player1Wins.textContent =
      gamesHistory.filter((game) => game.winner === 1).length + " wins";
    this.$.player2Wins.textContent =
      gamesHistory.filter((game) => game.winner === 2).length + " wins";
    this.$.ties.textContent =
      gamesHistory.filter((game) => game.tie).length + " ties";
  }

  #qs(selector) {
    return document.querySelector(selector);
  }

  #qsAll(selector) {
    return document.querySelectorAll(selector);
  }
}
