class TextBox {
  constructor(x, y, w, h, r, p, bc, ts, f, tc, c) {
    this.text = "";
    this.active = false;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.radius = r;
    this.padding = p;
    this.boxColor = bc;
    this.textSize = ts;
    this.font = f;
    this.textColor = tc;
    this.isCentered = c;
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
      this.activate();
      return true;
    }
    this.deactivate();
    return false;
  }

  isActive() {
    return this.active;
  }

  getText() {
    return this.text;
  }

  isFilled() {
    return this.text != "";
  }

  handleTyped(k, kc) {
    if (!this.active) return;
    if (keyCode == BACKSPACE) {
      this.text = this.text.substr(0, this.text.length-1);
      return;
    }
    if (keyCode == ENTER) {
      this.text += '\n';
    }
    if (k.length != 1) return;
    this.text += k;
    if (!this.isCentered) {
      let sLine;
      for (sLine = this.text.length-1; sLine > 0 && this.text[sLine] != '\n'; sLine--) {}
      let cLine = this.text.substr(sLine+1, this.text.length);
      textSize(this.textSize);
      textFont(this.font);
      let tw = textWidth(cLine);
      if (tw >= this.w-2*this.padding) {
        let sp;
        for (sp = this.text.length-1; sp > 0 && this.text[sp] != ' '; sp--) {}
        this.text = this.text.substr(0, sp) + '\n' + this.text.substr(sp+1, this.text.length);
      }
    }
  }

  show() {
    push();
    noStroke();
    fill(this.boxColor);
    rect(this.x, this.y, this.w, this.h, this.radius);
    fill(this.textColor);
    if (this.isCentered) {
      textAlign(LEFT, CENTER);
    } else {
      textAlign(LEFT, TOP);
    }
    textSize(this.textSize);
    textFont(this.font);
    text(this.text, this.x+this.padding, this.y-3+(!this.isCentered?this.padding:0), this.w-this.padding*2, this.h);
    if(Math.floor(millis()/500)%2 == 0 && this.active) {
      if (this.isCentered) {
        let tw = textWidth(this.text);
        let lx = this.x+this.padding+tw+3;
        stroke(this.textColor);
        strokeWeight(3);
        line(lx, this.y+this.padding, lx, this.y+this.padding+this.textSize+4);
      } else {
        let nlCount = 0;
        for (let i = 0; i < this.text.length; i++) {
          if (this.text[i] == '\n') nlCount++;
        }
        let sLine;
        for (sLine = this.text.length-1; sLine > 0 && this.text[sLine] != '\n'; sLine--) {}
        let cLine = this.text.substr(sLine+(nlCount == 0?0:1), this.text.length);
        let tw = textWidth(cLine);
        stroke(this.textColor);
        strokeWeight(2);
        let ly = this.y+this.padding+nlCount*this.textSize*1.245;
        line(this.x+this.padding+tw+3, ly, this.x+this.padding+tw+3, ly+this.textSize+2);
      }
    }
    pop();
  }

}
