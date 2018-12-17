function Snake() {
  this.segments = [];
  this.segments.push(new Segment(5, 0, "head"));
  for (var i = 1; i < 101; i++) {
    this.segments.push(new Segment(5, i, "body"));
  }
  
  this.update = function() {
    var mouse = createVector(mouseX, mouseY);
    if (keyIsPressed)
      this.segments[0].update(this.segments[100].tail);
    else
      this.segments[0].update(mouse);
    for (var i = 1; i < this.segments.length; i++) {
      this.segments[i].update(this.segments[i-1].tail);
    }
  }
  
  this.show = function() {
    for (var i = this.segments.length-1; i >= 0; i--) {
      this.segments[i].show();
    }
  }
}