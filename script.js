// Target Anniversary Date: 13.03.2025
const anniversaryDate = new Date("2025-03-13T00:00:00");

// Timer Update Function
function updateTimer() {
    const now = new Date();
    const diff = now - anniversaryDate;
    
    // Convert to days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Display values
    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

// Initial Timer Trigger and Setup Interval
if (document.getElementById("days")) {
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Love Letter Interactive Setup
const letterOverlay = document.getElementById("letterOverlay");
const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const typewriterTextContainer = document.getElementById("typewriterText");

const letterMessage = `Sevgilim İclal,

Bugün, hayatımın en güzel kararını verdiğim, seninle bir araya geldiğimiz o özel günden beri geçen her anı kutluyoruz. 13 Mart 2025...

O gün, zamanın bizim için yeniden akmaya başladığı, hayatımın en parlak yıldızının gökyüzünde belirdiği gündü. Sen benim hayatıma girdiğinden beri her şey daha anlamlı, her an daha değerli. Senin gülüşün, bakışın ve varlığın benim bu dünyadaki en büyük sığınağım.

Sana olan sevgim, kelimelere sığmayacak kadar büyük ama bu küçük sayfada, seninle geçen her saniyenin benim için ne kadar kutsal olduğunu bilmeni istedim. Sen benim en güzel hikayem, en değerli şarkımsın.

Birlikte yürüyeceğimiz bu yolda, her adımda elini tutmak ve seninle yaşlanmak dileğiyle...

Sonsuza dek seninle,`;

let typewriterInterval;
let charIndex = 0;

function startTypewriter() {
    charIndex = 0;
    typewriterTextContainer.innerHTML = "";
    clearInterval(typewriterInterval);
    
    typewriterInterval = setInterval(() => {
        if (charIndex < letterMessage.length) {
            const char = letterMessage.charAt(charIndex);
            if (char === "\n") {
                typewriterTextContainer.innerHTML += "<br>";
            } else {
                typewriterTextContainer.innerHTML += char;
            }
            charIndex++;
            
            // Auto scroll container down if text overflows
            const parchment = document.querySelector(".parchment-letter");
            if (parchment) {
                parchment.scrollTop = parchment.scrollHeight;
            }
        } else {
            clearInterval(typewriterInterval);
        }
    }, 45); // Adjust typing speed here (ms per character)
}

if (openLetterBtn) {
    openLetterBtn.addEventListener("click", () => {
        letterOverlay.classList.remove("hidden");
        startTypewriter();
    });
}

if (closeLetterBtn) {
    closeLetterBtn.addEventListener("click", () => {
        letterOverlay.classList.add("hidden");
        clearInterval(typewriterInterval);
    });
}

if (letterOverlay) {
    // Close overlay on clicking outside the parchment paper
    letterOverlay.addEventListener("click", (e) => {
        if (e.target === letterOverlay) {
            letterOverlay.classList.add("hidden");
            clearInterval(typewriterInterval);
        }
    });
}


// Particle Canvas Animation (Hearts and Stars)
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const maxParticles = 60;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        // Start below the screen or randomly scattered at initialization
        this.y = canvas.height + Math.random() * 50;
        this.size = Math.random() * 6 + 3;
        this.speedY = -(Math.random() * 1.2 + 0.4);
        this.speedX = Math.sin(Math.random() * 2 * Math.PI) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.type = Math.random() > 0.75 ? "heart" : "star"; // More stars than hearts for elegance
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.5;
        this.pulse = Math.random() * 0.05 + 0.01;
        this.pulseDir = 1;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        // Sparkle/twinkle effect
        this.opacity += this.pulse * this.pulseDir;
        if (this.opacity > 0.8 || this.opacity < 0.2) {
            this.pulseDir *= -1;
        }
        
        // Rotation for hearts
        this.rotation += this.rotationSpeed;
        
        // Reset particle if it goes off screen
        if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
            this.reset();
            // Scatter newly created particles at the bottom
            this.y = canvas.height + 10;
        }
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.type === "heart" ? "#dfba6b" : "#f5d796"; // Antique gold & pale gold
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#dfba6b";
        
        if (this.type === "heart") {
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            drawHeart(ctx, -this.size / 2, -this.size / 2, this.size);
        } else {
            // Draw Star (4-point flare)
            ctx.beginPath();
            const cx = this.x;
            const cy = this.y;
            const spikes = 4;
            const outerRadius = this.size;
            const innerRadius = this.size / 3;
            
            let rot = (Math.PI / 2) * 3;
            let x = cx;
            let y = cy;
            const step = Math.PI / spikes;
            
            ctx.moveTo(cx, cy - outerRadius);
            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;
                
                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }
            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }
}

// Helper to draw a heart shape
function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    // Left curve
    ctx.quadraticCurveTo(x, y, x + size / 2, y);
    // Right curve
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 3);
    // Bottom point
    ctx.quadraticCurveTo(x + size, y + (size * 2) / 3, x + size / 2, y + size);
    // Bottom left point
    ctx.quadraticCurveTo(x, y + (size * 2) / 3, x, y + size / 3);
    ctx.quadraticCurveTo(x, y, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
}

// Initialize particles scattered throughout the screen initially
function initParticles() {
    particles = [];
    for (let i = 0; i < maxParticles; i++) {
        const p = new Particle();
        // Scatter initial particles across the full height
        p.y = Math.random() * canvas.height;
        particles.push(p);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();
