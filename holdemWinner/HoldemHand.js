class HoldemHand {
	static #CONSTANTS = Object.freeze({
		NUM_COMMUNITY_CARDS: 5,
		WIDE_SCREEN_HEIGHT_MULTIPLE: 1.4,
		FANNED_CARD_WIDTH_MULTIPLE: 0.28,
		NARROW_SPACING_CARD_WIDTH_MULTIPLE: 0.1,
		WIDE_SPACING_CARD_WIDTH_MULTIPLE: 0.15,
		NARROW_SCREEN_TOP_CARDS_OFFSET_HEIGHT_MULTIPLE: 0.3
	});

	static get NUM_COMMUNITY_CARDS() {
		return this.#CONSTANTS.NUM_COMMUNITY_CARDS;
	}

	static get WIDE_SCREEN_HEIGHT_MULTIPLE() {
		return this.#CONSTANTS.WIDE_SCREEN_HEIGHT_MULTIPLE;
	}

	static get FANNED_CARD_WIDTH_MULTIPLE() {
		return this.#CONSTANTS.FANNED_CARD_WIDTH_MULTIPLE;
	}

	static get NARROW_SPACING_CARD_WIDTH_MULTIPLE() {
		return this.#CONSTANTS.NARROW_SPACING_CARD_WIDTH_MULTIPLE;
	}

	static get WIDE_SPACING_CARD_WIDTH_MULTIPLE() {
		return this.#CONSTANTS.WIDE_SPACING_CARD_WIDTH_MULTIPLE;
	}

	static get NARROW_SCREEN_TOP_CARDS_OFFSET_HEIGHT_MULTIPLE() {
		return this.#CONSTANTS.NARROW_SCREEN_TOP_CARDS_OFFSET_HEIGHT_MULTIPLE;
	}

	static #determineWinners(communityCards, holeCards) {
		let communityCardsShortNames = communityCards.map(card => card.shortName);
		let holeCardsShortNames = holeCards.map(hole => hole.map(card => card.shortName));
		let playerCardsShortNames = holeCardsShortNames.map(holeCards => communityCardsShortNames.concat(holeCards));

		let playerHands = playerCardsShortNames.map(cards => Hand.solve(cards));
		playerHands.forEach((hand, i) => {hand.playerIndex = i});
		let winningHands = Hand.winners(playerHands);
		let winningHandIndexes = winningHands.map(hand => hand.playerIndex);

		let isPlayerWinning = Array(holeCards.length).fill(false);
		winningHandIndexes.forEach((index) => isPlayerWinning[index] = true);
		return isPlayerWinning;
	}

	static #isWideScreen(screenWidth, screenHeight) {
		return screenWidth > screenHeight * HoldemHand.WIDE_SCREEN_HEIGHT_MULTIPLE;
	}

	/**
	 * In wide screen, the layout horizontally is:
	 * n(|w |n|n|n|n| w(|n, where n is narrow spacing, w is wide spacing,
	 * | are cards, and ( are fanned cards partially covered.
	 * 
	 * Therefore, card width x follows this formula:
	 * W = 7*x + 2*f*x + 6*n*x + 2*w*x
	 * 
	 * So, x = W/(7 + 2*f + 6*n + 2*w)
	 * 
	 * Note that the 5 community cards are wider than
	 * the 3 hole pairs on top (when screen is fully narrowed).
	 */
	static #wideScreenMaxCardWidth(screenWidth) {
		return screenWidth/(7 + 2*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE + 6*HoldemHand.NARROW_SPACING_CARD_WIDTH_MULTIPLE + 2*HoldemHand.WIDE_SPACING_CARD_WIDTH_MULTIPLE);
	}

	/**
	 * In wide screen, the layout vertically is:
	 * n|w|w|n, where n is narrow spacing, w is wide spacing, and | are cards.
	 * 
	 * Therefore, card height y follows this formula:
	 * H = 3*y + 2*n*x + 2*w*x
	 * 
	 * In the formula above, x = Card.width(1)*y
	 * 
	 * So, y = H/(3 + 2*n*c + 2*w*c)
	 */
	static #wideScreenMaxCardHeight(screenHeight) {
		return screenHeight/(3 + 2*HoldemHand.NARROW_SPACING_CARD_WIDTH_MULTIPLE*Card.width(1) + 2*HoldemHand.WIDE_SPACING_CARD_WIDTH_MULTIPLE*Card.width(1));
	}

	/**
	 * In narrow screen, the layout horizontally is:
	 * n(|w(|w(|w(|n, where n is narrow spacing, w is wide spacing,
	 * | are cards, and ( are fanned cards partially covered.
	 * 
	 * Therefore, card width x follows this formula:
	 * W = 4*x + 4*f*x + 2*n*x + 3*w*x
	 * 
	 * So, x = W/(4 + 4*f + 2*n + 3*w)
	 * 
	 * Note that the 5 community cards are narrower than
	 * the 2 hole pairs on top (when screen is fully narrowed).
	 */
	static #narrowScreenMaxCardWidth(screenWidth) {
		return screenWidth/(4 + 4*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE + 2*HoldemHand.NARROW_SPACING_CARD_WIDTH_MULTIPLE + 3*HoldemHand.WIDE_SPACING_CARD_WIDTH_MULTIPLE);
	}

	/**
	 * In narrow screen, the layout vertically is:
	 * n^|w|w|vn, where n is narrow spacing, w is wide spacing,
	 * | are cards, and ^/v are card height offsets for the top and bottom rows.
	 * 
	 * Therefore, card height y follows this formula:
	 * H = 3*y + 2*o*y + 2*n*x + 2*w*x
	 * 
	 * In the formula above, x = Card.width(1)*y
	 * 
	 * So, y = H/(3 + 2*o + 2*n*c + 2*w*c)
	 */
	static #narrowScreenMaxCardHeight(screenHeight) {
		return screenHeight/(3 + 2*HoldemHand.NARROW_SCREEN_TOP_CARDS_OFFSET_HEIGHT_MULTIPLE + 2*HoldemHand.NARROW_SPACING_CARD_WIDTH_MULTIPLE*Card.width(1) + 2*HoldemHand.WIDE_SPACING_CARD_WIDTH_MULTIPLE*Card.width(1));
	}

	static #maxCardWidth(screenWidth, isWideScreen) {
		return isWideScreen ? HoldemHand.#wideScreenMaxCardWidth(screenWidth) : HoldemHand.#narrowScreenMaxCardWidth(screenWidth);
	}

	static #maxCardHeight(screenHeight, isWideScreen) {
		return isWideScreen ? HoldemHand.#wideScreenMaxCardHeight(screenHeight) : HoldemHand.#narrowScreenMaxCardHeight(screenHeight);
	}

	static #cardDimensions(screenWidth, screenHeight) {
		let isWideScreen = HoldemHand.#isWideScreen(screenWidth, screenHeight);
		let maxCardWidth = HoldemHand.#maxCardWidth(screenWidth, isWideScreen);
		let maxCardHeight = HoldemHand.#maxCardHeight(screenHeight, isWideScreen);
		if (Card.height(maxCardWidth) > maxCardHeight) {
			return [Card.width(maxCardHeight), maxCardHeight];
		} else {
			return [maxCardWidth, Card.height(maxCardWidth)];
		}
	}

	constructor(numPlayers, screenWidth, screenHeight) {
		this.numPlayers = numPlayers;
		this.deck = new CardDeck(true);
		this.holeCards = [];
		for (let i = 0; i < numPlayers; i++) {
			this.holeCards.push([this.deck.deal(), this.deck.deal()]);
		}
		this.communityCards = [];
		for (let i = 0; i < HoldemHand.NUM_COMMUNITY_CARDS; i++) {
			this.communityCards.push(this.deck.deal());
		}
		this.isPlayerWinning = HoldemHand.#determineWinners(this.communityCards, this.holeCards);
		this.selectedPlayers = Array(numPlayers).fill(false);
		
		this.resize(screenWidth, screenHeight);
	}

	resize(screenWidth, screenHeight) {
		[this.cardWidth, ] = HoldemHand.#cardDimensions(screenWidth, screenHeight);
		this.communityCardLocations = this.generateCommunityCardLocations(screenWidth, screenHeight);
		this.holeCardLocations = this.generateHoleCardLocations(screenWidth, screenHeight);
	}

	draw(p5Instance) {
		this.drawCommunityCards(p5Instance);
		this.drawHoleCards(p5Instance);
	}

	drawCommunityCards(p5Instance) {
		for (let i = 0; i < HoldemHand.NUM_COMMUNITY_CARDS; i++) {
			let cardX = this.communityCardLocations[i].centerX;
			let cardY = this.communityCardLocations[i].centerY;
			this.communityCards[i].draw(p5Instance, cardX, cardY, this.cardWidth, p5Instance.CENTER, p5Instance.CENTER);
		}
	}

	drawHoleCards(p5Instance) {
		for (let i = 0; i < this.numPlayers; i++) {
			let firstCardX = this.holeCardLocations[i].firstCardCenterX;
			let firstCardY = this.holeCardLocations[i].firstCardCenterY;
			this.holeCards[i][0].draw(p5Instance, firstCardX, firstCardY, this.cardWidth, p5Instance.CENTER, p5Instance.CENTER);

			let secondCardX = this.holeCardLocations[i].secondCardCenterX;
			let secondCardY = this.holeCardLocations[i].secondCardCenterY;
			this.holeCards[i][1].draw(p5Instance, secondCardX, secondCardY, this.cardWidth, p5Instance.CENTER, p5Instance.CENTER);

			let isPlayerSelected = this.selectedPlayers[i];
			if(isPlayerSelected) {
				let holePairWidth = this.cardWidth + this.cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE;
				let cardHeight = Card.height(this.cardWidth);
				let rectX = firstCardX - this.cardWidth/2;
				let rectY = firstCardY - cardHeight/2;
				this.drawSelectionRectangle(p5Instance, rectX, rectY, holePairWidth, cardHeight);
			}
		}
	}

	drawSelectionRectangle(p5Instance, x, y, width, height) {
		p5Instance.push();
		p5Instance.noFill();
		p5Instance.stroke(255, 0, 0);
		let strokeWeight = height*.03;
		p5Instance.strokeWeight(strokeWeight);
		p5Instance.rect(x-strokeWeight*.3, y-strokeWeight*.3, width+strokeWeight*.6, height+strokeWeight*.6, height*.06);
		p5Instance.pop();
	}

	handleMouseClick(p5Instance) {
		let mouseX = p5Instance.mouseX;
		let mouseY = p5Instance.mouseY;
		let mouseButton = p5Instance.mouseButton;
		let screenWidth = p5Instance.width;
		let screenHeight = p5Instance.height;
		if (mouseButton == p5Instance.LEFT) {
			let holeCardLocations = this.generateHoleCardLocations(screenWidth, screenHeight);
			let isHoleCardClicked = holeCardLocations.map(location => (mouseX >= location.left &&
				mouseX <= location.right && mouseY >= location.top && mouseY <= location.bottom)
			);
			this.selectedPlayers = this.selectedPlayers.map((isSelected, i) => (isSelected != isHoleCardClicked[i]));
		}

		if (mouseButton == p5Instance.RIGHT) {
			let isCorrect = this.isPlayerWinning.every((value, i) => value === this.selectedPlayers[i]);
			if (isCorrect) CORRECT_SOUND_EFFECT.play();
			else INCORRECT_SOUND_EFFECT.play();
		}
	}

	generateCommunityCardLocations(screenWidth, screenHeight) {
		// spacing
		let [cardWidth, cardHeight] = HoldemHand.#cardDimensions(screenWidth, screenHeight);
		let wideScreenSpacing = cardWidth * (1 + HoldemHand.NARROW_SPACING_CARD_WIDTH_MULTIPLE);
		let narrowScreenSpacing = cardWidth * HoldemHand.FANNED_CARD_WIDTH_MULTIPLE;
		let spacing = HoldemHand.#isWideScreen(screenWidth, screenHeight) ? wideScreenSpacing : narrowScreenSpacing;
		
		// draw community cards
		let cardX = screenWidth/2 - 2*(spacing);
		let cardY = screenHeight/2;
		let locations = [];
		for (let i = 0; i < HoldemHand.NUM_COMMUNITY_CARDS; i++) {
			locations.push({
				'centerX': cardX,
				'centerY': cardY,
				'left': cardX- cardWidth/2,
				'top': cardY - cardHeight/2,
				'right': cardX + cardWidth/2,
				'bottom': cardY + cardHeight/2,
				'width': cardWidth,
				'height': cardHeight,
				'index': i
			});
			cardX += spacing;
		}
		return locations;
	}

	generateHoleCardLocations(screenWidth, screenHeight) {
		if (HoldemHand.#isWideScreen(screenWidth, screenHeight)) {
			return this.generateWideScreenHoleCardsLocations(screenWidth, screenHeight);
		} else {
			return this.generateNarrowScreenHoleCardsLocations(screenWidth, screenHeight);
		}
	}

	generateWideScreenHoleCardsLocations(screenWidth, screenHeight) {
		// spacing
		let [cardWidth, cardHeight] = HoldemHand.#cardDimensions(screenWidth, screenHeight);
		let holePairWidth = cardWidth + cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE;
		let narrowSpacing = cardWidth * HoldemHand.NARROW_SPACING_CARD_WIDTH_MULTIPLE;
		let horizontalSpaceBetweenHolePairs = (screenWidth - 2*narrowSpacing - 5*holePairWidth)/4;
		let sideCardsVerticalSpaceBetweenHolePairs = (screenHeight - 2*narrowSpacing - 2*cardHeight)/3;

		// generate x array
		let centerXArray = [];
		let centerX = narrowSpacing + cardWidth/2;
		for (let i = 0; i < 5; i++) {
			centerXArray.push(centerX);
			centerX += holePairWidth + horizontalSpaceBetweenHolePairs;
		}
		centerXArray = centerXArray.concat(centerXArray.map(x => screenWidth - x - cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE));

		// generate y array
		let topCardsCenterY = narrowSpacing + cardHeight/2;
		let sideTopCardsCenterY = narrowSpacing + sideCardsVerticalSpaceBetweenHolePairs + cardHeight/2;
		let centerYArray = [sideTopCardsCenterY, topCardsCenterY, topCardsCenterY, topCardsCenterY, sideTopCardsCenterY];
		centerYArray = centerYArray.concat(centerYArray.map(y => screenHeight - y));

		let locations = [];
		for (let i = 0; i < this.numPlayers; i++) {
			locations.push({
				'firstCardCenterX': centerXArray[i],
				'firstCardCenterY': centerYArray[i],
				'secondCardCenterX': centerXArray[i] + cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE,
				'secondCardCenterY': centerYArray[i],
				'left': centerXArray[i] - cardWidth/2,
				'top': centerYArray[i] - cardHeight/2,
				'right': centerXArray[i] + cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE + cardWidth/2,
				'bottom': centerYArray[i] + cardHeight/2,
				'width': holePairWidth,
				'height': cardHeight,
				'index': i
			});
		}

		return locations;
	}

	generateNarrowScreenHoleCardsLocations(screenWidth, screenHeight) {
		// spacing
		let [cardWidth, cardHeight] = HoldemHand.#cardDimensions(screenWidth, screenHeight);
		let holePairWidth = cardWidth + cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE;
		let narrowSpacing = cardWidth * HoldemHand.NARROW_SPACING_CARD_WIDTH_MULTIPLE;
		let horizontalSpaceBetweenHolePairs = (screenWidth - 2*narrowSpacing - 4*holePairWidth)/3;
		let sideCardsVerticalSpaceBetweenHolePairs = (screenHeight - 2*narrowSpacing - 3*cardHeight - 2*cardHeight*HoldemHand.NARROW_SCREEN_TOP_CARDS_OFFSET_HEIGHT_MULTIPLE)/4;

		// generate x array
		let centerXArray = [];
		let centerX = narrowSpacing + cardWidth/2;
		centerXArray.push(centerX);
		for (let i = 0; i < 4; i++) {
			centerXArray.push(centerX);
			centerX += holePairWidth + horizontalSpaceBetweenHolePairs;
		}
		centerXArray = centerXArray.concat(centerXArray.map(x => screenWidth - x - cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE));

		// generate y array
		let topCardsCenterY = narrowSpacing + cardHeight/2;
		let sideTopCardsCenterY = screenHeight/2 - cardHeight - sideCardsVerticalSpaceBetweenHolePairs;
		let centerYArray = [screenHeight/2, sideTopCardsCenterY, topCardsCenterY, topCardsCenterY, sideTopCardsCenterY];
		centerYArray = centerYArray.concat(centerYArray.map(y => screenHeight - y));

		let locations = [];
		for (let i = 0; i < this.numPlayers; i++) {
			locations.push({
				'firstCardCenterX': centerXArray[i],
				'firstCardCenterY': centerYArray[i],
				'secondCardCenterX': centerXArray[i] + cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE,
				'secondCardCenterY': centerYArray[i],
				'left': centerXArray[i] - cardWidth/2,
				'top': centerYArray[i] - cardHeight/2,
				'right': centerXArray[i] + cardWidth*HoldemHand.FANNED_CARD_WIDTH_MULTIPLE + cardWidth/2,
				'bottom': centerYArray[i] + cardHeight/2,
				'width': holePairWidth,
				'height': cardHeight,
				'index': i
			});
		}

		return locations;
	}
}