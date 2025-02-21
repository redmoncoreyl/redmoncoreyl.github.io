class Suit {
	constructor(name, shortName=name[0]) {
		this.name = name;
		this.shortName = shortName;
	}
	
	static SPADES = new Suit('Spades');
	static CLUBS = new Suit('Clubs');
	static DIAMONDS = new Suit('Diamonds');
	static HEARTS = new Suit('Hearts');
	static SUITS  = [this.SPADES, this.CLUBS, this.DIAMONDS, this.HEARTS];

	static preload(suitImages) {
		this.SUITS.forEach(suit => {
			suit.image = suitImages[suit.name];
		});
	}
}