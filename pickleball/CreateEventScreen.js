class CreateEventScreen {
  constructor(fd, ds, fnts) {
    this.firstDay = fd;
    this.daysInMonth = ds;
    this.fonts = fnts;

    let nc = color(102, 87, 156);
    let ac = color(78, 64, 128);
    let selec = [];
    for (let i = 0; i < this.firstDay; i++) {
      selec.push("");
    }
    for (let i = 0; i < this.daysInMonth; i++) {
      selec.push(i+1);
    }
    while (selec.length%7 != 0) {
      selec.push("");
    }
    this.titleBox = new TextBox(200, 160, width/2-250, 60, 4, 10, nc, 35, this.fonts[2], 245, true);
    this.timeBox = new TextBox(width/2+200, 160, width/2-250, 60, 4, 10, nc, 35, this.fonts[2], 245, true);
    // (x, y, w, bw, bh, br, bhsp, bvsp, bts, ts, tc, f, nc, ac)
    let daysArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let calBtnH;
    if (selec.length == 28) {
      calBtnH = (505-80-40)/5;
    } else if (selec.length == 35) {
      calBtnH = (505-80-50)/6;
    } else {
      calBtnH = (505-80-60)/7;
    }
    this.calHeader = new MultiSelect(200, 320, width-400, 155, calBtnH, 0, 10, 10, daysArr, 35, 245, this.fonts[2], ac, ac);
    this.calendar = new MultiSelect(200, 330+calBtnH, width-400, 155, calBtnH, 0, 10, 10, selec, 35, 245, this.fonts[2], nc, ac);
    this.doneBtn = new Button(400, 815, width-800, 60, 4, "DONE", 35, 245, this.fonts[1], false, nc, ac, function() { return this.active; });
  }

  handleTyped(k, kc) {
    this.titleBox.handleTyped(k, kc);
    this.timeBox.handleTyped(k, kc);
    if (this.timeBox.isFilled() && this.titleBox.isFilled()) {
      this.doneBtn.activate();
    } else {
      this.doneBtn.deactivate();
    }
  }

  handleClick(mx, my) {
    if (this.calendar.handleClick(mx, my)) {
      this.titleBox.deactivate();
      this.timeBox.deactivate();
      return {created: false};
    }
    if (this.titleBox.handleClick(mx, my)) {
      this.timeBox.deactivate();
      return {created: false};
    }
    if (this.timeBox.handleClick(mx, my)) {
      this.titleBox.deactivate();
      return {created: false};
    }
    if (this.doneBtn.handleClick(mx, my)) {
      let ds = this.calendar.selection();
      for (let i = 0; i < ds.length; i++) {
        ds[i] = ds[i] - this.firstDay + 1;
      }
      return {created: true, replace: true, screen: null, popped: new Event(
        this.titleBox.getText(),
        this.timeBox.getText(),
        ds
      )};
    }
    return {created: false};
  }

  show() {
    push();
    // all background boxes
    fill(20, 40, 50, 50);
    noStroke();
    rect(0, 130, width, 120);
    rect(0, 280, width, 505);


    // all buttons and text boxes
    this.titleBox.show();
    this.timeBox.show();
    this.calendar.show();
    this.calHeader.show();
    this.doneBtn.show();

    // all text
    fill(255);
    textFont(this.fonts[0]);
    textSize(70);
    textAlign(CENTER, CENTER);
    text("NEW EVENT", 0, 35-20, width, 85);
    textAlign(LEFT, TOP);
    textSize(52);
    textFont(this.fonts[1]);
    text("Title:", 40, 160, 170, 60);
    text("Time:", width/2+20, 160, 170, 60);
    text("Days:", 40, 320, 170, 60);
    pop();
  }
}
