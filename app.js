const Player = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  };

  return { getSign };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setField = (index, sign) => {
    if (index > board.length) return;
    board[index] = sign;
  };

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  return { getField, setField, reset, board };
})();

const displayController = (() => {
  const fieldElements = document.querySelectorAll(".field");
  const messageElement = document.querySelector(".message");
  const restartButton = document.querySelector(".restartBtn");
  const roundText = document.querySelector(".roundTxt");

  const winOrLoseModal = document.querySelector(".winModal");
  const modalText = document.querySelector(".winText");
  const modalTitle = document.querySelector(".winTitle");

  fieldElements.forEach((fieldElement) =>
    fieldElement.addEventListener("click", (e) => {
      if (e.currentTarget.textContent !== "" || gameController.isOver) return;
      gameController.playRound(e.currentTarget.id);
      updateGameboard();
      if (gameController.getRound() < 10) {
        setMessage(gameController.getRound());
      } else {
        roundText.style.display = "none";
        winOrLoseModal.style.display = "flex";
        modalTitle.textContent = "tie";
      }
    })
  );
  const updateGameboard = () => {
    for (let i = 0; i < fieldElements.length; i++) {
      fieldElements[i].textContent = gameBoard.getField(i);
    }
  };

  const setMessage = (elem) => {
    messageElement.textContent = elem;
  };

  const setResultMessage = (winner) => {
    if (winner === "draw") {
      return "Draw";
    } else {
      return `${winner} won.`;
    }
  };

  restartButton.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    updateGameboard();
    messageElement.textContent = "1";

    roundText.style.display = "block";
    winOrLoseModal.style.display = "none";
  });

  return { setMessage, setResultMessage };
})();

const gameController = (() => {
  const playerX = Player("X");
  const playerO = Player("O");
  let round = 1;
  let isOver = false;

  const playRound = (fieldIndex) => {
    gameBoard.setField(fieldIndex, getCurrentPlayerSign());
    round++;
    if (round === 10) {
      isOver = true;
      displayController.setMessage("Tie");
    }
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const checkWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  };

  const getRound = () => {
    return round;
  };

  const reset = () => {
    round = 1;
    isOver = false;
  };

  return { playRound, getRound, reset };
})();
