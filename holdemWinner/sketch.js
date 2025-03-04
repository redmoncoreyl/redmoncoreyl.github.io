window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
	game.resize(window.innerWidth, window.innerHeight);
}

document.addEventListener('contextmenu', event => event.preventDefault());

let CARD_FONT;
let game;

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
	game.handleMouseClick(this);
}

function mouseReleased(event) {
}

function keyPressed(event) {
	if (event.key === 'Escape') {
		game = new GameHandler(width, height);
	}
}

function touchStarted(event) {
	event.preventDefault();
	game.handleMouseClick(this);
}

function touchEnded(event) {
	event.preventDefault();
	mouseX = -1;
	mouseY = -1;
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	game = new GameHandler(width, height);
}

function draw() {
	background(3, 110, 43);
	game.draw(this);
}