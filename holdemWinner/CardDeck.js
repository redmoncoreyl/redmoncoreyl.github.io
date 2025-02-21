class CardDeck {
	static #newDeck() {
		let deck = [];
		for (let suit of Suit.SUITS) {
			for (let rank of Rank.RANKS) {
				deck.push(new Card(rank, suit));
			}
		}

		return deck;
	}

	#shuffleDeckPacket(minIndex, maxIndex) {
		let currentIndex = maxIndex;

		// While there remain elements to shuffle...
		while (currentIndex != minIndex) {
			// Pick a remaining element...
			let randomIndex = minIndex + Math.floor(Math.random() * (currentIndex - minIndex));
			currentIndex--;

			// And swap it with the current element.
			[this.deck[currentIndex], this.deck[randomIndex]] = [
			this.deck[randomIndex], this.deck[currentIndex]];
		}
	}

	constructor(isShuffled) {
		this.deck = CardDeck.#newDeck();
		if (isShuffled) this.shuffleFullDeck();
		this.topCardIndex = 0;
	}

	topCard() {
		return this.deck[this.topCardIndex];
	}

	deal() {
		let dealtCard = this.topCard();
		this.topCardIndex++;
		return dealtCard;
	}

	isEmpty() {
		return this.topCardIndex >= this.deck.length;
	}

	shuffleRemainingDeck() {
		this.#shuffleDeckPacket(this.topCardIndex, this.deck.length);
	}

	shuffleFullDeck() {
		this.#shuffleDeckPacket(0, this.deck.length)
	}

	reset() {
		this.topCardIndex = 0;
	}

	resetAndShuffle() {
		this.topCardIndex = 0;
		this.shuffleFullDeck();
	}
}