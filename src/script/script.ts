const ball = document.querySelector('.ball') as HTMLElement;
const ball2 = document.querySelector('.ball-2') as HTMLElement;

const GRAVITAIONAL_ACCELERATION: number = .98; // i'm making this 10% of original g to make animation look better
let ENERGY_LOSS: number = Math.random();
const AIR_FRICTION: number = .99;
const BALL_WIDTH: number = ball.getBoundingClientRect().width;
const BALL_HEIGHT: number = ball.getBoundingClientRect().height;

type Vector = [number, number];

                                      // [x, y]
let velocity_1: Vector = [Math.random() * 250, Math.random() * 250];
let position_1: Vector = [Math.random() * (window.innerWidth - BALL_HEIGHT), Math.random() * (window.innerHeight - BALL_HEIGHT)];

let position_2: Vector = [Math.random() * (window.innerWidth - BALL_HEIGHT), Math.random() * (window.innerHeight - BALL_HEIGHT)];
let velocity_2: Vector = [Math.random() * 250, Math.random() * 250];


const accelerate = (x: number, y: number): void => {
    velocity_1[0] += x;
    velocity_1[1] += y;
    velocity_2[0] += x;
    velocity_2[1] += y;
}

const updatePosition = (): void => {
    accelerate(0, GRAVITAIONAL_ACCELERATION);

    velocity_1[0] *= AIR_FRICTION;

    position_1[0] += velocity_1[0]; 
    position_1[1] += velocity_1[1];

    // right bound
    if (position_1[0] >= window.innerWidth - BALL_WIDTH) {
        position_1[0] = window.innerWidth - BALL_WIDTH;
        velocity_1[0] = Math.abs(velocity_1[0]) * -ENERGY_LOSS;
    }

    // left bound
    if (position_1[0] <= 0) {
        position_1[0] = 0;
        velocity_1[0] = Math.abs(velocity_1[0]) * ENERGY_LOSS;
    }

    // lower bound
    if (position_1[1] >= window.innerHeight - BALL_HEIGHT) {
        position_1[1] = window.innerHeight - BALL_HEIGHT;
        velocity_1[1] = Math.abs(velocity_1[1]) * -ENERGY_LOSS;
    }
    // upper bound
    if (position_1[1] <= 0) {
        position_1[1] = 0;
        velocity_1[1] = Math.abs(velocity_1[1]) * ENERGY_LOSS;
    }



    velocity_2[0] *= AIR_FRICTION;

    position_2[0] += velocity_2[0]; 
    position_2[1] += velocity_2[1];

    // right bound
    if (position_2[0] >= window.innerWidth - BALL_WIDTH) {
        position_2[0] = window.innerWidth - BALL_WIDTH;
        velocity_2[0] = Math.abs(velocity_2[0]) * -ENERGY_LOSS;
    }

    // left bound
    if (position_2[0] <= 0) {
        position_2[0] = 0;
        velocity_2[0] = Math.abs(velocity_2[0]) * ENERGY_LOSS;
    }

    // lower bound
    if (position_2[1] >= window.innerHeight - BALL_HEIGHT) {
        position_2[1] = window.innerHeight - BALL_HEIGHT;
        velocity_2[1] = Math.abs(velocity_2[1]) * -ENERGY_LOSS;
    }
    // upper bound
    if (position_2[1] <= 0) {
        position_2[1] = 0;
        velocity_2[1] = Math.abs(velocity_2[1]) * ENERGY_LOSS;
    }

    const rect1 = ball.getBoundingClientRect() as DOMRect;
    const rect2 = ball2.getBoundingClientRect() as DOMRect;

    const isOverlapX: boolean = rect1.left < rect2.right && rect1.right > rect2.left;
    const isOverlapY: boolean = rect1.top < rect2.bottom && rect1.bottom > rect2.top;

    if (isOverlapX && isOverlapY) {

        const overlapLeft: number = rect1.right - rect2.left;
        const overlapRight: number = rect2.right - rect1.left;
        const overlapTop: number = rect1.bottom - rect2.top;
        const overlapBottom: number = rect2.bottom - rect1.top;
        
        const minOverlap: number = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
        
        if (minOverlap === overlapLeft) {
            
            // Ball1 hitting ball2 from the left
            velocity_1[0] = -Math.abs(velocity_1[0]) * ENERGY_LOSS;
            velocity_2[0] = Math.abs(velocity_2[0]) * ENERGY_LOSS;

            // Separate balls
            position_1[0] = rect2.left - BALL_WIDTH;
            
        } else if (minOverlap === overlapRight) {
            // Ball1 hitting ball2 from the right
            velocity_1[0] = Math.abs(velocity_1[0]) * ENERGY_LOSS;
            velocity_2[0] = -Math.abs(velocity_2[0]) * ENERGY_LOSS;
            // Separate balls
            position_1[0] = rect2.right;
            
        } else if (minOverlap === overlapTop) {
            // Ball1 hitting ball2 from above
            velocity_1[1] = -Math.abs(velocity_1[1]) * ENERGY_LOSS;
            velocity_2[1] = Math.abs(velocity_2[1]) * ENERGY_LOSS;
            // Separate balls
            position_1[1] = rect2.top - BALL_HEIGHT;
            
        } else if (minOverlap === overlapBottom) {
            // Ball1 hitting ball2 from below
            velocity_1[1] = Math.abs(velocity_1[1]) * ENERGY_LOSS;
            velocity_2[1] = -Math.abs(velocity_2[1]) * ENERGY_LOSS;
            // Separate balls
            position_1[1] = rect2.bottom;
        }
    }

    ball.style.left = position_1[0] + 'px';
    ball.style.top = position_1[1] + 'px';

    ball2.style.left = position_2[0] + 'px';
    ball2.style.top = position_2[1] + 'px';
}

