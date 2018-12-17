var snake;

function setup() {
  createCanvas(800, 800);
  snake = new Snake();
}

function draw() {
  background(50);
  textAlign(CENTER, CENTER);
  textSize(35);
  fill(255);
  text("Hold Space To Make It Chase Its Tail", width/2, height-20);
  snake.update();
  snake.show();
}