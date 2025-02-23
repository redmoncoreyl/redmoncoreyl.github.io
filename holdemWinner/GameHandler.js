const GameState = Object.freeze({
	MENU: Symbol('menu'),
	ARCADE: Symbol('arcade'),
	TIME_TRIAL: Symbol('time-trial'),
	FREE_PLAY: Symbol('free-play'),
	HELP: Symbol('help')
});
const WIDE_SCREEN_HEIGHT_MULTIPLE = 1.4;

class GameHandler {

	constructor() {
		// types of games:
		// arcade - each round, you have less and less time to get it
		//   right, goal is to get through as many rounds as possible
		//     - starting time (20)
		//     - number of players (6)
		// time trial - get through as many rounds as possible in a pre-set total amount of time
		//     - total time (2 minutes)
		//     - number of players (6)
		// free play - no time limits
		//     - number of players (6)
		//     - fail on incorrect guess [n]
		// help

		// escape should pause game
		this.gameState = GameState.MENU;
	}

	draw(screenWidth, screenHeight) {
		if (this.gameState === GameState.MENU) {
			this.drawTitle(screenWidth, screenHeight);
		}
	}

	drawTitle(screenWidth, screenHeight) {
		let isWideScreen = screenWidth > screenHeight * WIDE_SCREEN_HEIGHT_MULTIPLE;
		let activeWidth = isWideScreen ? screenHeight / WIDE_SCREEN_HEIGHT_MULTIPLE : screenWidth;
		let activeHeight = isWideScreen ? screenHeight : screenHeight * WIDE_SCREEN_HEIGHT_MULTIPLE;

		push();
		textAlign(CENTER, TOP);
		noStroke();
		textSize(screenWidth/18);
		textFont(CARD_FONT);
		fill(40);
		text('TEXAS HOLD\'EM WINNERS', screenWidth/2+screenWidth/220, screenHeight/9+screenWidth/220);
		fill(254, 252, 247);
		text('TEXAS HOLD\'EM WINNERS', screenWidth/2, screenHeight/9);
		pop();
	}
}