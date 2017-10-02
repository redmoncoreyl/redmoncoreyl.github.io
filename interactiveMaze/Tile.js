function Tile(seg, or, cx, cy, s) {
  this.possible = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let probabilityD = [0,0,0,0,0,0,0.1,0,.1,.1,0,0,.1,0,0.1,0,0,0,0,0,.1,0.1,0.1,0,.1,.1,0];
  let cumulativePD = [];
  let sum = 0;
  for (let i = 0; i < probabilityD.length; i++) {
    sum += probabilityD[i];
    cumulativePD.push(sum);
  }
  let p = Math.random();
  this.number = 0;
  while (cumulativePD[this.number] < p) this.number++;
  
  this.letter = this.possible.charAt(this.number);
  this.segments = [];
  for (let i = 0; i < 12; i++) {
    this.segments.push(seg[this.number][i]);
  }
  let nbor;
  if (or) {nbor = 1;}
  else {nbor = 0;}
  this.orientation = Math.floor(Math.random()*3)*120+nbor*60;
  this.center = createVector(cx, cy);
  this.size = s;
  angleMode(DEGREES);
  this.a = createVector(this.center.x+this.size*cos(210+this.orientation), 
                        this.center.y-this.size*sin(210+this.orientation));
  this.b = createVector(this.center.x+this.size*cos(90+this.orientation), 
                        this.center.y-this.size*sin(90+this.orientation));
  this.c = createVector(this.center.x+this.size*cos(-30+this.orientation), 
                        this.center.y-this.size*sin(-30+this.orientation));
}

Tile.prototype.show = function(last) {
  push();
  if (last == 1) {
    noStroke();
    fill(160);
    triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
    stroke(255,0,0);
    strokeWeight(5);
  } else {
    let s1 = ((mouseX-this.b.x)*(this.a.y-this.b.y) - (this.a.x-this.b.x)*(mouseY-this.b.y)) > 0;
    let s2 = ((mouseX-this.c.x)*(this.b.y-this.c.y) - (this.b.x-this.c.x)*(mouseY-this.c.y)) > 0;
    let s3 = ((mouseX-this.a.x)*(this.c.y-this.a.y) - (this.c.x-this.a.x)*(mouseY-this.a.y)) > 0;
    if ((s1 && s2 && s3) || (!s1 && !s2 && !s3)) {
      return this;
    } else {
      strokeWeight(5);
      stroke(0);
    }
  }
  let abm = createVector((this.a.x+this.b.x)/2, (this.a.y+this.b.y)/2);
  let bcm = createVector((this.b.x+this.c.x)/2, (this.c.y+this.b.y)/2);
  let cam = createVector((this.a.x+this.c.x)/2, (this.a.y+this.c.y)/2);
  if (this.segments[0] == 1) {
    line(this.a.x, this.a.y, abm.x, abm.y);
  }
  if (this.segments[1] == 1) {
    line(abm.x, abm.y, this.b.x, this.b.y);
  }
  if (this.segments[2] == 1) {
    line(this.b.x, this.b.y, bcm.x, bcm.y);
  }
  if (this.segments[3] == 1) {
    line(bcm.x, bcm.y, this.c.x, this.c.y);
  }
  if (this.segments[4] == 1) {
    line(this.c.x, this.c.y, cam.x, cam.y);
  }
  if (this.segments[5] == 1) {
    line(cam.x, cam.y, this.a.x, this.a.y);
  }
  if (this.segments[6] == 1) {
    line(this.a.x, this.a.y, this.center.x, this.center.y);
  }
  if (this.segments[7] == 1) {
    line(abm.x, abm.y, this.center.x, this.center.y);
  }
  if (this.segments[8] == 1) {
    line(this.b.x, this.b.y, this.center.x, this.center.y);
  }
  if (this.segments[9] == 1) {
    line(bcm.x, bcm.y, this.center.x, this.center.y);
  }
  if (this.segments[10] == 1) {
    line(this.c.x, this.c.y, this.center.x, this.center.y);
  }
  if (this.segments[11] == 1) {
    line(cam.x, cam.y, this.center.x, this.center.y);
  }
  pop();
  return null;
}

Tile.prototype.rotate = function(mx, my) {
  let s1 = ((mx-this.b.x)*(this.a.y-this.b.y) - (this.a.x-this.b.x)*(my-this.b.y)) > 0;
  let s2 = ((mx-this.c.x)*(this.b.y-this.c.y) - (this.b.x-this.c.x)*(my-this.c.y)) > 0;
  let s3 = ((mx-this.a.x)*(this.c.y-this.a.y) - (this.c.x-this.a.x)*(my-this.a.y)) > 0;
  if ((s1 && s2 && s3) || (!s1 && !s2 && !s3)) {
    this.orientation += 120;
    this.orientation %= 360;
    
    let t = this.a
    this.a = this.b;
    this.b = this.c;
    this.c = t;
  }
}

Tile.prototype.change = function(mx, my, c, s) {
  let s1 = ((mx-this.b.x)*(this.a.y-this.b.y) - (this.a.x-this.b.x)*(my-this.b.y)) > 0;
  let s2 = ((mx-this.c.x)*(this.b.y-this.c.y) - (this.b.x-this.c.x)*(my-this.c.y)) > 0;
  let s3 = ((mx-this.a.x)*(this.c.y-this.a.y) - (this.c.x-this.a.x)*(my-this.a.y)) > 0;
  if ((s1 && s2 && s3) || (!s1 && !s2 && !s3)) {
    this.number += c;
    this.number %= 27;
    this.letter = this.possible[this.number];
    for (let i = 0; i < 12; i++) {
      this.segments[i] = s[this.number][i];
    }
  }
}