const ball = document.querySelector('.ball') as HTMLElement;
const ball2 = document.querySelector('.ball-2') as HTMLElement;

const GRAVITAIONAL_ACCELERATION: number = .98; // i'm making this 10% of original g to make animation look better
const ENERGY_LOSS: number = Math.random();
const AIR_FRICTION: number = .99;
const BALL_WIDTH: number = ball.getBoundingClientRect().width;
const BALL_HEIGHT: number = ball.getBoundingClientRect().height;

                // [x, y]
let velocity_1: [number, number] = [Math.random() * 250, Math.random() * 250];
let position_1: [number, number] = [Math.random() * (window.innerWidth - BALL_HEIGHT), Math.random() * (window.innerHeight - BALL_HEIGHT)];

let position_2: [number, number] = [Math.random() * (window.innerWidth - BALL_HEIGHT), Math.random() * (window.innerHeight - BALL_HEIGHT)];
let velocity_2: [number, number] = [Math.random() * 250, Math.random() * 250];


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

animate();