const animate = (): void => {
    updatePosition();
    requestAnimationFrame(animate);
}

// The values of x, y, v where initially randomised, but I'll give people the ability to add in their own values

// Simple unit scale: 1 velocity unit ~= 10 px/frame (~600 px/s @60fps)
const VELOCITY_UNIT_TO_PX_PER_FRAME = 10;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const posXInput = document.getElementById('posX') as HTMLInputElement | null;
const posYInput = document.getElementById('posY') as HTMLInputElement | null;
const velXInput = document.getElementById('velX') as HTMLInputElement | null;
const velYInput = document.getElementById('velY') as HTMLInputElement | null;
const posX2Input = document.getElementById('posX2') as HTMLInputElement | null;
const posY2Input = document.getElementById('posY2') as HTMLInputElement | null;
const velX2Input = document.getElementById('velX2') as HTMLInputElement | null;
const velY2Input = document.getElementById('velY2') as HTMLInputElement | null;
const energyLossInput = document.getElementById('energyLoss') as HTMLInputElement | null;
const applyBtn = document.getElementById('applyBtn') as HTMLButtonElement | null;

const applyInputs = () => {
    // Position as percentage of viewport [0..1]
    if (posXInput && posXInput.value !== '') {
        const xPct = clamp(parseFloat(posXInput.value), 0, 1);
        position_1[0] = xPct * (window.innerWidth - BALL_WIDTH);
    }
    if (posYInput && posYInput.value !== '') {
        const yPct = clamp(parseFloat(posYInput.value), 0, 1);
        position_1[1] = (1 - yPct) * (window.innerHeight - BALL_HEIGHT);
    }

    // Velocity in abstract units mapped to px/frame
    if (velXInput && velXInput.value !== '') {
        const vx = parseFloat(velXInput.value);
        if (!Number.isNaN(vx)) {
            velocity_1[0] = vx * VELOCITY_UNIT_TO_PX_PER_FRAME;
        }
    }
    if (velYInput && velYInput.value !== '') {
        const vy = parseFloat(velYInput.value);
        if (!Number.isNaN(vy)) {
            velocity_1[1] = vy * VELOCITY_UNIT_TO_PX_PER_FRAME;
        }
    }

    if (posX2Input && posX2Input.value !== '') {
        const x2Pct = clamp(parseFloat(posX2Input.value), 0, 1);
        position_2[0] = x2Pct * (window.innerWidth - BALL_WIDTH);
    }
    if (posY2Input && posY2Input.value !== '') {
        const y2Pct = clamp(parseFloat(posY2Input.value), 0, 1);
        position_2[1] = (1 - y2Pct) * (window.innerHeight - BALL_HEIGHT);
    }

    if (velX2Input && velX2Input.value !== '') {
        const vx2 = parseFloat(velX2Input.value);
        if (!Number.isNaN(vx2)) {
            velocity_2[0] = vx2 * VELOCITY_UNIT_TO_PX_PER_FRAME;
        }
    }
    if (velY2Input && velY2Input.value !== '') {
        const vy2 = parseFloat(velY2Input.value);
        if (!Number.isNaN(vy2)) {
            velocity_2[1] = vy2 * VELOCITY_UNIT_TO_PX_PER_FRAME;
        }
    }

    if (energyLossInput && energyLossInput.value !== '') {
        const e = clamp(parseFloat(energyLossInput.value), 0, 1);
        if (!Number.isNaN(e)) {
            ENERGY_LOSS = 1 - e;

        }
    }
};

if (applyBtn) {
    applyBtn.addEventListener('click', applyInputs);
}

animate();