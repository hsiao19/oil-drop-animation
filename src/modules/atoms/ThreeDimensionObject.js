import P5Component from 'util/P5Component';

export default class ThreeDimensionObject extends P5Component {
	heightList = [];

	surfaces = {};

	colorMap = [];

	constructor(data) {
		super();
		const { p5 } = this;
		this.heightList = Object.keys(data).sort((a, b) => a - b);
		this.surfaces = data;
		this.attributes.colorMap = [
			// lowest
			{ height: 0, color: p5.color(255, 150, 0) },
			// highest
			{ height: 100, color: p5.color(255, 204, 0) },
		];
	}

	_getSurfaceColor(height) {
		const { p5, colorMap } = this;

		let displayColor = null;
		let lerpFrom = colorMap[0];
		let lerpTo = colorMap[colorMap.length - 1];

		colorMap.sort((a, b) => a.height - b.height).forEach(color => {
			if (height === color.height) {
				// eslint-disable-next-line prefer-destructuring
				displayColor = color.color;
			}

			if (height > color.height && color.height > lerpFrom.height) {
				lerpFrom = color;
			}

			if (height < color.height && color.height < lerpTo.height) {
				lerpTo = color;
			}
		});

		if (!displayColor) {
			displayColor = p5.lerpColor(
				lerpFrom.color,
				lerpTo.color,
				p5.norm(height, lerpFrom.height, lerpTo.height),
			);
		}

		return displayColor;
	}

	update(data) {
		const { heightList: oldHeightList, surfaces: oldSurfaces } = this;
		this.heightList = oldHeightList
			.concat(Object.keys(data).filter(height => oldHeightList.indexOf(height) === -1))
			.sort((a, b) => a - b);
		this.surfaces = { ...oldSurfaces, ...data };
	}

	generate() {
		const { heightList, surfaces, _getSurfaceColor } = this;

		heightList.forEach(height => {
			_getSurfaceColor(height);
			surfaces[height].forEach(shape => shape.generate());
		});
	}
}
