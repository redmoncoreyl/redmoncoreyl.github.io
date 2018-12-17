var balls;
var subD;

function setup() {
  createCanvas(900,900);

  
  hasCollision = 1;
  while (hasCollision > 0) {
    hasCollision = 0;
    balls = [];
    balls.push(new Ball('red'));
    balls.push(new Ball('green'));
    balls.push(new Ball('blue'));
    for (i = 0; i < balls.length; i++) {
      for (j = i+1; j < balls.length; j++) {
        hasCollision += balls[i].collide(balls[j]);
      }
    }
  }
  
  subD = 1000;
}

function draw() {
  for (i = 0; i < subD; i++) {
    // update balls positions
    for (j = 0; j < balls.length; j++) {
      balls[j].update(subD);
    }
    // do collision velocity
    for (j = 0; j < balls.length; j++) {
      balls[j].walls();
    }
    for (j = 0; j < balls.length; j++) {
      for (k = j+1; k < balls.length; k++) {
        balls[j].collide(balls[k]);
      }
    }
  }
  
  // draw balls and walls
  background(180);
  stroke(0);
  strokeWeight(10);
  line(0,0,0,height);
  line(0,height, width, height);
  line(width,height,width, 0);
  strokeWeight(1);
  for (i = 0; i < balls.length; i++) {
    balls[i].show();
  }
}