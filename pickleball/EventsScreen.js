class EventsScreen {
  constructor(ti, fd, ds, nts, ev, pg, fnts) {
    this.calendarTitle = ti;
    this.firstDay = fd;
    this.daysInMonth = ds;
    this.notes = nts;
    this.fonts = fnts;
    this.displayPage = pg;
    this.events = ev;

    let nc = color(102, 87, 156);
    let ac = color(78, 64, 128);
    let addc = color(240, 20, 40);
    // (x, y, w, h, r, t, ts, tc, f, a, nc, ac, oc)
    // let na =
    // let pa
    this.doneBtn = new Button(400, 815, width-800, 60, 4, "DONE", 35, 245, this.fonts[1], true, nc, ac, function() { return true; });
    this.prevBtn = new Button(40, 815, 280, 60, 4, "PREV", 35, 245, this.fonts[2], true, nc, ac, function() { return this.active; });
    this.nextBtn = new Button(1280, 815, 280, 60, 4, "NEXT", 35, 245, this.fonts[2], false, nc, ac, function() { return this.active; });
    this.addBtn = new Button(500, 730, width-1000, 60, 4, "ADD EVENT", 35, 245, this.fonts[1], true, nc, addc, function() { return true; });

    if (this.displayPage == 0) {
      this.prevBtn.deactivate();
    }
    if (6*(this.displayPage+1) < this.events.length) {
      this.nextBtn.activate();
    }

    this.xl = [40, width/2+20, 40, width/2+20, 40, width/2+20];
    this.xr = [width/2-20, width-40, width/2-20, width-40, width/2-20, width-40];
    this.yl = [130, 130, 330, 330, 530, 530];
    this.yr = [310, 310, 510, 510, 710, 710];
  }

  handleTyped(k, kc) {

  }

  handleClick(mx, my) {
    if (this.prevBtn.handleClick(mx, my)) {
      this.displayPage--;
      if (this.displayPage == 0) {
        this.prevBtn.deactivate();
      }
      this.nextBtn.activate();
      return {created: false};
    }
    if (this.nextBtn.handleClick(mx, my)) {
      this.displayPage++;
      this.nextBtn.deactivate();
      if (6*(this.displayPage+1) < this.events.length) {
        this.nextBtn.activate();
      }
      this.prevBtn.activate();
      return {created: false};
    }
    if (this.addBtn.handleClick(mx, my)) {
      return {created: true, replace: false, screen: new CreateEventScreen(this.firstDay, this.daysInMonth, this.fonts)};
    }
    if (this.doneBtn.handleClick(mx, my)) {
      return {created: true, replace: true, screen: new CalendarScreen(this.calendarTitle, this.firstDay, this.daysInMonth, this.notes, this.events, this.fonts)};
    }
    return {created: false};
  }

  update(p) {
    this.events.push(p);
    this.displayPage = Math.floor((this.events.length-1)/6);
    if (this.displayPage == 0) {
      this.prevBtn.deactivate();
    } else {
      this.prevBtn.activate();
    }
    this.nextBtn.deactivate();
  }

  show() {
    push();
    // all text
    fill(255);
    textFont(this.fonts[0]);
    textSize(70);
    textAlign(CENTER, CENTER);
    text("EVENTS", 0, 35-20, width, 85);

    // show events
    let nc = color(102, 102, 255);
    let si = 6*this.displayPage;
    let ei = Math.min(6*(this.displayPage+1), this.events.length);

    noStroke();
    for (let i = si, j = 0; i < ei; i++, j++) {
      fill(20, 40, 50, 50);
      rect(this.xl[j], this.yl[j], this.xr[j]-this.xl[j], this.yr[j]-this.yl[j], 3);
      fill(255);
      textSize(35);
      textFont(this.fonts[2]);
      textAlign(LEFT, CENTER);
      text(this.events[i].title, this.xl[j]+20, this.yl[j], width, (this.yr[j]-this.yl[j])/2-25);
      textFont(this.fonts[3]);
      textAlign(RIGHT, CENTER);
      text(this.events[i].time, this.xl[j]+(this.xr[j]-this.xl[j])/2+20, this.yl[j], (this.xr[j]-this.xl[j])/2-30, (this.yr[j]-this.yl[j])/2-25);
      textAlign(LEFT, TOP);
      text(this.events[i].daysText, this.xl[j]+20, (this.yr[j]+this.yl[j])/2-22, (this.xr[j]-this.xl[j])-40, (this.yr[j]-this.yl[j])/2);
    }

    // show buttons
    this.addBtn.show();
    this.doneBtn.show();
    this.prevBtn.show();
    this.nextBtn.show();
    pop();
  }
}
