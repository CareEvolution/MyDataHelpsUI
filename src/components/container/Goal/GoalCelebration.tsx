import React, { useEffect, useRef } from 'react';

export type GoalCelebrationStyle = 'confetti' | 'light rays' | 'fireworks' | 'everything';

export interface GoalCelebrationProps {
    style: GoalCelebrationStyle;
    colors: string[];
    onDone: () => void;
}

export const celebrationDelay = 460;
const raysDuration = 2800;
const maxParticles = 150;
const goldColors = ['#E8B93C', '#FFF3C4', '#9C7414', '#F2C14E'];

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    gravity: number;
    drag: number;
    life: number;
    age: number;
    size: number;
    color: string;
    shape: 'dot' | 'rect' | 'rocket';
    rotation: number;
    spin: number;
    flip: number;
    fadeOut: boolean;
}

export function chooseCelebrationStyle(style: GoalCelebrationStyle | 'random'): GoalCelebrationStyle {
    if (style !== 'random') return style;
    return Math.random() < 1 / 6 ? 'everything' : pick<GoalCelebrationStyle>(['confetti', 'light rays', 'fireworks']);
}

function random(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

function pick<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

function createParticle(values: Partial<Particle>): Particle {
    return { x: 0, y: 0, vx: 0, vy: 0, gravity: 0, drag: 0, life: 1, age: 0, size: 3, color: '#fff', shape: 'dot', rotation: 0, spin: 0, flip: 0, fadeOut: true, ...values };
}

function sparks(x: number, y: number, colors: string[], count: number, speed: number): Particle[] {
    return Array.from({ length: count }, () => {
        const angle = random(0, Math.PI * 2), velocity = random(speed * 0.4, speed);
        return createParticle({ x, y, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity, drag: 0.06, life: random(0.45, 0.8), size: random(1.6, 3.2), color: pick(colors) });
    });
}

function confetti(x: number, y: number, colors: string[], count: number): Particle[] {
    return Array.from({ length: count }, () => createParticle({
        shape: 'rect', x: x + random(-10, 10), y: y + random(-6, 6), vx: random(-120, 300), vy: random(-420, -160), gravity: 700, drag: 0.025,
        life: random(1.8, 2.8), size: random(3, 5.5), color: pick(colors), rotation: random(0, 6), spin: random(-10, 10), flip: random(4, 11), fadeOut: false
    }));
}

function rocket(fromX: number, toX: number, burstY: number, launchY: number, colors: string[]): Particle {
    const x = random(fromX, toX), targetY = burstY + random(-60, 10), distance = launchY - targetY, flightTime = random(0.55, 0.8);
    return createParticle({ shape: 'rocket', x, y: launchY, vx: random(-20, 20), vy: -distance / flightTime * 1.25, gravity: distance / flightTime * 0.6, life: flightTime, size: 2.4, color: pick(colors), fadeOut: false });
}

function explode(source: Particle): Particle[] {
    return Array.from({ length: 34 }, (_, i) => {
        const angle = (i / 34) * Math.PI * 2 + random(-0.1, 0.1), velocity = random(70, 170);
        return createParticle({ x: source.x, y: source.y, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity, gravity: 110, drag: 0.03, life: random(0.9, 1.4), size: random(1.6, 2.6), color: i % 5 === 0 ? '#FFFFFF' : source.color });
    });
}

function step(particle: Particle, seconds: number, spawned: Particle[]): boolean {
    particle.age += seconds;
    if (particle.age >= particle.life) {
        if (particle.shape === 'rocket') spawned.push(...explode(particle));
        return false;
    }
    const drag = Math.pow(1 - particle.drag, seconds * 60);
    particle.vx *= drag;
    particle.vy = particle.vy * drag + particle.gravity * seconds;
    particle.x += particle.vx * seconds;
    particle.y += particle.vy * seconds;
    particle.rotation += particle.spin * seconds;
    return true;
}

function draw(context: CanvasRenderingContext2D, particle: Particle) {
    context.globalAlpha = particle.fadeOut
        ? Math.max(0, 1 - particle.age / particle.life)
        : Math.min(1, (particle.life - particle.age) * 3);
    context.fillStyle = particle.color;
    if (particle.shape === 'rect') {
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.scale(1, Math.cos(particle.age * particle.flip));
        context.fillRect(-particle.size, -particle.size * 0.6, particle.size * 2, particle.size * 1.2);
        context.restore();
    } else {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
    }
    context.globalAlpha = 1;
}

// Canvas cannot paint with CSS variables, so a color like var(--mdhui-color-success-mark) is looked up first.
function resolveCssColor(element: Element, color: string): string {
    const variable = color.match(/^var\((--[^,)]+)/);
    if (!variable) return color;
    return getComputedStyle(element).getPropertyValue(variable[1]).trim() || goldColors[0];
}

function showsRays(style: GoalCelebrationStyle): boolean {
    return style === 'light rays' || style === 'everything';
}

export default function GoalCelebration(props: GoalCelebrationProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const onDoneRef = useRef(props.onDone);
    onDoneRef.current = props.onDone;

    useEffect(() => {
        const canvas = canvasRef.current!;
        const context = canvas.getContext('2d');
        const bounds = canvas.getBoundingClientRect();
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, bounds.width * pixelRatio);
        canvas.height = Math.max(1, bounds.height * pixelRatio);
        context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        const width = bounds.width, height = bounds.height;
        const chartBounds = canvas.parentElement!.getBoundingClientRect();
        const centerX = chartBounds.left + chartBounds.width / 2 - bounds.left;
        const centerY = chartBounds.top + chartBounds.height / 2 - bounds.top;
        const partyColors = [...props.colors.map(color => resolveCssColor(canvas, color)), ...goldColors, '#F4F4F4', '#E46A6A', '#7A8CE0'];
        const timers: number[] = [];
        let particles: Particle[] = [];
        let pendingBursts = 0;
        let frameId: number | undefined;
        let lastTime: number | undefined;

        const tick = (now: number) => {
            const seconds = Math.min(0.05, (now - (lastTime ?? now)) / 1000);
            lastTime = now;
            context?.clearRect(0, 0, width, height);
            const spawned: Particle[] = [];
            particles = particles.filter(particle => step(particle, seconds, spawned));
            particles.push(...spawned);
            if (context) particles.forEach(particle => draw(context, particle));
            if (particles.length || pendingBursts) {
                frameId = requestAnimationFrame(tick);
            } else {
                frameId = undefined;
                onDoneRef.current();
            }
        };

        const add = (newParticles: Particle[]) => {
            particles.push(...newParticles);
            if (particles.length > maxParticles) particles.splice(0, particles.length - maxParticles);
            frameId ??= requestAnimationFrame(tick);
        };

        const later = (milliseconds: number, burst: () => Particle[]) => {
            pendingBursts++;
            timers.push(window.setTimeout(() => {
                pendingBursts--;
                add(burst());
            }, milliseconds));
        };

        const launchFireworks = (count: number) => {
            for (let i = 0; i < count; i++) later(celebrationDelay + i * 260, () => [rocket(centerX - 20, width - 30, centerY, height + 4, partyColors)]);
        };

        add(sparks(centerX, centerY, goldColors, 30, 190));
        if (showsRays(props.style)) later(celebrationDelay + raysDuration, () => []);
        if (props.style === 'confetti') {
            later(celebrationDelay, () => confetti(centerX, centerY, partyColors, 110));
        } else if (props.style === 'fireworks') {
            launchFireworks(4);
        } else if (props.style === 'light rays') {
            later(celebrationDelay, () => sparks(centerX, centerY, goldColors, 40, 230));
            later(celebrationDelay + 500, () => sparks(centerX, centerY, goldColors, 30, 160));
        } else {
            later(celebrationDelay, () => confetti(centerX, centerY, partyColors, 90));
            launchFireworks(5);
        }

        return () => {
            timers.forEach(timer => clearTimeout(timer));
            if (frameId !== undefined) cancelAnimationFrame(frameId);
        };
    }, []);

    return <>
        {showsRays(props.style) && <div className="mdhui-goal-celebration-rays" />}
        <canvas ref={canvasRef} className="mdhui-goal-celebration" aria-hidden="true" />
    </>;
}
