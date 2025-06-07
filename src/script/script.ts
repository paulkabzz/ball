const ball = document.querySelector('.ball') as HTMLElement;
const boud = document.querySelector('.bound') as HTMLElement;

const GRAVITAIONAL_ACCELERATION: number = 1.5;
const ENERGY_LOSS: number = .8;
const AIR_FRICTION: number = 0.99;
const BALL_WIDTH: number = ball.getBoundingClientRect().width;
const BALL_HEIGHT: number = ball.getBoundingClientRect().height;

                // [x, y]
let velocity: [number, number] = [35, 0];


let position: [number, number] = [0, 0];

const accelerate = (x: number, y: number): void => {
    velocity[0] += x;
    velocity[1] += y;
}

const updatePosition = (): void => {
    accelerate(0, GRAVITAIONAL_ACCELERATION);

    velocity[0] *= AIR_FRICTION;

    position[0] += velocity[0]; 
    position[1] += velocity[1];

    // right bound
    if (position[0] >= window.innerWidth - BALL_WIDTH) {
        position[0] = window.innerWidth - BALL_WIDTH;
        velocity[0] = Math.abs(velocity[0]) * -ENERGY_LOSS;
    }

    // left bound
    if (position[0] <= 0) {
        position[0] = 0;
        velocity[0] = Math.abs(velocity[0]) * ENERGY_LOSS;
    }

    // lower bound
    if (position[1] >= window.innerHeight - BALL_HEIGHT) {
        position[1] = window.innerHeight - BALL_HEIGHT;
        velocity[1] = Math.abs(velocity[1]) * -ENERGY_LOSS;
    }

    if (position[1] <= 0) {
        position[1] = 0;
        velocity[1] = Math.abs(velocity[1]) * ENERGY_LOSS;
    }

    


    ball.style.left = position[0] + 'px';
    ball.style.top = position[1] + 'px';

}


const animate = (): void => {
    updatePosition();
    requestAnimationFrame(animate)
}

animate();

