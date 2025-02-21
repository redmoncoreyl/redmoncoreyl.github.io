class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}

	get shortName() {
		return this.rank.shortName + this.suit.shortName;
	}

	static height(width) {
		return width * 3.5 / 2.25;
	}

	static width(height) {
		return height * 2.25 / 3.5;
	}

	draw(x = 0, y = 0, width = 100, alignX = LEFT, alignY = TOP, rotation = 0) {
		let height = width * 3.5 / 2.25;
		let cardCornerRadius = width * 0.05;
		let shaddowOffset = cardCornerRadius;
		let strokeWt = 2 * width / 300;

		// alignment
		let align = function() {
			if (alignX === RIGHT) translate(-width, 0);
			if (alignX === CENTER) translate(-width/2, 0);
			if (alignY === BOTTOM) translate(0, -height);
			if (alignY === CENTER) translate(0, -height/2);
		}
		
		// draw card shaddow
		push();
		fill(0, 0, 0, 50);
		noStroke();
		translate(x + shaddowOffset, y + shaddowOffset);
		rotate(rotation);
		align();
		rect(0, 0, width, height, cardCornerRadius);
		pop();

		// draw card
		push();
		fill(254, 252, 247);
		strokeWeight(strokeWt);
		stroke(50);
		translate(x, y);
		rotate(rotation);
		align();
		rect(0, 0, width, height, cardCornerRadius);

		// draw rank
		let textHeight = height*.21;
		let textCenterX = width*.14;
		let textTopY = height*-.01;
		textFont(CARD_FONT);
		textSize(textHeight);
		fill(0, 0, 0);
		textAlign(CENTER, TOP);
		text(this.rank.fontCharacter, textCenterX, textTopY);
		push();
		translate(width/2, height/2);
		rotate(PI);
		translate(-width/2, -height/2);
		text(this.rank.fontCharacter, textCenterX, textTopY);
		pop();


		// draw suit
		let suitImage = this.suit.image;
		let suitHeight = width*.21;
		let suitWidth = suitImage.width * suitHeight / suitImage.height;
		let suitAdjustX = width*.14;
		let suitAdjustY = textHeight+suitAdjustX*1.2;

		imageMode(CENTER);
		image(suitImage, suitAdjustX, suitAdjustY, suitWidth, suitHeight);
		push();
		translate(width/2, height/2);
		rotate(PI);
		translate(-width/2, -height/2);
		image(suitImage, suitAdjustX, suitAdjustY, suitWidth, suitHeight);
		pop();
		pop();
	}
}