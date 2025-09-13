const canvas = document.getElementById("galaxyCanvas");
const ctx = canvas.getContext("2d");

// ضبط حجم الكانفاس حسب حجم الشاشة
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// إنشاء النجوم المتحركة
let stars = [];
for (let i = 0; i < 110; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.3 + 0.1
  });
}

// رسم النجوم وتحديث مواقعها
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

// تشغيل الأنيميشن بشكل مستمر
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  requestAnimationFrame(animate);
}

animate();