class CalendarScreen {
  constructor(ti, fd, ds, nts, ev, fnts) {
    this.title = ti;
    this.firstDay = fd;
    this.daysInMonth = ds;
    this.showNotes = nts;
    this.events = ev;
    this.fonts = fnts;
    this.daysArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    // (x, y, w, h, r, p, bc, ts, f, tc, c)
    this.notesBox = new TextBox(1240, 190, 330, 680, 0, 20, color(255, 255, 255, 180), 25, this.fonts[2], 15, false);
  }

  handleTyped(k, kc) {
    if (!this.showNotes) return;
    this.notesBox.handleTyped(k, kc);
  }

  handleClick(mx, my) {
    if (!this.showNotes) return;
    this.notesBox.handleClick(mx, my);
    return {created: false};
  }

  show() {
    let nc = color(102, 87, 156);
    let ac = color(78, 64, 128);

    // title
    fill(255);
    textFont(this.fonts[0]);
    textSize(70);
    textAlign(CENTER, CENTER);
    text(this.title, 0, 35-20, width, 85);

    // calendar
    fill(nc);
    noStroke();
    if (this.showNotes) {
      rect(30, 130, 1180, 50);
    } else {
      rect(30, 130, 1540, 50);
    }
    fill(255);
    textFont(this.fonts[1]);
    textSize(25);
    if (this.showNotes) {
      for (let i = 0; i < this.daysArr.length; i++) {
        text(this.daysArr[i], 170*i+30, 130-3, 160, 50)
      }
    } else {
      for (let i = 0; i < this.daysArr.length; i++) {
        text(this.daysArr[i], 221.4*i+30, 130-3, 211.4, 50)
      }
    }
    let nRows = Math.ceil((this.firstDay+this.daysInMonth)/7);
    let bh = (870-190-(nRows-1)*10)/nRows;
    let bw = 160;
    if (!this.showNotes) {
      bw = 211.4;
    }
    let x = 30, y = 190;
    fill(255, 255, 255, 180);
    let k = -this.firstDay+1;
    textAlign(LEFT, TOP);
    let dayTS = Math.min(21, bh/5);
    textSize(dayTS);
    for (let i = 0; i < nRows; i++) {
      x = 30;
      for (let j = 0; j < 7; j++) {
        rect(x, y, bw, bh);
        if (k > 0 && k <= this.daysInMonth) {
          push();
          fill(ac);
          text(k, x+3, y-3);
          pop();
          let cEvents = this.events.filter(ev => ev.daysArr.includes(k));
          push();
          fill(15);

          let ty = y-3;
          for (let i = 0; i < cEvents.length; i++) {
            textFont(this.fonts[2]);
            let numWidth = textWidth(String(k));
            if (!this.showNotes) {
              x += 15;
            }
            text(cEvents[i].title, x+numWidth+9, ty+2);
            if (!this.showNotes) {
              x -= 15;
              }
            ty += dayTS+5;
            textFont(this.fonts[3]);
            push();
            textAlign(CENTER, CENTER);
            text(cEvents[i].time, x, ty+2, bw, dayTS+3);
            pop();
            ty += dayTS+5;
          }
          pop();
        }
        k++;
        x += bw+10;
      }
      y += bh+10;
    }

    // textBox
    if (!this.showNotes) return;
    fill(nc);
    noStroke();
    rect(1240, 130, 330, 50);
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(this.fonts[1]);
    textSize(25);
    text("NOTES", 1240, 130-3, 330, 50);
    this.notesBox.show();

  }

}
