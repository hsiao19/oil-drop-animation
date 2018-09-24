import { SketchComponent } from 'util/sketch';

export default class Droplet extends SketchComponent {
	p5;

	props = {
		startX: 0,
		startY: 0,
	};

	attributes = {
		// power of droplet get together
		cohesive: 10,

		// power of droplet stick on the wall
		adhesion: 10,
		colorMap: [],
	};

	states = {
		volume: 1000,
		shapeList: [],
	};

	constructor(p5, startX, startY) {
		super(p5);
		this.attributes.colorMap = [
			// lowest
			{ position: 0, color: p5.color(255, 150, 0) },

			{ position: 0.5, color: p5.color(255, 204, 0) },

			// highest
			{ position: 1, color: p5.color(255, 204, 0) },
		];

		this.props.startX = startX;
		this.props.startY = startY;
	}

	addVolume(volume) {
		this.states.volume += volume;
	}

	_setShape() {
		const {
			p5,
			attributes: { cohesive, colorMap },
			states: { volume },
		} = this;

		const shapeMaxVolume = ((3 / 4) * p5.PI * cohesive ** 3) / 2;

		const shape = [];

		if (volume > shapeMaxVolume) {
			// const maxHeight = cohesive;
			// const centerRadius = x;
			// const outerRadius = centerRadius + cohesive;
			// 中間體積 = centerRadius * centerRadius * PI * maxHeight;
			// 周圍體積 = (maxHeight * maxHeight * PI / 4) *
		} else {
			const radius = Math.cbrt((volume * 8) / 3 / p5.PI);

			const height = p5.floor(radius);

			Array.from({ length: height }, (x, i) => i + 1).forEach(surfaceHeight => {
				const position = p5.norm(surfaceHeight, 0, height);

				let color = null;
				let lerpFrom = colorMap[0];
				let lerpTo = colorMap[colorMap.length - 1];
				colorMap.sort((a, b) => a.position - b.position).forEach(colorPointer => {
					if (position === colorPointer.position) {
						// eslint-disable-next-line prefer-destructuring
						color = colorPointer.color;
					}

					if (position > colorPointer.position && colorPointer.position > lerpFrom.position) {
						lerpFrom = colorPointer;
					}

					if (position < colorPointer.position && colorPointer.position < lerpTo.position) {
						lerpTo = colorPointer;
					}
				});

				if (!color) {
					color = p5.lerpColor(
						lerpFrom.color,
						lerpTo.color,
						p5.norm(position, lerpFrom.position, lerpTo.position),
					);
				}

				shape.push({
					position,
					surfaceHeight,
					radius: radius - surfaceHeight,
					color,
				});
			});
		}

		this.states.shapeList.push(shape);
	}

	_drawShape(shape) {
		const {
			p5,
			props: { startX, startY },
		} = this;

		p5.ellipseMode(p5.CENTER);
		shape.forEach(surface => {
			p5.fill(surface.color);
			p5.ellipse(startX, startY, surface.radius, surface.radius);
		});
	}

	generate() {
		const {
			p5,
			states: { shapeList },
		} = this;

		p5.noStroke();

		this._setShape();
		shapeList.forEach(shape => {
			this._drawShape(shape);
		});
	}
}
