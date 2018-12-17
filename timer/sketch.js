var timer;

function setup() {
  frameRate(60);
  createCanvas(800, 800);
  var c = color(255, 100, 100);
  timer = new Timer(0, 0, 500, 250, c);
}

function keyPressed() {
  if (keyCode == ENTER) {
    timer.setTick(false);
    timer.zero();
  }
  if (keyCode == 32) {
    timer.setTick(!timer.tick());
  }
}

function draw() {
  background(100, 100, 255);
  timer.update();
  timer.show();
  
}