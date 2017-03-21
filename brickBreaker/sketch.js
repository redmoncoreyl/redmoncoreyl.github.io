// to do:
// timer bug

var paddle;
var bricks = [];
var ball;
var score;
var timer;
var paused;
var lost;

function setup() {
  createCanvas(640, 480);
  paddle = new Paddle();
  for (var i = 0; i < 100; i++) {
    bricks.push(new Brick(i%10, floor(i/10)));
  }
  ball = new Ball();
  score = 0;
  paused = true;
  timer = new Timer();
  lost = false;
  noLoop();
  p1 = createP("Controls:<br>Enter- Start/Pause/Reset<br>Left/Right Arrow Keys- Move Paddle");
  p1.style("font-size", "30px");
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (lost) {
      paddle = new Paddle();
      bricks = [];
      for (var i = 0; i < 100; i++) {
        bricks.push(new Brick(i%10, floor(i/10)));
      }
      ball = new Ball();
      score = 0;
      paused = true;
      timer.zero();
      timer.setTick(false);
      lost = false;
      noLoop();
      background(51);
      paddle.show();
      ball.show();
      for (var i = 0; i < bricks.length; i++) {
        bricks[i].show();
      }
      lost = false;
    } else if (paused) {
      paused = !paused;
      loop();
      timer.setTick(true);
    } else {
      paused = !paused;
      noLoop();
      timer.setTick(false);
    }
  }
}

function draw() {
  background(51);
  
  paddle.update();
  ball.update();
  timer.update();
  
  for (var i = 0; i < bricks.length; i++) {
    var collide = ball.brickCollide(bricks[i]);
    if (collide) {
      bricks.splice(i, 1);
      score++;
    }
  }
  ball.paddleCollide(paddle);
  lost = ball.wallCollide();
  
  paddle.show();
  for (var i = 0; i < bricks.length; i++) {
    bricks[i].show();
  }
  ball.show();
  
  if (lost) {
    var time = timer.getTime();
    textSize(50);
    fill(100, 100, 255);
    textAlign(CENTER, CENTER);
    text("Game Over", 320, 260)
    textSize(38);
    fill(200, 100, 200);
    text("Bricks Broken: "+score, 320, 310);
    var cScore = round(score*1000-100*time);
    text("Score: "+cScore, 320, 360);
    noLoop();
  }
  if (bricks.length == 0) {
    lost = true;
    var time = timer.getTime();
    textSize(50);
    fill(100, 100, 255);
    textAlign(CENTER, CENTER);
    text("You Won", 320, 260)
    textSize(38);
    fill(200, 100, 200);
    text("Bricks Broken: "+score, 320, 310);
    var cScore = round(score*1000-100*time);
    text("Score: "+cScore, 320, 360);
    noLoop();
  }
}