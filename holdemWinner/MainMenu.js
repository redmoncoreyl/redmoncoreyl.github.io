class MainMenu {
	static #CONSTANTS = Object.freeze({
		WIDE_SCREEN_HEIGHT_MULTIPLE: 0.9
	});

	static get #WIDE_SCREEN_HEIGHT_MULTIPLE() {
		return this.#CONSTANTS.WIDE_SCREEN_HEIGHT_MULTIPLE;
	}

	constructor(screenWidth, screenHeight) {
		// title
		this.titleText = 'TEXAS HOLD \'EM\nWINNERS';

		// buttons
		this.buttonColor = (new p5(() => {})).color(178, 219, 181);
		this.buttonHoverColor = (new p5(() => {})).color(127, 163, 138);
		this.buttonsText = ['Time Trial', 'Arcade', 'Free Play', 'Help'];
		let gameModes = [GameHandler.GameState.TIME_TRIAL, GameHandler.GameState.ARCADE, GameHandler.GameState.FREE_PLAY, GameHandler.GameState.HELP];
		this.buttons = [];
		for (let i = 0; i < this.buttonsText.length; i++) {
			this.buttons.push({
				buttonObj: new Button(this.buttonsText[i], 0, 0, 0, 0, 0, 0, this.buttonColor, this.buttonHoverColor, null),
				gameMode: gameModes[i]
			});
		}
		this.resize(screenWidth, screenHeight);
	}

	resize(screenWidth, screenHeight) {
		this.isWideScreen = screenWidth > (screenHeight * MainMenu.#WIDE_SCREEN_HEIGHT_MULTIPLE);
		this.menuWidth = this.isWideScreen ? screenHeight * MainMenu.#WIDE_SCREEN_HEIGHT_MULTIPLE : screenWidth;
		this.menuHeight = this.isWideScreen ? screenHeight : screenWidth / MainMenu.#WIDE_SCREEN_HEIGHT_MULTIPLE;
		this.menuTop = this.isWideScreen ? 0 : (screenHeight - this.menuHeight)/2;
		this.menuBottom = screenHeight - this.menuTop;
		this.menuLeft = this.isWideScreen ? (screenWidth - this.menuWidth)/2 : 0;
		this.menuRight = screenWidth - this.menuLeft;

		this.titleCenterX = (this.menuLeft + this.menuRight)/2;
		this.titleTopY = 0.049 * this.menuHeight + this.menuTop;
		this.titleSize = 0.09 * this.menuHeight;

		let buttonLeftX = 0.075 * this.menuWidth + this.menuLeft;
		let buttonCenterY = 0.34 * this.menuHeight + this.menuTop;
		let buttonWidth = 0.85 * this.menuWidth;
		let buttonHeight = 0.1 * this.menuHeight;
		let cornerRadius = 0.2*buttonHeight;
		let buttonStrokeWeight = 0.03 * buttonHeight;
		for (let button of this.buttons) {
			button.buttonObj.resize(buttonLeftX, buttonCenterY, buttonWidth, buttonHeight, cornerRadius, buttonStrokeWeight);
			buttonCenterY += buttonHeight*1.5;
		}
	}

	draw(p5Instance) {
		p5Instance.push();
		
		// draw title
		p5Instance.textSize(this.titleSize);
		p5Instance.noStroke();
		p5Instance.textFont(CARD_FONT);
		p5Instance.textAlign(p5Instance.CENTER, p5Instance.TOP);
		p5Instance.fill(40);
		p5Instance.text(this.titleText, this.titleCenterX + .005*this.menuHeight, this.titleTopY + .005*this.menuHeight);
		p5Instance.fill(255);
		p5Instance.text(this.titleText, this.titleCenterX, this.titleTopY);
		p5Instance.pop();

		// draw buttons
		for (let button of this.buttons) {
			button.buttonObj.draw(p5Instance);
		}
	}

	handleMouseClick(mouseX, mouseY) {
		for (let button of this.buttons) {
			if (button.buttonObj.isClicked(mouseX, mouseY)) {
				return button.gameMode;
			}
		}
	}
}