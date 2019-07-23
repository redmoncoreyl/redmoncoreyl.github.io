class Button {
  constructor(x, y, w, h, r, t, ts, tc, f, a, nc, ac, oc) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.radius = r;
    this.text = t;
    this.textSize = ts;
    this.textColor = tc;
    this.font = f;
    this.active = a;
    this.normalColor = nc;
    this.activeColor = ac;
    this.onClick = oc;
  }

  activate() {
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  toggleActive() {
    this.active = !this.active;
  }

  handleClick(mx, my) {
    if (mx > this.x && mx < this.x+this.w && my > this.y && my < this.y+this.h) {
      return this.onClick();
    }
  }

  isActive() {
    return this.active;
  }

  show() {
    push();
    noStroke();
    if (this.active) fill(this.activeColor);
    else fill(this.normalColor);
    rect(this.x, this.y, this.w, this.h, this.radius);
    fill(this.textColor);
    textAlign(CENTER, CENTER);
    textSize(this.textSize);
    textFont(this.font);
    text(this.text, this.x, this.y-3, this.w, this.h);
    pop();
  }
}
