const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let width, height;
// Starburst parameters
const rays = 40;
let rotation = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function drawStarburst() {
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.max(width, height);

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    ctx.fillStyle = '#222'; // Dark gray rays

    for (let i = 0; i < rays; i++) {
        ctx.beginPath();
        // Draw a triangle ray
        ctx.moveTo(0, 0);
        const angle1 = (i * 2 * Math.PI) / rays;
        const angle2 = ((i + 0.5) * 2 * Math.PI) / rays;

        ctx.arc(0, 0, radius, angle1, angle2);
        ctx.lineTo(0, 0);
        ctx.fill();
    }

    ctx.restore();
}

function animate() {
    rotation += 0.002; // Slow rotation
    drawStarburst();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
animate();

console.log("SENDING CALLING CARD...");
