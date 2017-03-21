function Ball() {
  this.pos = createVector(320, 447);
  this.rad = 15;
  this.col = color(100, 255, 50);
  this.vel = createVector(round(random(0, 1))*2-1, -1);
  this.vel.setMag(5);
  this.acc = 1.00009;
  
  this.update = function() {
    this.pos.add(this.vel);
    this.vel.mult(this.acc);
  }
  
  this.show = function() {
    push();
    fill(this.col);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    pop();
  }
  
  this.brickCollide = function(brick) {
    // if it hits the bottom
    if (this.pos.x > brick.pos.x-this.rad/2
        && this.pos.x < brick.pos.x+brick.width+this.rad/2
        && this.pos.y < brick.pos.y+brick.height+this.rad/2
        && this.pos.y > brick.pos.y+brick.height/2) {
      this.vel.y = abs(this.vel.y);
      return true;
    }
    // if it hits the left
    if (this.pos.y > brick.pos.y-this.rad/2
        && this.pos.y < brick.pos.y+brick.height+this.rad/2
        && this.pos.x > brick.pos.x-this.rad/2
        && this.pos.x < brick.pos.x+brick.width/2) {
      this.vel.x = -abs(this.vel.x);
      return true;
    }    
    // if it hits the right
    if (this.pos.y > brick.pos.y-this.rad/2
        && this.pos.y < brick.pos.y+brick.height+this.rad/2
        && this.pos.x < brick.pos.x+brick.width+this.rad/2
        && this.pos.x > brick.pos.x+brick.width/2) {
      this.vel.x = abs(this.vel.x);
      return true;
    }
    // if it hits the top
    if (this.pos.x > brick.pos.x-this.rad/2
        && this.pos.x < brick.pos.x+brick.width+this.rad/2
        && this.pos.y > brick.pos.y-this.rad/2
        && this.pos.y < brick.pos.y+brick.height/2) {
      this.vel.y = -abs(this.vel.y);
      return true;
    }
    return false;
  }
  
  this.paddleCollide = function(paddle) {
    // if it hits the top
    if (this.pos.x > paddle.pos.x-this.rad/2
        && this.pos.x < paddle.pos.x+paddle.width+this.rad/2
        && this.pos.y > paddle.pos.y-this.rad/2
        && this.pos.y < paddle.pos.y+paddle.height/2) {
      var mag = this.vel.mag();
      var ang = map(this.pos.x, paddle.pos.x-this.rad/2, paddle.pos.x+paddle.width+this.rad/2, 7*PI/12, 5*PI/12);
      var norm = createVector(1/tan(ang), -1);
      var dot = 2*this.vel.dot(norm);
      norm.mult(dot);
      this.vel.sub(norm);
      this.vel.setMag(mag);
      this.pos.add(this.vel);
    }
  }
  
  this.wallCollide = function() {
    // if it hits the bottom
    if (this.pos.y > 480+this.rad/2) {
      return true;
    }
    // if it hits the left
    if (this.pos.x < this.rad/2) {
      this.vel.x = abs(this.vel.x);
    }    
    // if it hits the right
    if (this.pos.x > 640-this.rad/2) {
      this.vel.x = -abs(this.vel.x);
    }
    // if it hits the top
    if (this.pos.y < this.rad/2) {
      this.vel.y = -this.vel.y;
    }
    return false;
  }
}