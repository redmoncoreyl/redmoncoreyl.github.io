function Paddle() {
  this.pos = createVector(265, 455);
  this.width = 110;
  this.height = 20;
  
  this.update = function() {
    if (keyIsDown(LEFT_ARROW) && this.pos.x > -100) {
      this.pos.sub(createVector(9, 0));
    }
    if (keyIsDown(RIGHT_ARROW) && this.pos.x < 630) {
      this.pos.add(createVector(9, 0));
    }
  }
  
  this.show = function() {
    push();
    fill(240);
    noStroke();
    rect(this.pos.x, this.pos.y, this.width, this.height);
    pop();
  }
}