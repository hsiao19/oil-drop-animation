import P5Component from 'util/P5Component';
import ColorPointer from 'elements/atoms/ColorPointer';

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
		adhesion: 2,
		colorMap: [],
	};

	states = {
		volume: 500000,
		speed: 2,
		shapeList: [],
	};

	constructor(startX, startY) {
		super();
		const {
			p5,
			states: { volume, shapeList },
		} = this;

		this.attributes.colorMap = [
			// lowest
			new ColorPointer({ position: 0, color: p5.color(255, 150, 0) }),
			// highest
			new ColorPointer({ position: 1, color: p5.color(255, 204, 0) }),
		];

		this.props.startX = startX;
		this.props.startY = startY;

		shapeList.push(this._setShape({ x: startX, y: startY, volume }));
	}

	addVolume(volume) {
		this.states.volume += volume;
	}

	_setShape({ x, y, volume, flat, radius }) {
		const {
			p5,
			attributes: { cohesive },
		} = this;

		const shapeMaxVolume = ((3 / 4) * p5.PI * cohesive ** 3) / 2;
		const maxHeight = cohesive;

		const shape = [];
		let maxRadius = 0;
		let height = maxHeight;

		if (flat) {
			shape.push({
				position: 0,
				surfaceHeight: 1,
				radius,
			});

			return { x, y, volume, maxRadius: radius, height: 1, shape };
		}

		if (volume > shapeMaxVolume) {
			const overflowVolume = volume - shapeMaxVolume;
			const overflowRadius = Math.cbrt((overflowVolume * 8) / 3 / p5.PI);
			maxRadius = maxHeight + overflowRadius;

			Array.from({ length: maxHeight }, (_, i) => i).forEach(surfaceHeight => {
				const position = p5.norm(surfaceHeight, 0, maxHeight);

				shape.push({
					position,
					surfaceHeight,
					radius: maxRadius - surfaceHeight,
				});
			});
		} else {
			maxRadius = Math.cbrt((volume * 8) / 3 / p5.PI);

			height = p5.floor(maxRadius);

			Array.from({ length: height }, (_, i) => i).forEach(surfaceHeight => {
				const position = p5.norm(surfaceHeight, 0, maxHeight);

				shape.push({
					position,
					surfaceHeight,
					// radius: Math.sqrt(radius ** 2 - surfaceHeight ** 2),
					radius: maxRadius - surfaceHeight,
				});
			});
		}

		return { x, y, volume, maxRadius, height, shape };
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
		const { p5 } = this;

		p5.ellipseMode(p5.CENTER);
		shape.shape.forEach(surface => {
			p5.fill(this._getColor(surface.position));
			p5.ellipse(shape.x, shape.y, surface.radius, surface.radius);
		});
	}

	drop() {
		const {
			p5,
			attributes: { adhesion },
			states: { speed, shapeList },
		} = this;

		const lastShape = shapeList[shapeList.length - 1];

		if (lastShape.height > adhesion) {
			shapeList.splice(
				shapeList.length - 1,
				1,
				this._setShape({
					x: lastShape.x,
					y: lastShape.y,
					volume: adhesion * lastShape.maxRadius * lastShape.maxRadius * p5.PI,
					flat: true,
					radius: lastShape.maxRadius,
				}),
				this._setShape({
					x: lastShape.x,
					y: lastShape.y + speed,
					volume: lastShape.volume - adhesion * lastShape.maxRadius * lastShape.maxRadius * p5.PI,
				}),
			);
		}
	}

	generate() {
		const {
			p5,
			states: { shapeList },
		} = this;

		p5.noStroke();

		this.drop();

		shapeList.forEach(shape => {
			this._drawShape(shape);
		});
	}
}
