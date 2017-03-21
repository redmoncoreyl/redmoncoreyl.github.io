function Timer(x, y, w, h, c, t) {
  this.x = x || width / 2;
  this.y = y || height / 2;
  this.w = w || width * 0.95;
  this.h = h || height * 0.95;
  this.c = c || color(200, 200, 255);
  this.time = 0;
  this.diff = millis();
  this.ticking = t || false;

  this.setColor = function(col) {
    this.c = col;
  }

  this.tick = function() {
    return this.ticking;
  }
  
  this.setTick = function(t) {
    this.ticking = t;
  }
  
  this.zero = function() {
    this.time = 0;
    this.diff = millis();
  }
  
  this.update = function() {
    if (this.ticking) {
      this.time = millis() - this.diff;
    } else {
      this.diff = millis() - this.time;
    }
  }
  
  this.getTime = function() {
    return this.time/1000;
  }
  
  /*
  this.reset = function() {
    this.ticking = true;
    this.stime = millis();
    this.time = millis();
  }

  this.stop = function() {
    this.ticking = false;
    this.time = millis();
    this.stime = millis();
  }
  
  this.zero = function() {
    this.time = millis();
    this.stime = millis();
  }

  this.toggle = function() {
    if (this.ticking) this.pause();
    else this.resume();
    this.ticking = !this.ticking;
  }
  
  this.pause = function() {
    
  }
  
  this.resume = function() {
    
  }
  */
  
  this.show = function() {
    var tsize = this.h * 0.95;
    var twidth;
    var s = "" + round(this.time/10)/100;
    if (!s.includes('.')) {
      s = s + ".00";
    } else {
      while (s.indexOf('.') > s.length-3) {
        s = s + "0";
      }
    }
    
    push();
    textFont("Consolas");
    textSize(tsize);
    twidth = textWidth(s);
    while (twidth > this.w * 0.95) {
      tsize--;
      textSize(tsize);
      twidth = textWidth(s);
    }
    translate(this.x, this.y);
    fill(this.c);
    noStroke();
    rect(-this.w / 2, -this.h / 2, this.w, this.h);
    textSize(tsize);
    textAlign(CENTER, CENTER);
    fill(0);
    text(s, 0, 0);
    pop();
  }
}