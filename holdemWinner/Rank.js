class Rank {
	constructor(name, value, shortName, fontCharacter=shortName) {
		this.name = name;
		this.value = value;
		this.shortName = shortName;
		this.fontCharacter = fontCharacter;
	}
	
	static ACE = new Rank('Ace', 1, 'A');
	static TWO = new Rank('Two', 2, '2');
	static THREE = new Rank('Three', 3, '3');
	static FOUR = new Rank('Four', 4, '4');
	static FIVE = new Rank('Five', 5, '5');
	static SIX = new Rank('Six', 6, '6');
	static SEVEN = new Rank('Seven', 7, '7');
	static EIGHT = new Rank('Eight', 8, '8');
	static NINE = new Rank('Nine', 9, '9');
	static TEN = new Rank('Ten', 10, 'T', '=');
	static JACK = new Rank('Jack', 11, 'J');
	static QUEEN = new Rank('Queen', 12, 'Q');
	static KING = new Rank('King', 13, 'K');
	static RANKS = [this.ACE, this.TWO, this.THREE, this.FOUR,
		this.FIVE, this.SIX, this.SEVEN, this.EIGHT, this.NINE,
		this.TEN, this.JACK, this.QUEEN, this.KING];
}