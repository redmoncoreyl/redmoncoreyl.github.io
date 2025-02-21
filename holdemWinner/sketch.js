window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

document.addEventListener('contextmenu', event => event.preventDefault());

let CARD_FONT;
let game;
let drawRedRect = false;
let circleX = 0;
let circleY = 0;
let ignoreMouseDown = false;

function preload() {
	let suitImages = {};
	suitImages['Spades'] = loadImage('assets/spades.svg');
	suitImages['Clubs'] = loadImage('assets/clubs.svg');
	suitImages['Hearts'] = loadImage('assets/hearts.svg');
	suitImages['Diamonds'] = loadImage('assets/diamonds.svg');
	Suit.preload(suitImages);
	CARD_FONT = loadFont('assets/card_font.ttf');
}

function mousePressed(event) {
	if (event.type === 'touchstart') ignoreMouseDown = true;
	if (ignoreMouseDown && event.type === 'mousedown') return;

	drawRedRect = !drawRedRect;
	circleX = mouseX;
	circleY = mouseY;
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	game = new GameHandler();
}

function draw() {
	background(3, 115, 55);
	game.draw();
	if (drawRedRect) {
		noStroke();
		fill(255, 0, 0, 120);
		rect(0, 0, width, height);
		ellipse(circleX, circleY, width/8);
	}
}