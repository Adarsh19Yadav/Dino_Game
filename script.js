const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");

let score = 0;
let highScore = 0;
let isJumping = false;
let cactusSpeed = 5;

function jump() {
  if (isJumping) return;
  isJumping = true;
  let up = 0;
  let jumpInterval = setInterval(() => {
    if (up >= 100) {
      clearInterval(jumpInterval);
      let downInterval = setInterval(() => {
        if (up <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        up -= 5;
        dino.style.bottom = up + "px";
      }, 20);
    }
    up += 5;
    dino.style.bottom = up + "px";
  }, 20);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});
document.addEventListener("touchstart", jump);

function startGame() {
  cactus.style.left = "800px";
  score = 0;
  cactusSpeed = 5;
  updateScore();
  gameLoop();
}

function updateScore() {
  scoreDisplay.textContent = score;
  highScoreDisplay.textContent = highScore;
}

function gameLoop() {
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
  if (cactusLeft <= 0) {
    cactus.style.left = "800px";
    score++;
    if (score % 20 === 0) cactusSpeed += 1;
    updateScore();
  } else {
    cactus.style.left = cactusLeft - cactusSpeed + "px";
  }

  let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  if (
    cactusLeft > 50 && cactusLeft < 90 &&
    dinoBottom < 40
  ) {
    alert("Game Over! Score: " + score);
    if (score > highScore) highScore = score;
    updateScore();
    return startGame();
  }

  requestAnimationFrame(gameLoop);
}

startGame();