// scenario parameters
let n = 20;
let agents = [];
let startingR = 75;

// animation parameters
let w = 500;
let h = 500;
let dt = 0.7;

// agent parameters
let avPrefSpeed = 5;
let sdPrefSpeed = 1;
let avMaxSpeed = 12;
let sdMaxSpeed = 2.5;
let avRadius = 10;
let sdRadius = 0.5;

function setup() {
  createCanvas(w, h);
  angleMode(DEGREES);
  for (let i = 0; i < n; i++) {
    let theta = 360/n*i;
    let x = width/2 + startingR*cos(theta);
    let y = width/2 + startingR*sin(theta);
    let pos = createVector(x, y);
    let prefSpeed = randomGaussian(avPrefSpeed, sdPrefSpeed);
    let maxSpeed = randomGaussian(avMaxSpeed, sdMaxSpeed);
    let r = randomGaussian(avRadius, sdRadius);
    agents.push(new Agent(i, n, pos, prefSpeed, maxSpeed, r));
  }
}

function draw() {
  background(100);
  for (let a of agents) {
    a.computeForces(agents, dt);
  }
  for (let a of agents) {
    a.update();
    a.show(agents);
  }
}
