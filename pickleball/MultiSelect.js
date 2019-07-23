class MultiSelect {
  constructor(x, y, w, bw, bh, br, bhsp, bvsp, bts, ts, tc, f, nc, ac) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.bw = bw;
    this.bh = bh;
    this.br = br;
    this.buttons = [];
    let maxNPerLine = 1;
    for (let lw = bw; lw < w; lw += bw+bhsp, maxNPerLine++) {}
    if (maxNPerLine*bw+(maxNPerLine-1)*bhsp > w) maxNPerLine--;
    let nLines = Math.ceil(bts.length/maxNPerLine);
    let nPerLine = bts.length/nLines;
    let iy = y;
    let n = 0;
    let k = 0;
    for (let i = 0; i < nLines; i++) {
      // determins number of buttons in this line
      let cn = Math.ceil(nPerLine*(i+1)) - n;
      let hsp = (w - bw*cn)/(cn+1);
      let ix = hsp+x;
      for (let j = 0; j < cn; j++) {
        if (bts[k] === "") {
          this.buttons.push(new Button(ix, iy, bw, bh, br, bts[k], ts, tc, f, false, nc, ac, function() { return false; }));
        } else {
          this.buttons.push(new Button(ix, iy, bw, bh, br, bts[k], ts, tc, f, false, nc, ac, function() { return true; }));
        }
        ix += bw + hsp;
        k++;
      }

      n += cn;
      iy += bh + bvsp;
    }
  }

  handleClick(mx, my) {
    let b = null;
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].handleClick(mx, my)) b = i;
    }
    if (b == null) return false;
    this.buttons[b].toggleActive();
    return true;
  }

  selection() {
    let selections = [];
    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].isActive()) {
        selections.push(i);
      }
    }
    return selections;
  }

  show() {
    for (let b of this.buttons) {
      b.show();
    }
  }
}
