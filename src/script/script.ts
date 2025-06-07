const ball = document.querySelector('.ball') as HTMLElement;
const boud = document.querySelector('.bound') as HTMLElement;

const GRAVITAIONAL_ACCELERATION: number = 9.81;

                // [x, y]
let velocity: [number, number] = [0, 0];

// Boundaries
let upperBound: number = boud.offsetTop;
let lowerBound: number = upperBound - (2*boud.offsetHeight);
let leftBound: number = boud.offsetLeft;
let rightBound: number = leftBound + 2*boud.offsetWidth;

let position: [number, number] = [0, 0];


let time: number = 0;

const accelerate = (x: number, y: number): void => {
    velocity[0] += x;
    velocity[1] += y;
}

const updatePosition = (): void => {
    position[0] += velocity[0]; 
    position[1] += velocity[1];

    ball.style.left = position[0] + 'px';
    ball.style.top = position[1] + 'px';
}

const z = setInterval(() => {
    accelerate(5, GRAVITAIONAL_ACCELERATION);
    updatePosition();
    if (position[0] >= rightBound || velocity[0] <= leftBound ) velocity[0] *= -0.95;
    if (position[1] < lowerBound || position[1] > upperBound) velocity[1] *= -0.95;
}, 100);

