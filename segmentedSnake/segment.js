function Segment(l, i, t) {
  this.head = createVector();
  this.angle = 0;
  this.len = l;
  this.tail = createVector();
  this.index = i;
  this.type = t;
  
  this.update = function(target) {
    if (this.type == "head") {
      var dir = p5.Vector.sub(target, this.tail);
      this.angle = dir.heading()+180;
      var desired = p5.Vector.sub(target, this.head);
      desired.limit(5);
      this.head.add(desired.x, desired.y);
    } else {
      var dir = p5.Vector.sub(target, this.tail);
      this.angle = dir.heading()+180;
      this.head.set(target.x, target.y);
    }
  }
  
  this.show = function() {
    
    angleMode(DEGREES);
    var dx = this.len*cos(this.angle);
    var dy = this.len*sin(this.angle);
    this.tail.set(this.head.x+dx, this.head.y+dy);
    push();
    colorMode(HSB, 255);
    stroke(this.index/100*255, 255, 255);
    strokeWeight(100-this.index/2);
    line(this.head.x, this.head.y, this.tail.x, this.tail.y);
    pop();
  }
}