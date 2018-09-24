import P5 from 'p5/lib/p5.min';

import 'normalize.css';
import 'global.css';

import Drop from 'modules/Drop';

/* eslint-disable no-new */

const sketchGenerator = p5Sketch => {
	const p5 = p5Sketch;

	const drop = new Drop(p5, 100, 100);

	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
		p5.background(120);
	};

	p5.draw = () => {
		drop.generate();
	};

	p5.windowResized = () => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
		p5.background(120);
	};
};

new P5(sketchGenerator, window.document.getElementById('sketch'));
