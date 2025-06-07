const ball = document.querySelector('.ball') as HTMLElement;
const boud = document.querySelector('.bound') as HTMLElement;

const GRAVITAIONAL_ACCELERATION: number = 9.81;
let velocity: [number, number] = [0, 0];

// Boundaries
let upperBound: number = boud.offsetTop;
let lowerBound: number = upperBound + boud.offsetHeight;

let position: [number, number] = [0, 0];


let time: number = 0;

const accelerate = (x: number, y: number): void => {
    velocity[0] += x;
    velocity[1] += y;
}

const updatePosition = (): void => {
    position[0] += velocity[0];
    position[1] += velocity[1];
    ball.style.top = position[0] + 'px';
    ball.style.left = position[1] + 'px';
}

const z = setInterval(() => {
    accelerate(5, GRAVITAIONAL_ACCELERATION);
    updatePosition();
}, 100)

