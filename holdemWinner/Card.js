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

	draw(p5Instance, x = 0, y = 0, width = 100, alignX = LEFT, alignY = TOP, rotation = 0) {
		let height = width * 3.5 / 2.25;
		let cardCornerRadius = width * 0.05;
		let shaddowOffset = cardCornerRadius;
		let strokeWeight = 2 * width / 300;

		// alignment
		let align = function() {
			if (alignX === p5Instance.RIGHT) p5Instance.translate(-width, 0);
			if (alignX === p5Instance.CENTER) p5Instance.translate(-width/2, 0);
			if (alignY === p5Instance.BOTTOM) p5Instance.translate(0, -height);
			if (alignY === p5Instance.CENTER) p5Instance.translate(0, -height/2);
		}
		
		// draw card shaddow
		p5Instance.push();
		p5Instance.fill(0, 0, 0, 50);
		p5Instance.noStroke();
		p5Instance.translate(x + shaddowOffset, y + shaddowOffset);
		p5Instance.rotate(rotation);
		align();
		p5Instance.rect(0, 0, width, height, cardCornerRadius);
		p5Instance.pop();

		// draw card
		p5Instance.push();
		p5Instance.fill(254, 252, 247);
		p5Instance.strokeWeight(strokeWeight);
		p5Instance.stroke(50);
		p5Instance.translate(x, y);
		p5Instance.rotate(rotation);
		align();
		p5Instance.rect(0, 0, width, height, cardCornerRadius);

		// draw rank
		let textHeight = height*.21;
		let textCenterX = width*.14;
		let textTopY = height*-.01;
		p5Instance.textFont(CARD_FONT);
		p5Instance.textSize(textHeight);
		p5Instance.fill(0, 0, 0);
		p5Instance.textAlign(p5Instance.CENTER, p5Instance.TOP);
		p5Instance.text(this.rank.fontCharacter, textCenterX, textTopY);
		p5Instance.push();
		p5Instance.translate(width/2, height/2);
		p5Instance.rotate(p5Instance.PI);
		p5Instance.translate(-width/2, -height/2);
		p5Instance.text(this.rank.fontCharacter, textCenterX, textTopY);
		p5Instance.pop();


		// draw suit
		let suitImage = this.suit.image;
		let suitHeight = width*.21;
		let suitWidth = suitImage.width * suitHeight / suitImage.height;
		let suitAdjustX = width*.14;
		let suitAdjustY = textHeight+suitAdjustX*1.2;

		p5Instance.imageMode(p5Instance.CENTER);
		p5Instance.image(suitImage, suitAdjustX, suitAdjustY, suitWidth, suitHeight);
		p5Instance.push();
		p5Instance.translate(width/2, height/2);
		p5Instance.rotate(PI);
		p5Instance.translate(-width/2, -height/2);
		p5Instance.image(suitImage, suitAdjustX, suitAdjustY, suitWidth, suitHeight);
		p5Instance.pop();
		p5Instance.pop();
	}
}