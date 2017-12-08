let q;

function setup() {
  colorMode(HSL);
  q = new BinomialQueue();
  createCanvas(1280, 720);
}

function draw() {
  background(0);
  q.show();
  if (frameCount%10 == 0) {
    q.add(floor(random(0, 330)));
  }
}
