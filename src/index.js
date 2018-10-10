import P5 from 'p5/lib/p5.min';

import 'normalize.css';
import 'global.css';

import Droplet from 'modules/molecules/Droplet';

/* eslint-disable no-new */

const sketchGenerator = p5Sketch => {
	window.p5 = p5Sketch;
	const p5 = p5Sketch;

	const droplet = new Droplet(100, 100);

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
	};

	p5.draw = () => {
		p5.background(200);
		droplet.generate();
	};

	p5.windowResized = () => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
		p5.background(120);
	};
};

new P5(sketchGenerator, 'sketch');
