class StartScreen {
  constructor(fnts) {
    let fDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let nDays = ["28", "29", "30", "31"];
    let notes = ["NO", "YES"];

    let nc = color(102, 87, 156);
    let ac = color(78, 64, 128);
    this.fonts = fnts;
    // (x, y, w, bw, bh, br, bhsp, bvsp, bts, ts, tc, f, nc, ac)
    this.textBox = new TextBox(110, 190, width-220, 45, 4, 10, nc, 28, this.fonts[2], 245, true);
    this.fDayBtns = new ButtonGroup(110, 367, width-220, 150, 45, 4, 55, 40, fDays, 28, 245, this.fonts[2], nc, ac);
    this.nDayBtns = new ButtonGroup(110, 544, width-220, 280, 45, 4, 66, 0, nDays, 28, 245, this.fonts[2], nc, ac);
    this.notesBtns = new ButtonGroup(110, 721, width-220, 625, 45, 4, 66, 0, notes, 28, 245, this.fonts[2], nc, ac);
    this.nextBtn = new Button(1420, 815, 150, 60, 4, "NEXT", 35, 245, this.fonts[1], false, nc, ac, function() { return this.active});
  }

  handleClick(mx, my) {
    this.fDayBtns.handleClick(mx, my);
    this.nDayBtns.handleClick(mx, my);
    this.notesBtns.handleClick(mx, my);
    this.textBox.handleClick(mx, my);
    if (this.fDayBtns.isSelected() && this.nDayBtns.isSelected() && this.notesBtns.isSelected() && this.textBox.isFilled()) {
      this.nextBtn.activate();
    } else {
      this.nextBtn.deactivate();
    }
    if (this.nextBtn.handleClick(mx, my)) {
      return {created: true, replace: true, screen: new EventsScreen(
        this.textBox.getText(),
        this.fDayBtns.selection(),
        this.nDayBtns.selection()+28,
        this.notesBtns.selection(),
        [], 0, this.fonts
      )};
    }
    return {created: false};
  }

  handleTyped(k, kc) {
    this.textBox.handleTyped(k, kc);
    if (this.fDayBtns.isSelected() && this.nDayBtns.isSelected() && this.textBox.isFilled()) {
      this.nextBtn.activate();
    } else {
      this.nextBtn.deactivate();
    }
  }

  show() {
    push();
    // all background boxes
    fill(10, 30, 40, 80);
    noStroke();
    rect(0, 110, width, 147);
    rect(0, 287, width, 147);
    rect(0, 464, width, 147);
    rect(0, 641, width, 147);

    // all buttons and text boxes
    this.fDayBtns.show();
    this.nDayBtns.show();
    this.nextBtn.show();
    this.textBox.show();
    this.notesBtns.show();

    // all text
    fill(255);
    textFont(this.fonts[0]);
    textSize(70);
    textAlign(CENTER, CENTER);
    text("SETUP", 0, 5, width, 85);
    textSize(42);
    textAlign(LEFT, TOP);
    textFont(this.fonts[1]);
    text("Enter the calendar title:", 120, 120, width, height);
    text("Choose the first day of the month:", 120, 297, width, height);
    text("Choose the number of days in the month:", 120, 474, width, height);
    text("Does the calendar need notes:", 120, 651, width, height);
    pop();
  }
}
