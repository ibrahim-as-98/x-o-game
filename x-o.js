let playerText = document.getElementById("palyerText");
let resetbtn = document.getElementById("btn");
let squares = Array.from(document.getElementsByClassName("square"));

const x_Text = "X";
const o_Text = "O";
let platerTurn = x_Text;
let spaces = Array(9).fill(null);
let counter = 0;

const startGame = () => {
  squares.forEach((square) => square.addEventListener("click", squareclick));
};

function squareclick(e) {
  const id = e.target.id;
  if (!spaces[id] && !playerwon() && counter < 9) {
    spaces[id] = platerTurn;
    e.target.innerText = platerTurn;
    counter++;
  }
  if (playerwon() !== false) {
    playerText.innerText = `${platerTurn} has won `;
    playerwon().map((square) => squares[square].classList.add("win"));
    return;
  }
  if (counter == 9) {
    squares.map((square) => square.classList.add("draw"));
    playerText.classList.add("draw");
    resetbtn.classList.add("drawbtn");
    playerText.innerText = "draw!";

    return;
  }
  platerTurn = platerTurn == x_Text ? o_Text : x_Text;
  playerText.innerText = `${platerTurn} turn`;
}

const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerwon() {
  for (const condtion of winCombo) {
    let [a, b, c] = condtion;
    if (spaces[a] && spaces[a] == spaces[b] && spaces[b] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

resetbtn.addEventListener("click", reset);

function reset() {
  spaces.fill(null);
  squares.forEach((square) => {
    square.innerText = "";
    square.classList.remove("win", "draw");
    playerText.classList.remove("draw");
    resetbtn.classList.remove("drawbtn");
  });
  platerTurn = x_Text;
  playerText.innerText = `${platerTurn} turn`;
  counter = 0;
}

startGame();
