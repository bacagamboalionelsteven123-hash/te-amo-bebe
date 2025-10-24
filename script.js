const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const container = document.getElementById("puzzle-container");
const messageCard = document.getElementById("message-card");
const motivational = document.getElementById("motivational");
const motivationalTitle = document.getElementById("motivational-title");
const musicPlayer = document.getElementById("music-player");

const imageSrc = "foto.jpg"; // cambia por tu imagen
const rows = 3;
const cols = 3;
let pieces = [];

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  container.style.display = "grid";
  motivational.style.display = "block";
  motivationalTitle.style.display = "block";
  musicPlayer.style.display = "block";
  createPuzzle();
});

function createPuzzle() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const piece = document.createElement("div");
      piece.classList.add("puzzle-piece");
      piece.style.backgroundImage = `url(${imageSrc})`;
      piece.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
      piece.setAttribute("data-position", `${x}-${y}`);
      pieces.push(piece);
    }
  }

  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach(piece => container.appendChild(piece));
}

let firstPiece = null;

container.addEventListener("click", e => {
  if (!e.target.classList.contains("puzzle-piece")) return;

  if (!firstPiece) {
    firstPiece = e.target;
    firstPiece.style.outline = "3px solid #fff";
  } else {
    const temp = document.createElement("div");
    container.insertBefore(temp, firstPiece);
    container.insertBefore(firstPiece, e.target);
    container.insertBefore(e.target, temp);
    container.removeChild(temp);

    firstPiece.style.outline = "none";
    firstPiece = null;
    checkWin();
  }
});

function checkWin() {
  const piecesDOM = Array.from(container.children);
  const correct = piecesDOM.every(
    (piece, index) => piece.getAttribute("data-position") === `${index % cols}-${Math.floor(index / cols)}`
  );

  if (correct) {
    messageCard.classList.add("show");
  }
}
