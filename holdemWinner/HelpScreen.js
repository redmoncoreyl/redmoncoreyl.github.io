class HelpScreen {
	static #CONSTANTS = Object.freeze({
		WIDE_SCREEN_HEIGHT_MULTIPLE: 0.9
	});

	static get #WIDE_SCREEN_HEIGHT_MULTIPLE() {
		return this.#CONSTANTS.WIDE_SCREEN_HEIGHT_MULTIPLE;
	}

	constructor(screenWidth, screenHeight) {
		// title
		this.titleText = 'TEXAS HOLD \'EM WINNERS';

		// help text
		this.goalText = 'The goal is to determine the best 5-card poker hand as fast as possible and without error among all the players hole cards.\n\nTime Trial - identify as many winning hands as possible in the allotted time.\n\nArcade - identify the winning hands before you run out of time to continue playing. You have less time with each successive hand.\n\nFree Play - identify the winning hands at your own pace.';
		this.controlsText = 'To select the best hand, click or tap on the hole cards, hover over the hole cards and press the space bar, or press the number of the hole cards (1 starts in the top left and numbers continue clockwise).\n\nTo submit your guess, click or tap on the community cards, or press enter.\n\nTo quit, click or tap and hold on the community cards for 5 seconds, or press escape.';

		this.helpText = this.goalText;
		this.isGoalText = true;

		// bottom button
		this.buttonColor = (new p5(() => {})).color(6, 50, 15);
		this.buttonHoverColor = (new p5(() => {})).color(2, 20, 4);
		this.buttonTextColor = (new p5(() => {})).color(235);
		this.bottomButton = new Button('Next', 0, 0, 0, 0,  0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);
		this.resize(screenWidth, screenHeight);
	}

	resize(screenWidth, screenHeight) {
		this.isWideScreen = screenWidth > (screenHeight * HelpScreen.#WIDE_SCREEN_HEIGHT_MULTIPLE);
		this.menuWidth = this.isWideScreen ? screenHeight * HelpScreen.#WIDE_SCREEN_HEIGHT_MULTIPLE : screenWidth;
		this.menuHeight = screenHeight;
		this.menuTop = 0;
		this.menuBottom = screenHeight - this.menuTop;
		this.menuLeft = this.isWideScreen ? (screenWidth - this.menuWidth)/2 : 0;
		this.menuRight = screenWidth - this.menuLeft;

		this.titleSize = this.isWideScreen ? 0.055 * this.menuHeight : 0.061 * this.menuWidth;
		this.titleCenterX = (this.menuLeft + this.menuRight)/2;
		this.titleTopY = 0.5*this.titleSize;

		let buttonHeight = 0.06 * this.menuHeight;
		let buttonLeftX = 0.2 * this.menuWidth + this.menuLeft;
		let buttonTopY = this.menuHeight - buttonHeight - 0.5*this.titleSize;
		let buttonWidth = 0.6 * this.menuWidth;
		this.cornerRadius = 0.2*buttonHeight;
		let buttonStrokeWeight = 0.03 * buttonHeight;
		this.bottomButton.resize(buttonLeftX, buttonTopY, buttonWidth, buttonHeight, this.cornerRadius, buttonStrokeWeight);

		this.helpTextLeftX = this.menuLeft + 0.07*this.menuWidth;
		this.helpTextTopY = this.menuTop + this.titleTopY + this.titleSize*1.9;
		this.helpTextWidth = 0.86*this.menuWidth;
		this.helpTextSize = 0.03 * this.menuHeight;
		this.helpTextRectPadding = this.menuWidth*.015;
		this.helpTextRectX = this.helpTextLeftX - this.helpTextRectPadding;
		this.helpTextRectY = this.helpTextTopY - this.helpTextRectPadding;
		this.helpTextRectHeight = buttonTopY - this.helpTextRectY - 0.5*this.titleSize;
		this.helpTextRectWidth = this.helpTextWidth + 2*this.helpTextRectPadding;
	}

	draw(p5Instance) {
		// draw title
		p5Instance.push();
		p5Instance.textSize(this.titleSize);
		p5Instance.noStroke();
		p5Instance.textFont(CARD_FONT);
		p5Instance.textAlign(p5Instance.CENTER, p5Instance.TOP);
		p5Instance.fill(40);
		p5Instance.text(this.titleText, this.titleCenterX + .06*this.titleSize, this.titleTopY + .06*this.titleSize);
		p5Instance.fill(255);
		p5Instance.text(this.titleText, this.titleCenterX, this.titleTopY);
		p5Instance.pop();

		// draw help text
		p5Instance.push();
		p5Instance.fill(193, 225, 195);
		p5Instance.noStroke();
		p5Instance.rect(this.helpTextRectX, this.helpTextRectY, this.helpTextRectWidth, this.helpTextRectHeight, this.cornerRadius);
		p5Instance.fill(0);
		p5Instance.textAlign(p5Instance.LEFT, p5Instance.TOP);
		p5Instance.textSize(this.helpTextSize);
		p5Instance.textLeading(this.helpTextSize);
		p5Instance.text(this.helpText, this.helpTextLeftX, this.helpTextTopY, this.helpTextWidth);
		p5Instance.pop();

		// button
		this.bottomButton.draw(p5Instance);
	}

	handleMouseClick(mouseX, mouseY) {
		if (!this.bottomButton.isClicked(mouseX, mouseY)) return GameHandler.GameState.HELP;

		this.helpText = this.isGoalText ? this.controlsText : this.goalText;
		this.bottomButton.text = this.isGoalText ? 'Menu' : 'Next';
		this.isGoalText = !this.isGoalText;
		return this.isGoalText ? GameHandler.GameState.MENU : GameHandler.GameState.HELP;
	}
}