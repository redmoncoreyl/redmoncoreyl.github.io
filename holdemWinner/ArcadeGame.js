class ArcadeGame {
	static #CONSTANTS = Object.freeze({
		WIDE_SCREEN_HEIGHT_MULTIPLE: 0.9
	});

	static get #WIDE_SCREEN_HEIGHT_MULTIPLE() {
		return this.#CONSTANTS.WIDE_SCREEN_HEIGHT_MULTIPLE;
	}

	static #GameState = Object.freeze({
		SETTINGS: Symbol('settings'),
		PLAY: Symbol('play'),
		SUMMARY: Symbol('summary')
	});

	static get GameState() {
		return ArcadeGame.#GameState;
	}

	constructor(screenWidth, screenHeight) {
		this.gameState = ArcadeGame.#GameState.SETTINGS;

		// settings title
		this.settingsTitleText = 'TEXAS HOLD \'EM WINNERS';

		// settings button
		this.buttonColor = (new p5(() => {})).color(6, 50, 15);
		this.buttonHoverColor = (new p5(() => {})).color(2, 20, 4);
		this.buttonTextColor = (new p5(() => {})).color(235);
		this.settingsStartButton = new Button('Start', 0, 0, 0, 0,  0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);
		this.startingTimeDecButton = new Button('-', 0, 0, 0, 0, 0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);
		this.startingTimeIncButton = new Button('+', 0, 0, 0, 0, 0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);
		this.numPlayersDecButton = new Button('-', 0, 0, 0, 0, 0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);
		this.numPlayersIncButton = new Button('+', 0, 0, 0, 0, 0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);
		this.menuButton = new Button('Menu', 0, 0, 0, 0, 0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);

		this.startingTimePerHand = 20;
		this.currentTimePerHand = 20;
		this.numPlayers = 6;

		this.resize(screenWidth, screenHeight);

		this.startingTimeDecButton.registerCallback(() => {
			this.startingTimePerHand--;
			if (this.startingTimePerHand < 5) this.startingTimePerHand = 5;
			this.currentTimePerHand = this.startingTimePerHand;
		});
		this.startingTimeIncButton.registerCallback(() => {
			this.startingTimePerHand++;
			if (this.startingTimePerHand > 60) this.startingTimePerHand = 60;
			this.currentTimePerHand = this.startingTimePerHand;
		});
		this.numPlayersDecButton.registerCallback(() => {
			this.numPlayers--;
			if (this.numPlayers < 2) this.numPlayers = 2;
		});
		this.numPlayersIncButton.registerCallback(() => {
			this.numPlayers++;
			if (this.numPlayers > 10) this.numPlayers = 10;
		});

		this.holdemHand = null;
		this.lastHandRevealTime = null;
		this.startTime = null;
		this.correctGuesses = 0;
		this.incorrectGuesses = 0;
		this.handsViewed = 1;
		this.lastGuessTime = null;

		this.settingsStartButton.registerCallback(() => {
			this.holdemHand = new HoldemHand(this.numPlayers, this.screenWidth, this.screenHeight);
			this.gameState = ArcadeGame.#GameState.PLAY;
			this.startTime = Date.now();
			this.lastHandRevealTime = Date.now();
		});
	}

	resize(screenWidth, screenHeight) {
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.isWideScreen = screenWidth > (screenHeight * ArcadeGame.#WIDE_SCREEN_HEIGHT_MULTIPLE);
		this.menuWidth = this.isWideScreen ? screenHeight * ArcadeGame.#WIDE_SCREEN_HEIGHT_MULTIPLE : screenWidth;
		this.menuHeight = screenHeight;
		this.menuTop = 0;
		this.menuBottom = screenHeight - this.menuTop;
		this.menuLeft = this.isWideScreen ? (screenWidth - this.menuWidth)/2 : 0;
		this.menuRight = screenWidth - this.menuLeft;

		this.titleSize = this.isWideScreen ? 0.055 * this.menuHeight : 0.061 * this.menuWidth;
		this.titleCenterX = (this.menuLeft + this.menuRight)/2;
		this.verticalPadding = 0.5*this.titleSize;
		this.titleTopY = this.verticalPadding;

		this.buttonHeight = 0.06 * this.menuHeight;
		let buttonLeftX = 0.2 * this.menuWidth + this.menuLeft;
		let buttonTopY = this.menuHeight - this.buttonHeight - this.verticalPadding;
		let buttonWidth = 0.6 * this.menuWidth;
		this.cornerRadius = 0.2*this.buttonHeight;
		this.settingsStartButton.resize(buttonLeftX, buttonTopY, buttonWidth, this.buttonHeight, this.cornerRadius, 0);

		this.helpTextLeftX = this.menuLeft + 0.07*this.menuWidth;
		this.helpTextTopY = this.menuTop + this.titleTopY + this.titleSize*1.9;
		this.helpTextWidth = 0.86*this.menuWidth;
		this.helpTextSize = 0.05 * this.menuHeight;
		this.helpTextRectPadding = this.menuWidth*.015;
		this.helpTextRectX = this.helpTextLeftX - this.helpTextRectPadding;
		this.helpTextRectY = this.helpTextTopY - this.helpTextRectPadding;
		this.helpTextRectHeight = buttonTopY - this.helpTextRectY - this.verticalPadding;
		this.helpTextRectWidth = this.helpTextWidth + 2*this.helpTextRectPadding;

		// starting time
		let settingsTextHeight = 3*this.helpTextSize;
		let startingTimeDecButtonX = this.helpTextLeftX;
		let startingTimeDecButtonY = this.helpTextTopY + settingsTextHeight + this.verticalPadding;
		let startingTimeDecButtonWidth = this.buttonHeight;
		let startingTimeIncButtonX = this.helpTextLeftX + this.helpTextWidth - startingTimeDecButtonWidth;
		this.startingTimeDecButton.resize(startingTimeDecButtonX, startingTimeDecButtonY, startingTimeDecButtonWidth, this.buttonHeight, this.cornerRadius, 0);
		this.startingTimeIncButton.resize(startingTimeIncButtonX, startingTimeDecButtonY, startingTimeDecButtonWidth, this.buttonHeight, this.cornerRadius, 0);
		this.startingTimeRectWidth = this.helpTextWidth - 2*this.helpTextRectPadding - 2*startingTimeDecButtonWidth;
		this.startingTimeRectX = screenWidth/2 - this.startingTimeRectWidth/2;
		this.startingTimeRectY = startingTimeDecButtonY;
		this.startingTimeRectHeight = this.buttonHeight;

		// num players
		settingsTextHeight = 1*this.helpTextSize;
		let numPlayersDecButtonX = this.helpTextLeftX;
		let numPlayersDecButtonY = startingTimeDecButtonY + this.buttonHeight + settingsTextHeight + 2*this.verticalPadding;
		let numPlayersDecButtonWidth = this.buttonHeight;
		let numPlayersIncButtonX = this.helpTextLeftX + this.helpTextWidth - numPlayersDecButtonWidth;
		this.numPlayersDecButton.resize(numPlayersDecButtonX, numPlayersDecButtonY, numPlayersDecButtonWidth, this.buttonHeight, this.cornerRadius, 0);
		this.numPlayersIncButton.resize(numPlayersIncButtonX, numPlayersDecButtonY, numPlayersDecButtonWidth, this.buttonHeight, this.cornerRadius, 0);
		this.numPlayersRectWidth = this.helpTextWidth - 2*this.helpTextRectPadding - 2*numPlayersDecButtonWidth;
		this.numPlayersRectX = screenWidth/2 - this.numPlayersRectWidth/2;
		this.numPlayersRectY = numPlayersDecButtonY;
		this.numPlayersRectHeight = this.buttonHeight;

		// summary
		this.menuButton.resize(buttonLeftX, buttonTopY, buttonWidth, this.buttonHeight, this.cornerRadius, 0);

		if (this.gameState === ArcadeGame.#GameState.PLAY) {
			this.holdemHand.resize(screenWidth, screenHeight);
		}
	}

	draw(p5Instance) {
		if (this.gameState === ArcadeGame.#GameState.SETTINGS) {
			this.drawSettings(p5Instance);
		} else if (this.gameState === ArcadeGame.#GameState.PLAY) {
			this.holdemHand.draw(p5Instance);
			if (Date.now() - this.lastHandRevealTime > (this.currentTimePerHand-5)*1000) {
				let millis = (this.lastHandRevealTime + this.currentTimePerHand*1000 - Date.now() - 500) % 1000;
				let angle = millis/1000*2*Math.PI;
				let cos = (Math.cos(angle) + 1)/2;
				let alpha = cos*120;
				p5Instance.background(242, 52, 39, alpha);
			}

			if (Date.now() - this.lastHandRevealTime > this.currentTimePerHand*1000) {
				this.gameState = ArcadeGame.#GameState.SUMMARY;
				this.stopTime = Date.now();
				if (Date.now() - this.lastHandRevealTime < 2000) {
					this.handsViewed--;
				}
				if (Date.now() - this.lastGuessTime > 2000) {
					this.incorrectGuesses++;
				}
			}
		} else {
			this.drawSummary(p5Instance);
		}
	}

	drawSettings(p5Instance) {
		// draw title
		p5Instance.push();
		p5Instance.textSize(this.titleSize);
		p5Instance.noStroke();
		p5Instance.textFont(CARD_FONT);
		p5Instance.textAlign(p5Instance.CENTER, p5Instance.TOP);
		p5Instance.fill(40);
		p5Instance.text(this.settingsTitleText, this.titleCenterX + .06*this.titleSize, this.titleTopY + .06*this.titleSize);
		p5Instance.fill(255);
		p5Instance.text(this.settingsTitleText, this.titleCenterX, this.titleTopY);
		p5Instance.pop();

		// draw settings labels
		p5Instance.push();
		p5Instance.fill(193, 225, 195);
		p5Instance.noStroke();
		p5Instance.rect(this.helpTextRectX, this.helpTextRectY, this.helpTextRectWidth, this.helpTextRectHeight, this.cornerRadius);
		p5Instance.fill(0);
		p5Instance.textAlign(p5Instance.LEFT, p5Instance.TOP);
		p5Instance.textSize(this.helpTextSize);
		p5Instance.textLeading(this.helpTextSize);
		p5Instance.text('Settings\n\nStarting time:', this.helpTextLeftX, this.helpTextTopY, this.helpTextWidth);
		p5Instance.text('Player count:', this.helpTextLeftX, this.startingTimeRectY + this.buttonHeight + this.verticalPadding, this.helpTextWidth);
		p5Instance.pop();

		// draw settings boxes
		p5Instance.push();
		p5Instance.noStroke();
		p5Instance.fill(15, 80, 30);
		p5Instance.rect(this.startingTimeRectX, this.startingTimeRectY, this.startingTimeRectWidth, this.startingTimeRectHeight, this.cornerRadius);
		p5Instance.rect(this.numPlayersRectX, this.numPlayersRectY, this.numPlayersRectWidth, this.numPlayersRectHeight, this.cornerRadius);
		p5Instance.fill(this.buttonTextColor);
		p5Instance.textAlign(p5Instance.CENTER, p5Instance.CENTER);
		p5Instance.textSize(this.helpTextSize);
		p5Instance.text(this.startingTimePerHand + ' s', this.startingTimeRectX, this.startingTimeRectY, this.startingTimeRectWidth, this.startingTimeRectHeight);
		p5Instance.text(this.numPlayers, this.numPlayersRectX, this.numPlayersRectY, this.numPlayersRectWidth, this.numPlayersRectHeight);
		p5Instance.pop();

		this.settingsStartButton.draw(p5Instance);
		this.startingTimeDecButton.draw(p5Instance);
		this.startingTimeIncButton.draw(p5Instance);
		this.numPlayersDecButton.draw(p5Instance);
		this.numPlayersIncButton.draw(p5Instance);
	}

	drawSummary(p5Instance) {
		// draw title
		p5Instance.push();
		p5Instance.textSize(this.titleSize);
		p5Instance.noStroke();
		p5Instance.textFont(CARD_FONT);
		p5Instance.textAlign(p5Instance.CENTER, p5Instance.TOP);
		p5Instance.fill(40);
		p5Instance.text(this.settingsTitleText, this.titleCenterX + .06*this.titleSize, this.titleTopY + .06*this.titleSize);
		p5Instance.fill(255);
		p5Instance.text(this.settingsTitleText, this.titleCenterX, this.titleTopY);
		p5Instance.pop();

		// draw summary
		p5Instance.push();
		p5Instance.fill(193, 225, 195);
		p5Instance.noStroke();
		p5Instance.rect(this.helpTextRectX, this.helpTextRectY, this.helpTextRectWidth, this.helpTextRectHeight, this.cornerRadius);
		p5Instance.fill(0);
		p5Instance.textAlign(p5Instance.LEFT, p5Instance.TOP);
		p5Instance.textSize(this.helpTextSize*.8);
		p5Instance.textLeading(this.helpTextSize);
		let summaryText = `Summary\n\nStarting time: ${this.startingTimePerHand}\nEnding time: ${(this.currentTimePerHand).toFixed(2)}\nCorrect: ${this.correctGuesses}\nIncorrect: ${this.incorrectGuesses}\nAccuracy: ${(this.correctGuesses*100/(this.correctGuesses + this.incorrectGuesses)).toFixed(2)}%\nCorrect HPM: ${(this.correctGuesses*60000/(this.stopTime-this.startTime)).toFixed(2)}`;
		p5Instance.text(summaryText, this.helpTextLeftX, this.helpTextTopY, this.helpTextWidth);
		p5Instance.pop();

		this.menuButton.draw(p5Instance);
	}

	handleMouseClick(p5Instance) {
		let mouseX = p5Instance.mouseX;
		let mouseY = p5Instance.mouseY;
		if (this.gameState === ArcadeGame.#GameState.SETTINGS) {
			this.startingTimeDecButton.click(mouseX, mouseY);
			this.startingTimeIncButton.click(mouseX, mouseY);
			this.numPlayersDecButton.click(mouseX, mouseY);
			this.numPlayersIncButton.click(mouseX, mouseY);
			this.settingsStartButton.click(mouseX, mouseY);
			return GameHandler.GameState.ARCADE;
		} else if (this.gameState === ArcadeGame.#GameState.PLAY) {
			let isCorrectGuess = this.holdemHand.handleMouseClick(p5Instance);
			if (isCorrectGuess === undefined) return GameHandler.GameState.ARCADE;
			if (isCorrectGuess) {
				this.holdemHand = new HoldemHand(this.numPlayers, this.screenWidth, this.screenHeight);
				this.handsViewed++;
				this.correctGuesses++;
				this.lastHandRevealTime = Date.now();
				this.currentTimePerHand -= 0.4;
			} else {
				this.incorrectGuesses++;
			}
			this.lastGuessTime = Date.now();
			return GameHandler.GameState.ARCADE;
		} else {
			return this.menuButton.isClicked(mouseX, mouseY) ? GameHandler.GameState.MENU : GameHandler.GameState.ARCADE;
		}
	}

	keyPressed(event) {
		if (this.gameState === ArcadeGame.GameState.PLAY) {
			let isCorrectGuess = this.holdemHand.keyPressed(event);
			if (isCorrectGuess === undefined) return GameHandler.GameState.ARCADE;
			if (isCorrectGuess) {
				this.holdemHand = new HoldemHand(this.numPlayers, this.screenWidth, this.screenHeight);
				this.handsViewed++;
				this.correctGuesses++;
				this.lastHandRevealTime = Date.now();
				this.currentTimePerHand -= 0.4;
			} else {
				this.incorrectGuesses++;
			}
			this.lastGuessTime = Date.now();
			return GameHandler.GameState.ARCADE;
		}
	}
}