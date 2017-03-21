function Brick(x, y) {
  this.width = 61.8;
  this.height = 20;
  this.pos = createVector(x*(this.width+2)+2, y*(this.height+2)+2);
  var r = floor(random(100, 200));
  var g = floor(random(100, 200));
  var b = floor(random(100, 200));
  this.col = color(r, g, b), 
  
  
  this.show = function() {
    push();
    fill(this.col);
    noStroke();
    rect(this.pos.x, this.pos.y, this.width, this.height);
    pop();
  }
}