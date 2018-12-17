function Ball(c) {
  this.r = random(40,100);
  this.p = createVector(random(this.r+1, width-this.r-1), random(height/4, 2*height/3));
  this.v = createVector(random(-12,12), 0);
  this.a = createVector(0, 0.7);
  this.c = c || random(['red', 'green', 'blue']);
  
  this.update = function(s) {
    this.p.add(p5.Vector.mult(this.v, 1/s));
    this.p.add(p5.Vector.mult(this.a, 0.5/s/s));
    this.v.add(p5.Vector.mult(this.a, 1/s));
  }
  
  this.walls = function() {
    if (this.p.x < this.r) {
      this.v.x = -this.v.x;
    }
    if (this.p.x > width-this.r) {
      this.v.x = -this.v.x;
    }
    if (this.p.y > height-this.r) {
      this.v.y = -this.v.y;
    }
  }
  
  this.collide = function(other) {
    if ((p5.Vector.sub(this.p, other.p)).mag() < (this.r+other.r)) {
      var angle1 = this.v.heading();
      var angle2 = other.v.heading();
      var phi = (p5.Vector.sub(other.p, this.p)).heading();
      var v1 = this.v.mag();
      var v2 = other.v.mag();
      var m1 = pow(this.r, 2);
      var m2 = pow(other.r, 2);
      var v1xNew = ((v1*cos(angle1-phi)*(m1-m2))+(2*m2*v2*cos(angle2-phi)))*cos(phi)/(m1+m2) + v1*sin(angle1-phi)*cos(phi+PI/2);
      var v1yNew = ((v1*cos(angle1-phi)*(m1-m2))+(2*m2*v2*cos(angle2-phi)))*sin(phi)/(m1+m2) + v1*sin(angle1-phi)*sin(phi+PI/2);
      var v2xNew = ((v2*cos(angle2-phi)*(m2-m1))+(2*m1*v1*cos(angle1-phi)))*cos(phi)/(m1+m2) + v2*sin(angle2-phi)*cos(phi+PI/2);
      var v2yNew = ((v2*cos(angle2-phi)*(m2-m1))+(2*m1*v1*cos(angle1-phi)))*sin(phi)/(m1+m2) + v2*sin(angle2-phi)*sin(phi+PI/2);
      this.v.set(v1xNew, v1yNew);
      other.v.set(v2xNew, v2yNew);
      return 1;
    }
    return 0;
  }
  
  this.totalEnergy = function() {
    var g = this.a.mag();
    var h = height-this.p.y;
    var v = this.v.mag();
    return (g*h+0.5*v*v);
  }
  
  this.show = function() {
    fill(this.c);
    ellipse(this.p.x, this.p.y, 2*this.r,2*this.r);
  }
  
}