const GameState = Object.freeze({
	MENU: Symbol('menu'),
	ARCADE: Symbol('arcade'),
	TIME_TRIAL: Symbol('time-trial'),
	FREE_PLAY: Symbol('free-play'),
	HELP: Symbol('help')
});

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

	draw() {

	}
}