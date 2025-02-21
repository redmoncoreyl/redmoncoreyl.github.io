window.onresize = () => {
	resizeCanvas(window.innerWidth-1, window.innerHeight-1);
}

document.addEventListener('contextmenu', event => event.preventDefault());

let CARD_FONT;
let hand;

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
	hand.handleMouseClick(mouseX, mouseY, mouseButton, width, height);
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	hand = new HoldemHand(4);
}

function draw() {
	background(3, 115, 55);
	hand.draw(width, height);
}