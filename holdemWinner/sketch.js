window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
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

function mousePressed() {
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	game = new GameHandler();
}

function draw() {
	background(3, 115, 55);
	game.draw();
}