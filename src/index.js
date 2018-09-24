import P5 from 'p5/lib/p5.min';

import 'normalize.css';
import 'global.css';

const sketchGenerator = p5Sketch => {
	const p5 = p5Sketch;
	p5.setup = () => {
		p5.createCanvas(p5.windowWidth, p5.windowHeight);
		p5.background(120);
	};

	p5.draw = () => {};

	p5.windowResized = () => {
		p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
		p5.background(120);
	};
};

// eslint-disable-next-line no-new
new P5(sketchGenerator, window.document.getElementById('sketch'));
