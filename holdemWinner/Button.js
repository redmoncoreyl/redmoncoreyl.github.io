class Button {
	constructor(text, x, y, width, height, cornerRadius, strokeWeight, color, hoverColor, textColor, strokeColor) {
		this.text = text;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.cornerRadius = cornerRadius;
		this.strokeWeight = strokeWeight;
		this.color = color;
		this.hoverColor = hoverColor;
		this.textColor = textColor;
		this.strokeColor = strokeColor;
	}

	draw(p5Instance) {
		let mouseX = p5Instance.mouseX;
		let mouseY = p5Instance.mouseY;
		let buttonColor = this.isHover(mouseX, mouseY) ? this.hoverColor : this.color;
		p5Instance.push();
		p5Instance.fill(buttonColor);
		if (this.strokeColor === null) {
			p5Instance.noStroke();
		} else {
			p5Instance.stroke(this.strokeColor);
		}
		p5Instance.strokeWeight(this.strokeWeight);
		p5Instance.rect(this.x, this.y, this.width, this.height, this.cornerRadius);
		p5Instance.textSize(this.height*0.85);
		p5Instance.textAlign(p5Instance.CENTER, p5Instance.CENTER);
		p5Instance.noStroke();
		p5Instance.fill(this.textColor);
		p5Instance.text(this.text, this.x + this.width/2, this.y + this.height/2);
		p5Instance.pop();
	}

	isClicked(mouseX, mouseY) {
		return this.isHover(mouseX, mouseY);
	}

	isHover(mouseX, mouseY) {
		return mouseX > this.x && mouseY > this.y && mouseX < this.x + this.width && mouseY < this.y + this.height;
	}

	resize(x, y, width, height, cornerRadius, strokeWeight) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.cornerRadius = cornerRadius;
		this.strokeWeight = strokeWeight;
	}
}