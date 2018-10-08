import P5Component from 'util/P5Component';
import ColorPointer from 'modules/atoms/ColorPointer';

export default class Droplet extends P5Component {
	p5;

	props = {
		startX: 0,
		startY: 0,
	};

	attributes = {
		// power of droplet get together
		cohesive: 100,

		// power of droplet stick on the wall
		adhesion: 100,
		colorMap: [],
	};

	states = {
		volume: 50000,
		shapeList: [],
	};

	constructor(p5, startX, startY) {
		super(p5);
		this.attributes.colorMap = [
			// lowest
			new ColorPointer({ position: 0, color: p5.color(255, 150, 0) }),
			// highest
			new ColorPointer({ position: 1, color: p5.color(255, 204, 0) }),
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
			attributes: { cohesive },
			states: { volume },
		} = this;

		const shapeMaxVolume = ((3 / 4) * p5.PI * cohesive ** 3) / 2;
		const maxHeight = cohesive;

		const shape = [];

		if (volume > shapeMaxVolume) {
			// x ** 2 * p5.PI + x - 2 *
			// const maxHeight = cohesive;
			// const centerRadius = x;
			// const outerRadius = centerRadius + cohesive;
			// 中間體積 = centerRadius * centerRadius * PI * maxHeight;
			// 周圍體積 = (maxHeight * maxHeight * PI / 4) *
		} else {
			const radius = Math.cbrt((volume * 8) / 3 / p5.PI);

			const height = p5.floor(radius);

			Array.from({ length: height }, (x, i) => i).forEach(surfaceHeight => {
				const position = p5.norm(surfaceHeight, 0, maxHeight);

				shape.push({
					position,
					surfaceHeight,
					radius: Math.sqrt(radius ** 2 - surfaceHeight ** 2),
					// radius: radius - surfaceHeight,
				});
			});
		}

		this.states.shapeList.push(shape);
	}

	_getColor(position) {
		const {
			p5,
			attributes: { colorMap },
		} = this;

		let displayColor = null;
		let lerpFrom = colorMap[0];
		let lerpTo = colorMap[colorMap.length - 1];

		colorMap.sort((a, b) => a.position - b.position).forEach(color => {
			if (position === color.position) {
				// eslint-disable-next-line prefer-destructuring
				displayColor = color.color;
			}

			if (position > color.position && color.position > lerpFrom.position) {
				lerpFrom = color;
			}

			if (position < color.position && color.position < lerpTo.position) {
				lerpTo = color;
			}
		});

		if (!displayColor) {
			displayColor = p5.lerpColor(
				lerpFrom.color,
				lerpTo.color,
				p5.norm(position, lerpFrom.position, lerpTo.position),
			);
		}

		return displayColor;
	}

	_drawShape(shape) {
		const {
			p5,
			props: { startX, startY },
		} = this;

		p5.ellipseMode(p5.CENTER);
		shape.forEach(surface => {
			p5.fill(this._getColor(surface.position));
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
