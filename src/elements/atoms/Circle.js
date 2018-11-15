import Shape from 'elements/abstract/Shape';

export default class Circle extends Shape {
	mode = 'CENTER';

	x;

	y;

	radius;

	initalize({ mode, x, y, radius }) {
		if (mode) {
			this.mode = mode;
		}
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	update({ mode, x, y, radius }) {
		if (mode) {
			this.mode = mode;
		}
		if (x) {
			this.x = x;
		}
		if (y) {
			this.y = y;
		}
		if (radius) {
			this.radius = radius;
		}
	}

	// eslint-disable-next-line class-methods-use-this
	generate() {
		const { p5, mode, x, y, radius } = this;
		p5.ellipseMode(p5[mode]);
		p5.ellipse(x, y, radius);

		// set ellipseMode back to default
		if (mode !== 'CENTER') {
			p5.ellipseMode(p5.CENTER);
		}
	}
}
