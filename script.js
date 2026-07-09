// ============================================
// 13-love | Lyveris & Lyver — Main Script
// ============================================

// Target Anniversary Date: 13.03.2025
const anniversaryDate = new Date("2025-03-13T00:00:00");

// ============================================
// Entrance Overlay & Background Music (Custom HTML5 Player)
// ============================================
const entranceOverlay = document.getElementById("entranceOverlay");
const enterSiteBtn = document.getElementById("enterSiteBtn");
const bgMusicContainer = document.getElementById("bgMusicContainer");
const bgAudio = document.getElementById("bgAudio");
const playerPlayBtn = document.getElementById("playerPlayBtn");
const playerDisk = document.querySelector(".player-disk");

if (enterSiteBtn) {
    enterSiteBtn.addEventListener("click", () => {
        // Fade out entrance
        entranceOverlay.classList.add("fade-out");

        // Slide in custom player and start playback
        if (bgMusicContainer) {
            bgMusicContainer.classList.add("visible");
            if (bgAudio) {
                // Lower volume to prevent it from being too loud (as requested)
                bgAudio.volume = 0.35;
                bgAudio.play().then(() => {
                    if (playerDisk) playerDisk.classList.add("playing");
                }).catch(err => {
                    console.log("Autoplay blocked or audio load error:", err);
                });
            }
        }

        // Remove entrance overlay from DOM after animation finishes
        setTimeout(() => {
            entranceOverlay.style.display = 'none';
        }, 900);
    });
}

if (playerPlayBtn && bgAudio) {
    playerPlayBtn.addEventListener("click", () => {
        if (bgAudio.paused) {
            bgAudio.play();
            playerPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            if (playerDisk) playerDisk.classList.add("playing");
        } else {
            bgAudio.pause();
            playerPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            if (playerDisk) playerDisk.classList.remove("playing");
        }
    });
}

// ============================================
// Timer Update Function
// ============================================
function updateTimer() {
    const now = new Date();
    const diff = now - anniversaryDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

if (document.getElementById("days")) {
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============================================
// Love Letter — Typewriter Effect
// ============================================
const letterOverlay = document.getElementById("letterOverlay");
const openLetterBtn = document.getElementById("openLetterBtn");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const typewriterTextContainer = document.getElementById("typewriterText");

const letterMessage = `Yıl geçmiş ilk günümüzden
Seninle ömür gibi hissettim 
Seninle değil yıllar
Ömürler geçiririm
Gözlerindeki asalet yüceltir beni
Sesindeki zarafet hafifletir içimi
Büyüttün içimdeki çocuğu 
Sanki kendi çocuğun gibi
Öldürdün içimdeki kusuru
Günler daha uzun seninle
Sakin geliyor öfken bile
Anlamsızlıklara anlam katıyor
Konuşmalar aklımdan çıkmıyor
Dudağının üstündeki ben ile
İzin verme yapamayayım sensiz
Seninle değil ömür
Ömürler bile yetersiz`;

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
            
            const parchment = document.querySelector(".parchment-letter");
            if (parchment) {
                parchment.scrollTop = parchment.scrollHeight;
            }
        } else {
            clearInterval(typewriterInterval);
        }
    }, 50);
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
    letterOverlay.addEventListener("click", (e) => {
        if (e.target === letterOverlay) {
            letterOverlay.classList.add("hidden");
            clearInterval(typewriterInterval);
        }
    });
}

// ============================================
// Particle Canvas Animation (Hearts & Stars)
// ============================================
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
const maxParticles = 55;

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
        this.y = canvas.height + Math.random() * 50;
        this.size = Math.random() * 5 + 2.5;
        this.speedY = -(Math.random() * 1 + 0.3);
        this.speedX = Math.sin(Math.random() * 2 * Math.PI) * 0.25;
        this.opacity = Math.random() * 0.45 + 0.2;
        this.type = Math.random() > 0.8 ? "heart" : "star";
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 0.4;
        this.pulse = Math.random() * 0.04 + 0.008;
        this.pulseDir = 1;
    }
    
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        
        this.opacity += this.pulse * this.pulseDir;
        if (this.opacity > 0.7 || this.opacity < 0.15) {
            this.pulseDir *= -1;
        }
        
        this.rotation += this.rotationSpeed;
        
        if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
            this.reset();
            this.y = canvas.height + 10;
        }
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.type === "heart" ? "#dfba6b" : "#f5d796";
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#dfba6b";
        
        if (this.type === "heart") {
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            drawHeart(ctx, -this.size / 2, -this.size / 2, this.size);
        } else {
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

function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 2, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 3);
    ctx.quadraticCurveTo(x + size, y + (size * 2) / 3, x + size / 2, y + size);
    ctx.quadraticCurveTo(x, y + (size * 2) / 3, x, y + size / 3);
    ctx.quadraticCurveTo(x, y, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
}

function initParticles() {
    particles = [];
    for (let i = 0; i < maxParticles; i++) {
        const p = new Particle();
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
