import { SketchComponent } from 'util/sketch';

export default class Drop extends SketchComponent {
	p5;

	state = {
		startX: 0,
		startY: 0,
		volume: 100,
	};

	constructor(p5, startX, startY) {
		super(p5);
		this.state.startX = startX;
		this.state.startY = startY;
	}

	addVolume(volume) {
		this.state.volume += volume;
	}

	generate() {
		const { startX, startY, volume } = this.state;
		this.p5.ellipse(startX, startY, volume, volume);
	}
}
