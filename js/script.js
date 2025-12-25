const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("snowBtn");


let flakes = [];
let snowing = false;
let animationId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createFlakes(count = 150) {
  flakes = [];
  for (let i = 0; i < count; i++) {
    flakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      speed: Math.random() * 1.5 + 0.5
    });
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();

  flakes.forEach(flake => {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
  });

  ctx.fill();
}

function updateSnow() {
  flakes.forEach(flake => {
    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = -5;
      flake.x = Math.random() * canvas.width;
    }
  });
}

function animateSnow() {
  if (!snowing) return;
  drawSnow();
  updateSnow();
  animationId = requestAnimationFrame(animateSnow);
}

btn.addEventListener("click", () => {
  snowing = !snowing;

  if (snowing) {
    btn.textContent = "That’s enough snow";
    createFlakes();
    animateSnow();
  } else {
    btn.textContent = "Let it snow";
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});
