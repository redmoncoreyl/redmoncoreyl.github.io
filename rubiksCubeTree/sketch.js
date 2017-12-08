let t;
let r;
let l;
let rDecay;
let lDecay;
let lines;

function setup() {
  createCanvas(1280, 720);
  colorMode(HSL);
  background(100);

  createP("Show Lines");
  lines = createCheckbox('lines', true);
  createP("Initial Circle Radius");
  r = createSlider(0, 300, 78, 1);
  createP("Initial Spreading");
  l = createSlider(0, 1200, 400, 50);
  createP("Radius Decay");
  rDecay = createSlider(0, 1, 0.7, 0.05);
  createP("Spreading Decay");
  lDecay = createSlider(0, 1, 0.5, 0.05);

  t = new Tree();
  t.generate();
}

function draw() {
  background(100);

  t.show(lines.checked(), r.value(), l.value(), rDecay.value(), lDecay.value());
}
