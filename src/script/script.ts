const ball = document.querySelector('.ball') as HTMLElement;
const ball2 = document.querySelector('.ball-2') as HTMLElement;
const boud = document.querySelector('.bound') as HTMLElement;
const button = document.querySelector('.btn') as HTMLElement;

const GRAVITAIONAL_ACCELERATION: number = 0.98; // i'm making this 10% of original g to make animation look better
const ENERGY_LOSS: number = Math.random();
const AIR_FRICTION: number = .99;
const BALL_WIDTH: number = ball.getBoundingClientRect().width;
const BALL_HEIGHT: number = ball.getBoundingClientRect().height;

                // [x, y]
let velocity: [number, number] = [Math.random() * 500, Math.random() * 500];
let position: [number, number] = [Math.random() * (window.innerWidth - BALL_HEIGHT), Math.random() * (window.innerHeight - BALL_HEIGHT)];

let pos2: [number, number] = [Math.random() * (window.innerWidth - BALL_HEIGHT), Math.random() * (window.innerHeight - BALL_HEIGHT)];
let vel2: [number, number] = [Math.random() * 500, Math.random() * 500];


const accelerate = (x: number, y: number): void => {
    velocity[0] += x;
    velocity[1] += y;
    vel2[0] += x;
    vel2[1] += y;
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
    // upper bound
    if (position[1] <= 0) {
        position[1] = 0;
        velocity[1] = Math.abs(velocity[1]) * ENERGY_LOSS;
    }


    //ball 2

    vel2[0] *= AIR_FRICTION;

    pos2[0] += vel2[0]; 
    pos2[1] += vel2[1];

    // right bound
    if (pos2[0] >= window.innerWidth - BALL_WIDTH) {
        pos2[0] = window.innerWidth - BALL_WIDTH;
        vel2[0] = Math.abs(vel2[0]) * -ENERGY_LOSS;
    }

    // left bound
    if (pos2[0] <= 0) {
        pos2[0] = 0;
        vel2[0] = Math.abs(vel2[0]) * ENERGY_LOSS;
    }

    // lower bound
    if (pos2[1] >= window.innerHeight - BALL_HEIGHT) {
        pos2[1] = window.innerHeight - BALL_HEIGHT;
        vel2[1] = Math.abs(vel2[1]) * -ENERGY_LOSS;
    }
    // upper bound
    if (pos2[1] <= 0) {
        pos2[1] = 0;
        vel2[1] = Math.abs(vel2[1]) * ENERGY_LOSS;
    }



    const isOverlapY: boolean = ball.getBoundingClientRect().top >= ball2.getBoundingClientRect().top && ball.getBoundingClientRect().top <= ball2.getBoundingClientRect().bottom || (ball2.getBoundingClientRect().top >= ball.getBoundingClientRect().top && ball2.getBoundingClientRect().top <= ball.getBoundingClientRect().bottom );
    // const isOverlapX: boolean = ball.getBoundingClientRect().right >= ball2.getBoundingClientRect().left && ball.getBoundingClientRect().right  <= ball2.getBoundingClientRect().right || ()
    // ball1 collides with ball 2 from the right - on ball 2's left
    if (isOverlapY && (ball.getBoundingClientRect().right >= ball2.getBoundingClientRect().left) && (ball.getBoundingClientRect().right < ball2.getBoundingClientRect().right)) {
        velocity[0] = Math.abs(velocity[0]) * -ENERGY_LOSS;
        vel2[0] = Math.abs(vel2[0]) * ENERGY_LOSS;
        // position[0] = ball.getBoundingClientRect().right;
    }
    
    // ball 2 collides with ball one from the left - ball 1's right
    if (isOverlapY && (ball2.getBoundingClientRect().right >= ball.getBoundingClientRect().left) && (ball2.getBoundingClientRect().right < ball.getBoundingClientRect().right)) {
        vel2[0] = Math.abs(vel2[0]) * -ENERGY_LOSS ;
        velocity[0] = Math.abs(velocity[0]) * ENERGY_LOSS;
    }


    ball.style.left = position[0] + 'px';
    ball.style.top = position[1] + 'px';

    ball2.style.left = pos2[0] + 'px';
    ball2.style.top = pos2[1] + 'px';
}

const animate = (): void => {
    updatePosition();
    requestAnimationFrame(animate);
}

animate();

button?.addEventListener('click', (): void => window.location.reload());