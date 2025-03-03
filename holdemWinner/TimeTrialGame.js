class TimeTrialGame {
	static #CONSTANTS = Object.freeze({
		WIDE_SCREEN_HEIGHT_MULTIPLE: 0.9
	});

	static get #WIDE_SCREEN_HEIGHT_MULTIPLE() {
		return this.#CONSTANTS.WIDE_SCREEN_HEIGHT_MULTIPLE;
	}

	constructor(screenWidth, screenHeight) {
		this.isSettingsShowing = true;

		// settings title
		this.settingsTitleText = 'TEXAS HOLD \'EM WINNERS';

		// settings button
		this.buttonColor = (new p5(() => {})).color(6, 50, 15);
		this.buttonHoverColor = (new p5(() => {})).color(2, 20, 4);
		this.buttonTextColor = (new p5(() => {})).color(235);
		this.settingsStartButton = new Button('Start', 0, 0, 0, 0,  0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);
		this.totalTimeDecButton = new Button('-', 0, 0, 0, 0, 0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);
		this.totalTimeIncButton = new Button('+', 0, 0, 0, 0, 0, 0, this.buttonColor, this.buttonHoverColor, this.buttonTextColor, null);

		this.totalTime = 120;
		
		this.resize(screenWidth, screenHeight);

		this.totalTimeDecButton.registerCallback(() => {
			this.totalTime -= 10;
			if (this.totalTime < 10) this.totalTime = 10;
		});
		this.totalTimeIncButton.registerCallback(() => {
			this.totalTime += 10;
			if (this.totalTime > 300) this.totalTime = 300;
		});
	}

	resize(screenWidth, screenHeight) {
		this.isWideScreen = screenWidth > (screenHeight * TimeTrialGame.#WIDE_SCREEN_HEIGHT_MULTIPLE);
		this.menuWidth = this.isWideScreen ? screenHeight * TimeTrialGame.#WIDE_SCREEN_HEIGHT_MULTIPLE : screenWidth;
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

		// total time
		let settingsTextHeight = 3*this.helpTextSize;
		let totalTimeDecButtonX = this.helpTextLeftX;
		let totalTimeDecButtonY = this.helpTextTopY + settingsTextHeight + this.verticalPadding;
		let totalTimeDecButtonWidth = this.buttonHeight;
		let totalTimeIncButtonX = this.helpTextLeftX + this.helpTextWidth - totalTimeDecButtonWidth;
		this.totalTimeDecButton.resize(totalTimeDecButtonX, totalTimeDecButtonY, totalTimeDecButtonWidth, this.buttonHeight, this.cornerRadius, 0);
		this.totalTimeIncButton.resize(totalTimeIncButtonX, totalTimeDecButtonY, totalTimeDecButtonWidth, this.buttonHeight, this.cornerRadius, 0);
		this.totalTimeRectWidth = this.helpTextWidth - 2*this.helpTextRectPadding - 2*totalTimeDecButtonWidth;
		this.totalTimeRectX = screenWidth/2 - this.totalTimeRectWidth/2;
		this.totalTimeRectY = totalTimeDecButtonY;
		this.totalTimeRectHeight = this.buttonHeight;

	}

	draw(p5Instance) {
		if (this.isSettingsShowing) this.drawSettings(p5Instance);
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

		// draw settings
		p5Instance.push();
		p5Instance.fill(193, 225, 195);
		p5Instance.noStroke();
		p5Instance.rect(this.helpTextRectX, this.helpTextRectY, this.helpTextRectWidth, this.helpTextRectHeight, this.cornerRadius);
		p5Instance.fill(0);
		p5Instance.textAlign(p5Instance.LEFT, p5Instance.TOP);
		p5Instance.textSize(this.helpTextSize);
		p5Instance.textLeading(this.helpTextSize);
		p5Instance.text('Settings\n\nTotal time:', this.helpTextLeftX, this.helpTextTopY, this.helpTextWidth);
		p5Instance.pop();

		// draw total time buttons
		p5Instance.push();
		p5Instance.noStroke();
		p5Instance.fill(15, 80, 30);
		p5Instance.rect(this.totalTimeRectX, this.totalTimeRectY, this.totalTimeRectWidth, this.totalTimeRectHeight, this.cornerRadius);
		p5Instance.fill(this.buttonTextColor);
		p5Instance.textAlign(p5Instance.CENTER, p5Instance.CENTER);
		p5Instance.textSize(this.helpTextSize);
		p5Instance.text(this.totalTime + ' s', this.totalTimeRectX, this.totalTimeRectY, this.totalTimeRectWidth, this.totalTimeRectHeight)
		p5Instance.pop();

		this.settingsStartButton.draw(p5Instance);
		this.totalTimeDecButton.draw(p5Instance);
		this.totalTimeIncButton.draw(p5Instance);
	}

	handleMouseClick(mouseX, mouseY) {
		this.totalTimeDecButton.click(mouseX, mouseY);
		this.totalTimeIncButton.click(mouseX, mouseY);
	}
}