class Event {
  constructor(ti, tm, ds) {
    this.title = ti;
    this.time = tm;
    this.daysArr = ds;
    this.daysText = "Days: ";
    for (let i of this.daysArr) {
      this.daysText += i;
      this.daysText += ", ";
    }
    this.daysText = this.daysText.substr(0, this.daysText.length-2);
  }

  show() {
    push();
    // all text
    fill(255);
    textFont(this.fonts[0]);
    textSize(70);
    textAlign(CENTER, CENTER);
    text(this.title, 0, 35-20, width, 85);
    pop();
  }
}
