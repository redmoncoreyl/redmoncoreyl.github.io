window.onresize = () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
	game.resize(window.innerWidth, window.innerHeight);
}

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('click', activateAudioContext);
document.addEventListener('touchstart', activateAudioContext);

let CARD_FONT;
let CORRECT_SOUND_EFFECT;
let INCORRECT_SOUND_EFFECT;
let game;
let touchStart = null;

function preload() {
	let suitImages = {};
	suitImages['Spades'] = loadImage('assets/spades.svg');
	suitImages['Clubs'] = loadImage('assets/clubs.svg');
	suitImages['Hearts'] = loadImage('assets/hearts.svg');
	suitImages['Diamonds'] = loadImage('assets/diamonds.svg');
	Suit.preload(suitImages);
	CARD_FONT = loadFont('assets/card_font.ttf');

	// sounds
	soundFormats('mp3');
	CORRECT_SOUND_EFFECT = loadSound('assets/correct.mp3');
	INCORRECT_SOUND_EFFECT = loadSound('assets/incorrect.mp3');
	CORRECT_SOUND_EFFECT.setVolume(0.9);
	INCORRECT_SOUND_EFFECT.setVolume(2.5);
}

function activateAudioContext() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}

function keyPressed(event) {
	if (event.code === 'Escape') {
		game = new GameHandler(width, height);
		return;
	}
	if (event.code === 'Space') {
		game.handleMouseClick(this);
		return;
	}
	game.keyPressed(event);
}

function mousePressed(event) {
	touchStart = {x: mouseX, y: mouseY, time: Date.now()};
	game.handleMouseClick(this);
}

function touchStarted(event) {
	touchStart = {x: mouseX, y: mouseY, time: Date.now()};
	event.preventDefault();
	game.handleMouseClick(this);
}

function mouseReleased(event) {
	if (touchStart && touchStart.y - mouseY > height*.45 && Date.now() - touchStart.time < 400) {
		game = new GameHandler(width, height);
	}
	touchStart = null;
}

function touchEnded(event) {
	if (touchStart && touchStart.y - mouseY > height*.45 && Date.now() - touchStart.time < 400) {
		game = new GameHandler(width, height);
	}
	touchStart = null;
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