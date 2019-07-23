class StartScreen {
  constructor(fnts) {
    let fDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let nDays = ["28", "29", "30", "31"];

    let nc = color(102, 87, 156);
    let ac = color(78, 64, 128);
    this.fonts = fnts;
    this.textBox = new TextBox(110, 220, width-220, 60, 4, 10, nc, 35, this.fonts[2], 245, true);
    this.fDayBtns = new ButtonGroup(0, 450, width, 140, 60, 4, 0, 40, fDays, 35, 245, this.fonts[2], nc, ac);
    this.nDayBtns = new ButtonGroup(0, 670, width, 200, 60, 4, 0, 0, nDays, 35, 245, this.fonts[2], nc, ac);
    this.nextBtn = new Button(1400, 795, 150, 60, 4, "NEXT", 35, 245, this.fonts[1], false, nc, ac, function() { return this.active});
  }

  handleClick(mx, my) {
    let fDayClicked = this.fDayBtns.handleClick(mx, my);
    let nDayClicked = this.nDayBtns.handleClick(mx, my);
    if (fDayClicked || nDayClicked) {
      this.textBox.deactivate();
    }
    this.textBox.handleClick(mx, my);
    if (this.fDayBtns.isSelected() && this.nDayBtns.isSelected() && this.textBox.isFilled()) {
      this.nextBtn.activate();
    } else {
      this.nextBtn.deactivate();
    }
    if (this.nextBtn.handleClick(mx, my)) {
      return {created: true, replace: true, screen: new EventsScreen(
        this.textBox.getText(),
        this.fDayBtns.selection(),
        this.nDayBtns.selection()+28,
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
    fill(20, 40, 50, 50);
    noStroke();
    rect(0, 130, width, 180);
    rect(0, 350, width, 180);
    rect(0, 570, width, 180);

    // all buttons and text boxes
    this.fDayBtns.show();
    this.nDayBtns.show();
    this.nextBtn.show();
    this.textBox.show();

    // all text
    fill(255);
    textFont(this.fonts[0]);
    textSize(70);
    textAlign(CENTER, CENTER);
    text("SETUP", 0, 15, width, 85);
    textSize(52);
    textAlign(LEFT, TOP);
    textFont(this.fonts[1]);
    text("Enter the calendar title:", 140, 150, width, height);
    text("Choose the first day of the month:", 130, 380, width, height);
    text("Choose the number of days in the month:", 130, 600, width, height);
    pop();
  }
}
