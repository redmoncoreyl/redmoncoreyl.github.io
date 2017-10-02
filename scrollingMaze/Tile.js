function Tile(seg, or, cx, cy, s, col) {
  this.number = floor(Math.random()*seg.length);
  this.segments = [];
  for (let i = 0; i < seg[0].length; i++) {
    this.segments.push(seg[this.number][i]);
  }
  this.nbor;
  if (or) {this.nbor = 1;}
  else {this.nbor = 0;}
  this.orientation = Math.floor(Math.random()*3)*120+this.nbor*60;
  this.center = createVector(cx, cy);
  this.size = s;
  angleMode(DEGREES);
  this.a = createVector(this.center.x+this.size*cos(210+this.orientation), 
                        this.center.y-this.size*sin(210+this.orientation));
  this.b = createVector(this.center.x+this.size*cos(90+this.orientation), 
                        this.center.y-this.size*sin(90+this.orientation));
  this.c = createVector(this.center.x+this.size*cos(-30+this.orientation), 
                        this.center.y-this.size*sin(-30+this.orientation));
  this.abm = createVector((this.a.x+this.b.x)/2, (this.a.y+this.b.y)/2);
  this.bcm = createVector((this.b.x+this.c.x)/2, (this.c.y+this.b.y)/2);
  this.cam = createVector((this.a.x+this.c.x)/2, (this.a.y+this.c.y)/2);
  this.col = col;
}

Tile.prototype.show = function() {
  push();
  strokeWeight(5);
  colorMode(HSB);
  stroke(this.col);
  if (this.segments[0] == 1) {
    line(this.a.x, this.a.y, this.center.x, this.center.y);
  }
  if (this.segments[1] == 1) {
    line(this.abm.x, this.abm.y, this.center.x, this.center.y);
  }
  if (this.segments[2] == 1) {
    line(this.b.x, this.b.y, this.center.x, this.center.y);
  }
  if (this.segments[3] == 1) {
    line(this.bcm.x, this.bcm.y, this.center.x, this.center.y);
  }
  if (this.segments[4] == 1) {
    line(this.c.x, this.c.y, this.center.x, this.center.y);
  }
  if (this.segments[5] == 1) {
    line(this.cam.x, this.cam.y, this.center.x, this.center.y);
  }
  pop();
}

Tile.prototype.update = function(seg) {
  let inc = createVector(0, -3);
  this.center.add(inc);
  this.a.add(inc);
  this.b.add(inc);
  this.c.add(inc);
  this.abm.add(inc);
  this.bcm.add(inc);
  this.cam.add(inc);
  if (this.center.y < -100) {
    let reset = createVector(0, 5*3*this.size);
    this.center.add(reset);
    this.a.add(reset);
    this.b.add(reset);
    this.c.add(reset);
    this.abm.add(reset);
    this.bcm.add(reset);
    this.cam.add(reset);
    let co = hue(this.col);
    co += 30;
    co %= 360;
    this.col = color(co, 255, 255);
    this.number = floor(Math.random()*seg.length);
    this.segments = [];
    for (let i = 0; i < seg[0].length; i++) {
      this.segments.push(seg[this.number][i]);
    }
    this.orientation = Math.floor(Math.random()*3)*120+this.nbor*60;
  }
}