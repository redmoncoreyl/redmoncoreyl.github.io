// every screen has the following functions:
//   show()
//   handleClick(mx, my)
//   handleTyped(k, kc)

let screens = [];
let msFonts = [];

function keyPressed() {
  screens[screens.length-1].handleTyped(key, keyCode);
}

function mousePressed() {
  let newScreen = screens[screens.length-1].handleClick(mouseX, mouseY);
  if (!newScreen.created) return;
  if (newScreen.replace) {
    screens.pop();
  }
  if (newScreen.screen) {
    screens.push(newScreen.screen);
  } else {
    screens[screens.length-1].update(newScreen.popped);
  }
}

function preload() {
  msFonts.push(loadFont("fonts/Montserrat-Black.ttf"));
  msFonts.push(loadFont("fonts/Montserrat-Bold.ttf"));
  msFonts.push(loadFont("fonts/Montserrat-Medium.ttf"));
  msFonts.push(loadFont("fonts/Montserrat-Light.ttf"));
}

function setup() {
  createCanvas(1600, 900);
  // screens.push(new CreateEventScreen(2, 31, msFonts));
  screens.push(new StartScreen(msFonts));
}

function draw() {
  background(49, 201, 194);
  screens[screens.length-1].show();
}
