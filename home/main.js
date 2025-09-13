const canvas = document.getElementById("galaxyCanvas");
const ctx = canvas.getContext("2d");

// ضبط حجم الكانفاس حسب حجم الشاشة
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// إنشاء النجوم
let stars = [];
for (let i = 0; i < 110; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.1
  });
}

// تعريف الكواكب ومساراتها
let planets = [
  { radius: 20, orbit: 100, angle: 0, speed: 0.01, color: "#6f00ff" },
  { radius: 30, orbit: 200, angle: Math.PI / 2, speed: 0.006, color: "#aa00ff" },
  { radius: 15, orbit: 150, angle: Math.PI, speed: 0.008, color: "#ff00aa" },
  { radius: 25, orbit: 250, angle: Math.PI / 3, speed: 0.005, color: "#00ffff" }
];

// رسم الخلفية الداكنة
function drawBackground() {
  ctx.fillStyle = "rgba(26,0,46,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// رسم النجوم المتحركة
function drawStars() {
  ctx.fillStyle = "#ffffff";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

// رسم الكواكب وهي تدور حول النواة
function drawPlanets() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  planets.forEach((planet) => {
    planet.angle += planet.speed;
    const x = centerX + Math.cos(planet.angle) * planet.orbit;
    const y = centerY + Math.sin(planet.angle) * planet.orbit;

    ctx.beginPath();
    ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.shadowColor = planet.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;
  });
}

// تشغيل الأنيميشن بشكل مستمر
function animate() {
  drawBackground();
  drawStars();
  drawPlanets();
  requestAnimationFrame(animate);
}

animate();