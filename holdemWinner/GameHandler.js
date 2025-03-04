class GameHandler {
	static #GameState = Object.freeze({
		MENU: Symbol('menu'),
		ARCADE: Symbol('arcade'),
		TIME_TRIAL: Symbol('time-trial'),
		FREE_PLAY: Symbol('free-play'),
		HELP: Symbol('help')
	});

	static get GameState() {
		return GameHandler.#GameState;
	}

	constructor(screenWidth, screenHeight) {
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
		// help

		// escape should pause game
		this.gameState = GameHandler.#GameState.MENU;
		this.menu = new MainMenu(screenWidth, screenHeight);
		this.helpScreen = new HelpScreen(screenWidth, screenHeight);
	}

	draw(p5Instance) {
		if (this.gameState === GameHandler.#GameState.MENU) {
			this.menu.draw(p5Instance);
		} else if (this.gameState === GameHandler.#GameState.HELP) {
			this.helpScreen.draw(p5Instance);
		} else {
			this.game.draw(p5Instance);
		}
	}

	resize(screenWidth, screenHeight) {
		this.menu.resize(screenWidth, screenHeight);
		this.helpScreen.resize(screenWidth, screenHeight);
		if (this.game) this.game.resize(screenWidth, screenHeight);
	}

	handleMouseClick(p5Instance) {
		let mouseX = p5Instance.mouseX;
		let mouseY = p5Instance.mouseY;
		let screenWidth = p5Instance.width;
		let screenHeight = p5Instance.height;

		if (this.gameState === GameHandler.#GameState.MENU) {
			this.gameState = this.menu.handleMouseClick(mouseX, mouseY);
			if (this.gameState === GameHandler.#GameState.TIME_TRIAL) {
				this.game = new TimeTrialGame(screenWidth, screenHeight);
			}
		}  else if (this.gameState === GameHandler.#GameState.HELP) {
			this.gameState = this.helpScreen.handleMouseClick(mouseX, mouseY);
		} else {
			this.game.handleMouseClick(p5Instance);
		}
	}
}