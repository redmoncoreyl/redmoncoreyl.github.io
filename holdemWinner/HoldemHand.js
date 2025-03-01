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
		return screenWidth > screenHeight * WIDE_SCREEN_HEIGHT_MULTIPLE;
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
		return screenWidth/(7 + 2*FANNED_CARD_WIDTH_MULTIPLE + 6*NARROW_SPACING_CARD_WIDTH_MULTIPLE + 2*WIDE_SPACING_CARD_WIDTH_MULTIPLE);
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
		return screenHeight/(3 + 2*NARROW_SPACING_CARD_WIDTH_MULTIPLE*Card.width(1) + 2*WIDE_SPACING_CARD_WIDTH_MULTIPLE*Card.width(1));
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
		return screenWidth/(4 + 4*FANNED_CARD_WIDTH_MULTIPLE + 2*NARROW_SPACING_CARD_WIDTH_MULTIPLE + 3*WIDE_SPACING_CARD_WIDTH_MULTIPLE);
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
		return screenHeight/(3 + 2*NARROW_SCREEN_TOP_CARDS_OFFSET_HEIGHT_MULTIPLE + 2*NARROW_SPACING_CARD_WIDTH_MULTIPLE*Card.width(1) + 2*WIDE_SPACING_CARD_WIDTH_MULTIPLE*Card.width(1));
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

	constructor(numPlayers) {
		this.numPlayers = numPlayers;
		this.deck = new CardDeck(true);
		this.holeCards = [];
		for (let i = 0; i < numPlayers; i++) {
			this.holeCards.push([this.deck.deal(), this.deck.deal()]);
		}
		this.communityCards = [];
		for (let i = 0; i < NUM_COMMUNITY_CARDS; i++) {
			this.communityCards.push(this.deck.deal());
		}
		this.isPlayerWinning = HoldemHand.#determineWinners(this.communityCards, this.holeCards);
		this.selectedPlayers = Array(numPlayers).fill(false);
	}

	draw(screenWidth, screenHeight) {
		let [cardWidth, cardHeight] = HoldemHand.#cardDimensions(screenWidth, screenHeight);

		this.drawCommunityCards(screenWidth, screenHeight);
		this.drawHoleCards(screenWidth, screenHeight);
	}

	drawCommunityCards(screenWidth, screenHeight) {
		// spacing
		let [cardWidth, ] = HoldemHand.#cardDimensions(screenWidth, screenHeight);
		let wideScreenSpacing = cardWidth * (1 + NARROW_SPACING_CARD_WIDTH_MULTIPLE);
		let narrowScreenSpacing = cardWidth * FANNED_CARD_WIDTH_MULTIPLE;
		let spacing = HoldemHand.#isWideScreen(screenWidth, screenHeight) ? wideScreenSpacing : narrowScreenSpacing;
		
		// draw community cards
		let communityX = screenWidth/2 - 2*(spacing);
		let communityY = height/2;
		for (let card of this.communityCards) {
			card.draw(communityX, communityY, cardWidth, CENTER, CENTER);
			communityX += spacing;
		}
	}

	drawHoleCards(screenWidth, screenHeight) {
		let holeCardLocations = this.generateHoleCardLocations(screenWidth, screenHeight);
		
		let [cardWidth, ] = HoldemHand.#cardDimensions(screenWidth, screenHeight);
		for (let i = 0; i < this.numPlayers; i++) {
			this.holeCards[i][0].draw(holeCardLocations[i].firstCardCenterX, holeCardLocations[i].firstCardCenterY, cardWidth, CENTER, CENTER);
			this.holeCards[i][1].draw(holeCardLocations[i].secondCardCenterX, holeCardLocations[i].secondCardCenterY, cardWidth, CENTER, CENTER);
		}
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
		let holePairWidth = cardWidth + cardWidth*FANNED_CARD_WIDTH_MULTIPLE;
		let narrowSpacing = cardWidth * NARROW_SPACING_CARD_WIDTH_MULTIPLE;
		let horizontalSpaceBetweenHolePairs = (screenWidth - 2*narrowSpacing - 5*holePairWidth)/4;
		let sideCardsVerticalSpaceBetweenHolePairs = (screenHeight - 2*narrowSpacing - 2*cardHeight)/3;

		// generate x array
		let centerXArray = [];
		let centerX = narrowSpacing + cardWidth/2;
		for (let i = 0; i < 5; i++) {
			centerXArray.push(centerX);
			centerX += holePairWidth + horizontalSpaceBetweenHolePairs;
		}
		centerXArray = centerXArray.concat(centerXArray.map(x => screenWidth - x - cardWidth*FANNED_CARD_WIDTH_MULTIPLE));

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
				'secondCardCenterX': centerXArray[i] + cardWidth*FANNED_CARD_WIDTH_MULTIPLE,
				'secondCardCenterY': centerYArray[i],
				'left': centerXArray[i] - cardWidth/2,
				'top': centerYArray[i] - cardHeight/2,
				'right': centerXArray[i] + cardWidth*FANNED_CARD_WIDTH_MULTIPLE + cardWidth/2,
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
		let holePairWidth = cardWidth + cardWidth*FANNED_CARD_WIDTH_MULTIPLE;
		let narrowSpacing = cardWidth * NARROW_SPACING_CARD_WIDTH_MULTIPLE;
		let horizontalSpaceBetweenHolePairs = (screenWidth - 2*narrowSpacing - 4*holePairWidth)/3;
		let sideCardsVerticalSpaceBetweenHolePairs = (screenHeight - 2*narrowSpacing - 3*cardHeight - 2*cardHeight*NARROW_SCREEN_TOP_CARDS_OFFSET_HEIGHT_MULTIPLE)/4;

		// generate x array
		let centerXArray = [];
		let centerX = narrowSpacing + cardWidth/2;
		centerXArray.push(centerX);
		for (let i = 0; i < 4; i++) {
			centerXArray.push(centerX);
			centerX += holePairWidth + horizontalSpaceBetweenHolePairs;
		}
		centerXArray = centerXArray.concat(centerXArray.map(x => screenWidth - x - cardWidth*FANNED_CARD_WIDTH_MULTIPLE));

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
				'secondCardCenterX': centerXArray[i] + cardWidth*FANNED_CARD_WIDTH_MULTIPLE,
				'secondCardCenterY': centerYArray[i],
				'left': centerXArray[i] - cardWidth/2,
				'top': centerYArray[i] - cardHeight/2,
				'right': centerXArray[i] + cardWidth*FANNED_CARD_WIDTH_MULTIPLE + cardWidth/2,
				'bottom': centerYArray[i] + cardHeight/2,
				'width': holePairWidth,
				'height': cardHeight,
				'index': i
			});
		}

		return locations;
	}

	handleMouseClick(mouseX, mouseY, mouseButton, screenWidth, screenHeight) {
		if (mouseButton == LEFT) {
			let holeCardLocations = this.generateHoleCardLocations(screenWidth, screenHeight);
			let isHoleCardClicked = holeCardLocations.map(location => (mouseX >= location.left &&
				mouseX <= location.right && mouseY >= location.top && mouseY <= location.bottom)
			);
			this.selectedPlayers = this.selectedPlayers.map((isSelected, i) => (isSelected != isHoleCardClicked[i]));
		}

		if (mouseButton == RIGHT) {
			let isCorrect = this.isPlayerWinning.every((value, i) => value === this.selectedPlayers[i]);
			console.log(isCorrect);
		}
	}
}