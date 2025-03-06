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
			} else if (this.gameState === GameHandler.#GameState.ARCADE) {
				this.game = new ArcadeGame(screenWidth, screenHeight);
			} else if (this.gameState === GameHandler.#GameState.FREE_PLAY) {
				this.game = new FreePlayGame(screenWidth, screenHeight);
			}
		}  else if (this.gameState === GameHandler.#GameState.HELP) {
			this.gameState = this.helpScreen.handleMouseClick(mouseX, mouseY);
		} else {
			this.gameState = this.game.handleMouseClick(p5Instance);
		}
	}

	keyPressed(event) {
		if (this.gameState !== GameHandler.#GameState.MENU && this.gameState !== GameHandler.#GameState.HELP) {
			this.game.keyPressed(event);
		}
	}
}