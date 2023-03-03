var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed

interface IParticle {
    color: string,
    x: number,
    y: number,
    diameter: number,
    tilt: number,
    tiltAngleIncrement: number,
    tiltAngle: number
};

var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
var streamingConfetti = false;
var animationTimer: number | null = null;
var particles: IParticle[] = [];
var waveAngle = 0;

function resetParticle(particle: IParticle, width: number, height: number) {
    particle.color = colors[(Math.random() * colors.length) | 0];
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = 0;
    return particle;
}

function drawParticles(context: CanvasRenderingContext2D | null) {
    if (!context) return;
    var particle;
    var x;
    for (var i = 0; i < particles.length; i++) {
        particle = particles[i];
        context.beginPath();
        context.lineWidth = particle.diameter;
        context.strokeStyle = particle.color;
        x = particle.x + particle.tilt;
        context.moveTo(x + particle.diameter / 2, particle.y);
        context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
        context.stroke();
    }
}

function updateParticles() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var particle;
    waveAngle += 0.01;
    for (var i = 0; i < particles.length; i++) {
        particle = particles[i];
        if (!streamingConfetti && particle.y < -15)
            particle.y = height + 100;
        else {
            particle.tiltAngle += particle.tiltAngleIncrement;
            particle.x += Math.sin(waveAngle);
            particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
            particle.tilt = Math.sin(particle.tiltAngle) * 15;
        }
        if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
            if (streamingConfetti && particles.length <= maxParticleCount)
                resetParticle(particle, width, height);
            else {
                particles.splice(i, 1);
                i--;
            }
        }
    }
}

export function startConfetti() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            function (callback) {
                return window.setTimeout(callback, 16.6666667);
            };
    })();
    var canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement;
    if (canvas === null) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "confetti-canvas");
        canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
        document.body.prepend(canvas);
        canvas.width = width;
        canvas.height = height;
        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, true);
    }
    var context = canvas.getContext("2d");
    while (particles.length < maxParticleCount)
        particles.push(resetParticle({
            color: "",
            x: 0,
            y: 0,
            diameter: 0,
            tilt: 0,
            tiltAngleIncrement: 0,
            tiltAngle: 0
        }, width, height));
    streamingConfetti = true;
    if (animationTimer === null) {
        (function runAnimation() {
            context?.clearRect(0, 0, window.innerWidth, window.innerHeight);
            if (particles.length === 0)
                animationTimer = null;
            else {
                updateParticles();
                drawParticles(context);
                animationTimer = requestAnimFrame(runAnimation);
            }
        })();
    }
}

export function stopConfetti() {
    streamingConfetti = false;
}

export function removeConfetti() {
    stopConfetti();
    particles = [];
}

export function toggleConfetti() {
    if (streamingConfetti)
        stopConfetti();
    else
        startConfetti();
}

